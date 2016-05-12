//频道相关的在这里处理
var express = require('express');
var router = express.Router();
var Pindao = require('../models/pindao');
var User = require('../models/user');
var Article = require('../models/article');

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
	var pindao = new Pindao();
	var username = req.session.username; 
	pindao.name = req.body.name;
	pindao.description = req.body.description;
	pindao.tags = req.body.tags;
	pindao.owner = username;
	
	var data = {};
	pindao.save(function (err){
		if (err) {
			console.log(err);
		}else{
			User.find({username: username}, function (err, docs){
				docs[0].myPindaoList.push (pindao._id);
				docs[0].save(function (err){
					if (err) {
						data.code = 0;
						data.message = err.errmsg;
						console.log(err);
					}else{
						data.code = 1;
						res.render('pindao/pindao_index.html',{title:"频道", head: pindao.name, backUrl:"/"});
					}					
				});
			})
		}
	});
});

//频道主页
router.get('/pindao_index.html',function(req, res){
	res.render('pindao/pindao_index.html',{title:"频道名", head: "频道名" ,backUrl:"/"});
});

//在频道里面发布内容
router.post('/publish', function (req, res){
	var data = {};
	var content = req.body.content;
	var username = req.session.username;
	var article = new Article();
	article.content = content;
	article.author = username;

	article.save(function(err){
		if (err) {
			data.code = 0;
			data.message = err.errmsg;
			res.json(data);
			console.log(err);
		}else{
			User.find({username: username}, function(err, docs){
				if (err) {
					data.code = 0;
					data.message = err.errmsg;
					console.log(err);
					res.json(data);				
				}else{
					docs[0].articleList.push(article._id);
					Pindao.find({name: article.pindao}, function(err, docs){
						if (err) {
							data.code = 0;
							data.message = err.errmsg;
							console.log(err);
							res.json(data);
						}else{
							docs[0].articleList.push(article._id);
							data.code = 1;
							data.message = "发送成功(●'v'●)";
							console.log(err);
							res.json(data);
						}
					});
				}
			});
		}
	});
});

module.exports = router;
