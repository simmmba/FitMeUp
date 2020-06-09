/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const PortfolioImage =  sequelize.define('PortfolioImage', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    portfolio_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'portfolio',
        key: 'ID'
      }
    },
    image_path: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'portfolio_image'
  });

  PortfolioImage.associate = function (models) {
    PortfolioImage.belongsTo(models.Portfolio, {
      foreignKey: 'portfolio_id',
      onDelete: 'cascade',
    })
  }


  return PortfolioImage;
};
