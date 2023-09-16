
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

import mongoose from "mongoose";

const models = {};

const connectDB = async (fastify : FastifyInstance, options : any)=>{
	try{
		mongoose.connection.on('connected', ()=>{
			fastify.log.info({
				actor : 'MongoDB',
			}, 'connected');
		});

		mongoose.connection.on('disconnected', ()=>{
			fastify.log.error({
				actor : 'MongoDB',
			}, 'disconnected');
		});

		const db = await mongoose.connect(options.uri);
		fastify.decorate('db',{
			models
		});
	}catch(err){
		console.log(err)
	}
}

const db = fp(connectDB);
export default db;

