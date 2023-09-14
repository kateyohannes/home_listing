
import { Schema, model } from "mongoose";

enum Status {
    Cancled = 'Cancled',
    Inprogress = 'Inprogress',
    Completed = 'Completed'
}

const DeliverySchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    order : [{
        type : Schema.Types.ObjectId,
        ref : "order",
        required : true
    }],
    status : {
        type : String,
        enum : Status,
        default : Status.Inprogress
    },
    receivedAt : {
        type : Date,
        default : Date.now
    },
    deliveredAt : {
        type : Date,
        required : true
    }
})

module.exports = model("delivery", DeliverySchema)