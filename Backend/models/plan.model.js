const mongoose = require('mongoose');
/**
 * trainer
 * title
 * desc
 * price 
 * duration
 * content
 */
const planSchema = new mongoose.Schema({
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    duration:{
        type: String,
        required: true
    },
    content:{
        type: mongoose.Schema.Types.Mixed
    }
}, {timestamps: true});

module.exports = mongoose.model("Plan", planSchema);