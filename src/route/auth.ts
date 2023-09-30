
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const authRoute = async function(fastify : FastifyInstance){
    fastify.route({
        method : "POST",
        preHandler : fastify.auth([
            fastify.asyncVerifyUsernameAndPassword
        ]),
        logLevel: 'warn',
        url : "/",        
        handler : async(request : FastifyRequest<{
            Body : {
                username : String,
                password : String
            }
        }>, reply : FastifyReply)=>{
            try{
                const { User } = fastify.db.models;
                let user = await User.findById(request.user._id);
                const payload = {
                    _id: user._id.toString(),
                    role: user.role
                };
                const token = fastify.jwt.sign(payload);

                fastify.redis.set(`${user._id}`, token)

                // user!.tokens = user!.tokens.concat({ token });
                // await user!.save();
                reply.send({
                    status: 'Authenticated',
                    user: request.user,
                    token
                })

            }catch(err){
                reply.code(500).send(err);
            }
        }
    })
}

export default authRoute;