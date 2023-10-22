import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin'

enum Role {
    ADMIN = 'Admin',
    CUSTOMER = 'Customer',
    MERCHANT = 'Merchant',
    BICKER = 'Bicker'
}

export default fp(async(fastify : FastifyInstance, options : any)=>{
    fastify.decorate('checkRole', (role: Role[])=> async(
        request : FastifyRequest,
        reply : FastifyReply,
        next: ()=> void
    )=>{
        
        const { User } = fastify.db.models;
        const userId = request.user.id;
        const user = await User.findOne({ _id : userId });

        if(!user){
            return reply.status(401).send({
                success : false,
                message : 'Unauthorized'
            });
        }

        const roleExists = role.some(role=> role === user.role);
        if(!roleExists){
            return reply.status(401).send({
                success : false,
                message : 'Unautorized'
            })
        }

        return next;
    })
});