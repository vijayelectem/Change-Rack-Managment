module.exports = app => {
    const trayItem = require("../controllers/trayItem.controller.js");
    
      var router = require("express").Router();
  
       router.post("/createTrayItem/", trayItem.trayItemCreate);

       router.put("/:id", trayItem.updateTrayItems);

       router.get("/findAllItems", trayItem.findAllItems);

       router.get("/fetchItem/:formId", trayItem.fetchItem);

       router.get("/fetchTemplateAndTrayById/:tempId/:trayId", trayItem.fetchTemplateAndTrayById);

       router.get("/fetchTrayTemplateAndFormById/:trayId/:tempId/:formId", trayItem.fetchTrayTemplateAndFormById);
     
       app.use('/api/trayItem', router);
    };  
    