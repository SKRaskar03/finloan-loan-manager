const Service = require("../models/service.model");

exports.getAllServices = (req, res) => {
    Service.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err.stack);
            res.status(500).send({
                message: err.message || "Some error ocurred",
            });
        });
};

exports.getServiceByType = (req, res) => {
    Service.findOne({ type: req.params.type }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Not found with type : " + req.params.type,
            });
        }
        res.send(data);
    });
};

const Request = require("../models/request.model");

exports.addRequest = (req, res) => {
    const servicetype = req.params.type;

    const request = new Request({
        mobile: req.body.mobile,
        code: req.body.code,
        email: req.body.email,
        address: req.body.address,
        msg: req.body.msg,
        type: servicetype,
        amt: req.body.amt,
    });
    request
        .save()
        .then((data) => {
            res.json({
                message: "Request made with service type: " + servicetype,
                status: 200,
            });
        })
        .catch((err) => {
            res.json({
                message:
                    err.message ||
                    "some error occured while requesting with service type as " +
                        servicetype,
            });
        });
};

exports.calculateEmi = (req, res) => {
    try {
        const servicetype = req.param.type;
        let chargepercent = 5;
        if (servicetype == "Home Loan") {
            chargepercent = 3;
        } else if (servicetype == "MI Loan") {
            chargepercent = 7;
        }

        const amt = req.body.amt;
        const tenure = req.body.tenure;

        const emi = amt / tenure + chargepercent * 0.01 * (amt / tenure);

        res.status(200).json({
            message: "Total emi per month: " + emi,
            status: "success",
        });
    } catch (err) {
        console.log(err.stack);
        res.json({
            message: err.message || "some error occured",
        });
    }
};
