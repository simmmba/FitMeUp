/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ConsultWant', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      consult_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'Consult',
          key: 'ID'
        }
      },
      want: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    }, {
      tableName: 'consult_want'
    });
  };
  