// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the animals
  app.get("/api/animal", function(req, res) {

  });

  // POST route for saving a new animals. You can create an animal using the data on req.body
  app.post("/api/animal", function(req, res) {

  });

  // DELETE route for deleting animals. You can access the animals id in req.params.id
  app.delete("/api/animals/:id", function(req, res) {

  });

  // PUT route for updating animals. The updated animals will be available in req.body
  app.put("/api/animal", function(req, res) {

  });

  // GET route for getting all of the farms
  app.get("/api/farm", function(req, res) {

  });

  // POST route for saving a new farms. You can create a farm using the data on req.body
  app.post("/api/farm", function(req, res) {

  });

  // DELETE route for deleting farms. You can access the farm id in req.params.id
  app.delete("/api/farm/:id", function(req, res) {

  });

  // PUT route for updating farm. The updated farm will be available in req.body
  app.put("/api/farm", function(req, res) {

  });

    // GET route for getting all of the invites
  app.get("/api/invite", function(req, res) {

  });

  // POST route for saving a new invites. You can create an invite using the data on req.body
  app.post("/api/invite", function(req, res) {

  });

  // DELETE route for deleting invite. You can access the invite id in req.params.id
  app.delete("/api/invite/:id", function(req, res) {

  });

  // PUT route for updating invite. The updated invite will be available in req.body
  app.put("/api/invite", function(req, res) {

  });

    // GET route for getting all of the tasks
  app.get("/api/task", function(req, res) {

  });

  // POST route for saving a new tasks. You can create a tasks using the data on req.body
  app.post("/api/task", function(req, res) {

  });

  // DELETE route for deleting tasks. You can access the tasks id in req.params.id
  app.delete("/api/task/:id", function(req, res) {

  });

  // PUT route for updating task. The updated task will be available in req.body
  app.put("/api/task", function(req, res) {

  });
};
