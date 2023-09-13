
import { Schema, model } from "mongoose"

enum Role {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    MERCHANT = 'MERCHANT',
    BICKER = 'BICKER'
}

const AddressSchema = new Schema({
    geolocation : {
        lat : Number,
        log : Number
    },
    kebele : String,
    wereda : String,
    kifleketema : String,
    city : String,
})

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
    role : [{
        type : String,
        enum : Role,
        default : Role.CUSTOMER
    }],
    profile : {
        fullname : {
            firstname : String,
            middlename : String,
            lastname : String,
        },
        image : String,
        gender : {
            type : String,
            enum : ['MALE', 'FEMALE']        
        },
        bod : Date,
        address : [ AddressSchema ]
    },
    services: {
        type: Map,
        of: String
    }
},{
    timestamps : true
})

module.exports = model('user', UserSchema);

