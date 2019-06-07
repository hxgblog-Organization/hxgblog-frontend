<template>
    <div id="front-main-content">
        <div class="banner">
        <section class="box">
            <ul class="texts">
                <p>Where there is a will, there is a way!</p>
                <p>As long as you feel, nothing is impossible!</p>
                <p>To be or not to be, that's a question! —— Shakespeare</p>
            </ul>
            <div class="avatar"><a href="#"><span>坏小哥</span></a></div>
        </section>
    </div>
    <div class="template">
        <div class="box">
            <h3>
                <p><span>个人博客</span>~随便写写，记录点点滴滴！</p>
            </h3>
            <ul>
                <li><a href="/" target="_blank"><img src="../../images/reception/001.png"></a><span>仿新浪博客风格·梅——古典个人博客模板</span></li>
                <li><a href="/" target="_blank"><img src="../../images/reception/001.png"></a><span>黑色质感时间轴html5个人博客模板</span></li>
                <li><a href="/" target="_blank"><img src="../../images/reception/001.png"></a><span>Green绿色小清新的夏天-个人博客模板</span></li>
                <li><a href="/" target="_blank"><img src="../../images/reception/001.png"></a><span>女生清新个人博客网站模板</span></li>
                <li><a href="/" target="_blank"><img src="../../images/reception/001.png"></a><span>黑色质感时间轴html5个人博客模板</span></li>
                <li><a href="/" target="_blank"><img src="../../images/reception/001.png"></a><span>Green绿色小清新的夏天-个人博客模板</span></li>
            </ul>
        </div>
    </div>
    <article>
        <h2 class="title_tj">
            <p>文章<span>推荐</span></p>
        </h2>
        <div class="bloglist left">
            <div v-for="item in articalData" :key="item.id">
            <h3>{{ item.arti_title }}</h3>
            <figure><img src="../../images/reception/001.png"></figure>
            <ul>
                <p>{{ item.arti_content }}</p>
                <router-link :to="{ name: 'showArtical', query: {artId: item.arti_id}}" title="/"  target="_blank" class="readmore" >阅读全文>></router-link>
            </ul>
            <p class="dateview"><span>{{ item.arti_create_time}}</span><span>作者：张腾飞</span><span>个人博客：[<a href="/news/life/">坏小哥</a>]</span></p>
            </div>
        </div>
        <aside class="right">
            <div class="today-weather">

                <div class="wleft">
                    <div class="wtname">
                        <strong style="line-height:18px; font-family:'微软雅黑'">{{ todayWeather.date }}</strong>
                        <a v-bind:href="weatherUrl" target="_blank" style="line-height:18px; font-family:'微软雅黑'">{{ city }}</a>
                    </div>
                    <div class="order-one">
                        <a style=" font-family:'微软雅黑'">{{ todayWeather.type }}天</a>
                    </div>
                    <div class="order-two">
                        <a style=" font-family:'微软雅黑'">后续四天如下:</a>
                    </div>
                </div>
                <div class="wt">
                    <div class="wt1">
                        <div class="wtline">
                            <strong style="font-family:'微软雅黑'">温度范围</strong>
                        </div>
                        <div class="wtline" style="font-family:'微软雅黑'">{{ todayWeather.temperature }}</div>
                        <div class="wtline">
                            <strong style="font-family:'微软雅黑'">风况</strong>
                        </div>
                        <div class="wtline" style="font-family:'微软雅黑'">{{ todayWeather.fengli }}</div>
                    </div>
                </div>
            </div>
            <div class="weather" style="font-size: 2px">
                    <el-table
                            :data="weatherData"
                            :height="height"
                            stripe
                            style="width: 100%;font-size: 5px">
                        <el-table-column
                                prop="temperature"
                                label="温度范围">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="天气类型"
                                :width="width">
                        </el-table-column>
                    </el-table>
            </div>
            <div class="news">
                <h3 class="ph">
                    <p>点击<span>排行</span></p>
                </h3>
                <ul class="paih">
                    <li v-for="items in browseTop" :key="items.id"><a @click="showArtical(items.arti_id)" target="_blank">{{ items.arti_title }}</a></li>
                </ul>
                <h3 class="links">
                    <p>友情<span>链接</span></p>
                </h3>
                <ul class="website">
                    <li><a href="/">个人博客</a></li>
                    <li><a href="/">个人CSDN博客</a></li>
                    <li><a href="/">爱民博客</a></li>
                    <li><a href="/">李静博客</a></li>
                    <li><a href="/">XXXX博客</a></li>
                    <li><a href="/">XXXX博客</a></li>
                </ul>
            </div>
            <a href="/" class="wei-xin"> </a></aside>
    </article>
    </div>
