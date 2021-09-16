const db = require("../models");
const UserStore = db.userStore;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.Sequelize = Sequelize;

exports.addStaffToStore = (req, res) => {

    const userStore = {
      userFk:req.body.userFk,
      storeFk:req.body.storeFk,
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
    const staffToStore={staff:{store:{}}};
    staffToStore.staff=staff.dataValues;
    let query = `SELECT * FROM "userStores" where "userFk"=${userFk}`;
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(data => {
    staffToStore.staff.store=data;
      res.send(staffToStore);
    }).catch(err => {
        res.status(500).send({
          message: "Error retrieving locations"+err
        });
      });
  };



