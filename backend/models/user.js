/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    profile_img: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    credit: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    platform: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    api_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    belong: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    occupation: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true
    }
  }, {
    tableName: 'user'
  });
};
