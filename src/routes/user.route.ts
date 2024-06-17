
import mongo from "@config/mongo"
import { protect } from "@middleware/auth.middleware"
import { Hono, Context } from "hono"
import { Db, ObjectId } from "mongodb"

const route : Hono = new Hono()

route.get("/", async (c : Context)=>{
    try{
        const db : Db = mongo.getDb()
        const data = await db.collection("user").find({}).toArray()
        return c.json(data, 200)

    }catch(err){
        return c.json({
            message : "err",
            err
        }, 500)
    }
})

route.get("/:_id", protect, async (c : Context)=>{
    try{
        const db : Db = mongo.getDb()
        const { _id } = await c.req.param()
        const data = await db.collection("user").findOne({ _id : new ObjectId(_id)})        
        return c.json(data, 200)

    }catch(err){
        return c.json({
            message : "err",
            err
        }, 500)
    }
})

route.get("/me", async (c : Context)=>{
    try{
        const db : Db = mongo.getDb()
        
        
    }catch(err){
        return c.json({
            message : "err",
            err
        }, 500)
    }
})

route.delete("/delete_all", async (c : Context)=>{
    try{
        const db : Db = mongo.getDb()
        const data = await db.collection("user").deleteMany()
        return c.json(data, 200)
        
    }catch(err){
        return c.json({
            message : "err",
            err
        }, 500)
    }
})
export default route
