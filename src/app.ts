
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/test_mongo").then(()=>{
    console.log("mongodb is on ...");
}).catch((err)=>{
    console.log(err);
});

export const server : FastifyInstance = fastify({
    logger : true
});

const port = 3000;
const secret = "sduf09adsufa0sd9fasd09fu";

async function main(){
    try{
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
