
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const SubcatagoryForm = z.object({
    catagory : z.string(),
    subcatagoryName : z.string()
});

const SubcatagoryResponse = z.object({
    catagory : z.string(),
    subcatagoryName : z.string()
});

const SubcatagoryResponses = z.array(SubcatagoryResponse);

export type SubcatagoryCreateInput = z.infer<typeof SubcatagoryForm>
export type SubcatagoryUpdateInput = z.infer<typeof SubcatagoryForm>

export const { schemas : subcatagorySchema, $ref } = buildJsonSchemas({
    SubcatagoryForm,
    SubcatagoryResponse,
    SubcatagoryResponses
},{
    $id : 'subcatagorySchema'
})
