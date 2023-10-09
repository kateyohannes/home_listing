import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { $ref, brandInput } from '../schema/brand';

const brandRoute = async (fastify : FastifyInstance)=>{
    fastify.route({
        method : 'GET',
        schema : {
            response : {
                200 : $ref('brandResponses')
            }
        },
        url : '/',
        handler : async(request : FastifyRequest, reply : FastifyReply)=>{
            const { Brand } = fastify.db.models;
            const data = await Brand.find({});
            return reply.code(200).send(data);
        }
    });
    
    fastify.route({
        method : 'GET',
        schema : {
            response : {
                200 : $ref('brandResponse')
            }
        },
        url : '/:id',
        handler : async(request : FastifyRequest<{
            Params : { id : string }
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            const { Brand } = fastify.db.models;
            const data = await Brand.findById(id);
            return reply.code(200).send(data)
        }
    });

    fastify.route({
        method : 'POST',
        schema : {
            body : $ref('brandForm'),
            
            response : {
                201 : $ref('brandResponse')
            }
        },
        preHandler : fastify.multer.parser.single('logo'),
        url : '/',
        handler : async(request : FastifyRequest<{
            Body : brandInput
        }>, reply : FastifyReply)=>{
            const body = request.body;
            const { Brand } = fastify.db.models;
            const data = new Brand({
                brandName : body.brandName,
                brandLogo : { 
                    filename : request.file.filename,
                    originalname : request.file.originalname,
                    mimetype : request.file.mimetype,
                    url : request.file.path,
                    size : request.file.size
                }
            });
            await data.save();
            return reply.code(201).send(data);
        }
    });

    fastify.route({
        method : 'PUT',
        schema : {
            body : $ref('brandForm'),
            response : {
                202 : $ref('brandResponse')
            }
        },
        url : '/:id',
        handler : async(request : FastifyRequest<{
            Body : brandInput,
            Params : { id : string }
        }>, reply : FastifyReply)=>{
            const body = request.body;
            const { id } = request.params;
            const { Brand } = fastify.db.models;
            const data = await Brand.findByIdAndUpdate(id, { ...body });
            return reply.code(202).send(data);
        }
    });

    fastify.route({
        method : 'DELETE',
        url : '/:id',
        handler : async(request : FastifyRequest<{
            Params : { id : string }
        }>, reply : FastifyReply)=>{
            const { id } = request.params;
            const { Brand } = fastify.db.models;
            const data = await Brand.findByIdAndDelete(id);
            return reply.code(200).send(data);
        }
    });
}

export default brandRoute;
