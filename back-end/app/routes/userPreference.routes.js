module.exports = app => {
    const userPreference = require("../controllers/userPreference.controller.js");

    var router = require("express").Router();

    router.post("/createUserPreference", userPreference.createUserPreference);

    app.use('/api/userPreference', router);
};
