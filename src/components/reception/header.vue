<template>
    <header class="headers">
        <div id="logo">
            <a href="/"></a>
        </div>
        <nav class="topnav" id="topnav">
            <router-link to="/"><span>首页</span><span class="en">Protal</span></router-link>
            <router-link to="/artical"><span>文章</span><span class="en">Artical</span></router-link>
            <router-link to="/album"><span>相册</span><span class="en">Album</span></router-link>
            <router-link to="/messageBoard"><span>碎言碎语</span><span class="en">Doing</span></router-link>
        </nav>
    </header>

</template>

<script>
    export default {
        name: "headers",
    }
</script>

<style>
    * { margin: 0; padding: 0 }
    body { font: 12px "ËÎÌå", Arial, Helvetica, sans-serif; color: #756F71 }
    img { border: 0; display: block }
    ul, li { list-style: none; }
    a:link, a:visited, a:active { text-decoration: none; color: #fff }
    a:hover { text-decoration: none; color: #fff; }
    .clear { clear: both; }
    .blank { height: 8px; overflow: hidden; width: 100%; margin: auto; clear: both }
    .f_l { float: left }
    .f_r { float: right }
    .containers{ background: url(../../images/reception/album-back.jpg) repeat; overflow: hidden; margin: 20px; box-shadow: #075498 0px 1px 10px; }
    .page{ margin:20px 0 ; text-align:center; width:100%;overflow: hidden;}
    .page a b {color: #aee1ff;}
    .page>b,.page a {margin: 0 2px;height: 26px;line-height: 26px;border-radius: 50%;width: 26px;text-align: center;display: inline-block}
    .page a {margin: 0 2px;height: 26px;line-height: 26px;border-radius: 50%;width: 26px;text-align: center;display: inline-block}/* Õë¶ÔIE6 */
    .page>b,.page a:hover{background: #2a455d;color: #FFF;}
    .page a {color: #aee1ff;border: #89c9ef 1px solid}
    .ctitle{ position:relative}
    .ctitle b{font-size: 22px; margin-bottom: 20px; background: #2a7497; padding: 10px 0; width: 200px; text-align: center; border-radius: 0 30px 30px 0; box-shadow: #21566f 1px 1px 1px; border-left: #dae1e4 6px solid; display:block; margin:30px 0 0 30px}
    .ctitle span{ float:right; font-size:14px; position:absolute; right:20px ; top:20px;text-shadow: rgba(7, 84, 152, 0.71) 1px 1px 1px;}


    a:link, a:visited {text-decoration: none; color: #333;}
    .left { float: left; }
    .right { float: right; }
    .blank { height: 5px; overflow: hidden; width: 100%; margin: auto; clear: both }
    .box{ width:1000px; margin:auto; overflow:hidden}
    header { width: 1000px; margin: auto; height: 115px; position: relative; overflow: hidden }
    #logo a { width: 362px; height: 105px; position: absolute; background: url(../../images/reception/logo.png) no-repeat; display: block }
    nav { float: right; width: 100%; margin: 50px 60px 0 0; text-align: right }
    nav a { position: relative; margin-right:2%;display: inline-block; font-size: 18px; font-family: "Î¢ÈíÑÅºÚ", Arial, Helvetica, sans-serif; }
    nav a:hover { text-decoration: none }
    .topnav a { margin: 0 20px; padding: 0 8px; }
    .topnav a span:first-child { z-index: 2; display: block; }
    .topnav a span:last-child { z-index: 1; display: block; color: #999; font: 12px Georgia, serif; opacity: 0; -webkit-transition: -webkit-transform 0.3s, opacity 0.3s; -moz-transition: -moz-transform 0.3s, opacity 0.3s; transition: transform 0.3s, opacity 0.3s; -webkit-transform: translateY(-100%); -moz-transform: translateY(-100%); transform: translateY(-100%); text-align: center }
    .topnav a:hover span:last-child, .topnav a:focus span:last-child { opacity: 1; -webkit-transform: translateY(0%); -moz-transform: translateY(0%); transform: translateY(0%); }
    #topnav_current { color: #e15782; }
    .en { color: #999; font-size: 12px; z-index: 1; display: block; }/* ie */
    article { width: 1000px; margin: 20px auto; overflow: hidden; text-align: left}
    aside { width: 250px; }
</style>