
import { Schema, model } from "mongoose";

const BrandSchema = new Schema({
    brandName : {
        type : String,
        required : true
    },
    brandLogo : {
        filename : {
            type : String,
            required : true
        },
        originalname : {
            type : String,
            requried : true
        },
        mimetype : {
            type : String,
            required:  true
        },
        url : {
            type : String,
            required : true
        },
        size : {
            type : Number,
            required : true
        }
    }
});

const Brand = model("brand", BrandSchema);
export default Brand