/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
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
    }
  }, {
    tableName: 'user'
  });

  User.associate = function (models){
    User.hasMany(models.Apply,{
      foreignKey:'stylist_id',
      onDelete:'cascade',
    })

    User.hasMany(models.Review,{
      foreignKey:'target'
    })

    User.hasMany(models.Consult,{
      foreignKey:'stylist_id'
    })

    User.hasMany(models.Portfolio,{
      foreignKey:'stylist_id'
    })
    
  }

  return User;
};
