module.exports = app => {
    const store = require("../controllers/store.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Store
    router.post("/createStore", store.create);

    // Retrieve all Stores
    router.get("/fetchStoreById/:storeId", store.fetchStoreById);

    router.get("/fetchAllStoresByClientFK/:client_fk", store.fetchAllStoresByClientFK);

    // Update Store By Id
    router.put("/updateById/:storeId", store.update);

    // Delete Store By Id
    router.delete("/:storeId", store.delete);

    router.get("/locations", store.findStoreLocations);
      
    app.use('/api/store', router);
  };