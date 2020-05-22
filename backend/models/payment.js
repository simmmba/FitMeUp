/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payment', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    source: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'ID'
      }
    },
    type: {
      type : DataTypes.STRING(30),
      allowNull : false,
    },
    target: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'ID'
      }
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
  }, {
    tableName: 'payment'
  });
};
