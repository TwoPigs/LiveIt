var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('账户页面');
});

//登录页面
router.get('/login', function(req, res, next) {
  res.render('account/login', { title: 'Express' ,name:"张州凤"});
});

// 将来会在这里检查用户名是否存在，我们先把它设为true
var usernameExist = true,
	data = {};


//登录操作
router.post('/signin', function(req, res) {
    var username = req.body.username || '',
        password = req.body.password || '',
        remember = req.body.remember || '';
     
     if(username.length === 0 || password.length === 0){
	     	data.code = 0;
	        data.message = "用户名或密码不合法~";
        }else if(!usernameExist){// 将来会在这里检查用户名是否存在，我们先把它设为true
        	data.code = 0;
	        data.message = "用户名不存在~"; 
        }else{
        	data.code = 1;
       		data.message = "登录成功~";
        }
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
        	User.create({username: username, password: password, email: email},
            function(err, user) {
                if (err) {
                  data.code = 0;
                  data.message = err.errmsg;
                  return res.json(data);
                };    // 交给接下来的错误处理中间件
                data.code = 1;
                data.message = "注册成功~";
                console.log(data);
                return res.json(data);
            });
        }
});
module.exports = router;
