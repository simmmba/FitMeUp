/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ConsultImage', {
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
        model: 'consult',
        key: 'ID'
      }
    },
    image_path: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'consult_image'
  });
};
