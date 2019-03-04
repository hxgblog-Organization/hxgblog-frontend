<template>
    <div class="show-artical">
        <myHeader></myHeader>
        <article>
            <div class="l_box">
                <div class="search">
                    <form action="/e/search/index.php" method="post" name="searchform" id="searchform">
                        <input name="keyboard" id="keyboard" class="input_text" value="请输入关键字词" style="color: rgb(153, 153, 153);" onfocus="if(value=='请输入关键字词'){this.style.color='#000';value=''}" onblur="if(value==''){this.style.color='#999';value='请输入关键字词'}" type="text">
                        <input name="show" value="title" type="hidden">
                        <input name="tempid" value="1" type="hidden">
                        <input name="tbname" value="news" type="hidden">
                        <input name="Submit" class="input_submit" value="搜索" type="submit">
                    </form>
                </div>
                <div class="fenlei">
                    <h2>文章分类</h2>
                    <ul>
                        <li><a href="/">学无止境（33）</a></li>
                        <li><a href="/">日记（19）</a></li>
                        <li><a href="/">慢生活（520）</a></li>
                        <li><a href="/">美文欣赏（40）</a></li>
                    </ul>
                </div>
                <div class="tuijian">
                    <h2>站长推荐</h2>
                    <ul>
                        <li><a href="/">你是什么人便会遇上什么人</a></li>
                        <li><a href="/">帝国cms 列表页调用子栏目，没有则不显示栏目名称</a></li>
                        <li><a href="/">第二届 优秀个人博客模板比赛参选活动</a></li>
                        <li><a href="/">个人博客模板《绅士》后台管理</a></li>
                        <li><a href="/">你是什么人便会遇上什么人</a></li>
                        <li><a href="/">帝国cms 列表页调用子栏目，没有则不显示栏目名称</a></li>
                        <li><a href="/">第二届 优秀个人博客模板比赛参选活动</a></li>
                        <li><a href="/">个人博客模板《绅士》后台管理</a></li>
                    </ul>
                </div>
                <div class="tuijian">
                    <h2>点击排行</h2>
                    <ul>
                        <li><a href="/">你是什么人便会遇上什么人</a></li>
                        <li><a href="/">帝国cms 列表页调用子栏目，没有则不显示栏目名称</a></li>
                        <li><a href="/">第二届 优秀个人博客模板比赛参选活动</a></li>
                        <li><a href="/">个人博客模板《绅士》后台管理</a></li>
                        <li><a href="/">你是什么人便会遇上什么人</a></li>
                        <li><a href="/">帝国cms 列表页调用子栏目，没有则不显示栏目名称</a></li>
                        <li><a href="/">第二届 优秀个人博客模板比赛参选活动</a></li>
                        <li><a href="/">个人博客模板《绅士》后台管理</a></li>
                    </ul>
                </div>
                <div class="cloud">
                    <h2>标签云</h2>
                    <ul>
                        <a href="/">陌上花开</a> <a href="/">校园生活</a> <a href="/">html5</a> <a href="/">SumSung</a> <a href="/">青春</a> <a href="/">温暖</a> <a href="/">阳光</a> <a href="/">三星</a><a href="/">索尼</a> <a href="/">华维荣耀</a> <a href="/">三星</a> <a href="/">索尼</a>
                    </ul>
                </div>
                <div class="guanzhu">
                    <h2>关注我 么么哒</h2>
                    <ul>
                        <img src="images/wx.jpg">
                    </ul>
                </div>
            </div>

            <div class="infosbox">
            <div class="newsview">
                <h3 class="news_title">个人博客，属于我的小世界！</h3>
                <div class="bloginfo">
                    <ul>
                        <li class="author">作者：<a href="/">杨青</a></li>
                        <li class="lmname"><a href="/">学无止境</a></li>
                        <li class="timer">时间：2018-5-13</li>
                        <li class="view">4567人已阅读</li>
                    </ul>
                </div>
                <div class="tags"><a href="/" target="_blank">个人博客</a> &nbsp; <a href="/" target="_blank">小世界</a></div>
                <div class="news_about"><strong>简介</strong>个人博客，用来做什么？我刚开始就把它当做一个我吐槽心情的地方，也就相当于一个网络记事本，写上一些关于自己生活工作中的小情小事，也会放上一些照片，音乐。每天工作回家后就能访问自己的网站，一边听着音乐，一边写写文章。</div>
                <div class="news_con"> 本文很长，记录了我博客建站初到现在的过程，还有我从毕业到现在的一个状态，感谢您的阅读，如果你还是学生，也许你能从此文中，找到我们曾经相似的地方。如果你已经工作，有自己的博客，我想，你并没有忘记当初建立个人博客的初衷吧！<br>
                    <br>
                    我的个人博客已经建站有8年的时间了，对它的热爱，一直都是只增未减。回想大学读书的那几年，那会儿非常流行QQ空间，我们寝室的室友还经常邀约去学校的网吧做自己的空间。系里有个男生，空间做得非常漂亮，什么悬浮，开场动画，音乐播放器，我们女生羡慕得不得了。还邀约他跟我们一起去通宵弄空间，网上可以找到很多免费的flash资源，还有音乐，那也是第一次接触js，知道在浏览器输入一个地址，修改一下数据，就能调用一些背景出来。然后把自己QQ空间弄得漂漂亮亮的，经常邀约室友来互踩。我记得08年地震，第二天晚上，我们寝室的几个人还淡定的在寝室装扮空间呢！<br>
                    <br>
                    <img alt="" src="../../images/reception/001.png"><br>
                    <br>
                    后来空间收费项目也多了，官方漏洞也修复了，加上临近毕业，又要忙着做毕业设计，就没再打理QQ空间。我知道现在的九零后，零零后，你们肯定没看过《一帘幽梦》，那会儿我也是疯狂追剧，喜欢上紫菱，喜欢上她的网站。想看看她的小世界，而我更想学着做一个她那样的网站。那会儿还天真的以为网上真的有她的网站，百度搜了好些天也没有。<br>
                    <br>
                    要毕业的时候，要交作业了，感觉自己什么都没学会。室友拉着我们去看了她同学做的网站，我们一个个佩服得五体投地，甚至觉得太不可思议了。有难度，又怕自己不会。老师教我们怎么布局，怎么做，并没有教我们右键保存网页。不知道是谁先会了这绝技，然后我们一个个又跟打了鸡血似的，疯狂在网上找网页，右键另存为。然后一个个修改文字，图片。仿佛又回到了那会儿做QQ空间那个时候。拿着copy来，并且精心修改的作品，递交了毕业设计，顺利结业。那会儿还是很蒙，一种云里雾里的感觉，竟有种不知道自己到底是会还是不会的感觉，也就是大家常说的毕业迷茫期。<br>
                    <br>
                    <img alt="" src="../../images/reception/001.png"><br>
                    <br>
                    工作后进入社会，出去谈业务，遇到一个对网页设计超级感兴趣的人，聊了一下午都还不够，他是完全自学的，做了一个首页宣传他们的产品。他眼里的我就是专业的，总是请教我一些问题。其实我内心特羡慕人家，每次问我，我也似懂非懂的跟人家解决问题，但我还是经常靠百度来搜索他要的答案。他身上那种好学好问的那股劲儿，也成为我迫切想拥有自己的个人博客的一个重要原因。<br>
                    <br>
                    做博客不是说做就做的，很多东西我都不懂，也不知道要购买域名还有空间。前期要做的工作还是很多。幸好张园同学，也是我实习期的同事，他会这些，教我网上找免费的虚拟空间，然后就是把自己做的页面上传进去，还给了有一个地址，然后就能访问了。那是第一次接触，也了解了整个网站的制作过程，只可惜买域名还有空间需要费用，还在实习期的我，想想也就算了。虚拟空间毕竟是免费的，没多长时间，做过的网页就不能访问了，又得重新注册，重新上传。<br>
                    <br>
                    等自己有一些资金和技术后，我开始买域名和空间。从一开始，我就没想过只是练练手，或者用一段时间就行了。我会一直用下去，所以精心挑选了域名和空间。这些年除了域名没有更换外，后台程序由asp换成了php，空间从西部数据换成万网，也就是现在的阿里云。一步步升级，就想把最好的一面呈现给大家。很多人问我网站速度怎么访问那么快，其实一是网站程序，页面最好是静态页面。每次我写的代码的时候，我都在琢磨怎么减少代码，减少使用div和图片，让html结构简单化，而又不失美观。所以，网站也改版了有好几次。二是空间还有带宽。这个其实很重要，现在备案跟以前比，快很多了，快的话一星期，慢的话顶多二十天。所以，不是因为特着急的话，还是用国内空间。关于国外空间，其实现在阿里云的香港虚拟主机也不错，访问还是上传都比以前好很多了。用它的小伙伴也挺多。延伸阅读 《<u><a href="http://www.yangqq.com/jstt/web/2014-01-18/644.html" target="_blank">我的个人博客之——阿里云空间选择</a></u>》<br>
                    <br>
                    <img alt="" src="../../images/reception/001.png"><br>
                    <br>
                    个人博客，用来做什么？我刚开始就把它当做一个我吐槽心情的地方，也就相当于一个网络记事本，写上一些关于自己生活工作中的小情小事，也会放上一些照片，音乐。每天工作回家后就能访问自己的网站，一边听着音乐，一边写写文章。虽然访问人数少，我也不在乎这些，个人博客就好像我自己的一个日记本，来窥探的人多了，反而不自在了。因为博客，我还是交了不少朋友。我网站之前的logo就是网友给我设计的。<br>
                    <br>
                    后来，也是因为同学说百度搜不着我的个人博客，我才开始琢磨怎么把自己的博客排名提上去，放上去一些自己做过的模板，提供免费下载。页面以前也只有一个首页，当初我就是想着设计一个首页就行了，真正想学的人，一个页面足够了，其他页面，都靠自己设计。现在不同啦，近期版本我提供的模板都很全，实在是架不住人多都来问我怎么只有一个页面，虽然我已经在下载说明里面说得很清楚了。也就是提供了这样一些资源，我的个人博客也不再是一个只关乎自己的一个平台。曝光率越来越高，光天化日之下，哪敢放自己照片，写自己心情啊，于是乎，继续这样的模式吧，把自己写的模板放到网站上去。乐于分享，是能结交到很多朋友的。<br>
                    <br>
                    我的个人博客，在今年三月份之前是没有提供后台安装，调试这些服务的。其实一直都有人找我做个人博客，因为调试时间还有修改的问题，从上传到安装到修改调试，一般要四五个小时，我怕收费高，所以一直都是拒绝的。自从推出来《<u><a href="http://www.yangqq.com/download/div/2017-09-08/789.html" target="_blank">心蓝时间轴</a></u>》后，主动找我做网站的也多了，他们都说是我粉丝，喜欢我的模板，所以我在模板下面写了付费说明，我的个人博客也开始有了付费项目。<br>
                    <br>
                    <img alt="" src="../../images/reception/001.png"><br>
                    <br>
                    我接到的第一单，是一位父亲，想给自家的宝贝建立一个博客。他说他想买一个域名，谈了好几天，最终花了8000多购买到，我挺敬佩他的，对孩子的爱，毫不吝啬。域名固然重要，其实我想说坚持用博客来记录宝贝成长点滴，才是最有价值的。第二单是一个阅读网站，从加他到跟他聊，看他朋友圈，很有才气的一个人，也相当有爱心，他的网站大部分是分享给一些爱好阅读的长者。还有些就是技术类的站长，做资讯，做旅游，做推广的。通常，从选的模板就能看出来网站类型。《<u><a href="http://www.yangqq.com/download/div/2017-09-08/789.html">心蓝时间轴</a></u>》偏个人，《<u><a href="http://www.yangqq.com/download/div/2018-03-18/807.html">绅士</a></u>》，《<u><a href="http://www.yangqq.com/download/div/2018-04-22/815.html" target="_blank">格调</a></u>》偏技术，资讯。《<u><a href="http://www.yangqq.com/download/div/2018-04-18/814.html" target="_blank">清雅</a></u>》，《<u><a href="http://www.yangqq.com/download/div/2017-07-16/785.html" target="_blank">水墨古典</a></u>》偏文艺。但也有对我防备心的，比如说付款方式，能不能走淘宝，这些我也能理解，但是有些吧，从一开始聊，感觉就不太好，理应就认为不应该收钱，收钱干嘛，到处都是免费的，听到这些，我也慢慢解释。其实他们并不了解我，了解我的网站，只要是从我博客来的，关注过一段时间的，都知道青姐的人品是咋样的。用“心塞”这个词，毫不为过吧。<br>
                    <br>
                    我做过的网站，每过一段时间，我都会一个个点击看看进展怎么样，个人博客，不像真实的面对面聊，更多的是文字的交流，不得不说有时候文字传达的信息更能了解一个人，甚至有心灵共鸣。我想我还会再重新做一个仅仅属于自己的个人博客，如果你也想要做一个博客，用来记录自己的家庭，工作，生活，或者讨女友欢心，不妨现在就开始吧！<br>
                    <br>
                    &nbsp; </div>
            </div>
            <div class="news_pl">
                <h2>文章评论</h2>
                <ul>
                    <div class="gbko"> </div>
                </ul>
            </div>
        </div>

        <myFooter></myFooter>
        </article>
    </div>
