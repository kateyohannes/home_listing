
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const ItemDetailForm = z.object({
    item : z.string(),
    price : z.number(),
    discound : z.object({
        reason : z.string(),
        percentage : z.number(),
        startedAt : z.string().datetime(),
        endAt : z.string().datetime()
    }).optional(),
    quantity : z.number()
});

const ItemDiscountForm = z.object({
    discound : z.object({
        reason : z.string(),
        percentage : z.number(),
        startedAt : z.string().datetime(),
        endAt : z.string().datetime()
    })
});

const ItemDetailUpdateForm = z.object({
    price : z.number(),
    quantity : z.number()
});

const ItemDetailResponse = z.object({
    item : z.string(),
    price : z.number(),
    discound : z.object({
        reason : z.string(),
        percentage : z.number(),
        startedAt : z.string().datetime(),
        endAt : z.string().datetime()
    }).optional(),
    quantity : z.number()
});

const ItemDetailResponses = z.array(ItemDetailResponse);

export type ItemDetailCreateInput = z.infer<typeof ItemDetailForm>;
export type ItemDetailUpdateInput = z.infer<typeof ItemDetailUpdateForm>;

const { schemas : itemDetailSchema, $ref } = buildJsonSchemas({
    ItemDetailForm,
    ItemDiscountForm,
    ItemDetailUpdateForm,
    ItemDetailResponse,
    ItemDetailResponses
},{
    $id : 'itemDetailSchema'
})