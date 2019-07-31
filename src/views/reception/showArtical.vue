<template>
    <div class="show-artical">
        <article class="main-artical">
            <div class="l_box">
                <div class="search">
                    <audio :src="musicFileUrl" id="music-audio" autoplay="autoplay" controls="controls"></audio>
                    <div class="progress">
                        <div id="progress" class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%;"></div>
                    </div>
                </div>
                <div class="song-world">
                    <div id="word-list">
                        <span class="word" v-for="word in wordObjectArray">
                            {{ word.txt }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="infosbox">
                <div class="newsview">
                    <h3 class="news_title">{{ articalData.arti_title }}</h3>
                    <div class="bloginfo">
                        <ul>
                            <li class="author">作者：<span>坏小哥</span></li>
                            <li class="lmname"><span>学无止境</span></li>
                            <li class="timer">时间：{{ articalData.created_at }}</li>
                            <li class="view">{{ articalData.arti_browse }}人已阅读</li>
                        </ul>
                    </div>
                    <div class="tags">
                        <span v-for="type in articalTypes" target="_blank">{{ type.type_name }}</span> &nbsp;
                    </div>
                    <div class="news_about"><strong>简介</strong>{{ artSay }}</div>
                    <div class="news_con">
                        <div id="artical" v-highlight  v-html="articalData.arti_content" ></div>
                        <div id="ico-div">
                            <span v-if="praise" @click="praiseOrTrample(1, $event)" class="hand-ico light-praise fa fa-thumbs-o-up"></span>
                            <span v-else @click="praiseOrTrample(1, $event)" class="hand-ico fa fa-thumbs-o-up"></span>
                            <span>&nbsp;: {{ articalData.arti_praise_points }}</span>
                            <span v-if="trample" @click="praiseOrTrample(2, $event)" id="trample-ico" class="hand-ico praise fa fa-thumbs-o-down"></span>
                            <span v-else @click="praiseOrTrample(2, $event)" class="hand-ico praise fa fa-thumbs-o-down"></span>
                            <span>&nbsp;: {{ articalData.arti_trample_points }}</span>
                        </div>
                    </div>
                </div>
                <div class="news_pl">
                    <h2>文章评论</h2>
                    <div>
                        <div id="publish-div">
                            <textarea v-model="publishContent" class='form-control' placeholder='请你留下你的足迹......' rows='3'></textarea>
                            <button type='button' @click="publishComment" class='btn btn-primary btn-xs publish-btn'>发表评论</button>
                        </div>
                        <ul v-for="com in comments">
                            <li class="content" :rel="com.come_id" @mouseenter="commentButtonStatus(1, $event)" @mouseleave="commentButtonStatus(2, $event)">
                                <a class="head">
                                    <img class="user-head-portrait" :src="headPortraiBasetUrl + com.head_portrait"/>
                                </a>
                                <div class="gbko">
                                    <div>
                                        <span>{{ com.nick_name }}:</span>
                                        <span>{{ com.come_content }}</span>
                                        <span>{{ com.created_at }}</span>
                                        <span class="comment-btn">
                                            <span v-if="com.come_count != 0" class="see-comment">
                                            <a @click="commentStatus(com.come_id, $event, true)">查看回复({{ com.come_count }})</a>
                                            <a class="close-comment" @click="commentStatus(com.come_id, $event, false)">收起回复</a>
                                            </span>
                                            <span v-if="isLogin" class="dl-replay-btn">
                                                <a @click="showCommentTextarea($event, com.come_id, com.come_id)">回复</a>
                                                <a v-if="com.is_mine" @click="deleteArticalComment($event)">删除</a>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li class="replay-box" :id="com.come_id" v-if="com.come_count != 0">
                                <ul class="comment-list">
                                    <li v-for="data in com.child_comment" :key="data.come_id" :rel="data.come_id" class="content"
                                        @mouseenter="commentButtonStatus(1, $event)" @mouseleave="commentButtonStatus(2, $event)">
                                        <a class="head">
                                            <img class="user-head-portrait" :src="headPortraiBasetUrl + data.head_portrait"/>
                                        </a>
                                        <div class="gbko">
                                            <div>
                                                <span>{{ data.nick_name }}</span>
                                                <span>回复</span>
                                                <span>{{ data.father_nick_name }}:</span>
                                                <span>{{ data.come_content }}</span>
                                                <span>{{ data.created_at }}</span>
                                                <span v-if="isLogin" class="dl-replay-btn">
                                                    <a @click="showCommentTextarea($event, data.come_id, com.come_id)">回复</a>
                                                    <a v-if="data.is_mine" @click="deleteArticalComment($event)">删除</a>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import Lyric from 'lyric-parser'
    import marked from 'marked'
    export default {
        name: "showArtical",
        inject:['reload'],
        data() {
            return {
                browseTopArtical: [],
                newArtical: [],
                comments: [],
                articalData: {},
                getMusicUrl: ApiPath.common.getMusicFile,
                isLogin: store.state.user,
                headPortraiBasetUrl: ApiPath.common.getHeadPortrait,
                num: 0,
                isRegister: false,
                replayContent: "",
                publishContent:"",
                praise: false,
                trample: false,
                articalTypes: [],
                fatherCommentId: '',
                wordObjectArray: [],
                wordArraySubscript:0,
                topId: '',
                musicFileUrl: '',
                currentLineNum: 0,
                isPlay: true,
                moveDistance:20,
                artSay: '',
            }
        },
        methods: {
            timingMove(){
                let docDiv = document.getElementById('word-list');
                docDiv.style.top = this.moveDistance+"px";
                this.moveDistance-=1.61;
            },
            playMusic(){
                $($('.word-on-time')[0]).removeClass('word-on-time');   //播放结束后清楚最后一行歌词的class。
                let audio = $("#music-audio")[0];
                if(audio.ended){
                    document.getElementById('word-list').style.top = '20px';
                    this.moveDistance = 20;
                    this.wordArraySubscript = 0;
                }
                if(audio.paused){
                    audio.play();
                }else if(audio.play){
                    audio.pause();
                }
            },
            updateDocTop(audio){
                let value = audio.currentTime / audio.duration;
                let progress = document.getElementById("progress");
                progress.style.width = value*100+"%";
                this.updateSongList( audio.currentTime);
            },
            updateSongList(time){
                let wordList = this.wordObjectArray;
                let subscript = this.wordArraySubscript;
                if(this.wordArraySubscript<wordList.length)
                    for (subscript;subscript< wordList.length;subscript++){
                        if( time >= wordList[this.wordArraySubscript].time){
                            let docList = document.getElementsByClassName("word");
                            docList[this.wordArraySubscript].classList.add('word-on-time');
                            if(this.wordArraySubscript > 0)
                                docList[this.wordArraySubscript - 1].classList.remove('word-on-time');
                            let self = this;
                            let index = 1;
                            let clear = window.setInterval(()=>{
                                if(index < 11){
                                    self.timingMove();
                                    index++;
                                }else{
                                    window.clearInterval(clear)
                                }
                            },10);
                            // this.moveDistance-=23.33
                            this.wordArraySubscript+=1;
                            break;
                        }
                    }
            },
            getArticalInfo(artId) {
                let self = this;
                self.GET(ApiPath.artical.showArticalDetail, {
                    art_id: artId 
                })
                    .then(function (res) {
                        let data  = res.data;
                        if(data.code === 0){
                            let lyric = data.data.music_lyric;
                            let musicData = new Lyric(lyric,self.handleLyric);//this.handleLyric回调函数
                            for(let item in musicData.lines) musicData.lines[item].time = musicData.lines[item].time/1000;
                            self.wordObjectArray = musicData.lines;
                            self.musicFileUrl = self.getMusicUrl + data.data.music_path;
                            self.newArtical       = data.data.new_articals;
                            self.browseTopArtical = data.data.browse_top;
                            self.comments         = data.data.comments;
                            self.articalData      = data.data.artical_data[0];
                            console.log(self.articalData);
                            self.articalData.arti_content = marked(self.articalData.arti_content);
                            self.praise           = data.data.praise_trample_status.praise;
                            self.trample          = data.data.praise_trample_status.trample;
                            self.articalTypes     = data.data.artical_types;
                            self.artSay           = data.data.art_say;
                        }
                    })
            },
            handleLyric({lineNum, txt}) {
                this.currentLineNum = lineNum;
                // 若当前行大于5,开始滚动,以保歌词显示于中间位置
                if (lineNum > 5) {
                    let lineEl = this.$refs.lyricLine[lineNum - 5];
                    // 结合better-scroll，滚动歌词
                    this.$refs.lyricList.scrollToElement(lineEl, 1000)
                } else {
                    this.$refs.lyricList.scrollToElement(0, 0, 1000)
                }
            },
            commentStatus(childCommentId, event, status) {
                $(event.currentTarget).hide();
                if(status){
                    $(event.currentTarget).next().show();
                    $('#' + childCommentId).show();
                    return true;
                }
                $(event.currentTarget).prev().show();
                $('#'+ childCommentId).hide();
                if($('#' + childCommentId).find("#replay-div").length > 0) this.closeCommentDiv();
                return true;
            },
            commentButtonStatus(status, event){
                let buttonDom = $(event.currentTarget).find(".dl-replay-btn");
                (status === 1) ? $(buttonDom).show() : $(buttonDom).hide();
            },
            showCommentTextarea(event, fatherCommentId, topId){
                this.fatherCommentId = fatherCommentId;
                this.topId = topId;
                this.closeCommentDiv();
                $(event.currentTarget).parents(".content").after(
                    "<div id='replay-div' style='padding: 0 10px;'> " +
                        "<textarea id='text-comment' class='form-control' placeholder='对她/他说点什么......' rows='3'>" +
                        "</textarea>" +
                        "<button  id='send-replay-btn' style='float: right;height: 31px;width: 53px;font-size: 14px;margin: 4px 10px 0 0;' type='button' " +
                        "class='btn btn-primary btn-xs replay-btn'>回复" +
                        "</button>" +
                    "</div>"
                );
                let self = this;
                $("#send-replay-btn").click(function (e) {
                    self.sendReplay(e);
                });
                if(this.isRegister) return;
                this.registerCommentEvent();
                this.isRegister = true;
            },
            registerCommentEvent() {
                let self = this;
                $("body").click(function (e) {
                    self.num++;
                    if($("#replay-div").prev().attr("class") == $(e.target).parents(".content").attr("class")) return;
                    let is_inDiv = ['replay-div', 'text-comment', 'send-replay-btn'];
                    if($.inArray($(e.target).attr("id"), is_inDiv) !== -1) return;
                    if($("#text-comment").val()) return ;
                    if(self.num === 1) return;
                    $("#replay-div").remove();
                    self.num = 0;
                });
            },
            closeCommentDiv() {
                if($("#replay-div").length > 0)  $("#replay-div").remove();
            },
            sendReplay(obj) {                                   //回复评论
                let self = this;
                //检查前台是否登录
                if(! self.checkFrontLogin()){
                    self.$message.error("亲，你没有登录");
                    return false;
                }
                //检查后台用户是否登录
                self.checkBackLogin().then(function (res) {
                    if(! res){
                        self.$message.error("亲，你需要重新登录一下呐!");
                        self.reload();
                        return false;
                    }
                    self.replayContent = $("#text-comment").val();
                    if(! this.validateContent(self.replayContent))  return ;
                    self.replayContent = this.filterContent(self.replayContent);
                    obj = $(obj.target).parents(".replay-box");
                    self.POST(ApiPath.artical.sendReplayComment,{
                        top_level_id: self.topId,
                        father_id: self.fatherCommentId,
                        art_id: self.articalData.arti_id,
                        replay_content: self.replayContent
                    })
                        .then(function (res) {
                            let data = res.data;
                            if(data.code === 0) {
                                self.comments = data.data;
                                if(! self.topId === self.fatherMsgId) {    //显示回复内容列表
                                    let parent = $(obj.target).parent();
                                    $(parent.prev().find(".close-comment")).show();
                                    $(parent.prev().find(".close-comment")).prev().hide();
                                    $(obj).show();
                                    return ;
                                }
                                return true;
                            }
                            self.$message.error(data.msg);
                            if(data.code === 2 || data.code === 3){
                                self.emptyUserInformation();
                                self.reload();
                            }
                        });
                });
            },
            publishComment() {                             //发表评论
                let self = this;
                //检查前台用户是否登录
                if(! self.checkFrontLogin()){
                    self.$message.error("亲，你没有登录呐!");
                    return false;
                }
                //检查后台用户是否登录
                self.checkBackLogin().then(function (res) {
                    if(! res){
                        self.$message.error("亲，你需要重新登录一下呐!");
                        self.reload();
                        return false;
                    }
                });
                if(! this.validateContent(self.publishContent))  return ;
                self.replayContent = this.filterContent(self.publishContent);
                self.POST(ApiPath.artical.addPublishComment, {
                    publish_content: self.publishContent,
                    art_id: self.articalData.arti_id
                })
                    .then(function (res) {
                        let data = res.data;
                        if (data.code === 0){
                            self.comments = data.data;
                            return true;
                        }
                        self.$message.error(data.msg);
                        if(data.code === 2 || data.code === 3){
                            self.emptyUserInformation();
                            self.reload();
                        }
                    })
            },
            deleteArticalComment(event){
                let self = this;
                self.POST(ApiPath.artical.deleteArticalComment, {
                    comment_id: $(event.currentTarget).parents(".content").attr("rel"),
                    art_id: self.articalData.arti_id
                })
                    .then(function (res) {
                        let data = res.data;
                        if(data.code === 0){
                            self.comments = data.data;
                            self.$message.success(data.msg);
                            return true;
                        }
                        self.$message.error(data.msg);
                        if(data.code === 2 || data.code === 3){
                            self.emptyUserInformation();
                            self.reload();
                        }
                        return false;
                    });
            },
            praiseOrTrample(status, event){
                // let obj = event.currentTarget;
                let self = this;
                if(! self.checkFrontLogin()){
                    self.$message.error("亲，你没有登录");
                    return false;
                }
                self.POST(ApiPath.artical.praiseOrTrampleArtical,{
                    praise_trample_status: status,
                    art_id: self.articalData.arti_id,
                })
                    .then(function (res) {
                        let data = res.data;
                        if(data.code === 0){
                            self.articalData.arti_praise_points = data.data.num.arti_praise_points;
                            self.articalData.arti_trample_points = data.data.num.arti_trample_points;
                            if(data.data.is_same){         //和上次的操作一样
                                (status === 1) ? self.praise = false : self.trample = false;
                                return;
                            }
                            if(data.data.is_first){        //第一次赞/踩
                                (status === 1) ? self.praise = true : self.trample = true;
                                return ;
                            }
                            if(status === 1){
                                self.praise = true;
                                self.trample = false;
                            } else {
                                self.praise = false;
                                self.trample = true;
                            }
                            return ;
                        }
                        self.$message.error(data.msg);
                    })
            },
        },
        mounted() {
            let audio = $("#music-audio")[0];
            let self = this;
            audio.addEventListener('timeupdate',function(){
                self.updateDocTop(audio);
            });
            audio.addEventListener("ended", function () {   //当播放完一首歌曲时也会触发
                self.playMusic();
            });

            this.getArticalInfo(this.$route.query.artId);
        },
    }
</script>

<style scoped>
    .news_con{
        white-space: pre-wrap;
    }
    #music-audio{
        outline: none;
    }
    /* 定义keyframe动画，命名为blink */
    @keyframes blink{
        0%{opacity: 1;}
        100%{opacity: 0;}
    }
    /* 添加兼容性前缀 */
    @-webkit-keyframes blink {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
    @-moz-keyframes blink {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
    @-ms-keyframes blink {
        0% {opacity: 1; }
        100% { opacity: 0;}
    }
    @-o-keyframes blink {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
    /* 定义blink类*/
    .word-on-time{
        color: fuchsia;
        animation: blink 1s linear infinite;
        /* 其它浏览器兼容性前缀 */
        -webkit-animation: blink 1s linear infinite;
        -moz-animation: blink 1s linear infinite;
        -ms-animation: blink 1s linear infinite;
        -o-animation: blink 1s linear infinite;
    }
    /*.word-on-time{*/
    /*    display: block;*/
    /*    text-align: center;*/
    /*    color: fuchsia;*/
    /*}*/
    .progress{
        height: 10px;
        border-radius: 20px;
    }
    .progress-bar{
        background-color: black;
    }
    .tiao{
        float: right;
        width: 241px;
        margin-top: 25px;
    }
    #button-div{
        width: 60px;
        height: 60px;
        background-size: cover;
        float: left;
        cursor:pointer
    }
    .controller{
        width: 350px;
        height: 280px;
        margin: 0 auto;
        padding: 70px 0 0 20px;
    }
    .word{
        display: block;
        text-align: center;
    }
    #word-list{
        position: relative;
        color: aliceblue;
        /*top: 157px;*/
        /*z-index: -5;*/
    }
    .song-world{
        width: 300px;
        height: 800px;
        background-size:cover;
        margin: 0 auto;
        padding:30px;
        overflow: hidden
    }
    .hand-ico{
        cursor: pointer;
    }
    .light-praise{
        color: yellow;
    }
    #trample-ico{
        color: yellow;
    }
    .praise{
        margin-left: 10px;
    }
    #ico-div{
        float: right;
        width: auto;
        height: 50px;
    }
    #publish-div{
        padding: 0 10px;
        overflow: hidden;
        border-bottom: #000 2px solid
    }
    .publish-btn{
        float: right;
        height: 31px;
        width: 80px;
        font-size: 14px;
        margin: 4px 10px 4px 0;
    }
    .comment-btn{
        float: right;
        margin-left: 20px;
    }
    .dl-replay-btn{
        display: none;
    }
    .dl-replay-btn a{
        margin-left: 10px;
    }
    .close-comment{
        display: none;
    }
    .content{
        display: flex;
        line-height: 50px;
        align-items: center;
    }
    .replay-box{
        display: none;
        margin: 12px 0 0 32px;
        padding-left: 8px;
        border-left: 4px solid #c5c5c5;
    }
    .head{
        width: 50px !important;
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
    #artical{
        border: 1px solid #F3F3F3;
        padding: 10px;
        margin: 20px auto 15px auto;
        line-height: 23px
    }
    .show-artical{
        background: url(../../images/reception/artical-back.jpg)  no-repeat right top #D6E0E1;
    }
    .l_box { width: 30%; float: left }
    .r_box { width: 68%; float: right }
    .l_box h2 { color: #333; font-size: 14px; line-height: 30px; padding-left: 20px; background: #fff }
    /*.l_box div {overflow: hidden }*/
    .l_box div ul { padding: 10px; overflow: hidden }
    .about_me img { width: 100% }
    .about_me p { line-height: 24px; font-size: 14px }
    .about_me i { width: 120px; float: left; clear: left; margin-right: 10px; height: 90px; overflow: hidden }
    .wdxc li { width: 32%; overflow: hidden; float: left; height: 80px; margin-bottom: 2px; margin-right: 2px }
    .wdxc li img { height: 100%; min-height: 80px; -webkit-transition: all 0.5s; -moz-transition: all 0.5s; transition: all 0.5s; }
    .wdxc li img:hover { transform: scale(1.05) }
    .tuijian li { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-bottom: 5px; background: url(../../images/reception/li.png) left center no-repeat; padding-left: 20px }
    .links a { display: block; float: left; margin: 0 10px 5px 0 }
    .guanzhu img { width: 100% }
    /*.l_box .search { border: 1px solid #c93282; background: #c93282; border-radius: 0 5px 5px 0; position: relative; }*/
    /*.search input.input_submit { border: 0; background: 0; color: #fff; outline: none; position: absolute; top: 10px; right: 8% }*/
    /*.search input.input_text { border: 0; line-height: 36px; height: 36px; width: 72%; padding-left: 10px; outline: none }*/
    .r_box li { background: rgba(255,255,255,0.8); padding: 15px; overflow: hidden; color: #797b7c; margin-bottom: 15px }
    .r_box li h3 { font-size: 16px; line-height: 25px; text-shadow: #FFF 1px 1px 1px }
    .r_box li h3 a { color: #222 }
    .r_box li h3 a:hover { color: #000; text-decoration: underline }
    .r_box li img { float: right; clear: right; width: 100%; -webkit-transition: all 0.5s; -moz-transition: all 0.5s; transition: all 0.5s; }
    .r_box li i { width: 150px; display: block; max-height: 100px; overflow: hidden; float: right; margin-left: 20px }
    .r_box li p { margin: 20px 0 0 0; line-height: 22px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; }
    .r_box li:hover img { transform: scale(1.05) }
    .r_box li:hover h3 a { color: #C93282; }
    .pagelist { text-align: center; color: #666; width: 100%; clear: both; margin: 20px 0; padding-top: 20px }
    .pagelist a { color: #666; margin: 0 2px; border: 1px solid #fff; padding: 5px 10px; background: #FFF }
    .pagelist a:hover { color: #C93282; }
    .pagelist > b { border: 1px solid #000; padding: 5px 10px; }
    a.curPage { color: #C93282; font-weight: bold; }
    /*about*/
    .about{ padding: 20px; background: rgba(255,255,255,0.8);}
    .about img{ max-width:500px; margin:20px 0; width:100%}
    .picbox { width: 100%; overflow: hidden;  }
    .picbox ul { overflow: hidden; width: 24%; float: left; margin-right:10px }
    .picbox ul li { display: block; background: #FFF; margin: 0 0 20px 0; border: 1px #d9d9d9 solid; }
    .picbox ul li i { margin: 10px; height: auto; overflow: hidden; display: block; }
    .picbox ul li img { width: 100%; }
    .picinfo h3 { border-bottom: #ccc 1px solid; padding: 20px 0; margin: 0 20px }
    .picinfo span { padding: 20px; display: block; color: #666 }
    .picbox ul li a:hover{ color:#C93282}



    .infosbox { float: right; width: 68%; overflow: hidden; background: rgba(255,255,255,0.8);}
    .newsview { padding: 0 30px }
    .intitle { line-height: 40px; height: 40px; font-size: 14px; ; border-bottom: #000 2px solid; }
    .intitle a { font-weight: normal; }
    .news_title { font-size: 24px; font-weight: normal; padding: 20px 0; color: #333; }
    .bloginfo{ width:100%; overflow:hidden}
    .bloginfo li{ float:left; margin-right:20px}
    .news_about { color: #888888; border: 1px solid #F3F3F3; padding: 10px; margin: 20px auto 15px auto; line-height: 23px; background: none repeat 0 0 #F6F6F6; }
    .news_about strong { color: #38485A; font-weight: 400 !important; font-size: 13px; padding-right: 8px; }
    .news_content { line-height: 24px; font-size: 14px; }
    .news_content p { overflow: hidden; padding-bottom: 4px; padding-top: 6px; word-wrap: break-word; }
    .tags span { background: #F4650E; padding: 3px 8px; margin: 0 5px 0 0; color: #fff; }
    .tags { margin: 10px 0; }
    /*.infosbox img { max-width: 650px; height: auto; width:100% }*/
    .share { padding: 20px; }
    .nextinfo { line-height: 24px; width: 100%; overflow: hidden; margin: 20px 0 }/*ÉÏÒ»ÆªÏÂÒ»Æª*/
    .nextinfo p { padding: 4px 10px; border-radius: 5px; }
    .nextinfo a:hover { color: #000; text-decoration: underline }
    /*ÎÄÕÂÆÀÂÛ*/
    .news_pl { margin: 10px 0; width: 100%;  overflow: hidden;  }
    .news_pl h2 { border-bottom: #000 2px solid; line-height: 40px; font-size: 14px; padding-left: 10px; color: #000 }
    .diggit {  width: 160px; margin: auto; background: #E2523A; color: #fff; box-shadow: 1px 2px 6px 0px rgba(0,0,0,.2); border-radius: 3px; line-height: 40px; text-align: center; }
    .diggit a { color: #fff; }
    #diggnum { margin: 5px; }
    .tuijian{ top:10px; width:300px; }
    .guanzhu{ top:300px;width:300px;}



    @media screen and (min-width: 1024px) and (max-width: 1199px) {
        header{ width:96%; margin:auto}
    }
    @media screen and (min-width: 960px) and (max-width: 1023px) {
        header,.main-artical{ width:96%; margin:auto}
        .picbox ul{    width: 23%;}
        .picshowlist{ display:none}
        .tuijian,.guanzhu{ width:270px; }
    }
    @media screen and (min-width: 768px) and (max-width: 959px) {
        header,.main-artical{ width:96%; margin:auto}
        .picbox ul{    width: 23%;}
        .picshowlist{ display:none}
        .pagelist a { padding: 2px 3px;}
    }
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        header,.main-artical{ width:96%; margin:auto}
        .logo{  width:100%;text-align:center}
        nav{ width:100%}
        nav li{ width:20%}
        .l_box{ display:none}
        .r_box,.infosbox,.picsbox{ width:100%}
        .pagelist a { padding: 2px 3px;}
        .picbox ul{    width: 22%;}
        .picbox ul li i{ margin:5px}
        .picinfo{ display:none}
        .picshowlist{ display:none}
        .lmname,.view{ display:none}
    }
    @media only screen and (max-width: 479px) {
        header,.main-artical{ width:96%; margin:auto}
        .logo{  width:100%;text-align:center}
        nav{ width:100%}
        .l_box{ display:none}
        .r_box,.infosbox,.picsbox{ width:100%}
        .pagelist a { padding: 2px 3px; margin:0}
        .picbox ul{    width: 22%;}
        .piclistshow ul li{ height:100px; padding:0}
        .piclistshow .picimg{ height:100px}
        .picbox ul li i{ margin:2px}
        .picinfo{ display:none}
        .picshowlist,.pictxt{ display:none}
        .lmname,.view{ display:none}
        .r_box li i{ float:none; margin:0 auto 20px; width:100%; max-height:150px}
    }

</style>