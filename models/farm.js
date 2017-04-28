// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var farm = sequelize.define("farm", {
    // The email cannot be null, and must be a proper email before creation
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }

    },
    //The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    homePhone: DataTypes.STRING,
    cellPhone: DataTypes.STRING,
    emergency: DataTypes.STRING,
    vetInfo: DataTypes.STRING,
    Notes: DataTypes.STRING,

  },
     {

      classMethods: {
        associate: function(models) {
          farm.hasMany(models.animals, {
            onDelete: "cascade"
          });
        },
//added invite
        associate: function(models) {
          farm.hasMany(models.invite, {
            onDelete: "cascade"
          });
        },

//added task
        associate: function(models) {
          farm.hasMany(models.task, {
            onDelete: "cascade"
          });
        }                
      },
      // Creating a custom method for our farm model. This will check if an unhashed password entered by
      // The user can be compared to the hashed password stored in our database
      instanceMethods: {
        validPassword: function(password){
          return bcrypt.compareSync(password, this.password);
        }

      },
      // Hooks are automatic methods that run during various phases of the farm Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      hooks: {
        beforeCreate: function(user, options, cb) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          cb(null, options);
        }
      }
    }
  );


  return farm;
};
