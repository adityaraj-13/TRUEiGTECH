const plan_model = require('../models/plan.model');
const subscription_model = require('../models/subscription.model');
// create Plan
exports.createPlan = async (req,res) =>{
    try{
        const {title, description, price, duration, content } =  req.body;

        const newPlan = await plan_model.create({
            title,
            description,
            price,
            duration,
            content,
            trainer: req.userId
        });
        res.status(201).send({message: "Plan created successfully ", newPlan});
    }catch(err){
        res.status(500).send({message:"Error while creating plan", err});
    }
};
// get all Plan
exports.getAllPlans = async (req,res) =>{
    try{
        const plans = await plan_model.find().populate("trainer","name email").select("-content");
        res.status(200).send(plans);
    }catch(err){
        res.status(500).send({message:"Error fetching plans ", err});
    }
}
// get plan details
exports.getPlanDetail = async (req, res) =>{
    try{
        const planId = req.params.id;
        const plan = await plan_model.findById(planId).populate("trainer","name email");
        if(!plan){
            return res.status(404).send({message:"Plan not found"});

        }
        let hasAccess = false;
        if(req.userId){
            if(plan.trainer._id.toString() === req.userId){
                hasAccess = true;
            }
            else{
                const sub = await subscription_model.findOne({user: req.userId, plan:planId, isActive:true});
                if(sub){
                    hasAccess = true;
                }
            }

        }
        if(hasAccess){
            return res.status(200).send(plan);
        }
        else{
            return res.status(200).send({
                _id: plan._id,
                title: plan.title,
                description: plan.description,
                price: plan.price,
                duration: plan.duration,
                trainer: plan.trainer,
                isPreview: true
            });
        }
    }catch(err){
        res.status(500).send({message: "Error getting details",err});
    }
}
// update and delete plan
exports.updatePlan = async(req,res)=>{
    try{
        const plan = await plan_model.findById(req.params.id);
        if(!plan){
            return res.status(404).send({message:"Plan not found"});
        }
        if(plan.trainer.toString() !== req.userId.toString()){
            return res.status(401).send({message:"Unauthorized user"});
        }
        const updatedPlan = await plan_model.findByIdAndUpdate(req.params.id,req.body, {new:true});
        res.status(200).send(updatedPlan);
    }catch(err){
        res.status(500).send({message:"Error updating plan ",err});
    }
};

exports.deletePlan = async (req,res) =>{
    try{
        const plan = await plan_model.findById(req.params.id);
        if(!plan){
            return res.status(404).send({message:"Plan not found"});
        }
        if(plan.trainer.toString() !== req.userId.toString()){
            return res.status(401).send({message: "Unauthorized user"});
        }
        await subscription_model.deleteMany({plan: req.params.id});
        await plan.deleteOne();
        res.status(200).send({message: "Plane deleted successfully"});

    }catch(err){
        res.status(500).send({message:"Error deleting plan", err});
    }
};
