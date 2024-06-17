import { z } from "zod"
import { ObjectId } from "mongodb"

export const paymentSchema = z.object({
    _id : z.string().optional(),
    customer_id : z.string(),
    order_id : z.string(),
    gatway : z.enum(["tele_birr, cbe"]).optional(),
    type : z.enum(["credit", "debit", "cash"]),
    status : z.enum(["not_verified", "verified"]).default("not_verified"),
    verification : z.string().optional(),
    amount : z.number(),
    timestamp : z.date(),
})

export type paymeny = z.infer<typeof paymentSchema>
