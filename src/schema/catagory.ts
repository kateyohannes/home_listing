
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const CatagoryForm = z.object({
    name : z.string(),
    image : z.string().optional(),
    description : z.string().optional()
});

const CatagoryResponse = z.object({
    name : z.string(),
    image : z.string().optional(),
    description : z.string().optional()
});

const CatagoryResponses = z.array(CatagoryResponse);

export type CatagoryInputForm = z.infer<typeof CatagoryForm>;
export type CatagoryUpdateForm = z.infer<typeof CatagoryForm>;

export const { schemas : catagorySchema, $ref } = buildJsonSchemas({
    CatagoryForm,
    CatagoryResponse,
    CatagoryResponses
},{
    $id : 'catagorySchema'
});

