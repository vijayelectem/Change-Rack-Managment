module.exports = app => {
    const form = require("../controllers/form.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Form             
    router.post("/", form.create);
  
    // Retrieve all Form
    router.get("/", form.findAll);

    router.get("/:prodId/:name", form.findOne);

    router.get("/fetchAllTemplates/", form.fetchAllTemplates);

    // Update a Form with id
    router.put("/:id/:name", form.update);
  
    // Delete a Form with id
    router.delete("/:id/:name", form.delete);
      
    app.use('/api/form', router);
  };
  