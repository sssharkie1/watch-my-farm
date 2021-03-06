// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
  // Route for home page
  //--------------------------------------------
  app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname + "/../public/about.html"));
  });

  // When user clicks on the Sign up link, render the signup handlebars and override the default layout to use useraccount.hbs
  //------------------------------------------------
	app.get("/signup", function(req,res){

		var hbsObject = {
			title: "Sign Up - Watch My Farm",
			layout: "useraccount"
		};

		res.render("signup", hbsObject);
	});

	// When user clicks on the Login link, render the login handlebars and override the default layout to use useraccount.hbs
	//---------------------------------------------
	app.get("/login", function(req,res){

		var hbsObject = {
			title: "Login - Watch My Farm",
			layout: "useraccount"
		};

		res.render("login", hbsObject);
	});


  	//User Logout
  	//--------------------------------------------
  	app.get('/logout', function(req, res){
    	req.logOut();
    	req.flash("success_msg", "You have successfully logged out");
    	res.redirect('/login');
  	});

  	// Route for Barnyard -add custom middleware to redirect user to login page if not already logged in
  	//--------------------------------------------
  	app.get("/barnyard",isAuthenticated, function(req, res) {
  		res.sendFile(path.join(__dirname + "/../public/barnyard.html"));
  	});

    // Route for FarmInfo -add custom middleware to redirect user to login page if not already logged in
    //--------------------------------------------
    app.get("/farminfo",isAuthenticated, function(req, res) {
      res.sendFile(path.join(__dirname + "/../public/farmInfo.html"));
    });

    // Route for Schedule page -add custom middleware to redirect user to login page if not already logged in
    //--------------------------------------------
    app.get("/schedule",isAuthenticated, function(req, res) {
      res.sendFile(path.join(__dirname + "/../public/schedule.html"));
    });


    // Route for Duties page
    //--------------------------------------------
    app.get("/duties",function(req, res) {
      console.log("In the html route for duties");
      res.sendFile(path.join(__dirname + "/../public/duties.html"));
    });

  	app.get("/", function(req, res) {
  		res.redirect('/login');
  	});

};
