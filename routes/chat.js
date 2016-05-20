//聊天的在这里处理
var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
	res.render('chat/chat.html');
});

module.exports = router;