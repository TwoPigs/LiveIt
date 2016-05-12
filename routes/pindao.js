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

//创建频道表单提交
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
				docs[0].myPindaoList.push(pindao._id);
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
	 var id = req.query.id;
	 console.log("id"+id);
	res.render('pindao/pindao_index.html', {title:"频道名", id: id ,backUrl:"/"});
});


//初始化页面数据
router.get('/initPindao',function(req, res){
	var id = req.query.id;
	console.log(id);
	var data = {};
    Pindao.find({_id: id}).populate("articleList").exec().then(function(result){
    	data.code = 1;
    	data.message = "频道初始化成功(●'v'●)";
    	data.bizData = result[0];
    	res.json(data);
    });
});

//在频道里面发布内容
router.post('/publish', function (req, res){
	var data = {};
	var content = req.body.content;
	var date = new Date();
	var username = req.session.username;
	var article = new Article();
	article.content = content;
	User.find({username: username}, {username: 1, photo: 1}, function(err,docs){
		if (err) {
			data.code = 0;
			data.message = err.errmsg;
			console.log(err);	
			res.json(data);
		}else{
			article.author = docs[0];
			saveArticle(docs[0]);
		}
	})
function saveArticle(author){
	article.author = author;
	article.save(function(err, docs){
		console.log(docs);
		if (err) {
			data.code = 0;
			data.message = err.errmsg;
			console.log(err);
			res.json(data);			
		}else{
			User.find({username: username}, function(err, docs){
				if (err) {
					data.code = 0;
					data.message = err.errmsg;
					console.log(err);
					res.json(data);				
				}else{
					docs[0].articleList.push(article._id);
					docs[0].save(function(err){
						if (err) {
							data.code = 0;
							data.message = err.errmsg;
							console.log(err);
							res.json(data);
						}else{
							Pindao.find({name: article.pindao}, function(err, docs){
								if (err) {
									data.code = 0;
									data.message = err.errmsg;
									console.log(err);
									res.json(data);
								}else{
									docs[0].articleList.push(article._id);
									docs[0].save(function(err){
										if (err) {
											data.code = 0;
											data.message = err.errmsg;
											console.log(err);
											res.json(data);
										}else{
											data.code = 1;
											data.message = "发送成功(●'v'●)";
											console.log(docs[0]);
											console.log(err);
											res.json(data);
										}
									});
									
								}
							});
						}
					})
					
				}
			});
		}
	});
}
});

//关注该频道
router.post("/followPindao", function(req, res){
	var data = {};
	var username = req.session.username;
	var pdId = req.body.id;
	User.find({username: username},{joinPindaoList: 1,username: 1, photo: 1},function(err, docs){
		if (err) {
			data.code = 0;
			data.message = err.errmsg;
			console.log(err);
			res.json(data);
		}else{
			docs[0].joinPindaoList.push(pdId);
			docs[0].save(function(err){
				if (err) {
					data.code = 0;
					data.message = err.errmsg;
					console.log(err);
					res.json(data);
				}else{
					Pindao.find({_id: pdId},{menberList: 1},function(err, pddocs){
						if (err) {
							data.code = 0;
							data.message = err.errmsg;
							console.log(err);
							res.json(data);
						}else{
							pddocs[0].menberList.push(docs[0]);
							pddocs[0].save(function(err){
								if (err) {
									data.code = 0;
									data.message = err.errmsg;
									console.log(err);
									res.json(data);
								}else{
									data.code = 1;
									data.message = "关注成功(ΘｏΘ)";
									res.json(data);
								}
							});
							
						}
					})
				}
			});
		}
	})
});

//用户关注的频道列表
router.get("/queryMyPindao", function(req, res){
	var data = {};
	var username = req.session.username;
	User.find({username: username},{joinPindaoList:1,myPindaoList:1}).populate("joinPindaoList myPindaoList").exec().then(function(result){
			data.code = 1;
			data.message = "这些都是我关注的频道( •̀ ω •́ )y";
			data.bizData = result[0];
			res.json(data);
	});
});

module.exports = router;
