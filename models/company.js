const mongoose = require("mongoose");
const DateOnly = require('mongoose-dateonly')(mongoose);
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    registrationNumber:  {
        type: Number,
        unique: true,
        required: true
    },
    
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Company', CompanySchema);

