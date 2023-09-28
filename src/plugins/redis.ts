
import fp from "fastify-plugin";
import { createClient } from "redis";
import { FastifyInstance } from "fastify";

export default fp(async (fastify : FastifyInstance, options : any)=>{    
    const client = createClient();
    client.on("connect", ()=>{
        fastify.log.info({ actor : "Redis" }, "connected");
    })
    client.on("error", (err)=>{
        fastify.log.error({ actor : "Redis" }, err);
    });
    
    await client.connect();
    
    fastify.decorate("redis", client);
});
