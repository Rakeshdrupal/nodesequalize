'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function (value, next) {
          var self = this;
          User.find({ where: { email: value } })
            .then(function (user) {
              // reject if a different user wants to use the same email
              if (user && self.id !== user.id) {
                return next('Email already in use!');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function (value, next) {
          var self = this;
          User.find({ where: { username: value } })
            .then(function (user) {
              // reject if a different user wants to use the same email
              if (user && self.id !== user.id) {
                return next('Username already in use!');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
        }
      }
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING

  }, {
      classMethods: {
        associate: function (models) {

          User.hasMany(models.Todo);
          // associations can be defined here
        }
      }
    });
  return User;
};