</template>

<script>
    export default {
        name: "showArtical"
    }
</script>

<style scoped>
    .show-artical{
        background: url(../../images/reception/artical-back.jpg)  no-repeat right top #D6E0E1;
    }
    .l_box { width: 30%; float: left }
    .r_box { width: 68%; float: right }
    .l_box h2 { color: #333; font-size: 14px; line-height: 30px; padding-left: 20px; background: #fff }
    .l_box div { background: rgba(255,255,255,0.5); margin-bottom: 20px; overflow: hidden }
    .l_box div ul { padding: 10px; overflow: hidden }
    .about_me img { width: 100% }
    .about_me p { line-height: 24px; font-size: 14px }
    .about_me i { width: 120px; float: left; clear: left; margin-right: 10px; height: 90px; overflow: hidden }
    .wdxc li { width: 32%; overflow: hidden; float: left; height: 80px; margin-bottom: 2px; margin-right: 2px }
    .wdxc li img { height: 100%; min-height: 80px; -webkit-transition: all 0.5s; -moz-transition: all 0.5s; transition: all 0.5s; }
    .wdxc li img:hover { transform: scale(1.05) }
    .fenlei li { margin-bottom: 10px; margin-left: 10px }
    .tuijian li { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-bottom: 5px; background: url(../../images/reception/li.png) left center no-repeat; padding-left: 20px }
    .links a { display: block; float: left; margin: 0 10px 5px 0 }
    .guanzhu img { width: 100% }
    .l_box .search { border: 1px solid #c93282; background: #c93282; border-radius: 0 5px 5px 0; position: relative; }
    .search input.input_submit { border: 0; background: 0; color: #fff; outline: none; position: absolute; top: 10px; right: 8% }
    .search input.input_text { border: 0; line-height: 36px; height: 36px; width: 72%; padding-left: 10px; outline: none }
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
    .cloud ul a { line-height: 24px; height: 24px; display: block; background: #999; float: left; padding: 3px 11px; margin: 10px 10px 0 0; border-radius: 8px; -moz-transition: all 0.5s; -webkit-transition: all 0.5s; -o-transition: all 0.5s; transition: all 0.5s; color: #FFF }
    .cloud ul a:nth-child(8n-7) { background: #8A9B0F }
    .cloud ul a:nth-child(8n-6) { background: #EB6841 }
    .cloud ul a:nth-child(8n-5) { background: #3FB8AF }
    .cloud ul a:nth-child(8n-4) { background: #FE4365 }
    .cloud ul a:nth-child(8n-3) { background: #FC9D9A }
    .cloud ul a:nth-child(8n-2) { background: #EDC951 }
    .cloud ul a:nth-child(8n-1) { background: #C8C8A9 }
    .cloud ul a:nth-child(8n) { background: #83AF9B }
    .cloud ul a:first-child { background: #036564 }
    .cloud ul a:last-child { background: #3299BB }
    .cloud ul a:hover { border-radius: 0; text-shadow: #000 1px 1px 1px }
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
    .tags a { background: #F4650E; padding: 3px 8px; margin: 0 5px 0 0; color: #fff; }
    .tags { margin: 10px 0; }
    .infosbox img { max-width: 650px; height: auto; width:100% }
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
        header,article{ width:96%; margin:auto}
        .picbox ul{    width: 23%;}
        .picshowlist{ display:none}
        .tuijian,.guanzhu{ width:270px; }
    }
    @media screen and (min-width: 768px) and (max-width: 959px) {
        header,article{ width:96%; margin:auto}
        .picbox ul{    width: 23%;}
        .picshowlist{ display:none}
        .pagelist a { padding: 2px 3px;}
    }
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        header,article{ width:96%; margin:auto}
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
        header,article{ width:96%; margin:auto}
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