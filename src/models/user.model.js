const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String , required: true },
    password: {
        salt: { type: String },
        currentPassword: { type: String }, 
        oldPassword: { type: String }
    },
    profile: {
        fullname:{
            firstname: { type: String },
            lastname: { type: String }
        },
        sex: { type: String },
        bod: { type: String },
        image: { type: String },
    },
    role: { type: String },
},{
    timestamps: true
});

module.exports = mongoose.model("user", userSchema);
