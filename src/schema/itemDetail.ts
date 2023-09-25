
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const ItemDetailForm = z.object({
    item : z.string().optional(),
    price : z.number(),
    discount : z.object({
        reason : z.string(),
        percentage : z.number(),
        startedAt : z.string().datetime(),
        endAt : z.string().datetime()
    }).optional(),
    quantity : z.number()
});

const ItemDiscountForm = z.object({
    reason : z.string(),
    percentage : z.number(),
    startedAt : z.string().datetime(),
    endAt : z.string().datetime()
});

const ItemDetailUpdateForm = z.object({
    price : z.number(),
    quantity : z.number()
});

const ItemDetailResponse = z.object({
    _id : z.string(),
    item : z.any(),
    price : z.number(),
    discount : z.object({
        reason : z.string(),
        percentage : z.number(),
        startedAt : z.string().datetime(),
        endAt : z.string().datetime()
    }).optional(),
    quantity : z.number()
});

const ItemDetailResponses = z.array(ItemDetailResponse);

export type ItemDetailCreateForm = z.infer<typeof ItemDetailForm>;
export type ItemDetailUpdateForm = z.infer<typeof ItemDetailUpdateForm>;
export type ItemDiscountForm = z.infer<typeof ItemDiscountForm>

export const { schemas : itemDetailSchema, $ref } = buildJsonSchemas({
    ItemDetailForm,
    ItemDiscountForm,
    ItemDetailUpdateForm,
    ItemDetailResponse,
    ItemDetailResponses
},{
    $id : 'itemDetailSchema'
})