var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require("passport");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('账户页面');
});

//登录页面
router.get('/login', function(req, res, next) {
  res.render('account/login', { title: 'Express' ,name:"张州凤"});
});

//注册页面
router.get('/register', function(req, res, next) {
  res.render('account/login', { title: 'Express' ,name:"张州凤"});
});

// 将来会在这里检查用户名是否存在，我们先把它设为true
var usernameExist = true,
	data = {};


//登录操作
router.post('/signin', passport.authenticate('local'), function(req, res) {
    // 如果进入了该方法，则已经验证成功。
    // var username = req.body.username || '',
    //     password = req.body.password || '',
    //     remember = req.body.remember || '';
    //  usernameExist = true;
    //  if(username.length === 0 || password.length === 0){
	   //   	data.code = 0;
	   //      data.message = "用户名或密码不合法~";
    //     }else if(!usernameExist){// 将来会在这里检查用户名是否存在，我们先把它设为true
    //     	data.code = 0;
	   //      data.message = "用户名不存在~"; 
    //     }else{
    //     	data.code = 1;
    //    		data.message = "登录成功~";
    //     }
    // 此时，不仅设置了cookie，还设置了对应的哈希值
    req.session.authenticated = true;
    // 在cookie中，设置键authenticated的值为true
    res.cookie('authenticated', true);  
    //把用户名保存到session中
    req.session.username = req.body.username;
    console.log("req.session.username="+req.session.username);
    data.code = 1;
    data.message = req.body.username;
    return res.json(data);
});

//注册操作
router.post('/register', function(req, res, next) {
	var username = req.body.username || '',
        password = req.body.password || '',
        email = req.body.email || '';
        usernameExist = false;

    if(username.length === 0 || password.length === 0 || email.length === 0){
	     	 data.code = 0;
	        data.message = "用户名,密码或邮箱不合法~";

          return res.json(data);
        }else if(usernameExist){// 将来会在这里检查用户名是否存在，我们先把它设为true
        	data.code = 0;
	        data.message = "用户名已存在~";

          return res.json(data);
        }else{
          //并将密码密文、用户名、salt（加密参数）储存为一个User对象
        	   User.register(new User({ username: username, email: email}), req.body.password,
            function(err) {
                if (err) {
                  data.code = 0;
                  data.message = err.errmsg;
                  return res.json(data);
                };
                data.code = 1;
                data.message = "注册成功~";
                console.log(data);
                return res.json(data);
            });
        }
});
module.exports = router;
