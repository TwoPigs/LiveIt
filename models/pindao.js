var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PindaoSchema = new Schema({
	name:{
		type: String, 
		index: {unique: true}
	},
	descripton:{
		type: String,
		default:"这是频道的自我介绍..."
	},
	owner:{
		type: String,
		default: "没人要"
	},
	icon:{
		type: String,
		default: "fa heat"
	},
	creatTime:{
		type:Date,
		default: Date.now()
	},
	menberList:{type: Array},//成员列表
	tags:{type:Array},//标签
	articleList:{type:Array}//文章
});

module.exports = mongoose.model('Pindao',PindaoSchema)