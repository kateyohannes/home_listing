
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const deliveryCreateForm = z.object({
    user : z.string(),
    order: z.array(z.string()),
});

const deliveryUpdateForm = z.object({
    status : z.enum(['Cancled', 'Inprogress', 'Completed']),
    deliveredAt : z.string().datetime()
});

const deliveryResponse = z.object({
    user : z.string(),
    order: z.array(z.string()),
    status : z.string(),
    receivedAt : z.string().datetime(),
    deliveredAt : z.string().datetime().optional()
});

const deliveryResponses = z.array(deliveryResponse);

export type deliveryCreateInput = z.infer<typeof deliveryCreateForm>;
export type deliveryUpdateInput = z.infer<typeof deliveryUpdateForm>;
export const { schemas : deliverySchema, $ref } = buildJsonSchemas({
    deliveryCreateForm,
    deliveryUpdateForm,
    deliveryResponse,
    deliveryResponses
},{
    $id : "deliverySchema"
});
