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

exports.updateSelectedColumns = (req, res) => {
    const id = req.params.id;
  let query = `UPDATE "userPreferences" SET "selectedColumns" = '${req.body.selectedColumns}' WHERE id = ${id} And "templateId" = ${req.body.templateId}`;
  sequelize.query(query).then(num => {
      if (num == 1) {
        res.send({
          message: "trayItems was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update trayItems with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Form with id=" + id
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

