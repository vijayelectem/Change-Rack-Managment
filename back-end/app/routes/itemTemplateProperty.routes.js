module.exports = app => {
    const itemTemplateProperty = require("../controllers/itemTemplateProperty.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", itemTemplateProperty.create);
  
    // Retrieve all Tutorials
    router.get("/", itemTemplateProperty.findAll);

    // Update a Tutorial with id
    router.put("/:id", itemTemplateProperty.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", itemTemplateProperty.delete);
      
    app.use('/api/itemProperties', router);
  };
  