</template>

<script>
    export default {
        name: "homePage",
        data() {
            return {
                articalData: {},
                browseTop  : {},
                weatherData: [],
                todayWeather: {},
                width: 100,
                height: 236,
                city: '',
                weatherUrl: 'https://www.tianqi.com/',
            }

        },
        methods: {
            showMainPage(){
                let self = this;
                this.GET(ApiPath.homePage.showMain)
                    .then(function (res) {
                        if(res.data.code == 0){
                            console.log( res.data.data);
                            let data = res.data.data;
                            self.city = data.weather;
                            self.weatherUrl = self.weatherUrl + pinyin.getFullChars(self.city).toLowerCase() + "/?tq";
                            self.articalData = data.new_artical;
                            self.browseTop = data.browse_top;
                            $.ajax({
                                type: 'GET',
                                url: "http://wthrcdn.etouch.cn/weather_mini?city=" + self.city,
                                success: function (data){
                                    var date = new Date;
                                    var reg =  /[\u4e00-\u9fa5]/g;
                                    let month = date.getMonth() + 1;
                                    self.weatherData  = JSON.parse(data).data.forecast;
                                    self.todayWeather = JSON.parse(data).data.forecast[0];
                                    self.todayWeather.date = month + '月' + self.todayWeather.date;
                                    console.log(self.todayWeather.date);
                                    self.todayWeather.low  = self.todayWeather.low.replace(reg, "");
                                    self.todayWeather.high = self.todayWeather.high.replace(reg, "");
                                    self.todayWeather.fengli = self.todayWeather.fengli.replace(/[^0-9]/ig,"");
                                    if(self.todayWeather.fengli.length > 1){
                                        self.todayWeather.fengli = self.todayWeather.fengli.charAt(0) + '-'
                                            + self.todayWeather.fengli.charAt(1);
                                    }
                                    self.todayWeather.fengli = self.todayWeather.fengxiang + ',  ' + self.todayWeather.fengli + '级';
                                    self.todayWeather['temperature'] = self.todayWeather.low + " ~ " + self.todayWeather.high;
                                    console.log(self.todayWeather);
                                    for(var index in self.weatherData){
                                        self.weatherData[index].low  = self.weatherData[index].low.replace(reg, "");
                                        self.weatherData[index].high = self.weatherData[index].high.replace(reg, "");
                                        self.weatherData[index]['temperature'] = self.weatherData[index].low + " ~ " + self.weatherData[index].high;
                                        delete  self.weatherData[index].low;
                                        delete  self.weatherData[index].high;
                                        delete  self.weatherData[index].fengxiang;
                                        delete  self.weatherData[index].fengli;
                                        delete  self.weatherData[index].date;
                                    }
                                    self.weatherData.shift();
                                }
                            });
                        }else {
                            self.$message.error("没有得到任何信息");
                        }
                    })
            },
            showArtical(art_id){
                let path = `/showArtical?artId=${art_id}`;
                window.open(path, '_blank');
            }
        },
        mounted(){
            this.showMainPage();
        }
    }
</script>

