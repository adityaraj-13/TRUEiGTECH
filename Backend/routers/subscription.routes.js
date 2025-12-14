const subscriptionController = require("../controllers/subscription.controller");
const authJwt = require("../middleware/auth.mw");

module.exports = (app) =>{
    app.post("/fitplan/api/v1/subscriptions",[authJwt.verifyToken],subscriptionController.subscribe);
    app.get("/fitplan/api/v1/subscriptions",[authJwt.verifyToken],subscriptionController.getMySubscriptions);
};