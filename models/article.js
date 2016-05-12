var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	content:{type: String},
	author: {type: Schema.Types.Mixed},//要做内嵌
	pindao: {type: String, default: "pindao"},
	publishTime: {type: Date, default: Date.now()},
	loves: {type: Number, default: 0},
	readNum: {type: Number, default: 0}
});

module.exports = mongoose.model('Article',ArticleSchema)