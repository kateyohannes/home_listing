import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import mongo from './config/mongo'
import { Db } from 'mongodb'

const app : Hono = new Hono()

app.use(cors())
app.use("*", logger())

app.get('/', async (c : Context) => {
    const db : Db = mongo.getDb();
    const data = await db.collection("user").find().toArray();
    return c.json(data, 200)
})

export default {
    port : Number(Bun.env.PORT) || 3000,
    fetch : app.fetch,
    mongo : mongo.connect().then((err)=>{
        if(err){
            console.log("Error Occured: ", err)
            return;
        }
        console.log("MongoDB is connected ...")
    })

}
