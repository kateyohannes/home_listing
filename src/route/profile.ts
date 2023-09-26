

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const profileRoute = async function(fastify : FastifyInstance){
    // login required
    // get profile
    fastify.route({
        method : "GET",
        url : "/",
        handler : async (request : FastifyRequest, reply : FastifyReply)=>{
            try{
                const { User } = fastify.db.models;
                const data = await User.findById(request.id);
                reply.code(200).send(data);
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    // create & update profile
    fastify.route({
        method : "PUT",
        url : "/",
        handler : async(request : FastifyRequest, reply : FastifyReply)=>{
            const body = request.body;
            try{
                const { User } = fastify.db.models;
                const doc = await User.findById(request.id);
                doc.profile = body;
                await doc.save();
                reply.code(200).send({
                    message : "Profile added!"
                })            
            }catch(err){
                reply.code(500).send(err)
            }
        }
    });


    // add address
    fastify.route({
        method : "POST",
        url : "/address",
        handler : async(request : FastifyRequest, reply : FastifyReply)=>{
            const body = request.body;
            try{
                const { User } = fastify.db.models;
                const doc = await User.findById(request.id);
                await doc.address.push(body);
                await doc.markModified('address'); 
                await doc.save();
                reply.code(200).send({
                    message : "Address added!"
                });
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });

    // update address
    // fastify.route({
    //     method : "PUT",
    //     url : "/address/:id",
    //     handler : async(request : FastifyRequest<{
    //         Params : { id : String }
    //     }>, reply : FastifyReply)=>{
    //         const body = request.body;
    //         const { id } = request.params;
    //         try{
    //             const { User } = fastify.db.models;
    //             const doc = await User.findById(request.id);
    //             await doc.address(id) = body;
    //             await doc.markModified('address'); 
    //             await doc.save();
    //             reply.code(200).send({
    //                 message : "Address updated"
    //             })
    //         }catch(err){
    //             reply.code(500).send(err);
    //         }
    //     }
    // });

    // delete address
    fastify.route({
        method : "DELETE",
        url : "/address/:id",
        handler : async(request : FastifyRequest<{
            Params :{ id : String }
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            try{
                const { User } = fastify.db.models;
                const doc = await User.findById(request.id);
                await doc.address(id).remove();
                await doc.markModified('address'); 
                await doc.save();
                reply.code(200).send({
                    message : "Address deleted!"
                });
            }catch(err){
                reply.code(500).send(err);
            }
        }
    });
}

export default profileRoute;
