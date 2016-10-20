var express = require('express');
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');
var app = express();
var models = require('../models/index');
var userutil = require('../util/user');
var util = require("util");
var todo = require('./todo');
var router = express.Router();
const saltRounds = 10;

router.post('/register', function (req, res, next) {
  console.log();
  req.checkBody('username', 'Invalid username').notEmpty();
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('email', 'Invalid email').isEmail();
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(util.inspect(errors))
    //res.send( util.inspect(errors), 400); 
    return;

  }
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    models.User.create({
      email: req.body.email,
      password: hash,
      username: req.body.username,
      name: req.body.name



    }).then(function (user, err) {

      res.json(user);
    }).catch(Sequelize.ValidationError, function (err) {
      // respond with validation errors
      return res.status(422).send(err.errors);
    })
      .catch(function (err) {
        // every other error
        return res.status(400).send({
          message: err.message
        });
      });
  });





});


router.post('/authenticate', function (req, res, next) {

  userutil.login(req.body, res)
});
router.use(function (req, res, next) {


  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'rakesh', function (err, decoded) {
      console.log(err);
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});
router.use('/todo', todo);

module.exports = router