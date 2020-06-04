/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Portfolio = sequelize.define('Portfolio', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        stylist_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'User',
                key: 'ID'
            }
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        contents: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        main_img : {
            type:DataTypes.STRING(100),
            allowNull : true
        },
        coordi_price : {
            type:DataTypes.INTEGER(11),
            allowNull : true
        },
        my_price : {
            type:DataTypes.INTEGER(11),
            allowNull : true
        },
    }, {
        tableName: 'portfolio'
    });

    Portfolio.associate = function (models) {
        Portfolio.hasMany(models.PortfolioImage, {
          foreignKey: 'portfolio_id',
          onDelete: 'cascade',
        })
        Portfolio.hasMany(models.Portfolio_tags, {
          foreignKey: 'portfolio_id',
          onDelete: 'cascade',
        })

        Portfolio.belongsTo(models.User,{
            foreignKey: 'stylist_id',
            onDelete: 'cascade',
        })
      }
    
    return Portfolio
};
