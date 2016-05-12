//用户信息类型的页面都在这里处理
var express = require('express');
var router = express.Router();
var User = require('../models/user');

//用户设置
router.get('/setting.html',function(req,res){
	res.render('setting', {title: "用户设置", head:"用户设置", backUrl:"/"});
});

//获得用户信息
router.post('/getUserInfo', function(req, res, next) {
	var username = req.session.username;
	var data = {};
	console.log(username);

	User.find({username:username},function(err,docs){
		if (err) {
			data.code = 0;
			data.message = "数据加载失败";
		}else{
			data.code = 1;
			data.message = "数据加载成功";
			data.bizData = docs[0];
			console.log(docs);
		}
		res.json(data);
	});
});

//设置信息页面

module.exports = router;