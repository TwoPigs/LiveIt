var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PindaoSchema = new Schema({
	name:{
		type: String, 
		index: {unique: true}
	},
	description: String,
	owner:{type: String},
	icon:{
		type: String,
		default: "fa-music"
	},
	creatTime:{
		type:Date,
		default: Date.now()
	},
	menberList:[{type: Schema.Types.ObjectId, ref: "User"}],//成员列表
	tags:{type: String},//标签
	articleList: [{type: Schema.Types.ObjectId, ref: "Article"}]//文章
});

module.exports = mongoose.model('Pindao',PindaoSchema)