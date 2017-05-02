// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models
var db = require("../models");
var passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  //POST route for User signup
  //------------------------------------------------------------
  app.post('/api/signup', function(req,res){

    //get the form fields from req.body
    var useremail = req.body.useremail;
    var password = req.body.password;
    var farmname = req.body.farmname;

    //User Input validation
    req.checkBody('useremail', 'User Email is required').notEmpty();
    req.checkBody('useremail', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('farmname', 'Farm Name field is required').notEmpty();

    //Set variable errors to pass to hbs object
    var errors = req.validationErrors();

    //Render the Signup page if errors exist, also pass the errors
    if(errors){
      var hbsObject = {
      title: "Sign Up - WatchMyFarm",
      layout: "useraccount",
      errors: errors
      };

      res.render("signup", hbsObject);

    }else{
      console.log(req.body);

      db.farm.create({
        user_email: req.body.useremail,
        password: req.body.password,
        farmName: req.body.farmname,
        address: req.body.address,
        homePhone: req.body.homephone,
        cellPhone: req.body.cellphone,
        emergencyName: req.body.emergencyname,
        emergencyNumber: req.body.emergencyphonem
        vetName: req.body.vetname,
        vetNumber: req.body.vetphone

      }).then(function() {

        req.flash("success_msg", "You are registered and can now login");
        res.redirect("/login");

      }).catch(function(err) {
        res.json(err);
      });
    }

  });

  //POST route for User Login
  //------------------------------------------------------------
  app.post('/api/login',
    // The login form is submitted to the server via the POST method. Using authenticate() with the local strategy will handle the login request.
     passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
    
  );


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
