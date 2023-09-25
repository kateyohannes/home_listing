import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { $ref, CatagoryInputForm, CatagoryUpdateForm } from "../schema/catagory";

const catagoryRoute = async (fastify : FastifyInstance)=>{
    fastify.route({
        method : "GET",
        schema : {
            response : {
                200 : $ref("CatagoryResponses")
            }
        },
        url : "/",
        handler : async (request: FastifyRequest, reply : FastifyReply)=>{
            try{
                const { Catagory } = fastify.db.models;
                const data = await Catagory.find({});
                reply.code(200).send(data)
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "GET",
        schema: {
            response : {
                200 : $ref("CatagoryResponse")
            }
        },
        url : "/:id",
        handler : async(request : FastifyRequest<{
            Params : { id : String}
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            try{
                const { Catagory } = fastify.db.models;
                const data = await Catagory.findById(id);
                reply.code(200).send(data);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "POST",
        schema : {
            response : {
                201 : $ref("CatagoryResponse")
            }
        },
        url : "/",
        handler : async(request : FastifyRequest<{
            Body : CatagoryInputForm
        }>, reply : FastifyReply)=>{
            const body = request.body;
            try{
                const { Catagory } = fastify.db.models;
                const data = await Catagory.create(body);
                reply.code(201).send(data);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "PUT",
        url : "/:id",
        handler : async(request : FastifyRequest<{
            Params : { id : String },
            Body : CatagoryUpdateForm
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            const  body = request.body;
            try{
                const { Catagory } = fastify.db.models;
                const data = await Catagory.findByIdAndUpdate(id, { ...body });
                reply.code(204);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    })
}

export default catagoryRoute;