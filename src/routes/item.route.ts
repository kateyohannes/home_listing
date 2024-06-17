
import { Hono, Context } from "hono";
import { Db, ObjectId } from "mongodb";
import { zValidator } from "@hono/zod-validator";

import mongo from "@config/mongo";
import { itemSchema, itemsDetailSchema } from "@schema/item.schema";

const route : Hono = new Hono();

route.get("/", async (c : Context)=>{

    try{
        const db : Db = mongo.getDb()
        const data = await db.collection("item").find().toArray()
        return c.json(data, 200)
    }catch(err){ 
        return c.json({
            message : "Error",
            err
        }, 500)
    }
})

route.get("/:id", async (c : Context)=>{
    
    
    try{
        const db : Db = mongo.getDb()
        const { id } = c.req.param()
        const data = await db.collection("item").findOne({ _id : new ObjectId(id)})
        return c.json(data, 200)
    }catch(err){ 
        return c.json({
            message : "Error",
            err
        }, 500)
    }
})

route.post("/add_item", 
    zValidator("json", itemSchema, (result, c : Context)=>{
        if(!result.success){
            throw new Error(`Invalid Input!, ${result.error}`)
        }
    }), 
    async (c : any)=>{

        try{
            const db : Db = mongo.getDb()
            const body = await c.req.valid("json")
            const doc = await db.collection("item").insertOne(body)
            return c.json(doc, 201)
        }catch(err){ 
            return c.json({
                message : "Error",
                err
            }, 500)
        }
    }
)

route.post("/add_item_detail/:id",
    zValidator("json", itemsDetailSchema, (result, c : Context)=>{
        if(!result.success){
            throw new Error(`Invalid Input!, ${result.error}`)
        }
    }),
    async(c : any)=>{
    
        try{
            const db : Db = mongo.getDb()
            const { id } = c.req.param()
            const body = await c.req.valid("json")
            const doc : {} = await db.collection("item").updateOne({
                _id : new ObjectId(id)
            },{
                $push : {
                    item_details : {         
                        _id: new ObjectId(),
                        ...body
                    }
                },
                $inc : {
                    quantity : body.quantity
                }
            })
        
            return c.json(doc, 201)
        }catch(err){ 
            return c.json({
                message : "Error",
                err
            }, 500)
        }

})

route.delete("/delete/:id", async(c : Context)=>{
    
    try{
        const db : Db = mongo.getDb()
        const { id } = c.req.param()
        const doc = await db.collection("item").deleteOne({ _id : new ObjectId(id)})
        return c.json(doc, 204)
    }catch(err){ 
        return c.json({
            message : "Error",
            err
        }, 500)
    }
})

route.delete("/delete_all", async (c : Context)=>{

    try{
        const db : Db = mongo.getDb();
        const doc = await db.collection("item").deleteMany()
        return c.json(doc, 204)
    }catch(err){ 
        return c.json({
            message : "Error",
            err
        }, 500)
    }

})


export default route
