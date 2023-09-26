
import multer from "fastify-multer";
import fastify, { FastifyInstance, FastifyRequest, FastifySchema } from "fastify";

import rdb from "./plugin/redis";
import mdb from "./plugin/mongoose";

import brandRoute from "./route/brand";

import { brandSchema } from "./schema/brand";
import { catagorySchema } from "./schema/catagory";
import { itemSchema } from "./schema/item";
import { itemDetailSchema } from "./schema/itemDetail";
import catagoryRoute from "./route/catagory";
import itemRoute from "./route/item";
import itemDeatilRoute from "./route/itemDetail";


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
server.register(mdb, { uri });
server.register(rdb);

declare module "fastify"{
    export interface FastifyInstance{
        multer : any
        db : any   
    }
    export interface FastifyRequest{
        file : any
    }
    export interface FastifySchema{
        file? : any
    }
}
async function main(){
    for(const schema of [...brandSchema, ...catagorySchema, ...itemSchema, ...itemDetailSchema]){
        server.addSchema(schema);
    }

    try{

        server.register(brandRoute, { prefix : "/brand" });
        server.register(catagoryRoute, { prefix : "/catagory"});
        server.register(itemRoute, { prefix : "/item" });
        server.register(itemDeatilRoute, { prefix : "/item_detail"})

        await server.listen({
            port,
            host : "0.0.0.0"
        })

    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

main();
