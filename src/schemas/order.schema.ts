
import { z } from "zod"
import { Db ,ObjectId } from "mongodb"
import mongo from "@config/mongo"

export const orderSchema = z.object({
    _id : z.string().optional(),
    order_by : z.string(),
    cart_id : z.string(),
    // cart_id : z.string().transform(input=>{
    //     return new ObjectId(input)
    // }).refine(async (input)=>{
    //     const db : Db = mongo.getDb()
    //     const data = await db.collection("cart").findOne({ _id : input})
    //     if(data){
    //         return true
    //     }else{
    //         return false
    //     }
    // }),
    shipping_address : z.string().optional(),

    total_pricec : z.number().optional(),
    tracking_number : z.string().optional(),
    order_status : z.enum(["in_process", "confirmed", "on_its_way", "cancled", "deliverd"]).default("in_process"),
    order_at : z.date().optional(),
})

export type order = z.infer<typeof orderSchema>
