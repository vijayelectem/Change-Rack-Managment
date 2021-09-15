module.exports = app => {
    const userPreference = require("../controllers/userPreference.controller.js");

    var router = require("express").Router();

    router.post("/createUserPreference", userPreference.createUserPreference);

    router.get("/fetchAllSelectedColumns/:templateId/:userFk", userPreference.fetchAllSelectedColumns);
    
    router.put("/:id", userPreference.updateSelectedColumns);

    app.use('/api/userPreference', router);
};
