
import { FastifyRequest, FastifyReply } from "fastify";
import Catagory from "./catagory.model";
import { CatagoryInputForm } from "./catagory.schema";

export async function getCatagories(request : FastifyRequest, reply : FastifyReply){
    try{
        const data = await Catagory.find({});
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function getCatagory(request : FastifyRequest<{
    Params : { id : string }
}>, reply : FastifyReply){
    const { id } = request.params
    try{
        const data = await Catagory.findById(id);
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function createCatagory(request : FastifyRequest<{
    Body : CatagoryInputForm
}>, reply : FastifyReply){
    const body = request.body;
    try{
        const data = await Catagory.create(body);
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function updateCatagory(request : FastifyRequest<{
    Body : CatagoryInputForm,
    Params : { id : string }
}>, reply : FastifyReply){
    const body = request.body;
    const { id } = request.params;

    try{
        const data = await Catagory.findByIdAndUpdate(id , { ...body });
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}
