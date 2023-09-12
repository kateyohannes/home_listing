
import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        min : 6,
        required : true
    },
    profile : {
        fullname : { 
            firstname : String, 
            lastname : String
        },
    },
    services: {
        type: Map,
        of: String
    }
},{
    timestamps : true
})

module.exports = model('user', UserSchema);

