
import { Hono, Context } from "hono";
import { Db, ObjectId } from "mongodb";
import mongo from "../config/mongo";
import { catagorySchema } from "../schemas/catagory.schema";
import { zValidator } from "@hono/zod-validator";

const route : Hono = new Hono();

route.get("/", async (c : Context)=>{
    const db : Db = mongo.getDb()
    const data = await db.collection("catagory").find().toArray()
    return c.json(data, 200)
})

route.get("/:_id", async (c : Context)=>{
    const db : Db = mongo.getDb()
    const { _id } = c.req.param()
    const data = await db.collection("catagory").findOne({ _id : new ObjectId(_id)})
    return c.json(data, 200)
})

route.post("/add", 
    zValidator("json", catagorySchema, (result, c : Context)=>{
        if(!result.success){
            throw new Error("Invalid Input!")
        }
    }), 
    async (c : any)=>{
        const db : Db = mongo.getDb()
        const body = await c.req.valid("json")
        const doc = await db.collection("catagory").insertOne(body)
        return c.json(doc, 201)
    }
)

route.put("/update/:_id", async (c : Context)=>{
    const db :Db = mongo.getDb()
    const { _id } = c.req.param()
    const body = await c.req.json()
    const doc : any = await db.collection("catagory").updateOne(
        { _id : new ObjectId(_id) }, 
        { $set : { ...body }
    })

    return c.json(doc, 202)    
})

route.delete("/delete/:_id", async (c : Context)=>{
    const db : Db = mongo.getDb()
    const { _id } = c.req.param()
    const doc = await db.collection("catagory").deleteOne({ _id : new ObjectId(_id)})
    return c.json(doc, 204)
})

route.delete("/delete_all", async (c : Context)=>{
    const db : Db = mongo.getDb()
    const doc = await db.collection("catagory").deleteMany()
    return c.json(doc, 204)
})

export default route;

