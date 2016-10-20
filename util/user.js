var jwt = require('jsonwebtoken');
var express = require('express');
var models = require('../models/index');
var bcrypt = require("bcrypt");

var app = express();
const saltRounds = 10;
function User() {
    this.login = function (user, res) {

        //  console.log(user);
        models.User.find({
            where: {
                email: user.email,
            }
        }).then(function (todo) {
           console.log(todo);

            if (!todo) {
                // if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });

                // /res.end();


            } else {

                bcrypt.compare(user.password,todo.dataValues.password, function (err, response) {

                     console.log(todo.dataValues);
                    if (response) {
                        var token = jwt.sign(todo.dataValues, 'rakesh', {
                          
                            expiresIn: 60 * 60 * 24 // expires in 24 hours
                        })
                        return res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        })
                    } else {
                    
                        return res.json({ success: false, message: 'Password Authentication failed. User not found.' });

                    }

                });

            }

        })




    }
}
module.exports = new User();