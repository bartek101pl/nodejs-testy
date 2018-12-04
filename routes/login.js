//@Copyright 2018 BŚ
var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/logowanie/admin', function(req, res, next) {
  if((req.session.login)&&(req.session.login == true))
      {
    res.render('index', { msg: 'admin' });
      }else{
          console.log('wymaga zalogowania')
      }
  
});
router.get('/logowanie/klient', function(req, res, next) {
    if((req.session.login)&&(req.session.login == true))
      {
  res.render('index', { msg: 'logowanie' });
          }else{
        res.render('logowanie_k', { msg: 'admin' });
      }
  
});
router.get('/logowanie/', function(req, res, next) {
  res.render('index', { msg: 'logowanie wybierz ' });
  console.log("logowanie");
});
module.exports = router;
