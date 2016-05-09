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
router.get('/messages.html', function(req, res, next) {
  console.log("进入messages.html-------");
  res.render('messages');
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
