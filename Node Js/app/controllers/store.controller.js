const db = require("../models");
const Store = db.stores;
const Employee = db.employees;


exports.createStore = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

    const store = {
      name: req.body.name,
      address: req.body.address,
      longitude:req.body.longitude,
      lattitude:req.body.lattitude
    };

    return Store.create(store)
      .then((store) => {
        console.log(">> Created store: " + JSON.stringify(store, null, 4));
        return store;
      })
      .catch((err) => {
        console.log(">> Error while creating store: ", err);
      });
  };

  exports.createEmployee = (req, res) => {

    const storeId=req.body.storeId;
    const employee={
      employeeName: req.body.employeeName,
      salary:req.body.salary,
      role:req.body.role,
      city:req.body.city,
      storeId: storeId,
    }
    return Employee.create(employee)
      .then((employee) => {
        console.log(">> Created employee: " + JSON.stringify(employee, null, 4));
        res.send(employee);
      })
      .catch((err) => {
        console.log(">> Error while creating employee: ", err);
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Store.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Store was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Store with id=${id}. Maybe Store was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Store with id=" + id
        });
      });
  };


  exports.findEmployeeById = (req, res) => {

    const id = req.params.id;

    return Employee.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(">> Error while finding Employee: ", err);
      });
  };

  exports.storeById = (req, res) => {

    const id = req.params.id;

    return Store.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(">> Error while finding Store: ", err);
      });
  };


  exports.fetchEmployeeStoreById = (req, res) => {

    const storeId = req.params.id;

    return Employee.findAll({
      where: { storeId: storeId }
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(">> Error while finding Employee by StoreId: ", err);
      });
  };


  // exports.findEmployeeById = (id) => {
  //   return Employee.findByPk(id, { include: ["store"] })
  //     .then((employee) => {
  //       return employee;
  //     })
  //     .catch((err) => {
  //       console.log(">> Error while finding employee: ", err);
  //     });
  // };



  // Retrieve all Tutorials from the database.
exports.findAllStores = (req, res) => {

  Store.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Store.destroy({
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

exports.deleteEmployeeById = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with id=" + id
      });
    });
};

exports.updateEmployee = (req, res) => {
  const id = req.params.id;

Employee.update(req.body, {
  where: { id: id }
})
  .then(num => {
    if (num == 1) {
      res.send({
        message: "employee was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating employee with id=" + id
    });
  });
};