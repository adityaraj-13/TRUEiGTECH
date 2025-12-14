const mongoose = require('mongoose');
/**
 * name
 * email
 * passward
 * role
 * following
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: "user",
        enum: ["user","trainer"]
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
}, {timestamps:true}
);

module.exports = mongoose.model("User",userSchema);