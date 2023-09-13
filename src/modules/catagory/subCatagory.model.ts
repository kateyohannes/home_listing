
import { Schema, model } from "mongoose";

const SubcatagorySchema = new Schema({
    catagory : {
        type : Schema.Types.ObjectId,
        ref : "catagory",
        required : true
    },
    subcatagoryName : {
        type : String,
        required : true
    }
});

module.exports = model("sub_catagory", SubcatagorySchema);
