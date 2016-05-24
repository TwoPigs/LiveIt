//引入模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
//layout 模板
var partials = require('express-partials');
//mongoose 数据库操作
var mongoose = require('mongoose');
//加密
var passport = require('passport');
//socket通信
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


//数据模型
User = require('./models/user');

//路由表
var routes = require('./routes/index');
var account = require('./routes/account');
var user = require('./routes/user');
var pindao = require('./routes/pindao');
var find = require('./routes/find');
var chat = require('./routes/chat');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//添加以下  
app.engine('.html',require('ejs').__express);  
app.set('view engine', 'html'); 

//数据库连接
mongoose.connect('mongodb://localhost/test');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//使用layout模板
app.use(partials());

//session & cookie
app.use(cookieParser("secret"));
//加密的key值
app.use(session({secret: 'hello!ziazan', 
  resave: true, 
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//为用户验证指定了使用用户名与密码进行验证（Basic）的验证策略
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//---路由设置
app.use('/', routes);
app.use('/account', account);//登录注册
app.use('/user', user);//用户信息类型
app.use('/pindao', pindao);//频道
app.use('/find', find);//搜索，发现
app.use('/chat', chat);//一对一聊天

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//暂时放在这里
io.sockets.on('connection', function(socket) {

    socket.on('login', function() {
        

        // /*随机生成3位随机数*/
        // var Num='';
        // for(var i=0;i<3;i++){
        //     Num+=Math.floor(Math.random()*10);
        // }
        users.push('ziazan');
        socket.emit('loginSuccess',Num);
    });
    

    socket.on('postMsg', function(user_id,msg) {
        socket.broadcast.emit('newMsg', user_id, msg);
    });
    
});

module.exports = app;
