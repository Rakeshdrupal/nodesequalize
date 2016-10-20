var express = require('express')
  , router = express.Router()
// var app = express();
var todo = require('./todo');
var api = require('./api');
// var use  = require('./users');
router.use('/todo',todo);
router.use('/api',api);
// router.use('/users',use);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
