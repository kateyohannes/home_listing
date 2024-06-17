
import { z } from "zod"

export const addressSchema = z.object({
    _id : z.string(),
    country : z.string(),
    city : z.string(),
    state : z.string(),
    street : z.string().optional(),
    zip : z.string().default("0000")
})

export const profileSchema = z.object({
    full_name : z.object({
        first_name : z.string(),
        middle_name : z.string(),
        last_name : z.string()
    }).optional(),
    sex : z.enum(["male", "female"]),
    bod : z.date().optional()
})

export type profile = z.infer<typeof profileSchema>
