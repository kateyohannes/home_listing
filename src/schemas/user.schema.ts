import { z } from "zod";
import { profileSchema, addressSchema } from "@schema/profile.schema";


export const userSchema = z.object({
    username : z.string(),
    password : z.string(),
    email : z.string().optional(),
    phone_number : z.number().optional(),
    
    email_verified : z.boolean().default(false),
    phone_number_verified : z.boolean().default(false),

    profile : profileSchema.optional(),
    address : z.array(addressSchema).optional(),

    role : z.enum(["admin", "customer" ,"stuff"]).default("customer"),
})



export type user = z.infer<typeof userSchema>
