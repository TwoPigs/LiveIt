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
    description: {
        type: String,
        default: '这里是Ta的签名...'
    },
    joinPindaoList: [{
            type: Schema.Types.ObjectId,
            ref: "Pindao"
        }],
    acticleList: [{
        type: Schema.Types.ObjectId,
        ref: "Article"
    }],
    myPindaoList:[{
        type: Schema.Types.ObjectId,
        ref: "Pindao"
    }],
    lastLoginTime: {
        type: Date,
        default: Date.now()
    },
    joinTime: {
        type: Date,
        default: Date.now()
    },
    hearts: {
        type: Number,
        default: 0
    },

});

//为UserSchema添加了一个插件，该插件为User模型添加了一些验证和加密方法
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);