module.exports = function(sequelize, DataTypes) {
  var task = sequelize.define("task", {
    amTasks: DataTypes.STRING,
    pmTasks: DataTypes.STRING,
    complete: {
      type: DataTypes.BOOLEAN, 
      defaultValue: false},
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