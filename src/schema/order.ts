import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const orderForm = z.object({
    user : z.string(),
    order : z.array(
        z.object({
            item : z.string(),
            quantity : z.string(),
            unitPrice : z.string().optional(),
            totalPrice : z.string().optional()
        }),
    ),
    total : z.number(),

});

const orderUpdateForm = z.object({
    orderStatus : z.enum(['Complete', 'Complete', 'Inprogress', 'Delivered']),
    recevideAt : z.string().datetime()
});

const orderResponse = z.object({
    user : z.string(),
    order : z.array(
        z.object({
            item : z.string(),
            quantity : z.string(),
            unitPrice : z.string().optional(),
            totalPrice : z.string().optional()
        }),
    ),
    total : z.number(),
    orderStatus : z.enum(['Complete', 'Complete', 'Inprogress', 'Delivered']),
    recevideAt : z.string().datetime().optional()
});

const orderResponses = z.array(orderResponse);

export type OrderCreateInput = z.infer<typeof orderForm>;
export type OrderUpdateInput = z.infer<typeof orderUpdateForm>;
export const { schemas : orderSchema, $ref} = buildJsonSchemas({
    orderForm,
    orderUpdateForm,
    orderResponse,
    orderResponses
},{
    $id : 'orderSchema'
})