const user_model = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup

exports.signup = async(req, res) =>{
    try{
        request_body = req.body;
        const hashedPassword = bcrypt.hashSync(request_body.password, 7);

        const userObj = {
            name : request_body.name,
            email : request_body.email,
            password : hashedPassword,
            role : request_body.role
        }

        const user = await user_model.create(userObj);

        res.status(201).send({
            message: "user registered successfully",
            userId: user._id
        });

    }catch(err){
        res.status(500).send({message:"Error registering user ",err});
    }
};

// Signin
exports.signin = async(req, res) =>{
    try{
        const user = await user_model.findOne({email: req.body.email});
        if(!user){
            return res.status(404).send({message: "User not found."});
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({message: "Incorrect Password!"});
        }

        const token = jwt.sign({id : user.id, role: user.role},"ThisIsMySecret",{
            expiresIn: 86400
        });

        res.status(200).send({
            id : user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        })
    }catch(err){
        //console.log("Error while signing in User! ", err);
        res.status(500).send({message:"Internal Server Error", err});
    }
};