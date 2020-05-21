/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Apply', {
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
    state: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'request_for_consult'
  });
};
