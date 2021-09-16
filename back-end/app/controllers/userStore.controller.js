
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