/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const ReviewImage = sequelize.define(
    "ReviewImage",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      review_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      image_path: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "review_image",
    }
  );

  ReviewImage.associate = function (models) {
    ReviewImage.belongsTo(models.Review, {
      foreignKey: "review_id",
      onDelete: "cascade",
    });
  };

  return ReviewImage;
};
