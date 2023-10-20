
import { Schema, model } from "mongoose"

enum Role {
    ADMIN = 'Admin',
    CUSTOMER = 'Customer',
    MERCHANT = 'Merchant',
    BICKER = 'Bicker'
}

const AddressSchema = new Schema({
    geolocation : {
        latitude : Number,
        longitude : Number
    },
    kebele : String,
    wereda : String,
    kifleketema : String,
    city : String,
})

const UserSchema = new Schema({
    username : { type : String },
    email : { type : String },
    password : { type : String },
    phoneNumber : { type : String },
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
            enum : ['Male', 'Female']        
        },
        bod : Date,
    },
    address : [ AddressSchema ],
    services: {
        type: Map,
        of: String
    }
},{
    timestamps : true
})

const User = model('user', UserSchema);
export default User;