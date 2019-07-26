<template>
<div>
    <article>
        <div class="containers">
            <h2 class="ctitle"><b>清新相册</b> <span>好咖啡要和朋友一起品尝，好“照片”也要和同样喜欢它的人一起分享。</span></h2>
            <div class="blog" data-scroll-reveal="enter top" >
                <figure v-for="(album, index) in albumData">
                    <ul v-if="album.is_has_password">
                        <img v-if="album.is_has_photo" src="../../images/reception/album-psd.jpg" @click="showPasswordModel(index, 1)">
                        <img v-else src="../../images/reception/album-psd.jpg" @click="showPasswordModel(index, 2)">
                    </ul>
                    <ul v-else>
                        <img v-if="album.is_has_photo" :src="albumPhotoUrl + album.first_photo" @click="showPasswordModel(index, 3)">
                        <img v-else src="../../images/reception/album-empty.png" @click="showPasswordModel(index, 4)">
                    </ul>
                    <p><a href="/">{{ album.albu_name }}</a></p>
                    <figcaption>{{ album.albu_introduce }}</figcaption>
                </figure>
            </div>
        </div>
    </article>
    <el-dialog title="相册密保" :visible.sync="dialogFormVisible" @keyup.enter="judgeAnswer">
        <el-form  class="answer-question">
        <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="question" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
            <el-input v-model="answer" auto-complete="off"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="judgeAnswer">确 定</el-button>
        </div>
    </el-dialog>
</div>

</template>

<script>
    // import '../../assets/js/scrollReveal'
    export default {
        name: "album",
        data(){
            return {
                albumData: [],
                albumPhotoUrl:ApiPath.common.getAlbumPhoto,
                formLabelWidth: '70px',
                dialogFormVisible: false,
                question: '',
                answer: '',
                status: 0,
                albumId: 0,
                correctAnswer: '',
            }
        },
        methods: {
            getAlbumInformation(){
                let self = this;
                self.GET(ApiPath.album.selectAllAlbumInformation)
                    .then(function (res) {
                        if(res.data.code === 0) self.albumData = res.data.data;
                        console.log(self.albumData);
                    })
            },
            showPasswordModel(index, status){
                this.albumId = this.albumData[index].albu_id;
                this.question = this.albumData[index].albu_question;
                this.correctAnswer = this.albumData[index].albu_answer;
                this.status = status;
                this.dialogFormVisible = true;
            },
            judgeAnswer(){
                if(this.answer !== this.correctAnswer) {
                    this.$message.error("回答错误");
                    return ;
                }
                this.dialogFormVisible = false;
                const {href} = this.$router.resolve({
                    path: '/showPhoto',
                    query: {
                        albumId: this.albumId,
                    }
                });
                window.open(href, '_blank');
            }
        },
        mounted() {
            this.getAlbumInformation();
        }
    }
</script>
<style scoped>
    .answer-question{
        width: 80%;
        margin: 20px 0 0 20px;
    }
    .blog { margin: 30px 44px; overflow: hidden }
    .blog figure { background: #ececec; border: #FFF 10px solid; width: 270px; height: 430px; float: left; margin: 0 8px 20px; overflow: hidden }
    .blog figure img { display: block; margin: auto;width:200px;height: 256px; overflow: hidden; }
    .blog figure p { font-size: 14px; text-shadow: #fff 1px 1px 0px; line-height: 26px; text-align: center; font-weight: bold }
    .blog figure p a { color: #226039; }
    .blog figure figcaption { padding: 10px; line-height: 22px; color: #666; }
    .blog figure ul { overflow: hidden; height: 256px; margin-bottom: 20px }
    .blog figure ul span { opacity: 0 }
    .blog figure ul:hover span { opacity: 1 }
    .blog figure ul a { position: relative; display: block }
    .blog figure ul span { position: absolute; left: 0px; top: 0px; background: rgba(0,0,0,0.5)  no-repeat center 10px; color: #FFF; display: block; width: 100%; height: 100%; line-height: 256px; text-align: center; -webkit-transition: all 0.5s; -moz-transition: all 0.5s; -o-transition: all 0.5s; -ms-transition: all 0.5s; text-decoration: underline }
    article { background: url(../../images/reception/album-back.jpg) repeat; }
</style>