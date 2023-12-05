import { Context } from "hono";

export const errorHandler = (c : Context)=>{
    return c.json({
        success : false,
        message : c.error?.message,
        stack : c.error?.stack
    })
}

export const notFound = (c : Context)=>{
    return c.json({
        success : false,
        message : `Not Found - [${c.req.method}] ${c.req.url}`
    })

}
