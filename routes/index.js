var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 在设置authenticated之前，express-session会进行验证，这里我们得到了安全的session
  // 如果cookie未被设置过authenticated则重定向 
  if(!req.cookies.authenticated || !req.session.authenticated) return res.redirect('/account/login');
  console.log(req.user);
  res.render('index', { title: 'LiveIt' ,name:"张州凤"});
});
//主页面
router.get('/find.html', function(req, res, next) {
  console.log("进入find.html-------");
  res.render('find');
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
  console.log("到用户中心时取出username："+req.session.username);
  res.render('userCenter');
});
router.get('/getindex', function(req, res, next) {
  res.json({ title: 'LiveIt' ,name:"张州凤"});
});

module.exports = router;
