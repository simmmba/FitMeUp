/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Portfolio_tags = sequelize.define('Portfolio_tags', {
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
                model: 'Portfolio',
                key: 'ID'
            }
        },
        tag: {
            type: DataTypes.STRING(20),
            allowNull: true
        }
    }, {
        tableName: 'portfolio_tags'
    });

    Portfolio_tags.associate = (models) =>{
        Portfolio_tags.belongsTo(models.Portfolio,{
            foreignKey : "portfolio_id",
            onDelete: "cascade",
        })
    }

    return Portfolio_tags
};
