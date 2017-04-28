module.exports = function(sequelize, DataTypes) {
  var invite = sequelize.define("invite", {
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    magicalLink: DataTypes.STRING,
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