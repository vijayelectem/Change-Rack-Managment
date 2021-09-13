const client = require("../config/connection.js");
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())

exports.createIndex = (req, res) => {
  
  var formAttributesFiltered = filterAttributesBasedOnIsearchable(req.body.attributes);
  
    var myBody = '{"content":' + JSON.stringify(formAttributesFiltered)+ '}';
    var index = req.body.name;
    var type=req.body.name;
    var routing = req.body.username;
    var id=req.body.rackId;
    client.index({
      index: index,
      body: myBody,
      id:id,
      type:type,
      routing:routing
    },function(err,resp,status) {
        console.log(resp);
    });
  };

  function filterAttributesBasedOnIsearchable(formAttributes) {
    var resultantAttributes=[{}];
    let filteredObjects = formAttributes.filter(attributes =>attributes.isSearchable == 'true');
   for (let i = 0; i < filteredObjects.length; i++) {
   resultantAttributes[i]=filteredObjects[i].label+":"+filteredObjects[i].value;
   }
   return resultantAttributes;
  }
 
  
