
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

import mongoose from "mongoose";

import User from "../model/user";
import Item from "../model/item";
import Order from "../model/order"
import Brand from "../model/brand";
import Delivery from "../model/delivery";
import Catagory from "../model/catagory";
import ItemDetail from "../model/itemDetail";
import Subcatagory from "../model/subcatagory";

const models = {
	Item,
	User,
	Order,
	Brand,
	Catagory,
	Delivery,
	ItemDetail,
	Subcatagory	
};

async function mongoConnect(fastify : FastifyInstance, options : any){
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

const mdb = fp(mongoConnect);
export default mdb;

