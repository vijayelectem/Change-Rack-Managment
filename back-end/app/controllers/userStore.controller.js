const db = require("../models");
const UserStore = db.userStore;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.Sequelize = Sequelize;

exports.addStaffToStore = (req, res) => {

    const userStore = {
      userFk:req.body.userFk,
      storeId:req.body.storeId,
      storeName:req.body.storeName
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

exports.fetchStoreByStaffId = (req, res) => {
    const userFk = req.params.userFk;
    const staff = req.body.staff;
    const staffToStore={staff:{stores:{}}};
    staffToStore.staff=staff.dataValues;
    let query = `SELECT * FROM "userStores" where "userFk"=${userFk}`;
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(data => {
    staffToStore.staff.stores=data;
      res.send(staffToStore);
    }).catch(err => {
        res.status(500).send({
          message: "Error retrieving locations"+err
        });
      });
  };

  exports.deleteStoreByStaffId = (req, res) => {
    const userFk = req.params.userFk;
  
    UserStore.destroy({
      where: { userFk: userFk }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Store was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Store with id=${userFk}. Maybe Store was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Store with id=" + userFk
        });
      });
  };



