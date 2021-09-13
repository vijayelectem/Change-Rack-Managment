const client = require('../config/connection.js');
const db = require("../models");
const ItemTemplate = db.itemtemplates;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const itemTemplate = {
      name: req.body.name,
      subscriberId: req.body.subscriberId,
    };
  
    // Save Tutorial in the database
    ItemTemplate.create(itemTemplate)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the users."
        });
      });
  };
  
  // Retrieve all Tutorials from the database.
  exports.findAll = (req, res) => {
    const title = req.query.first;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ItemTemplate.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };
  
  // Update a Tutorial by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    ItemTemplate.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item Template was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
  
  // Delete a Tutorial with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    ItemTemplate.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
  


  