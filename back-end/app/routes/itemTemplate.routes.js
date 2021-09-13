module.exports = app => {
    const itemTemplate = require("../controllers/itemTemplate.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", itemTemplate.create);
  
    // Retrieve all Tutorials
    router.get("/", itemTemplate.findAll);

    // Update a Tutorial with id
   router.put("/:id", itemTemplate.update);
  
    // Delete a Tutorial with id
   router.delete("/:id", itemTemplate.delete);
      
    app.use('/api/itemTemplate', router);
  };
  