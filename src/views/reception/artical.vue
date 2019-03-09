<template>
    <div>
        <myHeader></myHeader>
    <article>
        <div class="containers">
            <h2 class="ctitle"><b>学无止境</b> <span>不要轻易放弃。学习成长的路上，我们长路漫漫，只因学无止境。</span></h2>
            <div class="rnav">
                <ul>
                    <li v-for="type in articalTypes"><a @click="">{{ type.type_name}}</a></li>
                </ul>
            </div>
            <ul class="cbp_tmtimeline">
                <li v-for="artical in articalDatas">
                    <time class="cbp_tmtime"><span>{{ artical.monthDay }}</span><span>{{ artical.year }}</span></time>
                    <div class="cbp_tmicon"></div>
                    <div class="cbp_tmlabel" data-scroll-reveal="enter right over 1s" >
                        <h2>{{ artical.arti_title }}</h2>
                        <p><span class="blogpic"><a href="/"><img src="../../images/reception/001.png"></a></span>{{ artical.arti_content }}</p>
                        <router-link to="/showArtical" target="_blank" class="readmore">阅读全文&gt;&gt;</router-link>
                    </div>
                </li>
            </ul>
            <div class="page"><a title="Total record"><b>107</b> </a><b>1</b><a href="/news/index_2.html">2</a><a href="/news/index_3.html">3</a><a href="/news/index_4.html">4</a><a href="/news/index_5.html">5</a><a href="/news/index_2.html">&gt;</a><a href="/news/index_5.html">&gt;&gt;</a></div>
        </div>
    </article>
    <myFooter></myFooter>
    </div>
</template>

<script>
    export default {
        name: "artical",
        data () {
            return {
                articalTypes : [],
                articalDatas : [],


            }
        },
        mounted() {
            let self = this;
            this.GET(ApiPath.artical.byTypeSelectArtical)
                .then(function (res) {
                    if(res.data.code == 0){
                        self.articalTypes = res.data.data.art_types;
                        self.articalDatas = res.data.data.articals;
                    }

                })
        }
    }

</script>

<style scoped>
    .rnav { margin: 30px auto; overflow: hidden; overflow: hidden; padding-left: 100px; color: #000}
    .rnav li { width: 120px; text-align: center; display: inline-block; margin-bottom: 5px; margin-right: 5px; float: left; height: 40px; line-height: 38px; background: rgba(255,255,255,0.2) }
    .rnav li a {  display: block; -webkit-transition: all 1s; -moz-transition: all 1s; -o-transition: all 1s; transition: all 1s; border: #fff 1px solid; cursor: pointer }
    .rnav ul li a:hover { background: #075498; color: #000}
    /* cbp_tmtimeline */
    .cbp_tmtimeline { margin: 30px 0 0 0; padding: 0; list-style: none; position: relative; }
    .cbp_tmtimeline:before { content: ''; position: absolute; top: 0; bottom: 0; width: 5px; background: #afdcf8; left: 158px; margin-left: -10px; }
    .cbp_tmtimeline > li { position: relative; }
    .cbp_tmtimeline > li .cbp_tmtime { display: block; width: 100px; padding-right: 30px; position: absolute; margin-left: 20px }
    .cbp_tmtimeline > li .cbp_tmtime span { display: block; text-align: right; }
    .cbp_tmtimeline > li .cbp_tmtime span:first-child { font-size: 14px; color: #bdd0db; }
    .cbp_tmtimeline > li .cbp_tmtime span:last-child { font-size: 22px; color: #3594cb; }
    .cbp_tmtimeline > li .cbp_tmlabel { margin: 0 50px 15px 180px; background: azure;  padding: 2em; position: relative; border-radius: 5px; height: 210px; text-align: left}
    .cbp_tmtimeline > li .cbp_tmlabel h2 { margin-top: 0px; padding: 0 0 10px 0; font-size: 16px; text-shadow: rgba(7, 84, 152, 0.71) 1px 1px 1px; }
    .cbp_tmtimeline > li .cbp_tmlabel:after { right: 100%; border: solid transparent; content: " "; height: 0; width: 0; position: absolute; pointer-events: none; border-right-color: #3594cb; border-width: 10px; top: 10px; }
    .cbp_tmtimeline > li .cbp_tmicon { width: 10px; height: 10px; font-family: 'ecoico'; speak: none; font-style: normal; font-weight: normal; font-variant: normal; text-transform: none; font-size: 1.4em; line-height: 40px; -webkit-font-smoothing: antialiased; position: absolute; color: #fff; background: #46a4da; border-radius: 50%; box-shadow: 0 0 0 3px #afdcf8; text-align: center; left: 170px; top: 15px; margin: 0 0 0 -25px; }
    .blogpic { width: 200px; height: 120px; overflow: hidden; display: block; float: left; margin-right: 20px; }
    .blogpic img { width: 100%; height: auto; margin: auto; }
    a.readmore { background: #075498; color: #fff; padding: 5px 10px; float: right; border-radius: 5px;margin-top: 40px; }
    .cbp_tmtimeline li .cbp_tmtime { -webkit-transition: all 1s; -moz-transition: all 1s; -o-transition: all 1s; }
    .cbp_tmtimeline li:hover .cbp_tmicon { box-shadow: 0 0 0 3px #ececec; }
    .cbp_tmtimeline li:hover .cbp_tmtime { background: darkorange; border-radius: 20px 0 0 20px; }
    .cbp_tmtimeline li:hover .cbp_tmtime span { color: #075498; }
    article { background: url(../../images/reception/album-back.jpg) repeat; }
</style>