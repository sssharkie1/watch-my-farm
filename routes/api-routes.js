// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models
var db = require("../models");
var passport = require("../config/passport");

// Moment js - for date manipulations
var moment = require('moment');

//Shortid - to generate token for magic link
var shortid = require('shortid');

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
  
//Site url
var siteURL = "http://localhost:8000/";

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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_email: req.body.useremail,
        password: req.body.password,
        farmName: req.body.farmname,
        address: req.body.address,
        homePhone: req.body.homephone,
        cellPhone: req.body.cellphone,
        emergencyName: req.body.emergencyname,
        emergencyNumber: req.body.emergencyphone,
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
     passport.authenticate('local', { successRedirect: '/barnyard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
    
  );

// ------------------------------ANIMALS---------------------------------------
  // GET route for getting all of the animals that belongs to a particular farm
  app.get("/api/animals",isAuthenticated, function(req, res) {

    console.log("UserID" + req.user.id);

    db.animals.findAll({
      where: {
        farmId: req.user.id
       }
     }).then(function(dbAnimals){

      res.json(dbAnimals);

    });

  });

  // GET route for retrieving a single animal's info
  app.get("/api/animals/:id",isAuthenticated, function(req, res) {

    console.log("UserID" + req.user.id);

    db.animals.findAll({
      where: {
        id: req.params.id
       }
     }).then(function(dbAnimals){

      res.json(dbAnimals);

    });

  });

  // POST route for saving a new animals. You can create an animal using the data on req.body
  app.post("/api/animals",isAuthenticated, function(req, res) {

    console.log(req.body);
    console.log(req.user.id);
    //User Input validation
    req.checkBody('animalType', 'Animal Type is required').notEmpty();

    //Set variable errors to pass to client in json response
    var errors = req.validationErrors();

    console.log("errors length", errors);
    //if no errors
    if(!errors){
      console.log("No errors");

      db.animals.create({
        animalType: req.body.animalType,
        animalName: req.body.animalName,
        animalBreed_Desc: req.body.animalBreed_Desc,
        location: req.body.location,
        AMFood: req.body.AMFood,
        PMFood: req.body.PMFood,
        AMMeds: req.body.AMMeds,
        PMMeds: req.body.PMMeds,
        AMNotes: req.body.AMNotes,
        PMNotes: req.body.PMNotes,
        farmId: req.user.id
      }).then(function(dbNewAnimal){
        console.log(dbNewAnimal);
      });

      res.json({valid: true, errors: errors});
    }else{
      console.log("there are errors");
      res.json({valid: false, errors: errors});
    }

  });

  // PUT route for updating animals. The updated animals will be available in req.body
  app.put("/api/animals", function(req, res) {

    db.animals.update(
      req.body,
      {
        where:{
          id: req.body.id
        } 
      }).then(function(dbAnimal){
        res.json(dbAnimal);
      });
    });

  // DELETE route for deleting animals. You can access the animals id in req.params.id
  // app.destroy("/api/animals/:id",isAuthenticated, function(req, res) {

  //   console.log("UserID" + req.user.id);

  //   db.animals.findAll({
  //     where: {
  //       id: req.params.id
  //      }
  //    }).then(function(dbAnimalsDestroy){

  //     res.json(dbAnimalsDestroy);

  //   });

  // });

// ------------------------------FARM---------------------------------------
  // GET route for getting farm Information corresponding to the Logged in user
  app.get("/api/farm",isAuthenticated, function(req, res) {

    console.log("UserID" + req.user.id);

    db.farm.findAll({
      where: {
        id: req.user.id
       }
     }).then(function(dbFarmInfo){

      res.json(dbFarmInfo);

    });

  });

  // PUT route for updating farm. The updated farm will be available in req.body
  app.put("/api/farm",isAuthenticated, function(req, res) {

    console.log("Inside put for farm info");
    console.log(req.user.id);
    console.log(req.body);

      db.farm.update(req.body,
      {
        where:{
          id: req.user.id
        } 
      }).then(function(dbFarm){
        res.json(dbFarm);
      });

  });

    // GET route for retrieving a single farm's info
  app.get("/api/farm/:id",isAuthenticated, function(req, res) {

    console.log("UserID" + req.user.id);

    db.farm.findAll({
      where: {
        id: req.params.id
       }
     }).then(function(dbFarm){

      res.json(dbFarm);

    });

  });

//DESTROY route for deleting a farm based on ID

  //app.destroy("/api/farm/:id",isAuthenticated, function(req, res) {

  //   console.log("UserID" + req.user.id);

  //   db.farm.findAll({
  //     where: {
  //       id: req.params.id
  //      }
  //    }).then(function(dbFarmDestroy){

  //     res.json(dbFarmDestroy);

  //   });

  // });
  
// ------------------------------INVITE---------------------------------------
    // GET route for getting all of the invites
  app.get("/api/invite",isAuthenticated, function(req, res) {

    console.log("UserID" + req.user.id);

    db.invite.findAll({
      where: {
        id: req.user.id
       }
     }).then(function(dbInviteInfo){

      res.json(dbInviteInfo);

    });

  });

  // POST route for saving a new invites. You can create an invite using the data on req.body
  app.post("/api/invite", isAuthenticated, function(req, res) {

    console.log(req.body);
    console.log(req.user.id);

    var errors = [];

    //Validate input dates
    if(!(moment(req.body.startDate, 'MM/DD/YYYY', true).isValid()) || !(moment(req.body.endDate, 'MM/DD/YYYY', true).isValid())){
        errors.push("Invalid date");
    }

    console.log("errors length", errors);
    //if no errors
    if(errors.length === 0){
      console.log("No errors");

      //Convert dates into format 'YYYY/MM/DD'
      var inStartDate = moment(req.body.startDate, 'MM/DD/YYYY').format('YYYY/MM/DD');
      var inEndDate = moment(req.body.endDate, 'MM/DD/YYYY').format('YYYY/MM/DD');
      var momentStartDate = moment(inStartDate, 'YYYY/MM/DD');
      var momentEndDate = moment(inEndDate, 'YYYY/MM/DD');

      console.log("Formatted dates, Start date: " + inStartDate + " " + inEndDate);

      var diffInDates = momentEndDate.diff(momentStartDate, 'days') + 1;
      console.log("Difference =" + diffInDates);

      //Generate a token using package shortid
      var token = shortid.generate();
      console.log("Gnemerated token: " + token);

      //Create magic link
      var magicLink = siteURL + "?farm=" + req.user.id +"&token=" + token;
      console.log("Magic Link: " + magicLink);

      //Loop through to write record in invite table for each day starting from startdate
      var currDate = momentStartDate;
      for(var i = 0; i<diffInDates; i++){
        console.log("Write record for Day: " + currDate.format('YYYY/MM/DD') + "startdate: " + inStartDate + "enddate: " + inEndDate);

        //Write to invites table
        db.invite.create({
          startDate: inStartDate,
          endDate: inEndDate,
          taskDate: currDate.format('YYYY/MM/DD'),
          magicalLink: magicLink,
          token: token,
          farmId: req.user.id
        }).then(function(dbNewPost){
          console.log(dbNewPost);
        });

        currDate.add(1, 'days');
      }

      res.json({valid: true, errors: errors});
    }else{
      console.log("there are errors");
      res.json({valid: false, errors: errors});
    }

  });

  // DELETE route for deleting invite. You can access the invite id in req.params.id
//DESTROY route for deleting a farm based on ID

  // app.destroy("/api/invite/:id",isAuthenticated, function(req, res) {

  //   console.log("UserID" + req.user.id);

  //   db.invite.findAll({
  //     where: {
  //       id: req.params.id
  //      }
  //    }).then(function(dbInviteDestroy){

  //     res.json(dbInviteDestroy);

  //   });

  // });

  // PUT route for updating invite. The updated invite will be available in req.body

    app.put("/api/invite",isAuthenticated, function(req, res) {

    console.log("Inside put for invite info");
    console.log(req.user.id);
    console.log(req.body);

      db.invite.update(req.body,
      {
        where:{
          id: req.user.id
        } 
      }).then(function(dbInvite){
        res.json(dbInvite);
      });
  });

// ------------------------------AMTASK---------------------------------------
    // GET route for getting all of the AM tasks
  app.get("/api/amTask",isAuthenticated, function(req, res) {

    console.log("UserID" + req.user.id);

    db.task.findAll({
      where: {
        id: req.user.id
       }
     }).then(function(dbAMTask){

      res.json(dbAMTask);

    });

  });

  // POST route for saving new AM tasks. You can create a task using the data on req.body
  // app.post("/api/amTask", isAuthenticated, function(req, res) {

  //   console.log(req.body);
  //   console.log(req.user.id);
    
  //   //Set variable errors to pass to client in json response
  //   var errors = req.validationErrors();

  //   console.log("errors length", errors);
  //   //if no errors
  //   if(!errors){
  //     console.log("No errors");

  //     db.task.create({
  //       amTasks: req.body.startDate,
  //       farmId: req.user.id
  //     }).then(function(dbNewAMTask){
  //       console.log(dbNewAMTask);
  //     });

  //     res.json({valid: true, errors: errors});
  //   }else{
  //     console.log("there are errors");
  //     res.json({valid: false, errors: errors});
  //   }

  // });

  // PUT route for updating AMTask. The updated task will be available in req.body

    app.put("/api/amTask",isAuthenticated, function(req, res) {

    console.log("Inside put for AMTask info");
    console.log(req.user.id);
    console.log(req.body);

      db.task.update(req.body,
      {
        where:{
          id: req.user.id
        } 
      }).then(function(dbtask){
        res.json(dbtask);
      });
  });
// ------------------------------PMTASK---------------------------------------
    // GET route for getting all of the AM tasks
  app.get("/api/pmTask",isAuthenticated, function(req, res) {

    console.log("UserID" + req.user.id);

    db.task.findAll({
      where: {
        id: req.user.id
       }
     }).then(function(dbPMTask){

      res.json(dbPMTask);

    });

  });

  // POST route for saving new PM tasks. You can create a task using the data on req.body
  // app.post("/api/pmTask", isAuthenticated, function(req, res) {

  //   console.log(req.body);
  //   console.log(req.user.id);
    
  //   //Set variable errors to pass to client in json response
  //   var errors = req.validationErrors();

  //   console.log("errors length", errors);
  //   //if no errors
  //   if(!errors){
  //     console.log("No errors");

  //     db.task.create({
  //       pmTasks: req.body.startDate,
  //       farmId: req.user.id
  //     }).then(function(dbNewPMTask){
  //       console.log(dbNewPMTask);
  //     });

  //     res.json({valid: true, errors: errors});
  //   }else{
  //     console.log("there are errors");
  //     res.json({valid: false, errors: errors});
  //   }

  // });

  // PUT route for updating PMTask. The updated task will be available in req.body

  app.put("/api/pmTask",isAuthenticated, function(req, res) {

    console.log("Inside put for pmTask info");
    console.log(req.user.id);
    console.log(req.body);

      db.task.update(req.body,
      {
        where:{
          id: req.user.id
        } 
      }).then(function(dbtask){
        res.json(dbtask);
      });
  });
  }