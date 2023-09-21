
import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
    itemBrand : {
        type : Schema.Types.ObjectId,
        ref : "brand",
    },
    itemName : {
        type : String,
        required : true
    },
    itemImage : {
        type : String,
        required : true
    },
    itemCatagory : [{
        type : Schema.Types.ObjectId,
        ref : "catagory",
        required : true
    }],
    itemSubCatagory : [{
        type : Schema.Types.ObjectId,
        ref : "sub_catagory"
    }],
    usage : [ String ]
},{
    timestamps : true
})

const Item = model('item', ItemSchema);
export default Item;
