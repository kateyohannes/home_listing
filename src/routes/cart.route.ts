import { Hono, Context } from "hono"
import { Db, ObjectId } from "mongodb"
import { zValidator } from "@hono/zod-validator"

import mongo from "../config/mongo"
import { cartSchema } from "../schemas/cart.schema"

const route: Hono = new Hono()

route.get("/", async (c: Context) => {

    try{
        const db: Db = mongo.getDb()
        const data = await db.collection("cart").find().toArray()
    
        return c.json(data, 200)
    }catch(err){ 
        return c.json({
            message : "Error",
            err
        }, 500)
    }
})

route.get("/:_id", async (c : Context)=>{
    
    try{
        const db : Db = mongo.getDb()
        const { _id } = c.req.param()
        const data = await db.collection("cart").findOne({ _id : new ObjectId(_id)})
    
        return c.json(data, 200)
    }catch(err){ 
        return c.json({
            message : "Error",
            err
        }, 500)
    }
})

route.post("/add",
    zValidator("json", cartSchema, (result, c : Context)=>{
        if(!result.success){
            throw new Error(`Invalid schema: ${result.error}`)
        }
    })
    ,async (c : any)=>{
        
        try{
            const db : Db = mongo.getDb()
            const body = await c.req.valid("json")
            const doc = await db.collection("cart").findOne({
                $and : [
                    { order_by : new ObjectId(body.order_by)},
                    { order_status : "on_cart"}
                ]
            })
            if(doc){
                await db.collection("cart").updateOne({
                    $and : [
                        { order_by : new ObjectId(body.order_by)},
                        { order_status : "on_cart"}
                    ],
                },{
                    $set : {
                        cart_items : { $push : { ...body.cart_items }}
                    }
                })
            }else{
                await db.collection("cart").insertOne(body)
            }
    
            return c.json(doc, 201)
        }catch(err){ 
            return c.json({
                message : "Error",
                err
            }, 500)
        }
    }
)


// route.post("/add"
//     ,async (c : any)=>{
//         const db : Db = mongo.getDb()
//         // const body = await c.req.valid("json")
//         const body = await c.req.json();
//         const doc = await db.collection("cart").insertOne(body)
//         return c.json(doc, 201)
//     }
// )

// route.post("/add_items_to_cart/:_id", async (c : Context)=>{
//     const db : Db = mongo.getDb()
//     const { _id } = c.req.param()
//     const body = await c.req.json()
//     const doc = await db.collection("cart").updateOne({
//         _id : new ObjectId(_id)
//     },{
//         $push : {
//             cart_items : {
//                 ...body
//             }
//         }
//     })
//     return c.json(doc, 200)
// })

route.delete("/delete/:_id", async (c : Context)=>{

    try{
        const db : Db = mongo.getDb()
        const { _id } = c.req.param()
        const doc = await db.collection("cart").deleteOne({ _id : new ObjectId(_id)})
        return c.json(doc, 202)
    }catch(err){ 
        return c.json({
            message : "Error",
            err
        }, 500)
    }
})

route.delete("/delete_all", async (c : Context)=>{
    
    try{
        const db : Db = mongo.getDb()
        const doc = await db.collection("cart").deleteMany()
        return c.json(doc, 202)
    }catch(err){ 
        return c.json({
            message : "Error",
            err
        }, 500)
    }
})


export default route