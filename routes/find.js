//发现，搜索的在这里
var express = require('express');
var router = express.Router();
var Pindao = require('../models/pindao');

router.get('/queryAllPindao', function (req, res){
	var data = {};
	Pindao.find({},{icon:1, name: 1, _id:1}, function(err, docs){
		if (err) {
			data.code = 0;
			data.message = err.errmsg;
			res.json(data);
		}else{
			data.code = 1;
			data.message = "频道列表获取成功";
			data.bizData = docs;//获取的是一个列表
			console.log(data.bizData.toString());
			res.json(data);
		}
	});
});

module.exports = router;