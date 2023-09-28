import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";


export default fp(async (fastify : FastifyInstance, options : { secret : String })=>{
    fastify.register(require("@fastify/jwt"),{
        secret : options.secret
    });    
});