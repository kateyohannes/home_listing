import { Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import mongo from '@config/mongo'

import { item, cart, brand, catagory, order } from '@route/index'

import { errorHandler, notFound } from '@middleware/error.middleware'

const app : Hono = new Hono()

app.use(cors())
app.use('*', logger())

app.route('/item', item)
app.route('/cart', cart)
app.route('/brand', brand)
app.route('/catagory', catagory)
app.route('/order', order)

app.onError((err : Error, c : Context)=>{
    const error = errorHandler(c)
    return error
})

app.notFound((c : Context)=>{
    const error = notFound(c)
    return error
})


export default {
    port : Number(Bun.env.PORT) || 3000,
    fetch : app.fetch,
    mongo : mongo.connect().then((err)=>{
        if(err){
            console.log('Error Occured: ', err)
            return;
        }
        console.log('MongoDB is connected ...')
    })

}
