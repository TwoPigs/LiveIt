var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,name:"张州凤"});
});
//主页面
router.get('/home.html', function(req, res, next) {
  console.log("进入home.html-------");
  res.render('home');
});
//最近聊天
router.get('/recentChat.html', function(req, res, next) {
  console.log("进入recentChat.html-------");
  res.render('recentChat');
});
//通讯录
router.get('/contacts.html', function(req, res, next) {
  console.log("进入contacts.html-------");
  res.render('contacts');
});
//个人中心
router.get('/userCenter.html', function(req, res, next) {
  console.log("进入userCenter.html-------");
  res.render('userCenter');
});
router.get('/getindex', function(req, res, next) {
  res.json({ title: 'Express' ,name:"张州凤"});
});

module.exports = router;
