
import { z } from "zod"
import { Db ,ObjectId } from "mongodb"
import mongo from "@config/mongo"

export const orderDetailSchema = z.object({
    item_id : z.string().transform(input=>{
        return new ObjectId(input)
    }),
    items_detail : z.string().transform(input=>{
        return new ObjectId(input)
    }),
    quantity : z.number()
}).transform(async input=>{
    const db : Db = mongo.getDb()
    const data = await db.collection("item").findOne({
        $and : [
            { _id : input.item_id },
            { items_details : { $elemMatch : 
                {
                    _id : input.items_detail,
                    quantity : { 
                        $lte : input.quantity 
                    }
                }
            }}
        ]
    }) 

    if(!data){
        return false
    }

    return true
})


export const orderSchema = z.object({
    _id : z.string().optional(),
    order_by : z.string().transform(input=>{
        return new ObjectId(input)
    }),
    order_detail : z.array(orderDetailSchema).optional(),

    shipping_address : z.string().optional(),

    total_price : z.number().optional(),
    tracking_number : z.string().optional(),
    order_status : z.enum(["in_process", "confirmed", "on_its_way", "cancled", "deliverd"]).default("in_process"),
    
    timestamp : z.object({
        order_at : z.date(),
        confirmed_at : z.date(),
        cancled_at : z.date(),
        delivered_at : z.date()
    }).optional()
})

export type order = z.infer<typeof orderSchema>
