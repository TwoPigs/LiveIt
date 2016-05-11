//频道相关的在这里处理
var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
	res.render('pindao/addChat_index.html',{title:"创建频道", head: "创建频道" ,backUrl:"/"});
});

router.get('/createPindao', function(req, res){
	res.render('pindao/creatPindao.html',{title:"创建频道", head: "创建频道" ,backUrl:"/"});
});

router.get('/createPdSubmit', function(req, res){
	var name = req.body.name;
	console.log(name);
	res.render('pindao/pindao_index.html',{title:"频道", head: name, backUrl:"/"});
});

module.exports = router;
