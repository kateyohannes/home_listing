import { Jwt } from "hono/utils/jwt"

export async function generateToken(data : {}){
    return await Jwt.sign({
        ...data
    }
    ,Bun.env.JWT_SECRET)
}

export async function verifyToken(token : string){
    return await Jwt.verify(token, Bun.env.JWT_SECRET)
}
