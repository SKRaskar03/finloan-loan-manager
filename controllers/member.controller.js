const Member = require("../models/member.model");

exports.addMember = (req, res) => {
    const { mobile, email, occupation, createPassword } = req.body;

    if (!mobile || !email || !occupation || !createPassword) {
        return res.status(400).send({ error: "All fields are required." });
    }

    const newMember = new Member({ mobile, email, occupation, createPassword });

    newMember
        .save()
        .then((savedMember) => {
            res.status(201).send({
                message: "Member registered successfully.",
                member: savedMember,
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: `An error occurred: ${err.message}`,
            });
        });
};

exports.cancelMember = (req, res) => {
    Member.findOneAndDelete({ mobile: req.body.mobile })
        .then((data) => {
            res.status(200).json({
                message: "Member Deleted Successfully!",
                status: "Success",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message ||
                    "Some error occurred while deleting the member",
            });
        });
};

exports.updatePassword = (req, res) => {
    Member.findOneAndUpdate(
        { mobile: req.body.mobile },
        { createPassword: req.body.password },
        {
            new: true,
            runValidators: true,
        }
    )
        .then((data) => {
            res.status(200).json({
                message: "User Password Updated Successfully!",
                status: "Success",
            });
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message ||
                    "Some error occurred while updating the password",
            });
        });
};
