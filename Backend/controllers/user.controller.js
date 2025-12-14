const user_model = require("../models/user.model");
const plan_model = require("../models/plan.model");

//Follow a Trainer
exports.followTrainer = async (req, res) => {
    try {
        const trainerId = req.params.trainerId;
        const userId = req.userId; 

        if (trainerId === userId) {
            return res.status(400).send({ message: "You cannot follow yourself." });
        }
        await user_model.findByIdAndUpdate(userId, {
            $addToSet: { following: trainerId }
        });

        res.status(200).send({ message: "You are now following this trainer." });
    } catch (err) {
        res.status(500).send({ message: "Error following trainer", error: err.message });
    }
};

//Unfollow a Trainer
exports.unfollowTrainer = async (req, res) => {
    try {
        const trainerId = req.params.trainerId;
        const userId = req.userId;
        await user_model.findByIdAndUpdate(userId, {
            $pull: { following: trainerId }
        });

        res.status(200).send({ message: "Unfollowed successfully." });
    } catch (err) {
        res.status(500).send({ message: "Error unfollowing trainer", error: err.message });
    }
};

exports.getFollowedTrainers = async (req, res) => {
    try {
        const user = await user_model.findById(req.userId).populate("following", "name email");
        res.status(200).send(user.following);
    } catch (err) {
        res.status(500).send({ message: "Error fetching following list", error: err.message });
    }
};

exports.getUserFeed = async (req, res) => {
    try {
        const user = await user_model.findById(req.userId);
        
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const followingList = user.following;
        const feedPlans = await plan_model.find({ 
            trainer: { $in: followingList } 
        })
        .populate("trainer", "name")
        .select("-content");

        res.status(200).send(feedPlans);

    } catch (err) {
        res.status(500).send({ message: "Error fetching feed", error: err.message });
    }
};
