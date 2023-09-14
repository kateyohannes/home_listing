
import { Schema, model } from "mongoose";


enum Status {
    Complete = 'Complete',
    Cancled = 'Complete',
    Inprogress = 'Inprogress',
    Delivered = 'Delivered'
}

const OrderDetailSchema = new Schema({
    item : {
        type : Schema.Types.ObjectId,
        ref : "item_detail",
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    unitPrice : { type : Number },
    totalPrice : { type : Number },
},{
    timestamps : true
})


const Address = new Schema({
    geolocation : {
        lat : Number,
        log : Number
    },
    kebele : String,
    wereda : String,
    kifleketema : String,
    city : String,
})

const OrderSchema = new Schema({    
    user : { 
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    // address : {
    //     type : Schema.Types.ObjectId,
    // },
    // newAddress : Address,
    order : [ OrderDetailSchema ],
    bickerPrice : { 
        type : Number, 
        required : true
    },
    // applyPromo : {
    //     type : Schema.Types.ObjectId, 
    //     ref : "promo"
    // },
    total : {
        type : String,
        required : true
    },
    orderStatus : {
        type : String,
        enum : Status,
        default : Status.Complete
    },
    receivedAt : {
        type : Date,
    }

});

module.exports = model('order', OrderSchema);
