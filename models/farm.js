module.exports = function(sequelize, DataTypes) {
    var farm = sequelize.define("farm", {
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    homePhone: DataTypes.STRING,
    cellPhone: DataTypes.STRING,
    emergencyName: DataTypes.STRING,
    emergencyNumber: DataTypes.STRING,
    vetName: DataTypes.STRING,
    vetNumber: DataTypes.STRING,    
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
      }
    }
  );


  return farm;
};
