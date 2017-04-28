module.exports = function(sequelize, DataTypes) {
  var animals = sequelize.define("animals", {
    animalType: {
      type: DataTypes.STRING,
      allowNull:false
    },
    animalName: DataTypes.STRING,
    animalBreed_Desc: DataTypes.STRING,
    location: DataTypes.STRING,
    AMFood: DataTypes.STRING,
    PMFood: DataTypes.STRING,
    Medication: DataTypes.STRING,
    Notes: DataTypes.STRING,

  },
    {
        classMethods: {
        associate: function(models) {
          animals.belongsTo(models.farm, {
            foreignKey: {
              allowNull: false
            }
          });
        },
//associate with task
        associate: function(models) {
          animals.hasMany(models.task, {
            onDelete: "cascade"
          });
        }        
      }
    }
  );

  return animals;
};
