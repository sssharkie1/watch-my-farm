module.exports = function(sequelize, DataTypes) {
  var invite = sequelize.define("invite", {
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
    magicalLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },     
  },

    {

      classMethods: {
        associate: function(models) {
          // An Farm (foreignKey) is required
          invite.belongsTo(models.farm, {
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

  return invite;
};