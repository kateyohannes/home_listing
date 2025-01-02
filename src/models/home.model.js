const mongoose = require("mongoose")

const homeSchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "partner"
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    measurement: { type: String },
    floor: { type: String },
    room: {
        type: { type: String }, // shop, house
        numberOfRoom: { type: Number },
        salon: { type: Number },
        bedRoom: { type: Number },
        bathRoom: { type: Number },
        kitchin: { type: Number },
        store: { type: Number },
        extraRoom: { type: Number }
    },
    swimmingPool: { 
        isAvailable: { type: Boolean },
        isShared: { type: Boolean }    
    },
    carParking: {
        isAvailable: { type: Boolean },
        isShared: { type: Boolean }
    },
    lift: {
        isAvailable: { type: Boolean },
        isShared: { type: Boolean }
    },
    generator: { 
        isAvailable: { type: Boolean },
        isShared: { type: Boolean }
    },
    // yegara_metekemiya
    additionalInformation: { type: String },
    price: { 
        amount: { type: String },
        currency: { type: String, default: "ETB" }
    },
    isAvailable: { type: Boolean, default: true },
    isPublic: { type: Boolean, default: false },
},{
    timestamps: true
});

module.exports = mongoose.model("home", homeSchema);
