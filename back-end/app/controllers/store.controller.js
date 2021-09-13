const db = require("../models");
const Stores = db.stores;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.Sequelize = Sequelize;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.storeName) {
    res.status(400).send({
      message: "Body cannot be empty!"
    });
    return;
  }

  // Create a Tutorial
  const store = {
    storeName: req.body.storeName,
    location: req.body.location,
    client_fk: req.body.client_fk,
  };

  // Save Tutorial in the database
  Stores.create(store)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stores."
      });
    });
};

exports.fetchStoreById = (req, res) => {
  const storeId = req.params.storeId;

  Stores.findByPk(storeId)
      .then(data => {
          res.send(data);
          console.log(data);
      })
      .catch(err => {
          res.status(500).send({
              message: "Error retrieving Store with storeId=" + storeId
          });
      });
};


exports.update = (req, res) => {
    const storeId = req.params.storeId;
  
    Stores.update(req.body, {
      where: { storeId: storeId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Store was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Store with id=${storeId}. Maybe Store was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Store with id=" + storeId
        });
      });
  };

  exports.delete = (req, res) => {
    const storeId = req.params.storeId;
  
    Stores.destroy({
      where: { storeId: storeId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Store was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Store with id=${storeId}. Maybe Store was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Store with id=" + storeId
        });
      });
  };

  
  //Fetch Store By ClientId
 exports.fetchAllStoresByClientFK = (req,res) => {
   const client_fk = req.params.client_fk;
  let query = `SELECT * FROM stores where client_fk=${client_fk}`;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message: "Error retrieving locations"+err
      });
    });
};

  

  //Fetch Rack By ClientId
 exports.findStoreLocations = (req,res) => {
  let query = `SELECT * FROM locations`;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message: "Error retrieving locations"+err
      });
    });
};