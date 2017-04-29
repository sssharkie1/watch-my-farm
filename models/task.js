module.exports = function(sequelize, DataTypes) {
  var task = sequelize.define("task", {
    amTasks: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pmTasks: {
      type: DataTypes.STRING,
      allowNull: true
    },
    complete: {
      type: DataTypes.BOOLEAN, 
      defaultValue: false
    },
        //timestamps: false,  
  },
    {

      classMethods: {
        associate: function(models) {
          // A Farm (foreignKey) is required
          task.belongsTo(models.farm, {
            foreignKey: {
              allowNull: false
            }
          })
          },// An Animal (foreignKey) is required
        associate: function(models) {          
          task.belongsTo(models.animals, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );

  return task;
};