import { z } from "zod";
import { Db, ObjectId } from "mongodb";
import mongo from "../config/mongo";

export const itemSchema = z.object({
    _id : z.instanceof(ObjectId).optional().transform((input)=>{
        return new ObjectId(input)
    }),
    item_brand :  z.string().optional().transform((input)=>{
        return new ObjectId(input)
    }),
    item_catagory : z.array(
        z.string().refine(async (input)=>{
            const db : Db = mongo.getDb()
            const data = await db.collection("catagory").findOne({ _id : new ObjectId(input)})
            if(!data){
                return false
            }
            
            return true
        }),
    ),
    // item_catagory :  z.string().optional().transform((input)=>{
    //     return new ObjectId(input)
    // }),
    item_name : z.string(),
    item_details : z.array(
        z.object({
            _id : z.string().optional(),
            quantity : z.number(),
            primary_color : z.string(),
            secondary_color : z.string().optional(),
            size : z.string().optional(),
            unit : z.string().optional(),
            image : z.string().optional(),
            price_difference : z.number().default(0)
        })
    ),
    quantity : z.number().optional(),
    price : z.number(),
    features : z.array(z.string()).optional()
});

export type item = z.infer<typeof itemSchema>
