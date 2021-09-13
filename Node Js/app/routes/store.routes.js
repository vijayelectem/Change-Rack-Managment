module.exports = app => {
    const stores = require("../controllers/store.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Store
    router.post("/createStore", stores.createStore);
  
    // Retrieve all Stores
    router.get("/fetch", stores.findAllStores);
  
    // create new employee with storeId
    router.post("/employee", stores.createEmployee);

    // Retrieve a single store with id
    //router.get("/:id", stores.findStoreById);

     // Retrieve a single employee with id
     router.get("/employeeById/:id", stores.findEmployeeById);

     router.get("/storeById/:id", stores.storeById);

     router.get("/fetchEmployeeStoreById/:id", stores.fetchEmployeeStoreById);

     router.post("/:id", stores.update);

     router.delete("/:id", stores.delete);

     router.delete("/deleteEmployee/:id", stores.deleteEmployeeById);

     router.post("/updateEmployee/:id",stores.updateEmployee);
  
    app.use('/api/stores', router);
  };
