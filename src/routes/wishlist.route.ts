
// import { Context, Hono } from "hono"
// import mongo from "@config/mongo"
// import { Db, ObjectId } from "mongodb"
// import { protect } from "@middleware/auth.middleware"

// const route : Hono = new Hono()

// route.put("/add", protect, async(c : Context)=>{
//     try{
//         const db : Db = mongo.getDb()
//         const { _id } = c.get("user")
//         const body = c.req.json()
//         const data = await db.collection("user").updateOne(
//             { _id : new ObjectId(_id)},
//             { $push : { wishlist : body }}            
//         )

//         return c.json(data, 201)
//     }catch(err){
//         return c.json({
//             message : "err",
//             err
//         }, 500)
//     }
// })

// route.put("/remove", async(c : Context)=>{
//     try{
//         const db : Db = mongo.getDb()
//         const body = c.req.json()
//         const data = await db.collection("user").updateOne(
//             { username : ""},
//             { $pull : { wishlist : body }}            
//         )

//         return c.json(data, 204)
//     }catch(err){
//         return c.json({
//             message : "err",
//             err
//         }, 500)
//     }
// })

// export default route
