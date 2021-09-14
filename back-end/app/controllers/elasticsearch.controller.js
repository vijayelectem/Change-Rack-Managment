const client = require("../config/connection.js");
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())

exports.createIndex = (req, res) => {
  var formAttributesFiltered = JSON.stringify(Object.assign({}, filterAttributesBasedOnIsearchable(req.body.attributes)));
  const elasticSearchAttributes = {
    "attributes": formAttributesFiltered,
     "trayId": JSON.parse(req.body.trayId),
     "rackId": JSON.parse(req.body.rackId)
  };
  var myBody = JSON.stringify(elasticSearchAttributes);
  var index = req.body.name;
  var type = req.body.name;
  var routing = req.body.username;
  client.index({
    index: index,
    body: myBody,
    id: req.body.rackId,
    type: type,
    routing: routing
  }, function (err, resp, status) {
    console.log(resp);
  });
};

app.get("/living", (req, res) => {
  const searchText = req.query.searchString
  client.search({
      index: "living",
      body: {
          query: {
              match: {"name": searchText.trim()}
          }
      }
  })
  .then(response => {
      return res.json(response)
  })
  .catch(err => {
      return res.status(500).json({"message": "Error"})
  })
})



  function filterAttributesBasedOnIsearchable(formAttributes) {
    var resultantAttributes=[];
    let filteredObjects = formAttributes.filter(attributes =>attributes.isSearchable == 'true');
   for (let i = 0; i < filteredObjects.length; i++) {
   resultantAttributes[i]=filteredObjects[i].label+":"+filteredObjects[i].value;
   }
   return resultantAttributes;
  }
 
  
