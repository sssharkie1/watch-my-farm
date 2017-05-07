module.exports = function(sequelize, DataTypes) {
  var task = sequelize.define("task", {
    food: {
      type: DataTypes.STRING,
      allowNull: true
    },
    meds: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timeOfDay: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('startDate')).format('MM-DD-YYYY');
      }       
      //allowNull: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('endDate')).format('MM-DD-YYYY');
      }      
      //allowNull: true
    },
    taskDate: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('taskDate')).format('MM-DD-YYYY');
      }      
      //allowNull: true
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
    },
     {
        timestamps: false,
  }
  );

  return task;
};