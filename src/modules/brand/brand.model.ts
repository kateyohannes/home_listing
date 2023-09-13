
import { Schema, model } from "mongoose";

const BrandSchema = new Schema({
    brandName : {
        type : String,
        required : true
    },
    brandLogo : {
        type : String
    }
});


module.exports = model("brand", BrandSchema);
