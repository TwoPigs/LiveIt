//频道相关的在这里处理
var express = require('express');
var router = express.Router();
var Pindao = require('../models/pindao');

//返回创建频道引导页
router.get('/',function(req, res){
	res.render('pindao/addChat_index.html',{title:"创建频道", head: "创建频道" ,backUrl:"/"});
});

//跳转到创建频道表单页
router.get('/createPindao', function(req, res){
	res.render('pindao/creatPindao.html',{title:"创建频道", head: "创建频道" ,backUrl:"/"});
});

//表单提交
router.post('/createPindao', function(req, res){
	var name = req.body.name;
	console.log("表单提交"+name);
	res.render('pindao/pindao_index.html',{title:"频道", head: name, backUrl:"/"});
});

//频道主页
router.get('/pindao_index.html',function(req, res){
	res.render('pindao/pindao_index.html',{title:"频道名", head: "频道名" ,backUrl:"/"});
});

module.exports = router;
