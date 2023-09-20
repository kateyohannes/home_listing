
import multer from "fastify-multer";
import fastifyCors from "@fastify/cors";
import fastify, { FastifyInstance, FastifyRequest } from "fastify";

import db from "./plugin/mongoose";
import brandRoute from "./router/Brand";
import { brandSchema } from "./schema/Brand";


export const server : FastifyInstance = fastify({
    logger : true
});

const uri = "mongodb://localhost/test_mongo";
const port = 3456;
const parser = multer({
    dest : "upload/"
});

server.decorate('multer', { parser });

server.register(multer.contentParser);
server.register(db, { uri });

async function main(){
    for(const schema of [...brandSchema]){
        server.addSchema(schema);
    }

    try{

        server.register(brandRoute, { prefix : "/brand" });

        await server.listen({
            port,
            host : "0.0.0.0"
        })

        console.log("Server is on ...");
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

main();
