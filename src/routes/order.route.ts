import  { Hono, Context } from 'hono'
import mongo from '../config/mongo';
import { Db, ObjectId } from 'mongodb';
import { zValidator } from '@hono/zod-validator';
import { orderSchema } from '@schema/order.schema';

const route : Hono = new Hono();

route.get("/", async (c : Context)=>{
    const db : Db  = mongo.getDb()
    const data = await db.collection("order").find().toArray() 
    return c.json(data, 200)
})

route.get("/:_id", async (c : Context)=>{
    const db : Db = mongo.getDb()
    const { _id } = c.req.param()
    const data = await db.collection("order").find({ _id : new ObjectId(_id)}).toArray()
    return c.json(data, 200)
})

route.post("/add", 
    zValidator("json", orderSchema, (result, c: Context)=>{
        if(!result.success){
            throw new Error("Invalid Input!")
        }
    }), 
    async (c : any)=>{
    const db : Db = mongo.getDb()
    const body = await c.req.valid("json")

    const data : {} = await db.collection("order").insertOne(body)
    return c.json(data, 201)
})



export default route;