
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { OrderCreateInput, OrderUpdateInput } from "../schema/order";
import { $ref } from "../schema/brand";

const orderRoute = async function(fastify : FastifyInstance){
    fastify.route({
        method : "GET",
        schema : {
            response : {
                200 : $ref("brandResponses")
            }
        },
        url : "/",
        handler : async (request : FastifyRequest, reply : FastifyReply)=>{
            try{
                const { Order } = fastify.db.models;
                const data = await Order.find({});
                reply.code(200).send(data);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "GET",
        schema : {
            response : {
                200 : $ref("brandResponse")
            }
        },
        url : "/:id",
        handler : async (request : FastifyRequest<{
            Params : { id : String }
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            try{
                const { Order } = fastify.db.models;
                const data = await Order.findById(id);
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
                200 : $ref("brandResponse")
            }
        },
        url : "/",
        handler : async(request : FastifyRequest<{
            Body : OrderCreateInput
        }>, reply : FastifyReply)=>{
            const body = request.body;
            try{
                const { Order } = fastify.db.models;
                const data = await Order.create(body);
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
                200 : $ref("brandResponse")
            }
        },
        url : "/:id",
        handler : async(request : FastifyRequest<{
            Body : OrderUpdateInput,
            Params : { id : String }
        }>, reply : FastifyReply)=>{
            const body = request.body;
            const { id } = request.params;
            try{
                const { Order } = fastify.db.models;
                const doc = await Order.findByIdAndUpate(id, { ...body });
                reply.code(204);
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
                const { Order } = fastify.db.models;
                const data = await Order.deleteMany();
                reply.code(200).send(data);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

}

export default orderRoute;