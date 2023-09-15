
import { FastifyInstance } from "fastify";
import { $ref } from "./brand.schema";
import { 
    getBrand, 
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
} from "./brand.controller";

export async function brandRoute(serve: FastifyInstance){
    serve.get("/",{
        schema : {
            response : {
                200: $ref("brandResponses")
            }
        }
    }, getBrands);

    serve.get("/:id", {
        schema : {
            response : {
                200 : $ref("brandResponse") 
            }
        }
    }, getBrand);

    serve.post("/", {
        schema: {
            body : $ref("brandForm"),
            response : {
                201 : $ref("brandResponse")
            }
        }
    }, createBrand);

    serve.put("/:id", {
        schema: {
            body : $ref("brandForm"),
            response : {
                201 : $ref("brandResponse"),
            }
        }
    }, updateBrand);
   
    serve.delete("/:id", {
        schema: {
            body : $ref("brandForm"),
            response : {
                201 : $ref("brandResponse"),
            }
        }
    }, deleteBrand);
};
