import { Context, Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import mongo from '@config/mongo';
import { auth, authSchema } from '@schema/upauth.schema';
import { generateToken  } from '@utils/token'
import { hashPassword, verifyPassword } from '@utils/hash';

const route : Hono = new Hono();

route.post('/signup', 
    zValidator('json', authSchema, (resutl, c: Context)=>{
        if(!resutl.success){
            c.status(400);
            throw new Error('Invalid Input!')
        }
    }), 
    async (c)=>{
        const db = mongo.getDb();
        const { username , password } : auth = await c.req.valid('json');
        const user = await db.collection('user').findOne({ username })
        if(user){
            c.status(400);
            throw new Error('username already taken');
        }

        const data = await db.collection('user').insertOne({
            username,
            password : await hashPassword(password),
            role : "client"
        });

        return c.json({
            data
        })
    }
)

route.post('/signin', 
    zValidator('json', authSchema, (result, c : Context )=>{
        if(!result.success){
            throw new Error('Invalid Input!')
        }
    }), 
    async (c)=>{
        const db = mongo.getDb();
        const { username, password } = await c.req.valid('json');
        const user = await db.collection('user').findOne({ username });
        if(!(user && await verifyPassword(password, user?.password))){
            c.status(401);
            throw new Error('Invalid credentials');
        }
        
        let token : any = user && await generateToken(user);
       
        return c.json({
            success : true,
            token
        })
    }
)

export default route;