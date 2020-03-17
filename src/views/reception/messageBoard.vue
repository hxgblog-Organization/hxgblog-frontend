<template>
    <div>
        <article>
            <div class="container">
                <h2 class="ctitle"><b>留言板</b> <span>你，生命中最重要的过客，之所以是过客，因为你未曾为我停留。</span></h2>
                <div class="gbook">
                    <div class="about">
                        <div id="fountainG">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </div>
                        <div class="about_girl"><span><a href="/"><img src="../../images/reception/me.jpg"></a></span>
                            <p>{{ leaveSay }}</p>
                        </div>
                    </div>
                    <div id="leave-div">
                        <textarea v-model="leaveMessage" class='form-control' placeholder='请你留下你的足迹......' rows='3'></textarea>
                        <button type='button' @click="sendMessage" class='btn btn-primary btn-xs leave-btn'>发表留言</button>
                    </div>
                </div>
            </div>
            <div>
                <ul class="cbp_tmtimeline">
                    <div v-for="(msg, fatherIndex) in leaveMessageData" class="leave-msg">
                        <li class="leave-message-li" >
                            <time class="cbp_tmtime"><span>{{ msg.monthDay}}</span> <span>{{ msg.years }}</span></time>
                            <div class="cbp_tmicon"></div>
                            <div class="cbp_tmlabel" data-scroll-reveal="enter right over 1s">
                                <div class="gbko content"
                                     @mouseenter="messageButtonStatus(1, $event)"
                                     @mouseleave="messageButtonStatus(2, $event)">
                                    <img :src="headPortraiBasetUrl + msg.head_portrait" class="user-head-portrait">
                                    <div class="top-msg-content">
                                        <span>{{ msg.nick_name }}：</span>
                                        <span class="msg-span">{{ msg.msg_content}}</span>
                                        <span class="msg-btn">
                                            <span v-if="msg.msg_count != 0" class="see-comment">
                                            <a @click="childMessageStatus(msg.msg_id, $event, true)">查看回复({{ msg.msg_count }})</a>
                                            <a class="close-msg" @click="childMessageStatus(msg.msg_id, $event, false)">收起回复</a>
                                            </span>
                                            <span v-if="msg.is_mine" class="dl-replay-btn">
                                                <a @click="showMessageTextarea($event, msg.msg_id, msg.msg_id, fatherIndex, fatherIndex)">回复</a>
                                                <a @click="deleteLeaveMessage(msg.msg_id)">删除</a>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <ul :id="msg.msg_id" class="child-msg-ul" v-if="msg.msg_count != 0">
                                    <li>
                                        <ul class="msg-list">
                                            <li v-for="(data, childIndex) in msg.child_message" :key="data.come_id" :rel="data.come_id" class="content"
                                                @mouseenter="messageButtonStatus(1, $event)" @mouseleave="messageButtonStatus(2, $event)">
                                                <a class="head">
                                                    <img class="user-head-portrait" :src="headPortraiBasetUrl + data.head_portrait"/>
                                                </a>
                                                <div class="gbko">
                                                    <div>
                                                        <span>{{ data.nick_name }}</span>
                                                        <span>回复</span>
                                                        <span>{{ data.father_nick_name }}:</span>
                                                        <span>{{ data.msg_content }}</span>
                                                        <span>{{ data.created_at }}</span>
                                                        <span class="dl-replay-btn">
                                                            <a  v-if="data.is_mine" @click="showMessageTextarea($event, data.msg_id, msg.msg_id, childIndex, fatherIndex)">回复</a>
                                                            <a  v-if="msg.is_admin" @click="deleteLeaveMessage(data.msg_id)">删除</a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
        </article>
    </div>
</template>

