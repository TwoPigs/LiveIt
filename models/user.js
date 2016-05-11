var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', UserSchema);