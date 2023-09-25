
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { $ref, ItemCreateForm, ItemUpdateForm } from "../schema/item";

const itemRoute = async function(fastify : FastifyInstance){
    fastify.route({
        method : "GET",
        schema : {
            response : {
                200 : $ref("ItemResponses")
            }
        },
        url : "/",
        handler : async(request : FastifyRequest, reply : FastifyReply)=>{
            try{
                const { Item } = fastify.db.models;
                const data = await Item.find({});
                reply.code(200).send(data)
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "GET",
        schema : {
            response :{
                200 : $ref("ItemResponse")
            }
        },
        url : "/:id",
        handler: async(request : FastifyRequest<{
            Params : { id : String }
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            try{
                const { Item } = fastify.db.models;
                const data = await Item.findById(id);
                reply.code(200).send(data)
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "POST",
        schema : {
            response : {
                201 : $ref("ItemResponse")
            }
        },
        url : "/",
        handler : async(request : FastifyRequest<{
            Body : ItemCreateForm
        }>, reply : FastifyReply)=>{
            const body = request.body;
            try{
                const { Item } = fastify.db.models;
                const data = await Item.create(body);
                reply.code(201).send(data);
            }catch(err){    
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "PUT",
        schema : {
            response : {
                201 : $ref("ItemResponse")
            }
        },
        url : "/:id",
        handler : async(request : FastifyRequest<{
            Params : { id : String },
            Body : ItemUpdateForm
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            const body = request.body;
            try{
                const { Item } = fastify.db.models;
                const data = await Item.findByIdAndUpdate(id, { ...body });
                reply.code(201).send(data);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "DELETE",
        url : "/deleteAll",
        handler : async(request : FastifyRequest, reply : FastifyReply)=>{
            try{
                const { Item } = fastify.db.models;
                const data = await Item.deleteMany();
                reply.code(200).send(data);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    })
}

export default itemRoute;
