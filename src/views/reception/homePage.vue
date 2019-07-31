<template>
    <div id="front-main-content">
        <div class="banner">
        <section class="box">
            <ul class="texts">
                <p v-for="data in exhibitData">{{ data }}</p>
            </ul>
            <div class="avatar"><a href="#"><span>坏小哥</span></a></div>
            <div class="preserve">
                <div class="wrap-box">
                    <div class="cube">
                        <div class="out-front"></div>
                        <div class="out-back"></div>
                        <div class="out-left"></div>
                        <div class="out-right"></div>
                        <div class="out-top"></div>
                        <div class="out-bottom"></div>
                        <span class="in-front"></span>
                        <span class="in-back"></span>
                        <span class="in-left"></span>
                        <span class="in-right"></span>
                        <span class="in-top"></span>
                        <span class="in-bottom"></span>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="template">
        <div class="box scroll-photo">
            <ul id="photo-ul">
                <li v-for="photo in photoData"><img :src="getPhotoUrl + photo.phot_path"></li>
            </ul>
        </div>
    </div>
    <article>
        <h2 class="title_tj">
            <p>文章<span>推荐</span></p>
        </h2>
        <div class="bloglist left">
            <div v-for="item in articalData" :key="item.id">
            <h4>
                <span>{{ item.arti_title }}</span>
                <span class="date">{{ item.years }}-{{item.monthDay }}</span>
            </h4>
            <figure><img :src="getArticalCover + item.arti_cover"></figure>
            <ul>
                <p>{{ item.arti_content }}</p>
                <router-link :to="{ name: 'showArtical', query: {artId: item.arti_id}}" title="/"  target="_blank" class="readmore" >阅读全文>></router-link>
            </ul>
                <p class="dateview"><span>{{ item.arti_create_time}}</span><span>作者：张腾飞</span><span>个人博客：[<span>坏小哥</span>]</span></p>
            </div>
        </div>
        <aside class="right">
            <div class="today-weather">

                <div class="wleft">
                    <div class="wtname">
                        <strong style="line-height:18px; font-family:'微软雅黑'">{{ todayWeather.date }}</strong>
                        <a v-bind:href="weatherUrl" target="_blank" style="line-height:18px; font-family:'微软雅黑'">{{ cityName }}</a>
                    </div>
                    <div class="order-one">
                        <a style=" font-family:'微软雅黑'">{{ todayWeather.type }}天</a>
                    </div>
                    <div class="order-two">
                        <span style=" font-family:'微软雅黑'">后续四天如下:</span>
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
                    <li><a target="_blank" href="https://blog.csdn.net/weixin_43885417">个人CSDN博客</a></li>
                    <li><a target="_blank" href="https://github.com/zhangtengfei2232">个人GitHub code</a></li>
                    <li><a target="_blank" href="https://www.cnblogs.com/l199616j">小宝贝博客园</a></li>
                    <li><a target="_blank" href="https://github.com/l199616j0">小宝贝GitHub code</a></li>
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
                getArticalCover: ApiPath.common.getArticalCover,
                getPhotoUrl: ApiPath.common.getAlbumPhoto,
                weatherUrl: 'https://www.tianqi.com/',
                testMusicData: [],
                musicNum: 0,
                cityName: '',
                photoData: [],
                exhibitData: [],
            }

        },
        methods: {
            showMainPage(){
                let self = this;
                this.GET(ApiPath.homePage.showMain)
                    .then(function (res) {
                        if(res.data.code == 0){
                            let data = res.data.data;
                            self.articalData = data.new_artical;
                            self.browseTop = data.browse_top;
                            self.photoData = data.new_photo;
                            self.exhibitData = data.exhibit_data;
                            setTimeout(function () {
                                let roll=$("#photo-ul")[0];
                                let cube = document.querySelector('.cube');
                                let cubeDiv = cube.querySelectorAll('div');
                                let cubeSpan = cube.querySelectorAll('span');
                                for (let i = 0; i < cubeDiv.length; i++) {
                                    $(cubeDiv[i]).css('background-image',"url("+self.getPhotoUrl + self.photoData[i].phot_path+")");//内部添加图片
                                }
                                for (let i = 0; i < cubeSpan.length; i++) {
                                    $(cubeSpan[i]).css('background-image',"url("+ self.getPhotoUrl + self.photoData[i].phot_path+")");//外部添加图片
                                }
                                // setInterval(function(){
                                //     $(roll).css('left',(roll.offsetLeft - 1) + "px");
                                //     if(roll.offsetLeft < -930){
                                //         $(roll).css('left',(roll.offsetWidth + 620) +"px");
                                //     }
                                // },2);

                            },1000);
                        }else {
                            self.$message.error("没有得到任何信息");
                        }
                    })
            },
            getCityName() {
                let self = this;
                self.GET(ApiPath.common.getCityName).then(function (res) {
                    if(res.data.code === 0){
                        self.cityName = res.data.data.city_name;
                        self.weatherUrl = self.weatherUrl + pinyin.getFullChars(self.cityName).toLowerCase() + "/?tq";
                        $.ajax({
                            type: 'GET',
                            url: "http://wthrcdn.etouch.cn/weather_mini?city=" + self.cityName,
                            success: function (data){
                                var date = new Date;
                                var reg =  /[\u4e00-\u9fa5]/g;
                                let month = date.getMonth() + 1;
                                self.weatherData  = JSON.parse(data).data.forecast;
                                self.todayWeather = JSON.parse(data).data.forecast[0];
                                self.todayWeather.date = month + '月' + self.todayWeather.date;
                                self.todayWeather.low  = self.todayWeather.low.replace(reg, "");
                                self.todayWeather.high = self.todayWeather.high.replace(reg, "");
                                self.todayWeather.fengli = self.todayWeather.fengli.replace(/[^0-9]/ig,"");
                                if(self.todayWeather.fengli.length > 1){
                                    self.todayWeather.fengli = self.todayWeather.fengli.charAt(0) + '-'
                                        + self.todayWeather.fengli.charAt(1);
                                }
                                self.todayWeather.fengli = self.todayWeather.fengxiang + ',  ' + self.todayWeather.fengli + '级';
                                self.todayWeather['temperature'] = self.todayWeather.low + " ~ " + self.todayWeather.high;
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
                    }
                });

            },
            showArtical(art_id){
                let path = `/showArtical?artId=${art_id}`;
                window.open(path, '_blank');
            }
        },
        mounted(){
            this.showMainPage();
            this.getCityName();
        }
    }

</script>

<style scoped>
    #photo-ul li{
        animation: geiwogun 10s linear infinite;
    }

    @keyframes geiwogun {
        from {
            transform: translate(1500px, 0);
        }
        to {
            transform: translate(-950px, 0);
        }
    }
    #photo-ul{
        margin: 10px 0 0 0;
        width: 100%;
    }
    article{
        width: 68%;
    }
    .box{
        height: 150px;
        display: flex;
        /*margin-top: 2%;*/
    }
    .scroll-photo{
        width: 100%;
    }
    /*3d盒子*/
    .preserve {
        margin-left: auto;
        margin-right: auto;
        margin-top: 3%;
        width: 11%;
        height: 167.1px;
        background-position: center -10px;
        background-size: cover;
    }
    .wrap-box{
        width: 100%;
        height: 100%;
        /*padding-top:250px;*/
        /*padding-bottom: 250px;*/
        perspective: 1080px; /*视图距元素的距离*/
    }
    .cube{
        width:60%;
        height:60%;
    }
    .wrap-box .cube{
        margin: 0 auto;
        position:relative;
        transform-style:preserve-3d;/*透视*/
        transform:rotateX(-30deg) rotateY(-70deg);
        animation:rotate 20s infinite linear; /*循环执行*/
    }
    @keyframes rotate{/*动画*/
        0%{
            transform:rotateX(0deg) rotateY(0deg);
        }
        100%{
            transform:rotateX(360deg) rotateY(360deg);
        }
    }
    .wrap-box .cube > div{/*给儿子设置*/
        width:70%;
        height:70%;
        border:1px solid #fff;
        background-size: cover;
        position:absolute;
        opacity:0.75;
        transition:transform 0.6s ease-in;
    }
    /*改变图片坐标*/
    .wrap-box .cube .out-front{
        transform: translateZ(35px);
    }
    .wrap-box .cube .out-back{
        transform: translateZ(-35px) rotateY(180deg);
    }
    .wrap-box .cube .out-left{
        transform: translateX(-35px) rotateY(-90deg);
    }
    .wrap-box .cube .out-right{
        transform: translateX(35px) rotateY(90deg);
    }
    .wrap-box .cube .out-top{
        transform: translateY(-35px) rotateX(90deg);
    }
    .wrap-box .cube .out-bottom{
        transform: translateY(35px) rotateX(-90deg);
    }
    .wrap-box .cube > span{
        display:block;
        width:40%;
        height:40%;
        border:1px solid black;
        background-size: cover;
        position:absolute;
        top:18px;
        left:18px;
    }
    .wrap-box .cube .in-front{
        transform: translateZ(20px);
    }
    .wrap-box .cube .in-back{
        transform: translateZ(-20px) rotateY(180deg);
    }
    .wrap-box .cube .in-left{
        transform: translateX(-20px) rotateY(-90deg);
    }
    .wrap-box .cube .in-right{
        transform: translateX(20px) rotateY(90deg);
    }
    .wrap-box .cube .in-top{
        transform: translateY(-20px) rotateX(90deg);
    }
    .wrap-box .cube .in-bottom{
        transform: translateY(20px) rotateX(-90deg);
    }
    .wrap-box:hover .out-front{
        transform: translateZ(70px);
    }
    .wrap-box:hover .out-back{
        transform: translateZ(-70px) rotateY(180deg);
    }
    .wrap-box:hover .out-left{
        transform: translateX(-70px) rotateY(-90deg);
    }
    .wrap-box:hover .out-right{
        transform: translateX(70px) rotateY(90deg);
    }
    .wrap-box:hover .out-top{
        transform: translateY(-70px) rotateX(90deg);
    }
    .wrap-box:hover .out-bottom{
        transform: translateY(70px) rotateX(-90deg);
    }
    .date{
        float: right;
        margin-right: 5%;
    }
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
    .texts { width: 350px; line-height: 26px; margin: 40px 0 0 326px; float: left; font-size: 14px; }
    .texts p { -webkit-transform: translate(60px); -moz-transform: translate(60px); -o-transform: translate(60px); -ms-transform: translate(60px); transform: translate(60px); text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8), 2px 2px 3px rgba(180, 151, 151, 0.3); }
    .texts p:nth-child(1) { -webkit-animation: animations 3s ease-out 1s backwards; -moz-animation: animations 3s ease-out 1s backwards; -o-animation: animations 3s ease-out 1s backwards; -ms-animation: animations 3s ease-out 1s backwards; animation: animations 3s ease-out 1s backwards; }
    .texts p:nth-child(2) { -webkit-animation: animations 3s ease-out 4s backwards; -moz-animation: animations 3s ease-out 4s backwards; -o-animation: animations 3s ease-out 4s backwards; -ms-animation: animations 3s ease-out 4s backwards; animation: animations 3s ease-out 4s backwards; }
    .texts p:nth-child(3) { -webkit-animation: animations2 5s ease-in-out 7s backwards; -moz-animation: animations2 5s ease-in-out 7s backwards; -o-animation: animations2 5s ease-in-out 7s backwards; -ms-animation: animations2 5s ease-in-out 7s backwards; animation: animations2 5s ease-in-out 7s backwards; }
    .avatar { margin-left: 30%;margin-top: 3%;width: 130px;height: 130px;border-radius: 100%;overflow: hidden;border: #FFF 4px solid;}
    .avatar a { display: block; padding-top: 97px; width: 160px; background: url(../../images/reception/me.jpg) no-repeat; background-size: 130px 130px }
    .avatar a span { display: block; margin-top: 63px; padding-top: 3px;
        width: 130px; height: 55px; text-align: center;
        line-height: 20px; color: #fff; background: rgba(0, 0, 0, .5);
        -webkit-transition: margin-top .2s ease-in-out;
        -moz-transition: margin-top .2s ease-in-out; -o-transition: margin-top .2s ease-in-out;
        transition: margin-top .2s ease-in-out;
    }
    .avatar a:hover span { display: block; margin-top: 0; }
    .template { background: #F1F0EE;height: 118px }
    .template h3 { border-bottom: #FFF 1px solid; width: 100%; overflow: hidden; font-size: 14px; margin: 0 0 10px; font-family: "Î¢ÈíÑÅºÚ"; display: block; clear: both; }
    .template h3 p { background: #474645; width: 240px; height: 25px; margin: 15px 0 0 10px; line-height: 25px; color: #fff; text-align: center; box-shadow: #999 4px 5px 1px; }
    .template h3 p span { color: #38b3d4; }
    .template ul { overflow: hidden;height: 100px;}
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
    .dateview span span { color: #099B43; }
    a.readmore { background: #fd8a61; color: #fff; padding: 5px 10px; float: right; margin: 20px 0 0 0 }
    .today-weather{ background: url(../../images/reception/weather_bg.jpg) no-repeat; height: 88px; padding: 0 0 0 55px;}
    .news{ margin-top: 30px; }
    .news h3 { font-size: 14px; background: url(../../images/reception/r_title_bg.jpg) repeat-x center }
    .news h3 p { background: #fff; width: 70px }
    .news h3 span { color: #65b020 }
    .news h3.ph span { color: #37ccca; }
    .news h3.links span { color: #F17B6B; }
    .news ul { margin-bottom: 20px }
    .news ul li a:hover { text-decoration: underline }
    .paih { margin: 10px 0 }
    .paih li { line-height: 30px; height: 30px; overflow: hidden; padding-left: 24px; border-bottom: #CCC dotted 1px }
    .website { margin: 10px 0; background: #F3F3F3; border-radius: 50%; text-align: center; }
    .website li { line-height: 26px; text-shadow: #fff 1px 1px 1px; height: 26px; }
    .wei-xin { background: url(../../images/reception/hxg-gzh.jpg) no-repeat; width: 100%; display: inline-block; height: 274px; overflow: hidden; clear: both }
</style>
