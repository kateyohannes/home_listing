import { IncomingMessage, Server, ServerResponse } from "http"
import fastify, { FastifyRequest, FastifyResply } from "fastify"


declare module "fastify"{
    export interface FastifyInstance<
        HttpServer = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse
    >{
        multer : any
        db : any
        authenticate : any
    }
    export interface FastifyRequest{
        file : any
    }
}