<style scoped>
    .wleft{
        width: 85px;
        float: left;
    }
    .wtname{
        width: 100%;
        float: left;
        margin-top: 8px;
        height: 20px;
    }
    .order-one, order-two{
        width: 100%;
        float: left;
        height: 20px;
    }
    .order-one{
        margin-top: 20px;
    }
    .order-two{

    }
    .wt{
        width: 104px;
        float: right;
        margin-top: 5px;
    }
    .wtpic{
        line-height: 48px;
        height: 48px;
        width: 48px;
        float: left;
    }
    .wt1{
        width: 75px;
        float: left;
    }
    .wtline{
        width: 100%;
        float: left;
        height: 18px;
        line-height: 18px;
        margin-top: 3px;
    }
    .banner {  margin-top:20px;height: 215px; overflow: hidden }
    .texts { width: 350px; line-height: 26px; margin: 40px 0 0 20px; float: left; font-size: 14px; }
    .texts p { -webkit-transform: translate(60px); -moz-transform: translate(60px); -o-transform: translate(60px); -ms-transform: translate(60px); transform: translate(60px); text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8), 2px 2px 3px rgba(180, 151, 151, 0.3); }
    .texts p:nth-child(1) { -webkit-animation: animations 3s ease-out 1s backwards; -moz-animation: animations 3s ease-out 1s backwards; -o-animation: animations 3s ease-out 1s backwards; -ms-animation: animations 3s ease-out 1s backwards; animation: animations 3s ease-out 1s backwards; }
    .texts p:nth-child(2) { -webkit-animation: animations 3s ease-out 4s backwards; -moz-animation: animations 3s ease-out 4s backwards; -o-animation: animations 3s ease-out 4s backwards; -ms-animation: animations 3s ease-out 4s backwards; animation: animations 3s ease-out 4s backwards; }
    .texts p:nth-child(3) { -webkit-animation: animations2 5s ease-in-out 7s backwards; -moz-animation: animations2 5s ease-in-out 7s backwards; -o-animation: animations2 5s ease-in-out 7s backwards; -ms-animation: animations2 5s ease-in-out 7s backwards; animation: animations2 5s ease-in-out 7s backwards; }
    @-webkit-keyframes animations { 0% {
        -webkit-transform:translate(0);
        opacity:0;
    }
        50% {
            -webkit-transform:translate(30px);
            opacity:.5;
        }
        100% {
            -webkit-transform:translate(60px);
            opacity:1;
        }
    }
    @-moz-keyframes animations { 0% {
        -moz-transform:translate(0);
        opacity:0;
    }
        50% {
            -moz-transform:translate(30px);
            opacity:.5;
        }
        100% {
            -moz-transform:translate(60px);
            opacity:1;
        }
    }
    @-o-keyframes animations { 0% {
        -o-transform:translate(0);
        opacity:0;
    }
        50% {
            -o-transform:translate(30px);
            opacity:.5;
        }
        100% {
            -o-transform:translate(60px);
            opacity:1;
        }
    }
    @-ms-keyframes animations { 0% {
        -ms-transform:translate(0);
        opacity:0;
    }
        50% {
            -ms-transform:translate(30px);
            opacity:.5;
        }
        100% {
            -ms-transform:translate(60px);
            opacity:1;
        }
    }
    @keyframes animations { 0% {
        transform:translate(0);
        opacity:0;
    }
        50% {
            transform:translate(30px);
            opacity:.5;
        }
        100% {
            transform:translate(60px);
            opacity:1;
        }
    }
    @-webkit-keyframes animations2 { 0% {
        opacity:0;
    }
        40% {
            opacity:.8;
        }
        45% {
            opacity:.3;
        }
        50% {
            opacity:.8;
        }
        55% {
            opacity:.3;
        }
        60% {
            opacity:.8;
        }
        100% {
            opacity:1;
        }
    }
    @-moz-keyframes animations2 { 0% {
        opacity:0;
    }
        40% {
            opacity:.8;
        }
        45% {
            opacity:.3;
        }
        50% {
            opacity:.8;
        }
        55% {
            opacity:.3;
        }
        60% {
            opacity:.8;
        }
        100% {
            opacity:1;
        }
    }
    @-o-keyframes animations2 { 0% {
        opacity:0;
    }
        40% {
            opacity:.8;
        }
        45% {
            opacity:.3;
        }
        50% {
            opacity:.8;
        }
        55% {
            opacity:.3;
        }
        60% {
            opacity:.8;
        }
        100% {
            opacity:1;
        }
    }
    @-ms-keyframes animations2 { 0% {
        opacity:0;
    }
        40% {
            opacity:.8;
        }
        45% {
            opacity:.3;
        }
        50% {
            opacity:.8;
        }
        55% {
            opacity:.3;
        }
        60% {
            opacity:.8;
        }
        100% {
            opacity:1;
        }
    }
    @keyframes animations2 { 0% {
        opacity:0;
    }
        40% {
            opacity:.8;
        }
        45% {
            opacity:.3;
        }
        50% {
            opacity:.8;
        }
        55% {
            opacity:.3;
        }
        60% {
            opacity:.8;
        }
        100% {
            opacity:1;
        }
    }
    .avatar { float: right; margin: 40px; width: 130px; height: 130px; border-radius: 100%; overflow: hidden; border: #FFF 4px solid }
    .avatar a { display: block; padding-top: 97px; width: 160px; background: url(../../images/reception/me.jpg) no-repeat; background-size: 130px 130px }
    .avatar a span { display: block; margin-top: 63px; padding-top: 3px;
        width: 130px; height: 55px; text-align: center;
        line-height: 20px; color: #fff; background: rgba(0, 0, 0, .5);
        -webkit-transition: margin-top .2s ease-in-out;
        -moz-transition: margin-top .2s ease-in-out; -o-transition: margin-top .2s ease-in-out;
        transition: margin-top .2s ease-in-out;
    }
    .avatar a:hover span { display: block; margin-top: 0; }
    .template { background: #F1F0EE }
    .template h3 { border-bottom: #FFF 1px solid; width: 100%; overflow: hidden; font-size: 14px; margin: 0 0 10px; font-family: "Î¢ÈíÑÅºÚ"; display: block; clear: both; }
    .template h3 p { background: #474645; width: 240px; height: 25px; margin: 15px 0 0 10px; line-height: 25px; color: #fff; text-align: center; box-shadow: #999 4px 5px 1px; }
    .template h3 p span { color: #38b3d4; }
    .template ul { overflow: hidden; }
    .template ul li { margin: 3px; float: left; display: block; padding: 5px 5px 6px 5px; -webkit-transition: all 1s; -moz-transition: all 1s; -o-transition: all 1s; transition: all 1s; }
    .template li img { width: 142px; height: 80px; background: #FFF; padding: 4px; box-shadow: 0px 0px 2px rgba(0,0,0,.5); display: block; }
    .template li span { color: #F1F0EE; display: block; text-align: center; margin-top: 5px; width: 142px; overflow: hidden; text-overflow: ellipsis; height: 14px }
    .template li:hover { background: #666; padding: 5px 5px 6px 5px; }
    h2.title_tj { font: 18px "Î¢ÈíÑÅºÚ", Arial, Helvetica, sans-serif; color: #444; font-weight: bold; background: url(../../images/reception/h_line.jpg) repeat-x 20px center; }
    h2.title_tj span { color: #FE5187 }
    h2.title_tj p { background: #fff; width: 90px }
    .bloglist { width: 740px; overflow: hidden; background: url(../../images/reception/r_line.jpg) repeat-y right; }
    .bloglist h3 { margin: 20px 0 10px 0; color: #333 }
    .bloglist figure { float: left; width: 183px; }
    .bloglist figure img { padding: 4px; border: #f4f2f2 1px solid; width: 175px; }
    .bloglist ul { float: left; width: 520px; margin: 10px 0px 0 15px; line-height: 20px; }
    .dateview { width: 695px; overflow: hidden; clear: both; margin: 10px 0 0 0; display: inline-block; background: #f6f6f6 url(../../images/reception/time.jpg) 15px center no-repeat; line-height: 26px; height: 26px; color: #838383; padding-left: 25px }
    .dateview span { margin: 0 10px; }
    .dateview span a { color: #099B43; }
    a.readmore { background: #fd8a61; color: #fff; padding: 5px 10px; float: right; margin: 20px 0 0 0 }
    .today-weather{
        background: url(../../images/reception/weather_bg.jpg) no-repeat; height: 88px; padding: 0 0 0 55px;
    }
    .news{
        margin-top: 30px;
    }
    .weather { }
    .news h3 { font-size: 14px; background: url(../../images/reception/r_title_bg.jpg) repeat-x center }
    .news h3 p { background: #fff; width: 70px }
    .news h3 span { color: #65b020 }
    .news h3.ph span { color: #37ccca; }
    .news h3.links span { color: #F17B6B; }
    .news ul { margin-bottom: 20px }
    .news ul li a:hover { text-decoration: underline }
    .rank li { height: 25px; line-height: 25px; clear: both; padding-left: 5px; overflow: hidden; padding-left: 15px; background: url(../../images/reception/li.jpg) no-repeat left center; }
    .rank { margin: 10px 0 }
    .rank li a { color: #333; }
    .paih { margin: 10px 0 }
    .paih li { line-height: 30px; height: 30px; overflow: hidden; padding-left: 24px; border-bottom: #CCC dotted 1px }
    .website { margin: 10px 0; background: #F3F3F3; border-radius: 50%; text-align: center; }
    .website li { line-height: 26px; text-shadow: #fff 1px 1px 1px; height: 26px; }
    .wei-xin { background: url(../../images/reception/hxg-gzh.jpg) no-repeat; width: 100%; display: inline-block; height: 274px; overflow: hidden; margin: 10px 0; clear: both }
</style>