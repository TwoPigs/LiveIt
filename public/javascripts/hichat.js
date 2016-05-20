
window.onload = function() {
    var hichat = new HiChat();
    hichat.init();
};
var HiChat = function() {
    this.socket = null;
};
HiChat.prototype = {
    init: function() {
        var that = this;
        this.socket = io.connect();
        this.socket.on('connect', function() {
           
            that.socket.emit('login');
        });
        

        /* 登陆成功 */
        this.socket.on('loginSuccess',function(Num){
            document.cookie=Num;
            document.getElementById('saytext').focus();
        });
        this.socket.on('error', function(err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '!fail to connect :(';
            } else {
                document.getElementById('info').textContent = '!fail to connect :(';
            }
        });
        
        this.socket.on('newMsg', function(user_id, msg) {
            that._displayNewMsg(user_id,'other', msg);
        });
        
        
        document.getElementById('sendBtn').addEventListener('click', function() {
            var user_id=document.cookie;
            var messageInput = document.getElementById('saytext'),
                msg = messageInput.value;
                // color = document.getElementById('colorStyle').value;
            messageInput.value ='';
            messageInput.focus();
            if (msg.trim().length != 0) {
                that.socket.emit('postMsg',user_id, msg);
                that._displayNewMsg(user_id,'me', msg);
                return;
            };
        }, false);
        document.getElementById('saytext').addEventListener('keyup', function(e) {
            
            var messageInput = document.getElementById('saytext'),
                msg = messageInput.value,
                user_id=document.cookie;
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';
                that.socket.emit('postMsg',user_id,msg);
                that._displayNewMsg(user_id, 'me', msg);
            };
        }, false);
        
    },
    
    _displayNewMsg: function(user_id, user_type,msg) {
       

        /*显示聊天信息*/
        var container=document.getElementById('historyMsg'),msgToDisplay = document.createElement('div'),str='',userid=parseInt(user_id);
        msg=this._replaceEm(msg);
        if(user_type=='other'){
            msgToDisplay.className='chat-message-other';
            str= '<img class="message-avatar"';
            if(userid%2==0){
                str+='src="img/parents.png">';
            }else if(userid%2!=0){
                str+='src="img/students.png">';
            }
            str+='<div class="message"><div class="entry-trangle-l"></div><a class="message-author" href="#">ID: '+userid+'</a><span class="message-content">';
            str+=msg+'</span></div></div>';
        }else if(user_type=='me'){
            msgToDisplay.className='chat-message-me';
            str= '<img class="message-avatar"';
            if(userid%2==0){
                str+='src="img/parents.png">';
            }else if(userid%2!=0){
                str+='src="img/students.png">';
            }
            str+='<div class="message"><div class="entry-trangle-r"></div><a class="message-author" href="#">ID: '+userid+'</a><span class="message-content">';
            str+=msg+'</span></div></div>';
        }
        msgToDisplay.innerHTML=str;
        container.appendChild(msgToDisplay);
    },
    

    /*转化聊天内容中的表情符号*/
    _replaceEm: function(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g,'<img src="img/face/$1.gif" border="0" />');
    return str;
    }
};
