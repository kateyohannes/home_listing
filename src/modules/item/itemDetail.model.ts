
import { Schema, model } from "mongoose";

const ItemDetailSchema = new Schema({
    item : {
        type : Schema.Types.ObjectId,
        ref : "item",
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discount : {
        reason : String,
        percentage : Number,
        startedAt : Date,
        endAt : Date
    },
    quantity : {
        type : Number,
        required : true
    }
},{
    timestamps : true
});

module.exports = model('item_detail', ItemDetailSchema);
