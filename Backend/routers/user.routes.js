const userController = require("../controllers/user.controller");
const authJwt = require("../middleware/auth.mw"); 

module.exports = (app) => {
    
    app.put("/fitplan/api/v1/users/follow/:trainerId",[authJwt.verifyToken],userController.followTrainer);
    app.put("/fitplan/api/v1/users/unfollow/:trainerId",[authJwt.verifyToken],userController.unfollowTrainer);
    app.get("/fitplan/api/v1/users/following",[authJwt.verifyToken],userController.getFollowedTrainers);
    app.get("/fitplan/api/v1/users/feed",[authJwt.verifyToken],userController.getUserFeed);
};