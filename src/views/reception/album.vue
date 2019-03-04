<template>
<div>
    <myHeader></myHeader>
    <article>
        <div class="containers">
            <h2 class="ctitle"><b>清新相册</b> <span>好咖啡要和朋友一起品尝，好“照片”也要和同样喜欢它的人一起分享。</span></h2>
            <div class="blog" data-scroll-reveal="enter top" >
                <figure>
                    <ul>
                        <router-link to="/showPhoto"><img src="../../images/reception/001.png"><span>点我进去</span></router-link>
                    </ul>
                    <p><a href="/">灯具公司复古风格PSD设计稿</a></p>
                    <figcaption>此模板为PSD设计稿，复古风格。首页主要突出产品，以及公司简介。手绘灯作为头部背景图片，这个比较特别。html可以做出灯一闪一闪的效果，或者说旁边有个按钮...</figcaption>
                </figure>
                <figure>
                    <ul>
                        <router-link to="/showPhoto"><img src="../../images/reception/001.png"><span>点我进去</span></router-link>
                    </ul>
                    <p><a href="/">个人博客模板古典系列之——江南墨..</a></p>
                    <figcaption>一共是四个页面，首页，图文列表，图片列表，文字内容。此模板风格为中国古典风格，山水画墨迹成就一幅江南墨卷。页面首页设计较为简单，突出文章重点。图文列表显示...</figcaption>
                </figure>
                <figure>
                    <ul>
                        <router-link to="/showPhoto"><img src="../../images/reception/001.png"><span>点我进去</span></router-link>
                    </ul>
                    <p><a href="/">美丽的茧</a></p>
                    <figcaption>让世界拥有它的脚步，让我保有我的茧。当溃烂已极的心灵再不想做一丝一毫的思索时，就让我静静回到我的茧内，以回忆为睡榻，以悲哀为覆被，这是我唯一的美丽。</figcaption>
                </figure>
                <figure>
                    <ul>
                        <router-link to="/showPhoto"><img src="../../images/reception/001.png"><span>点我进去</span></router-link>
                    </ul>
                    <p><a href="/">灯具公司复古风格PSD设计稿</a></p>
                    <figcaption>此模板为PSD设计稿，复古风格。首页主要突出产品，以及公司简介。手绘灯作为头部背景图片，这个比较特别。html可以做出灯一闪一闪的效果，或者说旁边有个按钮...</figcaption>
                </figure>
                <figure>
                    <ul>
                        <a href="/"><img src="../../images/reception/001.png"><span>点我进去</span></a>
                    </ul>
                    <p><a href="/">个人博客模板古典系列之——江南墨..</a></p>
                    <figcaption>一共是四个页面，首页，图文列表，图片列表，文字内容。此模板风格为中国古典风格，山水画墨迹成就一幅江南墨卷。页面首页设计较为简单，突出文章重点。图文列表显示...</figcaption>
                </figure>
                <figure>
                    <ul>
                        <a href="/"><img src="../../images/reception/001.png"><span>点我进去</span></a>
                    </ul>
                    <p><a href="/">美丽的茧</a></p>
                    <figcaption>让世界拥有它的脚步，让我保有我的茧。当溃烂已极的心灵再不想做一丝一毫的思索时，就让我静静回到我的茧内，以回忆为睡榻，以悲哀为覆被，这是我唯一的美丽。</figcaption>
                </figure>
            </div>
            <div class="page"><a title="Total record"><b>107</b> </a><b>1</b><a href="/news/index_2.html">2</a><a href="/news/index_3.html">3</a><a href="/news/index_4.html">4</a><a href="/news/index_5.html">5</a><a href="/news/index_2.html">&gt;</a><a href="/news/index_5.html">&gt;&gt;</a></div>
        </div>
    </article>
    <myFooter></myFooter>
</div>

</template>

<script>
    import '../../assets/js/scrollReveal'
    export default {
        name: "album"
    }
</script>

<style scoped>
    /* blog */
    .blog { margin: 30px 44px; overflow: hidden }
    .blog figure { background: #ececec; border: #FFF 10px solid; width: 270px; height: 430px; float: left; margin: 0 8px 20px; overflow: hidden }
    .blog figure img { display: block; margin: auto; height: 256px; overflow: hidden; }
    .blog figure p { font-size: 14px; text-shadow: #fff 1px 1px 0px; line-height: 26px; text-align: center; font-weight: bold }
    .blog figure p a { color: #226039; }
    .blog figure figcaption { padding: 10px; line-height: 22px; color: #666; }
    .blog figure ul { background: url(../../images/reception/001.png) no-repeat center; overflow: hidden; height: 256px; margin-bottom: 20px }
    .blog figure ul span { opacity: 0 }
    .blog figure ul:hover span { opacity: 1 }
    .blog figure ul a { position: relative; display: block }
    .blog figure ul span { position: absolute; left: 0px; top: 0px; background: rgba(0,0,0,0.5)  no-repeat center 10px; color: #FFF; display: block; width: 100%; height: 100%; line-height: 256px; text-align: center; -webkit-transition: all 0.5s; -moz-transition: all 0.5s; -o-transition: all 0.5s; -ms-transition: all 0.5s; text-decoration: underline }
    article { background: url(../../images/reception/album-back.jpg) repeat; }
</style>