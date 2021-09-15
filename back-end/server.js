const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
global.__basedir = __dirname; 
// var corsOptions = {
//   origin: "http://localhost:8080"
// };

app.use(cors())
const initRoutes = require("./app/routes");
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Menu = db.menus;
const Plan = db.plans;
const USER = db.user;
const CLIENT = db.clients;
const Location=db.locations;

db.sequelize.sync();
// force: true will drop the table if it already exists
 db.sequelize.sync({force: false}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
   //initial();
 });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/index')(app);
require('./app/routes/rack.routes')(app);
//require('./app/routes/itemTemplate.routes')(app);
require('./app/routes/item.routes')(app);
require('./app/routes/itemTemplateProperty.routes')(app);
require('./app/routes/store.routes')(app);
require('./app/routes/trayItem.routes')(app);
require('./app/routes/menu.route')(app);
require('./app/routes/form.routes')(app);
require('./app/routes/profile.routes')(app);
require('./app/routes/file.routes')(app);
require('./app/routes/notification.routes')(app);
require('./app/routes/elasticsearch.routes')(app);
require('./app/routes/userPreference.routes')(app);
initRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  CLIENT.create({
    name: "SuperAdmin",
  });
  Role.create({
    name: "Admin"
  });
 
  Role.create({
    name: "SuperAdmin"
  });
 
  Role.create({
    name: "Staff"
  });

  Plan.create({
    name: "Personal",
    noOfUsers : 1,
    noOfRacks: 2,
    noOfItemTypes: 3,
    rate: 500,
    planImg:"http://localhost:8080/files/LLP.png"

  });

  Plan.create({
    name: "Company/Traders",
    noOfUsers : 5,
    noOfRacks: 10,
    noOfItemTypes: 10,
    rate: 1000,
    planImg:"http://localhost:8080/files/traders.jpg"
  });

  Plan.create({
    name: "Distributors",
    noOfUsers : 25,
    noOfRacks: 50,
    noOfItemTypes: 20,
    rate: 2000,
    planImg:"http://localhost:8080/files/Distrubutors.jpg"
  });

  Menu.create({
    label: "DashBoard",
    action: '/dashboard',
    roleId: 2
  });

  Menu.create({
    label: "Home",
    action: '/template',
    roleId: 2
  });

  Menu.create({
    label: "staff",
    action: '/staff',
    roleId: 2
  });
  
  Menu.create({
    label: "Racks",
    action: '/racks',
    roleId: 2
  });

  Menu.create({
    label: "Stores",
    action: '/stores',
    roleId: 2,
    planFk: 2
  });


  Location.create({
    locationName:"Koyambatur",
    city:"Chennai",
    pincode:600001
  });

  Location.create({
    locationName:"Malleshwaram",
    city:"Bangalore",
    pincode:560075
  });

  Location.create({
    locationName:"Telangana",
    city:"Hydrabad",
    pincode:500001
  });
    
  USER.create({
    username: "superadmin",
    email: "developers@electems.com",
    password: "59a318dc58e054cc975332365bf1e264",
    status:"ACTIVE",
    clientFk: 1,
    roleId: 2
  });
 
}