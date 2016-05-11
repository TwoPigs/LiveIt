//用户信息类型的页面都在这里处理
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/getUserInfo', function(req, res, next) {
	var username = req.body.username;
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

module.exports = router;