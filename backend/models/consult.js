/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Consult', {
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
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'User',
        key: 'ID'
      }
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    top: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bottom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    budget: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    contents: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    start_time: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    end_time: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'consult'
  });
};
