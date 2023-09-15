import Brand from "./brand.model";
import { brandInput } from "./brand.schema";
import { FastifyRequest, FastifyReply } from "fastify";
 

export async function getBrands(request : FastifyRequest, reply: FastifyReply){
    try{
        const data = await Brand.find({});
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function getBrand(request: FastifyRequest<{
    Params : { id : string }
}>, reqply : FastifyReply){
    const { id } = request.params;
    try{
        const data = await Brand.findById(id);
        return reqply.status(200).send(data);
    }catch(err){
        return reqply.status(500).send(err)
    }
}

export async function createBrand(request : FastifyRequest<{
    Body : brandInput
}>, reply : FastifyReply){
    const body = request.body;
    try{
        const data = await Brand.create(body);
        return reply.status(201).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function updateBrand(request : FastifyRequest<{
    Body : brandInput,
    Params : { id : string }
}>, reply : FastifyReply){
    const body = request.body;
    const { id } = request.params
    try{
        const data = await Brand.findByIdAndUpdate(id, { ...body});
        return reply.status(204).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function deleteBrand(request: FastifyRequest<{
    Params : { id : string }
}>, reply : FastifyReply){
    const { id } = request.params;
    try{
        const data = await Brand.findByIdAndDelete(id);
        return reply.status(200).send(data)
    }catch(err){
        return reply.status(500).send(err);
    }
}