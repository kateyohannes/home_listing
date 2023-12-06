
import { z } from "zod";
import { ObjectId } from "mongodb";

export const catagorySchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    name : z.string(),
    description : z.string().optional(),
    image : z.string().optional()
})

export type catagory = z.infer<typeof catagorySchema>
