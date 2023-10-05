import bcrypt from 'bcryptjs';
import fp from "fastify-plugin";
import fastifyAuth from '@fastify/auth';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';


export default fp(async (fastify : FastifyInstance, options : any)=> {

    fastify.register(fastifyAuth);
    fastify.decorate('asyncVerifyJWT', async(request : FastifyRequest, reply : FastifyReply)=>{
        try{
            if(!request.headers.authorization){
                throw new Error('No token!');
            }

            const token = request.headers.authorization.replace('Bearer ', '');
            const decode : any = fastify.jwt.verify(token); 

            const { User } = fastify.db.models;
            const user = await User.findOne({
                _id : decode!._id.toString(),
                'tokens.token' : token
            });
            
            if(!user){
                throw new Error('Auth failed!');
            }

            request.user = user;
            request.token = token;

        }catch(err){
            reply.code(401).send(err);
        }
    });
    
    fastify.decorate('asyncVerifyUsernameAndPassword', async(request : FastifyRequest<{
        Body : {
            username : string,
            password : string
        }
    }>, reply : FastifyReply)=>{
        const { username, password } = request.body;
        try{
            if(!request.body){
                throw new Error('Username and Password is requeired!')
            }
            const { User } = fastify.db.models;
            const user = await User.findOne({ username });
            
            if(!user){   
                throw new Error('Auth Failed: Username');
            }
            
            const isMatch = await bcrypt.compare(password, user!.password);
            console.log(request.body);
            console.log(isMatch);
            if(!isMatch){
                throw new Error('Auth Failed: Password');
            }
            request.user = user
        
        }catch(err){
            reply.code(401).send(err);
        }
    });
});
