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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    farmName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    homePhone: {
      type: DataTypes.STRING,
      allowNull: true
    },

    cellPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergencyName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergencyNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vetName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vetNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },    
    Notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
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
    },
    {
        timestamps: false,
  }
  );


  return farm;
};
