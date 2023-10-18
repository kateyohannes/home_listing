import path from "path";
import multer from "fastify-multer";
import fastifyAutoload from "@fastify/autoload";
import fastify, { FastifyInstance, FastifyRequest, FastifySchema } from "fastify";


import { brandSchema } from "./schema/brand";
import { catagorySchema } from "./schema/catagory";
import { itemSchema } from "./schema/item";
import { itemDetailSchema } from "./schema/itemDetail";

import brandRoute from "./routes/brand";
import catagoryRoute from "./routes/catagory";
import itemRoute from "./routes/item";
import itemDeatilRoute from "./routes/item_detail";


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

declare module "fastify"{
    export interface FastifyInstance{
        db : any   
        jwt : any
        redis : any
        multer : any
        checkRole : any,
        asyncVerifyJWT : any
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

async function main(){
    for(const schema of [...brandSchema, ...catagorySchema, ...itemSchema, ...itemDetailSchema]){
        server.addSchema(schema);
    }

    try{

        server.register(fastifyAutoload, {
            dir : path.join(__dirname, 'plugins'),
            options : {
                uri,
                secret : "a09sdufa09dsfas-d0fi-d0f"
            }
        });

        // server.register(fastifyAutoload,{
        //     dir : path.join(__dirname, 'routes'),
        //     options : {
        //         prefix : "/api/v1"
        //     } 
        // })

        server.register(brandRoute, { prefix : "/brand" });
        server.register(catagoryRoute, { prefix : "/catagory"});
        server.register(itemRoute, { prefix : "/item" });
        server.register(itemDeatilRoute, { prefix : "/item_detail"})

        await server.listen({
            port,
            host : "0.0.0.0"
        });

    }catch(err){
        server.log.warn(err);
        process.exit(1);
    }
}

main();
