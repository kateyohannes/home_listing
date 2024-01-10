// import { Jwt } from "hono/utils/jwt"
// import { AlgorithmTypes } from "hono/utils/jwt/types"

// const algorithm = {
//     algorithm : AlgorithmTypes.HS384,
// }

// export async function generateToken(data : {}){
//     return await Jwt.sign({
//         ...data,
//     }
//     ,Bun.env.JWT_SECRET
//     )
// }

// export async function verifyToken(token : string){
//     return await Jwt.verify(token, Bun.env.JWT_SECRET)
// }



// import * as Jwt from "hono/jwt";
// import { AlgorithmTypes } from "hono/utils/jwt/types";

// interface Data{
//     _id : string
//     username : string
//     password : string
//     role : string
// }

// const algorithm : AlgorithmTypes =  AlgorithmTypes.HS512

// export async function generateToken(data : Data){
//     const expiresIn = 1800;
//     const secret = Bun.env.JWT_SECRET;
    
//     return await Jwt.sign({ 
//         sub: "SESSION_ID",
//         jti : "TOKEN_ID",
//         iat : Math.floor(Date.now() /1000),
//         exp : Math.floor(Date.now() /1000) + expiresIn,
//         iss : "ISSUER",
//         aud : "AUDIENCE",
//         ...data

//     }, secret, algorithm );
// }



import * as Jwt from "hono/jwt";
import { AlgorithmTypes } from "hono/utils/jwt/types";

const algorithm : AlgorithmTypes =  AlgorithmTypes.HS512

export async function generateToken(data : {}){
    const secret = Bun.env.JWT_SECRET
    return await Jwt.sign(data, secret, algorithm);
}
