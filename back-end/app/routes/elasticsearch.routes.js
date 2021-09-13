module.exports = app => {
    const items = require("../controllers/elasticsearch.controller.js");
  
    var router = require("express").Router();
  
    // Create a new index
    router.post("/", items.createIndex);

    app.use('/es/index', router);
  };