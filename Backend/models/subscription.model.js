const mongoose = require('mongoose');

/**
 * user
 * plan
 * active ? 
 */

const subscriptionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    plan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Subscription", subscriptionSchema);