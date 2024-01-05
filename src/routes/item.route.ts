
import { Hono, Context } from "hono";
import { Db, ObjectId } from "mongodb";
import { zValidator } from "@hono/zod-validator";

import mongo from "../config/mongo";
import { itemSchema, itemsDetailSchema } from "../schemas/item.schema";

const route : Hono = new Hono();

route.get("/", async (c : Context)=>{
    const db : Db = mongo.getDb()
    const data = await db.collection("item").find().toArray()
    return c.json(data, 200)
})

route.get("/:_id", async (c : Context)=>{
    const db : Db = mongo.getDb()
    const { _id } = c.req.param()
    const data = await db.collection("item").findOne({ _id : new ObjectId(_id)})
    return c.json(data, 200)
})

route.post("/add_item", 
    zValidator("json", itemSchema, (result, c : Context)=>{
        if(!result.success){
            throw new Error(`Invalid Input!, ${result.error}`)
        }
    }), 
    async (c : any)=>{
        const db : Db = mongo.getDb()
        const body = await c.req.valid("json")
        const data = {

        }
        const doc = await db.collection("item").insertOne(body)
        return c.json(doc, 201)
    }
)

route.post("/add_item_detail/:_id",
    zValidator("json", itemsDetailSchema, (result, c : Context)=>{
        if(!result.success){
            throw new Error(`Invalid Input!, ${result.error}`)
        }
    }),
    async(c : any)=>{
    const db : Db = mongo.getDb()
    const { _id } = c.req.param()
    const body = await c.req.valid("json")
    const doc : {} = await db.collection("item").updateOne({
        _id : new ObjectId(_id)
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

})

route.delete("/delete/:_id", async(c : Context)=>{
    const db : Db = mongo.getDb()
    const { _id } = c.req.param()
    const doc = await db.collection("item").deleteOne({ _id : new ObjectId(_id)})
    return c.json(doc, 204)
})

route.delete("/delete_all", async (c : Context)=>{
    const db : Db = mongo.getDb();
    const doc = await db.collection("item").deleteMany()
    return c.json(doc, 204)

})


export default route
