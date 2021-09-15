const db = require("../models");
const UserPreference = db.userPreference;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.Sequelize = Sequelize;

exports.createUserPreference = (req, res) => {
    
    const userPreference = {
      selectedColumns: req.body.selectedColumns,
      templateId: req.body.templateId,
      userFk:req.body.userFk
    };

    // Save Rack in the database
    UserPreference.create(userPreference)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Rack."
            });
        });
};

