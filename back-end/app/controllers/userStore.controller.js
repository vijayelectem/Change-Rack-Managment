const db = require("../models");
const UserStore = db.userStore;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.Sequelize = Sequelize;

exports.addStaffToStore = (req, res) => {

    const userStore = {
      userFk:req.body.userFk,
      storeFk:req.body.storeFk
    };

    // Save Rack in the database
    UserStore.create(userStore)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while Adding Staff To Store."
            });
        });
};



