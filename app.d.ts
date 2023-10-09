
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

declare module "fastify"{
    export interface FastifyInstance{
        db : any   
        jwt : any
        multer : any
        redis : any
        asyncVerifyJWT : any
        asyncVerifyAdmin : any
        asyncVerifyUsernameAndPassword : any
    }
    export interface FastifyRequest{
        file : any
        user : any
        token : String
    }
    export interface FastifySchema{
        file? : any
    }
}