var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

//Use passport local strategy
passport.use(new LocalStrategy(

	//By default, LocalStrategy expects to find credentials in parameters named username , here we are changing defaults to use email
	{
		usernameField: "useremail"
	},
  	function(useremail, password, done) {
  		console.log(useremail + '|' + password);

    	db.farm.findOne({ 
    		where: {
    			user_email: useremail 
    		}
    	}).then(function(dbUser){
    		console.log(dbUser);
    		//if there is no user with the given email
    		if (!dbUser) {
        		return done(null, false, {
          		message: "Incorrect email."
       		 	});
      		}
      		// If there is a user with the given email, but the password the user gives us is incorrect
      		else if (!dbUser.validPassword(password)) {
        		return done(null, false, {
          		message: "Invalid password."
        		});
      		}

      		// If none of the above, return the user
      		return done(null, dbUser);
    	});
  	}
));

// In order to help keep authentication state across HTTP requests,
//Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
passport.serializeUser(function(user, done) {
  console.log("Inside serialize User-----")
  console.log(user);
  console.log("--------------");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  		db.User.findOne({ 
    		where: {
    			id: id 
    		}
    	}).then(function(dbUser){
        console.log("Inside deserialize User-----")
        console.log(dbUser);
        console.log("--------------");
    		done(null, dbUser);
    	});
});

// Exporting our configured passport
module.exports = passport;