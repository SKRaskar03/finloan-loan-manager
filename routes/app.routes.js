const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const memberController = require("../controllers/member.controller");
const requestController = require("../controllers/request.controller");

router.get("/allservices", serviceController.getAllServices);
router.get("/service/:type", serviceController.getServiceByType);
router.post("/service/:type/form", serviceController.addRequest);
router.post("/service/:type/calculate", serviceController.calculateEmi);

router.post("/member", memberController.addMember);
router.delete("/cancelmember", memberController.cancelMember);
router.put("/updatepassword", memberController.updatePassword);

router.put("/updaterequest", requestController.updateRequest);
router.delete("/deleterequest", requestController.deleteRequest);

router.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    (err.status = "fail"), (err.statusCode = 404);
    next(err);
});

router.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = router;
