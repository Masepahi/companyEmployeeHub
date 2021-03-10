const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    familyName: {
        type: String,
        required: true,
        trim: true
    },
    nationalCode: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    sex: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('employees', employeesSchema);
