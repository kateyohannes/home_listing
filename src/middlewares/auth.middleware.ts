
import { Context, Next } from "hono"
import { Jwt } from "hono/utils/jwt";
import { Db, ObjectId } from "mongodb";
import mongo from "../config/mongo";

export const protect = async (c : Context, next : Next)=>{
    let token;
    const db : Db = mongo.getDb()

    if(
        c.req.header('Authorization') && 
        c.req.header('Authorization')?.startsWith('Bearer')
    ){
        try{
            token = c.req.header('Authorization')?.replace(/Bearer\s+/i, '')
            if(!token){
                return c.json({
                    message : 'Not Authenticed'
                }, 401);
            }

            const { id } = await Jwt.verify(token, Bun.env.JWT_SECRET);
            const user = await db.collection("user").findOne({ _id : new ObjectId(id)});
            c.set('user', user);
            await next()          
        }catch(err){
            throw new Error('Invalid token!')

        }
    }

    if(!token){
        throw new Error('No token found!')
    }
}
