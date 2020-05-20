/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Review', {
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
    target: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'ID'
      }
    },
    contents: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    reg_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    score: {
      type: "DOUBLE",
      allowNull: true
    }
  }, {
    tableName: 'review'
  });
};
