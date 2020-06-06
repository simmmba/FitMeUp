/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Portfolio_tags', {
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
};
