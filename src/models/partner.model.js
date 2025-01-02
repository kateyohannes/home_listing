const mongoose = require("mongoose")


const officeSchema = new mongoose.Schema({
    type: { type: String }, // main office
    address: {
        state: { type: String },
        country: { type: String },
        kifleketema: { type: String },
        kebele: { type: String },
        wereda: { type: String },
        houseNumber: { type: String }
    },
    building: {
        name: { type: String },
        floor: { type: String },
        officeNumber: { type: String }
    },
    location: {
        lat: { type: String },
        long: { type: String }
    },
    tel: { 
        code: { type: String, default: "+251" },
        number: { type: String } 
     },
    locationAlias: { type: String }
});

const siteSchema = new mongoose.Schema({
    progress: { type: String },
    progressDescription: { type: String },
    address: {
        region: { type: String },
        country: { type: String },
        kifleketema: { type: String },
        kebele: { type: String },
        wereda: { type: String },
    },
    location: {
        lat: { type: String },
        long: { type: String }
    }
});

const partnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String },
    description: { type: String },
    offices: [officeSchema],
    sites: [siteSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model("partner", partnerSchema)