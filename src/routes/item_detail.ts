
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { $ref, ItemDetailCreateForm, ItemDiscountForm } from "../schema/itemDetail";

const itemDeatilRoute = async function(fastify : FastifyInstance){
    fastify.route({
        method : "GET",
        schema : {
            response : {
                200 : $ref("ItemDetailResponses")
            }
        },
        url : "/",
        handler : async(request : FastifyRequest, reply : FastifyReply)=>{
            try{
                const { ItemDetail } = fastify.db.models;
                const data = await ItemDetail.find({}).populate("item");
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
                200 : $ref("ItemDetailResponse")
            }
        },
        url: "/:id",
        handler: async (request : FastifyRequest<{
            Params : { id : String }
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            try{
                const { ItemDetail } = fastify.db.models;
                const data = await ItemDetail.findById(id);
                reply.code(200).send(data);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    // using params
    fastify.route({
        method : "POST",
        schema : {
            response: {
                201 : $ref("ItemDetailResponse")
            }
        },
        url : "/:id",
        handler : async(request : FastifyRequest<{
            Params : { id: String },
            Body : ItemDetailCreateForm
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            const body = request.body;
            try{
                const { ItemDetail, Item } = fastify.db.models;
                // const item = await Item.findById(id);
                const doc = await ItemDetail.create({
                    item : id,
                    ...body
                });
                reply.code(200).send(doc);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    fastify.route({
        method : "PUT",
        url : "/discount/:id",
        handler : async(request : FastifyRequest<{
            Params : { id : String },
            Body : ItemDiscountForm
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            const body = request.body;
            try{
                const { ItemDetail } = fastify.db.models;
                const doc = await ItemDetail.findById(id);
                doc.discount = body;
                await doc.save();
                reply.code(201).send({
                    message : "Discount added!",
                    body
                });
            }catch(err){
                reply.code(500).send(err);
            }
        }
    })
    
}

export default itemDeatilRoute;