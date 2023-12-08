
import { z } from "zod";
import { Db, ObjectId } from "mongodb";
import mongo from "../config/mongo";

export const cartSchema = z.object({
    _id : z.string().transform(input=>{
        return new ObjectId(input)
    }).optional(),
    order_by :  z.string().transform(input=>{
        return new ObjectId(input)
    }),
    
    // order_by :  z.string().transform(input=>{
    //     return new ObjectId(input)
    // }).refine(async (input)=>{
    //     const db : Db = mongo.getDb()
    //     const data = await db.collection("user").findOne({ _id : input })
    //     if(data){
    //         return true
    //     }else{
    //         return false
    //     }
    // }),
    cart_items : z.array(
        z.object({
            item_id :  z.string().transform(input=>{
                return new ObjectId(input)
            }).refine(async (input)=>{
                const db : Db = mongo.getDb()
                const data = await db.collection("item").findOne({ _id : input })
                if(data){
                    return true
                }else{
                    return false
                }
            }),
            item_detail : z.string().transform(input=>{
                return new ObjectId(input)
            }),
            quantity : z.number().default(1),
            unit_price : z.number().optional(),
        })
    ),
    order_status : z.enum(["on_cart","ordered"]).default("on_cart")
})

export type cart = z.infer<typeof cartSchema>
