
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

const SubCatagory = model("sub_catagory", SubcatagorySchema);
export default SubCatagory;
