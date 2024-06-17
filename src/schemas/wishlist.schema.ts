
import { ObjectId } from "mongodb"
import { z } from "zod"

export const wishlistSchema = z.object({
    item_id : z.string().transform(input=>{
        return new ObjectId(input)
    }),
    created_at : z.date().default(new Date())
})

export type wishlist = z.infer<typeof wishlistSchema>
