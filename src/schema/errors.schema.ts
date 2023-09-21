
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const NotFound = z.object({
    statusCode : z.number(),
    message : z.string()
});

const NotImplemented = z.object({
    
})

const InternalServerError = z.object({
    statusCode : z.number(),  
    code: z.string(),
    error : z.string(),
    message : z.string(),
    time : z.string()
});

export const { schemas : errorSchema, $ref } = buildJsonSchemas({
    NotFound,
    InternalServerError
},{
    $id : "errorSchema"
})