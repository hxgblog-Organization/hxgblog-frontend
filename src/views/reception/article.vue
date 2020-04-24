<template>
    <div>
        <article>
            <div class="containers">
                <h2 class="ctitle"><b>学无止境</b> <span>不要轻易放弃。学习成长的路上，我们长路漫漫，只因学无止境。</span></h2>
                <div class="rnav">
                    <ul>
                        <li v-for="type in articleTypes"><a :class="{active : active == type.type_name}"
                                                            @click="btTypeSelectArticle(type.type_id, type.type_name)">{{
                            type.type_name}}</a></li>
                    </ul>
                </div>
                <ul class="cbp_tmtimeline">
                    <li v-for="article in articleDatas">
                        <time class="cbp_tmtime">
                            <span>{{ article.monthDay }}</span>
                            <span>{{ article.years }}</span>
                        </time>
                        <div class="cbp_tmicon"></div>
                        <div class="cbp_tmlabel" data-scroll-reveal="enter right over 1s">
                            <h2>{{ article.art_title }}</h2>
                            <p><span class="blogpic"><a href="#"><img :src="article.art_cover"></a></span><span>{{ article.art_content }}</span>
                            </p>
                            <router-link :to="{ name: 'showArticle', query: { artId: article.art_id } }"
                                         target="_blank"
                                         class="readmore">阅读全文&gt;&gt;
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </article>
    </div>
</template>

<script>
    export default {
        name: "article",
        inject: ['reload'],
        data() {
            return {
                articleTypes: [],
                articleData: [],
                typeId: 0,
                active: '',
                page: 0,
                isHave: true,
                isGetArtData: true,
            }
        },
        methods: {
            handleScrolls() {
                if (!this.isHave || !this.isGetArtData) return;
                // 可视区高度
                var windowHeight = document.documentElement.clientHeight;
                //滚动条的高度
                var srcollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var srcollH = document.body.scrollHeight;
                // console.log(windowHeight + "--" + srcollTop + "---" + srcollH);
                if (srcollTop + windowHeight + (this.page * 210) + 1 > srcollH) {
                    this.page++;
                    this.getArticle(3);
                }
            },
            getArticle(getStatus) {
                let self = this;
                self.isGetArtData = false;
                self.GET(ApiPath.article.typeSelectArticle, {
                    'type_id': self.typeId,
                    'page': self.page
                })
                    .then(function (res) {
                        if (res.data.code == 0) {
                            let data = res.data.data.articles;
                            if (data.length === 0) {
                                self.isHave = false;
                                return;
                            }
                            self.isGetArtData = true;
                            if (getStatus === 3) {
                                self.articleData = self.articleData.concat(data);
                                return;
                            }
                            self.articleData = data;
                        }
                    });
            },
            btTypeSelectArticle(typeId, typeName) {
                this.isHave = true;          //当用户再次点击文章标签查询的时候，设置为true
                this.typeId = typeId;
                this.active = typeName;
                this.page = 0;
                this.articleData = [];
                this.getArticle(2);
            },
        },
        mounted() {
            let self = this;
            self.GET(ApiPath.article.showArticlePage)
                .then(function (res) {
                    if (res.data.code == 0) {
                        self.articleTypes = res.data.data.art_types;
                        self.typeId = self.articleTypes[0].type_id;
                        self.active = self.articleTypes[0].type_name;
                        self.articleData = res.data.data.articles;
                    }
                    window.addEventListener('scroll', self.handleScrolls);
                });
        },
    }
</script>

<style scoped>

    .active {
        background: #6f7180;
    }

    .rnav {
        margin: 30px auto;
        overflow: hidden;
        overflow: hidden;
        padding-left: 100px;
        color: #000
    }

    .rnav li {
        width: 120px;
        text-align: center;
        display: inline-block;
        margin-bottom: 5px;
        margin-right: 5px;
        float: left;
        height: 40px;
        line-height: 38px;
        background: rgba(255, 255, 255, 0.2)
    }

    .rnav li a {
        display: block;
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
        -o-transition: all 1s;
        transition: all 1s;
        border: #ddd6d9 1px solid;
        cursor: pointer
    }

    .rnav ul li a:hover {
        background: #fe5187;
        color: #000
    }

    /* cbp_tmtimeline */
    .cbp_tmtimeline {
        margin: 30px 0 0 0;
        padding: 0;
        list-style: none;
        position: relative;
    }

    .cbp_tmtimeline:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 5px;
        background: #afdcf8;
        left: 158px;
        margin-left: -10px;
    }

    .cbp_tmtimeline > li {
        position: relative;
    }

    .cbp_tmtimeline > li .cbp_tmtime {
        display: block;
        width: 100px;
        padding-right: 30px;
        position: absolute;
        margin-left: 20px
    }

    .cbp_tmtimeline > li .cbp_tmtime span {
        display: block;
        text-align: right;
    }

    .cbp_tmtimeline > li .cbp_tmtime span:first-child {
        font-size: 14px;
        color: #bdd0db;
    }

    .cbp_tmtimeline > li .cbp_tmtime span:last-child {
        font-size: 22px;
        color: #3594cb;
    }

    .cbp_tmtimeline > li .cbp_tmlabel {
        margin: 0 50px 15px 180px;
        background: floralwhite;
        padding: 2em;
        position: relative;
        border-radius: 5px;
        height: 210px;
        text-align: left;
        position: relative
    }

    .cbp_tmtimeline > li .cbp_tmlabel h2 {
        margin-top: 0px;
        padding: 0 0 10px 0;
        font-size: 16px;
        text-shadow: rgba(7, 84, 152, 0.71) 1px 1px 1px;
    }

    .cbp_tmtimeline > li .cbp_tmlabel:after {
        right: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-right-color: #3594cb;
        border-width: 10px;
        top: 10px;
    }

    .cbp_tmtimeline > li .cbp_tmicon {
        width: 10px;
        height: 10px;
        font-family: 'ecoico';
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        font-size: 1.4em;
        line-height: 40px;
        -webkit-font-smoothing: antialiased;
        position: absolute;
        color: #fff;
        background: #46a4da;
        border-radius: 50%;
        box-shadow: 0 0 0 3px #afdcf8;
        text-align: center;
        left: 170px;
        top: 15px;
        margin: 0 0 0 -25px;
    }

    .blogpic {
        width: 200px;
        height: 120px;
        overflow: hidden;
        display: block;
        float: left;
        margin-right: 20px;
    }

    .blogpic img {
        width: 100%;
        height: auto;
        margin: auto;
    }

    a.readmore {
        background: #075498;
        color: #fff;
        padding: 5px 10px;
        float: right;
        border-radius: 5px;
        position: absolute;
        left: 85%;
        top: 80%;
    }

    .cbp_tmtimeline li .cbp_tmtime {
        -webkit-transition: all 1s;
        -moz-transition: all 1s;
        -o-transition: all 1s;
    }

    .cbp_tmtimeline li:hover .cbp_tmicon {
        box-shadow: 0 0 0 3px #ececec;
    }

    .cbp_tmtimeline li:hover .cbp_tmtime {
        background: darkorange;
        border-radius: 20px 0 0 20px;
    }

    .cbp_tmtimeline li:hover .cbp_tmtime span {
        color: #075498;
    }
</style>