<script>

    export default {
        name: "messageBoard",
        inject:['reload'],
        data (){
            return {
                leaveMessage: '',
                page: 0,
                leaveMessageData: [],
                headPortraiBasetUrl:ApiPath.common.getHeadPortrait,
                isHave: true,
                isRegister: false,
                num: 0,
                isLogin: store.state.user,
                fatherMsgId: '',
                topId: '',
                replayMsgIndex: '',
                topMsgIndex: '',
                isGetData: true,
                leaveSay: '',
            }
        },
        methods : {
            sendMessage() {
                let  self = this;
                if(! self.checkFrontLogin()){
                    self.$message.error("亲，你没有登录");
                    return false;
                }
                if(store.state.user.role === 1) {                  //如果是博主，不让留言
                    self.$message.error("给别人的留言板！凑啥热闹？");
                    return false;
                }
                if(! self.validateContent(self.leaveMessage)) return false;
                self.leaveMessage = self.filterContent(self.leaveMessage);
                self.checkBackLogin().then(function (res) {
                    if(! res) {
                        self.$message.error("亲，你需要重新登录一下呐!");
                        self.reload();
                        return false;
                    }
                    self.POST(ApiPath.leaveMessage.addLeaveMessage, {msg_content: self.leaveMessage})
                        .then(function (res) {
                            if(res.data.code === 0){
                                self.leaveMessageData.unshift(res.data.data);
                                self.$message.success(res.data.msg);
                                return true;
                            }
                            self.$message.error(res.data.msg);
                            if(data.code === 2 || data.code === 3){
                                self.emptyUserInformation();
                                self.reload();
                            }
                        })
                });

            },
            childMessageStatus(childMessageId, event, status) {
                $(event.currentTarget).hide();
                if(status){
                    $(event.currentTarget).next().show();
                    $('#' + childMessageId).show();
                    return true;
                }
                $(event.currentTarget).prev().show();
                $('#'+ childMessageId).hide();
                return true;
            },
            messageButtonStatus(status, event) {
                if(! this.isLogin) return ;
                let buttonDom = $(event.currentTarget).find(".dl-replay-btn");
                (status === 1) ? $(buttonDom).show() : $(buttonDom).hide();
            },
            replayMessage(){
                let self = this;
                if(! self.checkFrontLogin()){
                    self.$message.error("亲，你没有登录");
                    return false;
                }
                self.replayContent = $("#text-message").val();
                if(! self.validateContent(self.replayContent)) return false;
                self.checkBackLogin().then(function (res) {        //检查后台用户是否登录
                    if(! res){
                        self.$message.error("亲，你需要重新登录一下呐!");
                        self.reload();
                        return false;
                    }
                    self.replayContent = self.filterContent(self.replayContent);
                    self.POST(ApiPath.leaveMessage.replayMessage, {
                        top_level_id: self.topId,
                        father_id: self.fatherMsgId,
                        msg_content: self.replayContent
                    })
                        .then(function (res) {
                            let data = res.data;
                            if(data.code === 0) {
                                self.closeMessageDiv();
                                let replayData = {
                                        'created_at':data.data.created_at,
                                        'father_nick_name': data.data.father_nick_name,
                                        'head_portrait': self.isLogin.head_portrait,
                                        'is_mine': true,
                                        'msg_content': self.replayContent,
                                        'msg_father_id': self.fatherMsgId,
                                        'msg_id': data.data.msg_id,
                                        'nick_name': self.isLogin.nick_name,
                                        'phone': self.isLogin.phone
                                    };
                                if(! (self.topId === self.fatherMsgId)) {    //显示回复内容列表
                                    self.leaveMessageData[self.topMsgIndex].child_message.splice(self.replayMsgIndex + 1, 0, replayData);
                                    return true;
                                }
                                //没有子评论
                                if(self.leaveMessageData[self.topMsgIndex].child_message === null){
                                    self.leaveMessageData[self.topMsgIndex].child_message = [replayData];
                                    self.leaveMessageData[self.topMsgIndex].msg_count = 1;
                                    setTimeout(function () {
                                        let parent = $('#' + self.topId);
                                        let close = parent.prev('.content');
                                        $(close.find(".close-msg")).show();
                                        $(close.find(".close-msg")).prev().hide();
                                        $(parent).show();
                                    }, 800);
                                    return true;
                                }
                                //有子评论
                                // let len = self.leaveMessageData[self.topMsgIndex].child_message.length;
                                // for(var i = 0; i < len; i++){
                                //     if(self.leaveMessageData[self.topMsgIndex].child_message[i].msg_father_id !== self.topId) break;
                                // }
                                self.leaveMessageData[self.topMsgIndex].child_message.push(replayData);
                                return true;
                            }
                            self.$message.error(data.msg);
                            if(data.code === 2 || data.code === 3){
                                self.emptyUserInformation();
                                self.reload();
                            }
                            console.log(data);
                        });
                });

            },
            showMessageTextarea(event, fatherMsgId, topId, replayMsgIndex, topMsgIndex) {
                this.fatherMsgId = fatherMsgId;
                this.topId = topId;
                this.replayMsgIndex = replayMsgIndex;
                this.topMsgIndex = topMsgIndex;
                this.closeMessageDiv();
                $(event.currentTarget).parents(".content").after(
                    "<div id='replay-div' style='padding: 0 10px;width:100%'> " +
                    "<textarea id='text-message' class='form-control' placeholder='对她/他说点什么......' rows='3'>" +
                    "</textarea>" +
                    "<button  id='send-replay-btn' style='float: right;height: 31px;width: 53px;font-size: 14px;margin: 4px 10px 0 0;' type='button' " +
                    "class='btn btn-primary btn-xs replay-btn'>回复" +
                    "</button>" +
                    "</div>"
                );
                let self = this;
                $("#send-replay-btn").click(function (e) {
                    self.replayMessage();
                });
                if(this.isRegister) return;
                this.registerMessageEvent();
                this.isRegister = true;
            },
            closeMessageDiv() {
                if($("#replay-div").length > 0)  $("#replay-div").remove();
            },
            registerMessageEvent() {
                let self = this;
                $("body").click(function (e) {
                    self.num++;
                    if($("#replay-div").prev().attr("class") == $(e.target).parents(".content").attr("class")) return;
                    let is_inDiv = ['replay-div', 'text-message', 'send-replay-btn'];
                    if($.inArray($(e.target).attr("id"), is_inDiv) !== -1) return;
                    if($("#text-message").val()) return ;
                    if(self.num === 1) return;
                    $("#replay-div").remove();
                    self.num = 0;
                });
            },
            deleteLeaveMessage(leaveMessageId) {
                let self = this;
                if(! self.checkFrontLogin()){
                    self.$message.error("亲，你没有登录");
                    return false;
                }
                self.checkBackLogin().then(function (res) {
                    if(! res) {
                        self.$message.error("亲，你需要重新登录一下呐!");
                        self.reload();
                        return false;
                    }
                    self.POST(ApiPath.leaveMessage.deleteLeaveMessage, { msg_id: leaveMessageId })
                        .then(function (res) {
                            if(res.data.code === 0){
                                self.$message.success(res.data.msg);
                                self.reload();
                                return true;
                            }
                            self.$message.error(res.data.msg);
                        });
                });
            },
            getLeaveMessage() {
                let self = this;
                self.isGetData = false;
                self.GET(ApiPath.leaveMessage.selectLeaveMessage, {
                    page: self.page
                })
                    .then(function (res) {
                        if(res.data.code === 0){
                            if (typeof(res.data.data) !=="undefined") {
                                if (res.data.data.leave_msg_data.length === 0) {
                                    self.isHave = false;
                                    return false;
                                }
                                self.isGetData = true;
                                self.leaveMessageData = self.leaveMessageData.concat(res.data.data.leave_msg_data);
                                self.leaveSay = res.data.data.leave_say_data;
                                return true;
                            }
                        }
                        self.isHave = false;
                    })
            },
            handleMessageScroll() {
                if(!this.isHave || ! this.isGetData) return ;
                // 可视区高度
                var windowHeight = document.documentElement.clientHeight;
                //滚动条的高度
                var srcollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var srcollH = document.body.scrollHeight;
                // console.log(windowHeight + "--" + srcollTop + "---" + srcollH);
                if(srcollTop + windowHeight + (this.page * 100 + 10)  > srcollH) {
                    this.page++;
                    this.getLeaveMessage();
                }
            },
        },
        mounted() {
            this.getLeaveMessage();
            window.addEventListener('scroll',this.handleMessageScroll);
        }
    }
