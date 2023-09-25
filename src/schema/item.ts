import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const ItemForm = z.object({
    itemBrand : z.string(),
    itemName : z.string(),
    itemImage : z.string().optional(),
    itemCatagory : z.array(z.string()),
    itemSubCatagory : z.array(z.string()),
    usage : z.array(z.string())
})

const ItemResponse = z.object({
    _id: z.string(),
    itemBrand : z.string(),
    itemName : z.string(),
    itemImage : z.string().optional(),
    itemCatagory : z.array(z.string()),
    itemSubCatagory : z.array(z.string()),
    usage : z.array(z.string())
}).optional();

const ItemResponses = z.array(ItemResponse);

export type ItemCreateForm = z.infer<typeof ItemForm>;
export type ItemUpdateForm = z.infer<typeof ItemForm>;

export const { schemas : itemSchema, $ref } = buildJsonSchemas({
    ItemForm,
    ItemResponse,
    ItemResponses
},{
    $id : 'itemSchema'
});
