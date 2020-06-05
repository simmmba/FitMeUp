/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "User",
          key: "ID",
        },
      },
      target:{
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "User",
          key: "ID",
        },
      },
      consult_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      contents: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      score: {
        type: "DOUBLE",
        allowNull: true,
      },
    },
    {
      tableName: "review",
    }
  );

  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: "target",
      onDelete: "cascade",
    });

    Review.belongsTo(models.Consult, {
      foreignKey: "consult_id",
      onDelete: "cascade",
    });

    Review.hasMany(models.ReviewImage, {
      foreignKey: 'review_id',
      onDelete: 'cascade'
    })
  };

  return Review;
};
