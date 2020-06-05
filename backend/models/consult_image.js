/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const ConsultImage = sequelize.define('ConsultImage', {
    consult_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    image_path: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'consult_image'
  });

  ConsultImage.associate = function (models){
    ConsultImage.belongsTo(models.Consult,{
      onDelete:'cascade',
      foreignKey:'consult_id'
    })
  }

  return ConsultImage;
};
