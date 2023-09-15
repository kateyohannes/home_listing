
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

const Brand = model("brand", BrandSchema);
export default Brand