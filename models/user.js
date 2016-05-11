var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {type: String, index: {unique: true}},
    password: String,
    email: String,
    photo: {
        type: String,
        default: '/images/user-img.jpeg'
    },
    title: {
        type: String,
        default: '未命名博客'
    },
    description: {
        type: String,
        default: '这里是Ta的签名...'
    }
});

//为UserSchema添加了一个插件，该插件为User模型添加了一些验证和加密方法
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);