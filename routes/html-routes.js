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
  	app.get("/", function(req, res) {
  		res.sendFile(path.join(__dirname + "/../public/farmInfo.html"));
  	});

};
