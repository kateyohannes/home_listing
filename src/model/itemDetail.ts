
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

const ItemDetail = model('item_detail', ItemDetailSchema);
export default ItemDetail;
