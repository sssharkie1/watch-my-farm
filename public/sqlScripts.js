var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt"); 

//list of animals associated with farm
var animalList = function() { 
  connection.query('SELECT * FROM `animals` ', function(err, res) {
    console.log("animals:");
    for (var i=0; i<res.length; i++) {
      console.log("Animal Name: " + res[i].animalName + " |  Animal Breed/color: " + res[i].animalBreed_Desc 
      + " | Location: " + res[i].location + " | AM Food: " + res[i].AMFood + " | PM Food: " 
      + res[i].PMFood + " | Medication: " + res[i].Medication + " | Notes: " + res[i].Notes);
    }
      console.log("-----------------------------------");
    custSelect();
  });  
};
animalList();

//WHERE `farmID` = "' + farmID + '"