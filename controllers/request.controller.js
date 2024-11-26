const Request = require("../models/request.model");

exports.updateRequest = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "No Data to Update",
        });
    }
    const mobile = req.body.mobile || req.params.mobile;
    const filter = { mobile: mobile };
    Request.findOneAndUpdate({ mobile }, req.body, {
        new: true,
        runvalidators: true,
        useFindAndModify: false,
    })
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "No data with mobile: " + mobile,
                });
            } else {
                res.send({
                    message: " Updated successfully!!!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error while updating, " + err,
            });
        });
};

exports.deleteRequest = (req, res) => {
    Request.findOneAndDelete({ mobile: req.body.mobile })
        .then((data) => {
            res.status(200).json({
                message: "Request Deleted Successfully!",
                status: "Success",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message ||
                    "Some error occurred while deleting the request",
            });
        });
};
