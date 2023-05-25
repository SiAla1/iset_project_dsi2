const UserV = require("../models/userVModel.js");

exports.findAll = (req, res) => {
    UserV.getAll([], (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users.",
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    //Create a Author
    const userV = new UserV(req.body);

    // Save Author in the database
    UserV.create(userV, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    UserV.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!",
//         });
//     }

//     console.log(req.body);

//     UserV.updateById(req.params.id, new UserV(req.body), (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found user with id ${req.params.id}.`,
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error updating user with id " + req.params.id,
//                 });
//             }
//         } else res.send(data);
//     });
// };

exports.delete = (req, res) => {
    UserV.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete user with id " + req.params.id,
                });
            }
        } else res.send({ message: `user was deleted successfully!` });
    });
};
