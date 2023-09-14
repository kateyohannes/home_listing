
import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const brandForm = z.object({
    brandName : z.string(),
    brandLogo : z.string().optional()
});

const brandResponse = z.object({
    brandName : z.string(),
    brandLogo : z.string().optional()
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

