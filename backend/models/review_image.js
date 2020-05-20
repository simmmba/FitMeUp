/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ReviewImage', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    review_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'review',
        key: 'ID'
      }
    },
    image_path: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'review_image'
  });
};
