const plan_controller = require('../controllers/plan.controller');
const authJwt = require('../middleware/auth.mw');

module.exports = (app) =>{
    app.post("/fitplan/api/v1/plans",[authJwt.verifyToken, authJwt.isTrainer],plan_controller.createPlan);
    app.get("/fitplan/api/v1/plans",plan_controller.getAllPlans);
    app.get("/fitplan/api/v1/plans/:id",[authJwt.verifyToken],plan_controller.getPlanDetail);
    app.put("/fitplan/api/v1/plans/:id",[authJwt.verifyToken,authJwt.isTrainer],plan_controller.updatePlan);
    app.delete("/fitplan/api/v1/plans/:id",[authJwt.verifyToken,authJwt.isTrainer],plan_controller.deletePlan);
};