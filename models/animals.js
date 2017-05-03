module.exports = function(sequelize, DataTypes) {
  var animals = sequelize.define("animals", {
    animalType: {
      type: DataTypes.STRING,
      allowNull:false
    },
    animalName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    animalBreed_Desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    AMFood: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PMFood: {
      type: DataTypes.STRING,
      allowNull: true
    },
    AMMeds: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PMMeds: {
      type: DataTypes.STRING,
      allowNull: true
    },    
    AMNotes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PMNotes: {
      type: DataTypes.STRING,
      allowNull: true
    },  
    //timestamps: false,

  },
    {
        classMethods: {
          //associate with task
        associate: function(models) {
          animals.hasMany(models.task, {
            onDelete: "cascade"
          });
        },
        associate: function(models) {
          animals.belongsTo(models.farm, {
            foreignKey: {
              allowNull: false
            }
          });
        }
       
      }
    }
  );

  return animals;
};

