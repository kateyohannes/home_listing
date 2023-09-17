
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

import mongoose from "mongoose";

import Brand from "../model/Brand";
import Catagory from "../model/Catagory";
import Subcatagory from "../model/Subcatagory";

const models = {
	Brand,
	Catagory,
	Subcatagory	
};

const connectDB = async (fastify : FastifyInstance, options : any)=>{
	try{
		mongoose.connection.on('connected', ()=>{
			fastify.log.info({
				actor : 'MongogB',
			}, 'connected');
		});

		mongoose.connection.on('disconnected', ()=>{
			fastify.log.error({
				actor : 'MongogB',
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

