var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	content:{type: String},
	author: {type: String},
	publishTime: {type: Date},
	loves: {type: Number},
	readNum: {type: Number}
});

module.exports = mongoose.model('Article',ArticleSchema)