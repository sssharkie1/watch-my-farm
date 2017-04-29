module.exports = function(sequelize, DataTypes) {
  var invite = sequelize.define("invite", {
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    magicalLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
        //timestamps: false,    
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
    }
  );

  return invite;
};