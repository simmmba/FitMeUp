/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Apply = sequelize.define('Apply', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stylist_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'User',
        key: 'ID'
      }
    },
    consult_id:{
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Consult',
        key: 'ID'
      }
    },
    contents: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'apply'
  });

  Apply.associate = function (models){
    Apply.belongsTo(models.Consult, {
      onDelete:'cascade',
      foreignKey:'consult_id'
    })

    Apply.belongsTo(models.User, {
      onDelete:'cascade',
      foreignKey:'stylist_id'
    })
  }

  return Apply;
};
