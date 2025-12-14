const subscription_model = require("../models/subscription.model");
const plan_model = require("../models/plan.model");

exports.subscribe = async (req, res) =>{
    try{
        const {planId} = req.body;
        const userId = req.userId;

        const plan = await plan_model.findById(planId);
        if(!plan){
            return res.status(404).send({message: "Plan not found"});
        }
        const existingSub = await subscription_model.findOne({
            user: userId,
            plan: planId,
            isActive: true,

        });
        if(existingSub){
            return res.status(400).send({message:"You already subscribed"});
        }
        const newSubscription = await subscription_model.create({
            user: userId,
            plan: planId,
            isActive: true 
        });
        res.status(201).send({
            message:"subsription successful",
            subscriptionId: newSubscription._id
        });

    }catch(err){
        res.status(500).send({message:"Error "})
    }
};

exports.getMySubscriptions = async (req, res) => {
    try {
        const subs = await subscription_model.find({ user: req.userId })
            .populate("plan", "title price duration trainer");
        
        res.status(200).send(subs);
    } catch (err) {
        res.status(500).send({ message: "Error fetching subscriptions", error: err.message });
    }
};