</script>

<style scoped>
    .dl-replay-btn a{
        margin-left: 10px;
    }
    #replay-div{
        overflow: hidden;
        width: 100%;
    }
    .dl-replay-btn{
        display: none;
        margin-left: 20px;
    }
    .close-msg, .child-msg-ul{
        display: none;
    }
    .child-msg-ul{
        width: 90%;
    }
    .top-msg-content{
        margin-left: 10px;
    }
    .content{
        display: flex;
        align-items: center;
        line-height: 60px;
    }
    .child-msg-ul{
        margin: 12px 0 0 55px;
        padding-left: 8px;
        border-left: 4px solid #c5c5c5;
    }
    .msg-btn{
        float: right;
        margin-left: 20px;
    }
    .cbp_tmlabel{
        display: flex;
        flex-direction: column;
        align-items: flex-start;

    }
    .user-head-portrait{
        width: 40px;
        height: 40px;
        background: #7fee1d;
        -moz-border-radius: 60px;
        -webkit-border-radius: 60px;
        border-radius: 60px;
        margin-left: 5px;
    }
    .msg-span{
        /*margin-left: 20px;*/
    }
    #leave-div {
        padding: 0 10px;
        overflow: hidden;
        margin-left: 12%;
    }
    .leave-btn {
        float: right;
        height: 31px;
        width: 80px;
        font-size: 14px;
        margin: 4px 10px 4px 0;
    }
    .gbook {
        margin: 30px;

    }
    /* loading  */
    #fountainG { position: relative; width: 240px; height: 29px; margin-bottom: 30px }
    #fountainG li { position: absolute; top: 0;/* background: #6dabdc; Ä¬ÈÏÑÕÉ« */ width: 29px; height: 29px; -moz-animation: bounce_fountainG 1.2s linear infinite; -moz-transform: scale(.3); -moz-border-radius: 19px; -webkit-animation: bounce_fountainG 1.2s linear infinite; -webkit-transform: scale(.3); -webkit-border-radius: 19px; -ms-animation: bounce_fountainG 1.2s linear infinite; -ms-transform: scale(.3); -ms-border-radius: 19px; -o-animation: bounce_fountainG 1.2s linear infinite; -o-transform: scale(.3); -o-border-radius: 19px; animation: bounce_fountainG 1.2s linear infinite; transform: scale(.3); border-radius: 19px; }
    #fountainG li:first-child { left: 0; -moz-animation-delay: 0.48s; -webkit-animation-delay: 0.48s; -ms-animation-delay: 0.48s; -o-animation-delay: 0.48s; animation-delay: 0.48s; }
    #fountainG li:nth-child(2) { left: 30px; -moz-animation-delay: 0.6s; -webkit-animation-delay: 0.6s; -ms-animation-delay: 0.6s; -o-animation-delay: 0.6s; animation-delay: 0.6s; }
    #fountainG li:nth-child(3) { left: 60px; -moz-animation-delay: 0.72s; -webkit-animation-delay: 0.72s; -ms-animation-delay: 0.72s; -o-animation-delay: 0.72s; animation-delay: 0.72s; }
    #fountainG li:nth-child(4) { left: 90px; -moz-animation-delay: 0.84s; -webkit-animation-delay: 0.84s; -ms-animation-delay: 0.84s; -o-animation-delay: 0.84s; animation-delay: 0.84s; }
    #fountainG li:nth-child(5) { left: 120px; -moz-animation-delay: 0.96s; -webkit-animation-delay: 0.96s; -ms-animation-delay: 0.96s; -o-animation-delay: 0.96s; animation-delay: 0.96s; }
    #fountainG li:nth-child(6) { left: 150px; -moz-animation-delay: 1.08s; -webkit-animation-delay: 1.08s; -ms-animation-delay: 1.08s; -o-animation-delay: 1.08s; animation-delay: 1.08s; }
    #fountainG li:nth-child(7) { left: 180px; -moz-animation-delay: 1.2s; -webkit-animation-delay: 1.2s; -ms-animation-delay: 1.2s; -o-animation-delay: 1.2s; animation-delay: 1.2s; }
    #fountainG li:nth-child(8) { left: 210px; -moz-animation-delay: 1.32s; -webkit-animation-delay: 1.32s; -ms-animation-delay: 1.32s; -o-animation-delay: 1.32s; animation-delay: 1.32s; }
    @-moz-keyframes bounce_fountainG { 0% {
        -moz-transform:scale(1);
        background-color:#6dabdc;
    }
        100% {
            -moz-transform:scale(.3);
            background-color:#FFFFFF;
        }
    }
    @-webkit-keyframes bounce_fountainG { 0% {
        -webkit-transform:scale(1);
        background-color:#6dabdc;
    }
        100% {
            -webkit-transform:scale(.3);
            background-color:#FFFFFF;
        }
    }
    @-ms-keyframes bounce_fountainG { 0% {
        -ms-transform:scale(1);
        background-color:#6dabdc;
    }
        100% {
            -ms-transform:scale(.3);
            background-color:#FFFFFF;
        }
    }
    @-o-keyframes bounce_fountainG { 0% {
        -o-transform:scale(1);
        background-color:#6dabdc;
    }
        100% {
            -o-transform:scale(.3);
            background-color:#FFFFFF;
        }
    }
    @keyframes bounce_fountainG { 0% {
        transform:scale(1);
        background-color:#6dabdc;
    }
        100% {
            transform:scale(.3);
            background-color:#FFFFFF;
        }
    }
    /* about */
    .about { padding: 20px 0; overflow: hidden }
    .about ul { width: 1000px; margin: auto; line-height: 24px }
    .about_girl span img { width: 130px; height: 130px; border-radius: 100% }
    .about_girl { width: 100%; margin: 10px auto 0; overflow: hidden }
    .about_girl span { float: left; margin-right: 30px }
    .about_girl p { margin: 20px; background: #ececec; color: #444; float: left; padding: 20px; width: 46%; border-radius: 6px; position: relative; box-shadow: inset #999 -1px -1px 1px; ; text-shadow: #fff 1px 1px 0px; width: 450px }
    .about_girl p::before { content: ""; width: 0px; height: 0px; border-style: solid; border-width: 20px 20px 20px 0; border-color: transparent #ececec transparent; position: absolute; left: -20px; top: 24px; }/* Èý½ÇÐÎ */
    .gbko {
        width: 100%;
        display: flex;
        align-items: center;
        /*background: rgb(255, 255, 255);*/
        /*padding: 0 30px 30px 30px;*/
        margin-left: 10px;
        /*border-radius: 15px;*/
    }
    /* photowall */
    .photowall { width: 94%; margin:30px auto; overflow: hidden;  }
    .photowall img { display: block; opacity: 0.9; -webkit-transition: opacity 0.35s; transition: opacity 0.35s; width: auto; height:100%; margin:auto;  }
    .wall_a { margin: auto; background: #fafcfa; overflow: hidden }
    .wall_a li { float: left; position: relative; width:25%; height:200px; overflow:hidden }
    .wall_a li p a { color: #686868 }
    .text_a { line-height: 24px; padding: 30px 20px }
    .text_b {  line-height: 24px; padding: 40px 20px }
    .wall_a li figcaption { position: absolute; left: 0; top: 10px; }
    .wall_a li h2 { font-size: 12px; line-height: 24px; padding: 20px; font-weight: normal; opacity: 0; -webkit-transition: opacity 0.5s, -webkit-transform 0.5s; transition: opacity 0.5s, transform 0.5s; -webkit-transform: scale(0); transform: scale(0); color: #666 }
    .wall_a li:hover h2 { opacity: 1; -webkit-transform: scale(1); transform: scale(1); }
    .wall_a li:hover img { opacity: 0.4; }
    /* cbp_tmtimeline */
    .cbp_tmtimeline { margin: 30px 0 0 0; padding: 0; list-style: none; position: relative; }
    .cbp_tmtimeline:before { content: ''; position: absolute; top: 0; bottom: 0; width: 5px; background: cyan; left: 158px; margin-left: -10px; }
    .leave-message-li { position: relative; }
    .leave-message-li .cbp_tmtime { display: block; width: 100px; padding-right: 30px; position: absolute; margin-left: 20px }
    .leave-message-li .cbp_tmtime span { display: block; text-align: right; }
    .leave-message-li .cbp_tmtime span:first-child { font-size: 14px; color: #bdd0db; }
    .leave-message-li .cbp_tmtime span:last-child { font-size: 22px; color: #3594cb; }

    .leave-message-li .cbp_tmlabel { background-color: #ececec; margin: 0 50px 15px 180px;color: #000; padding: 2em; position: relative; border-radius: 5px; height: auto; }

    .leave-message-li .cbp_tmlabel h2 { margin-top: 0px; padding: 0 0 10px 0; font-size: 16px; text-shadow: rgba(7, 84, 152, 0.71) 1px 1px 1px; }
    .leave-message-li .cbp_tmlabel:after { right: 100%; border: solid transparent; content: " "; height: 0; width: 0; position: absolute; pointer-events: none; border-right-color: #fff; border-width: 10px; top: 10px; }

    .leave-message-li .cbp_tmicon { width: 10px; height: 10px; font-family: 'ecoico'; speak: none; font-style: normal; font-weight: normal; font-variant: normal; text-transform: none; font-size: 1.4em; line-height: 40px; -webkit-font-smoothing: antialiased; position: absolute; color: #fff; background: #46a4da; border-radius: 50%; box-shadow: 0 0 0 3px #afdcf8; text-align: center; left: 170px; top: 15px; margin: 0 0 0 -25px; }
    .leave-message-li .cbp_tmtime { -webkit-transition: all 1s; -moz-transition: all 1s; -o-transition: all 1s; }
    .leave-message-li:hover .cbp_tmicon { box-shadow: 0 0 0 3px #ececec; }
    .leave-message-li:hover .cbp_tmtime { background: lemonchiffon; border-radius: 20px 0 0 20px; }
    .leave-message-li:hover .cbp_tmtime span { color: #075498; }

</style>