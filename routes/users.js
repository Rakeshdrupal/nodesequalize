var users = require('../models/users');
var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
router.get('/success', function(req, res, next) {
  return res.json({ success:true , message: "Success"});
});

module.exports = router;
