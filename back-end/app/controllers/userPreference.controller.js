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

exports.fetchAllSelectedColumns = (req,res) => {
    const templateId = req.params.templateId;
    const userFk = req.params.userFk;
   let query = `SELECT * FROM "userPreferences" where "templateId" = ${templateId} AND "userFk" = ${userFk}`;
   sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
   .then(data => {
     res.send(data);
   }).catch(err => {
       res.status(500).send({
         message: "Error retrieving selected columns"+err
       });
     });
 };

