const db = require("../models");
const TrayItem = db.trayItems;
const Sequelize = require("sequelize");
const items = require("../controllers/item.controller.js");
const Op = db.Sequelize.Op;
const sequelize = require("../config/seq.config.js");
exports.trayItemCreate = (req, res) => {

  const trayItem = {
    quantity: req.body.quantity,
    rackId: req.body.rackId,
    trayId: req.body.trayId,
    formId: req.body.formId,
    tempId:req.body.tempId,
  };

  // Save TrayItem in the database
  TrayItem.create(trayItem)
    .then(data => {
      req.params.id = data.tempId;
      items.fetchTemplateById(req,res);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TrayItem."
      });
    });
};

exports.updateTrayItems = (req, res) => {
  const id = req.params.id;
  let query = `UPDATE "trayItems" SET quantity = '${req.body.quantity}' WHERE id = ${id} And "trayId" = ${req.body.trayId} And "tempId" = ${req.body.tempId} And "formId" = ${req.body.formId} `;
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

exports.findAllItems = (req, res) => {
  let query = `SELECT * FROM "trayItems" ORDER BY "updatedAt" DESC`;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message: "Error retrieving racks with client_fk=" + client_fk
      });
    });
};

exports.fetchItem = (req, res) => {
  const formId = req.params.formId;
  let query = `SELECT * FROM "trayItems" WHERE "formId" = ${formId} `;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving trayItems with formId=" + formId
      });
    });
};

exports.fetchTemplateAndTrayById = (req, res) => {
  const tempId = req.params.tempId;
  const trayId = req.params.trayId;
  let query = `SELECT * FROM "trayItems" WHERE "tempId" = ${tempId} And "trayId" = ${trayId} ORDER BY "updatedAt" DESC`;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving trayItems with tempId=" + tempId
      });
    });
};

exports.fetchTrayTemplateAndFormById = (req, res) => {
  const trayId = req.params.trayId;
  const tempId = req.params.tempId;
  const formId = req.params.formId;
  let query = `SELECT * FROM "trayItems" WHERE "trayId"= ${trayId} And "tempId" = ${tempId} And "formId" = ${formId} ORDER BY "updatedAt" DESC`;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving trayItems with tempId=" + tempId
      });
    });
};


