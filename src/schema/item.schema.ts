import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const ItemForm = z.object({
    itemBrand : z.string(),
    itemName : z.string(),
    itemImage : z.string(),
    itemCatagory : z.string(),
    itemSubCatagory : z.string().optional(),
    usage : z.array(z.string())
})

const ItemResponse = z.object({
    itemBrand : z.string(),
    itemName : z.string(),
    itemImage : z.string(),
    itemCatagory : z.string(),
    itemSubCatagory : z.string().optional(),
    usage : z.array(z.string())
});

const ItemResponses = z.array(ItemResponse);

export type InputCreateForm = z.infer<typeof ItemForm>;
export type InputUpdateForm = z.infer<typeof ItemForm>;

export const { schemas : itemSchema, $ref } = buildJsonSchemas({
    ItemForm,
    ItemResponse,
    ItemResponses
},{
    $id : 'itemSchema'
});
