<template>
    <div>
        <p class="album-title-fir">即使行动导致错误，却也带来了学习与成长;不行动则是停滞与萎缩。</p>
        <p class="album-title-sec">在生活中，我跌倒过。我在嘲笑声中站起来，虽然衣服脏了，但那是暂时的，它可以洗净。</p>
        <p class="album-title-thi">放弃该放弃的是无奈，放弃不该放弃的是无能;不放弃该放弃的是无知，不放弃不该放弃的是执着。</p>
        <div class="jq22-container">
            <div class="demo">
                <div class="grid">
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import '../../assets/waterfall/js/jquery-1.11.1.min';
    import {minigrid} from '../../assets/waterfall/js/minigrid';

    export default {
        name: "showPhoto",
        data() {
            return {
                imgsArr: [],
                page: 0,
                albumId: 0,
                is_has_photo: true,
                getPhotoBaseUrl: ApiPath.common.getAlbumPhoto,
                data: [],
                isHave: true
            }
        },

        methods: {
            getImage() {
                let self = this;
                self.GET(ApiPath.album.byAlbumIdSelectPhoto, {
                    album_id: self.albumId,
                    page: self.page
                })
                    .then(function (res) {
                        if (res.data.data.length === 0) {
                            self.isHave = false;
                            return;
                        }
                        self.data = res.data.data;
                        for (var i = 0; i < self.data.length; i++) {
                            //生成一个div盒子对象
                            var oDiv = document.createElement("div");
                            oDiv.className = "grid-item";
                            //生成一个图片对象
                            var oImg = new Image();
                            oImg.src = self.getPhotoBaseUrl + self.data[i].phot_path;
                            //把图片放入div盒子
                            oDiv.appendChild(oImg);
                            //把div放入大盒子
                            $(".grid").append(oDiv);
                            (function (oImg) {
                                setTimeout(function () {
                                    oImg.style.cssText = "opacity:1;transform:scale(1);";
                                }, 100);
                            })(oImg); //立马调用
                        }
                        var done = function () {
                            var d = document.querySelector('.demo');
                            d.style.opacity = 1;
                        };
                        minigrid('.grid', '.grid-item', 6, null, done);//调用外部文件
                    })
            },
            scrollGetImage() {
                if (!this.isHave) return;
                //滚动滚动条的时候调用的事件
                var scrollH = '';//文档高度
                var scrollT = '';//滚动条高度
                var _height = $(window).height();
                scrollH = document.body.scrollHeight;
                scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                // console.log(_height+" a "+scrollT+" b "+150+"  "+scrollH);
                if (_height + scrollT + 20 > scrollH) {
                    this.page++;
                    this.getImage();
                }
            }
        },
        mounted() {
            this.albumId = this.$route.query.albumId;
            this.getImage();
            window.addEventListener('scroll', this.scrollGetImage);
            window.addEventListener('resize', function () {
                minigrid('.grid', '.grid-item');
            });
        }
    }
</script>
<style>
    .album-title-fir {
        margin-top: 40px;
        margin-right: 350px;
        font-size: 20px;
        color: darkblue;
    }

    .album-title-sec {
        margin-top: 20px;
        margin-right: 50px;
        font-size: 20px;
        color: darkblue;
    }

    .album-title-thi {
        margin-top: 20px;
        margin-left: 110px;
        font-size: 20px;
        color: darkblue;
    }

    .jq22-container {
        min-height: 600px;
        width: 80%;
        margin: auto;
        border-radius: 15px;
        border-style: ridge;
        border-width: 20px;
    }

    .demo {
        position: relative;
        opacity: 1;
        transition: .2s ease;
        margin-bottom: 60px;
    }

    .grid {
        position: relative;
        /* fluffy */
        margin: 0 auto;
        width: 98%;
        /* end fluffy */
    }

    .grid-item {
        position: absolute;
        top: 0;
        left: 0;
        /* fluffy */
        width: 180px;
        border-radius: 30px;
        background-color: #EDEDED;
        /* end fluffy */
        -webkit-transition: .3s ease-in-out;
        -o-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
        border: 1px solid #ADADAD;
        overflow: hidden;
    }

    .grid-item img {
        opacity: 0;
        transform: scale(0);
        width: 100%;
        height: auto;
        vertical-align: middle;
        transition: all 1s;
        -webkit-transition: all 1s;
    }

    /* mq */
    @media (max-width: 600px) {
        .grid-item {
            width: 120px;
            height: 80px;
        }
    }
</style>
