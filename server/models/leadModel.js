const mongoose = require('mongoose')

const LeadSchema = mongoose.Schema({
    lprospid: {
        type: String,
        required: true,
        unique: true
    },
    lfname: {
        type: String
    },
    lphone: {
        type: String,
        required: true
    },
    lemail: {
        type: String
    },
    lcreatedon: {
        type: String,
        required: true
    },
    lstatus: {
        type: String,
        required: true
    },
    lsubcat: {
        type: String,
    },
    lcntry: {
        type: String
    },
    lstate: {
        type: String
    },
    lpincod: {
        type: String
    },
    lmedium: {
        type: String
    },
    lownrid: {
        type: String,
        required: true
    },
    lownrnam: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Lead', LeadSchema)