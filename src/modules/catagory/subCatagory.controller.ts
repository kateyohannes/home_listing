
import { FastifyRequest, FastifyReply } from "fastify";
import Catagory from "./catagory.model";
import SubCatagory from "./subCatagory.model";
import { SubcatagoryCreateInput, SubcatagoryUpdateInput } from "./subCatagory.schema";

export async function getSubcatagories(request : FastifyRequest, reply : FastifyReply){
    try{
        const data = await SubCatagory.find({}).populate("catagory");
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function getSubcatagory(request : FastifyRequest<{
    Params : { id : string }
}>, reply : FastifyReply){
    const { id } = request.params;
    try{
        const data = await SubCatagory.findById(id).populate("catagory");
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function createSubcatagory(request : FastifyRequest<{
    Body : SubcatagoryCreateInput
}>, reply : FastifyReply){
    const body = request.body;
    try{
        const data = await SubCatagory.create(body);
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}

export async function updateSubcatagory(request : FastifyRequest<{
    Body : SubcatagoryUpdateInput,
    Params : { id : string }
}>, reply : FastifyReply){
    const body = request.body;
    const { id } = request.params;
    try{
        const data = await SubCatagory.findByIdAndUpdate(id, { ...body });
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send(err);
    }
}