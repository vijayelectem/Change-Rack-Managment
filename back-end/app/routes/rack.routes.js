module.exports = app => {
    const racks = require("../controllers/rack.controller.js");

    var router = require("express").Router();

    // Create a new Rack
    router.post("/createRack/", racks.rackCreate);

    //Fetch Rack By Id
    router.get("/fetchRackById/:id", racks.fetchRackById);

    // Update a Rack with id
    router.put("/:id", racks.update);

    // Delete a Rack with id
    router.delete("/:id", racks.delete);

    //Seach Rack By rackName
    router.post("/searchRack", racks.searchRack);

    router.get("/:client_fk", racks.findAll);

    //Fetch Rack By ClientId
    router.get("/fetchRackByClientId/:name/:client_fk", racks.fetchRackByClientId);

    // Create a new Tray
    router.post("/tray", racks.trayCreate);

    // Retrieve a single Tray with id
    router.get("/tray/:id", racks.fetchTrayById);

    // Update a Tray with id
    router.put("/tray/:id", racks.updateTray);

    router.post("/tray/props/", racks.saveTrayLayout);

    // Delete a Tray with id
    router.delete("/tray/:id", racks.deleteTray);

     // Fetch a Tray prop By Rackid
    router.get("/traylisting/props/:rack_fk", racks.fetchTrayPropByRackId);

     // Fetch a Tray Data By Rackid
    router.get("/traylisting/data/:rack_fk", racks.fetchTrayDataByRackId);

    app.use('/api/rack', router);
};
