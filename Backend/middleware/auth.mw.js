const jwt = require("jsonwebtoken");
const user_model = require("../models/user.model");
verifyToken = (req, res, next) =>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message : "No token found : UnAuthorized"
        });
    }
    jwt.verify(token, "ThisIsMySecret", async(err, decode)=>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized !"
            });
        }
        try{
            const user = await user_model.findById(decode.id);
            if(!user){
                return res.status(400).send({
                    message : "Unauthorized, this user for this token doesn't exist"
                });
            }
            req.user = user;
            req.userId = user._id;
            req.userRole = decode.role;
            next();

        }catch(error){
            return res.status(500).send({message: "DB error in middleware"});
        }
        
    });
};

isTrainer = (req, res, next) =>{
    if(req.userRole === "trainer"){
        next();
        return;
    }
    res.status(403).send({message:"Require Tainer Role"});
};

const authJwt = {
    verifyToken: verifyToken,
    isTrainer: isTrainer
};

module.exports = authJwt;