
import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const brandForm = z.object({
    brandName : z.string(),
    brandLogo : z.object({
        filename : z.string(),
        originalname : z.string(),
        mimetype : z.string(),
        url : z.string(),
        size : z.number(),
    }).optional()
});

const brandResponse = z.object({
    _id : z.string(),
    brandName : z.string(),
    brandLogo : z.object({
        filename : z.string(),
        originalname : z.string(),
        mimetype : z.string(),
        url : z.string(),
        size : z.number(),
    }).optional()
});

const brandResponses = z.array(brandResponse);

export type brandInput = z.infer<typeof brandForm>
export const { schemas : brandSchema, $ref } = buildJsonSchemas({
    brandForm,
    brandResponse,
    brandResponses
}, {
    $id : "brandSchema"
});

