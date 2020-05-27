/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const review = sequelize.define(
    'Review',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      source: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'User',
          key: 'ID'
        }
      },
      target: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'User',
          key: 'ID'
        }
      },
      consult_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Consult',
          key: 'ID'
        }
      },
      contents: {
        type: DataTypes.STRING(1000),
        allowNull: true
      },
      score: {
        type: 'DOUBLE',
        allowNull: true
      }
    },
    {
      tableName: 'review'
    }
  );

  review.associate = function (models) {
    review.belongsTo(models.User, {
      foreignKey : 'target',
      onDelete: 'cascade',
    });
  };

  return review
}
