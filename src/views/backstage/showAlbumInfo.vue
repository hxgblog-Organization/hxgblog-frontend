<template>
    <div class="show-album">
        <div class="main-album">
            <el-button class="add-album" @click="showAddAlbumDiag(-1)">添加相册</el-button>
            <div>
                <div class="album" data-scroll-reveal="enter top" >
                    <figure v-for="(album, index) in albumData">
                        <ul class="pic">
                            <i class="el-icon-close" @click="deleteAlbum(album.albu_id)"></i>
                            <img class="show-photo" v-if="album.is_has_photo" :src="albumPhotoUrl + album.first_photo" @click="showPhotoPage(album.albu_id)"/>
                            <img class="show-photo" v-else @click="showPhotoPage(album.albu_id)" src="../../images/reception/album-empty.png"/>
                        </ul>
                        <p>{{ album.albu_name }}</p>
                        <figcaption>
                            <p>{{ album.albu_introduce }}</p>
                            <span>时间：</span>
                            <span>{{ album.created_at }} &nbsp;</span>
                            <span v-if="album.is_has_photo">
                                <span>照片：</span>
                                <span>{{ album.photo_num }}张</span>
                            </span>
                            <div class="operate-album">
                                <el-button type="primary" @click="showAddAlbumDiag(index)">修改信息</el-button>
                                <el-button type="danger" v-if="album.is_has_question" @click="deleteSecretSecurity(album.albu_id)">删除密保</el-button>
                                <el-button type="warning" v-if="album.is_has_question" @click="showEdtSecStyModel(true, index)">修改密保</el-button>
                                <el-button v-else @click="showEdtSecStyModel(false, index)">添加密保</el-button>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
        <el-dialog :title="secretSecurityTitle" :visible.sync="diaEditSecStyFormVisible" width="350px">
            <el-form>
                <el-form-item label="相册问题" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="albu_question" maxlength="10px" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="相册答案" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="albu_answer" maxlength="10px" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diaEditSecStyFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="isUpdateSecSty" @click="updateSecretSecurity">修改</el-button>
                <el-button type="primary" v-else @click="addSecretSecurity">添加</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="secretSecurityTitle" width="300px" :visible.sync="dialogEditAlbumFormVisible" class="add-alum-diag">
            <el-form :model="newAlbumForm">
                <el-form-item label="相册名字" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="newAlbumForm.albu_name" maxlength="10px" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="相册问题" :label-width="formLabelWidth" v-if="! isUpdateAlbumInfo">
                    <el-input v-model="newAlbumForm.albu_question" maxlength="10px" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="相册答案" :label-width="formLabelWidth" v-if="! isUpdateAlbumInfo">
                    <el-input v-model="newAlbumForm.albu_answer" maxlength="10px" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="相册介绍" :label-width="formLabelWidth" :required="true">
                    <el-input type="textarea" maxlength="50px" v-model="newAlbumForm.albu_introduce" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditAlbumFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="isUpdateAlbumInfo" @click="updateAlbumInfo">修改</el-button>
                <el-button type="primary" v-else @click="addAlbum">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "showAlbumInfo",
        inject: ['reload'],
        data() {
            return {
                msg: 'Album',
                albumData: [],
                albumPhotoUrl: ApiPath.common.getAlbumPhoto,
                diaEditSecStyFormVisible: false,
                albu_question: '',
                albu_answer: '',
                newAlbumForm: {
                    albu_name: '',
                    albu_question: '',
                    albu_answer: '',
                    albu_introduce: '',
                },
                albu_id: '',
                formLabelWidth: '80px',
                secretSecurityTitle: '添加相册密保',
                isUpdateSecSty: true,
                dialogEditAlbumFormVisible: false,
                isUpdateAlbumInfo: true,
                albumInfoTitle: '添加相册信息',
            }
        },
        methods: {
            addAlbum() {
                let self = this;
                self.POST(ApiPath.maalbum.addAlbum, {
                    albu_name: self.newAlbumForm.albu_name,
                    albu_question: self.newAlbumForm.albu_question,
                    albu_answer: self.newAlbumForm.albu_answer,
                    albu_introduce: self.newAlbumForm.albu_introduce
                }).then(function (res) {
                    if(res.data.code === 0){
                        self.$message.success(res.data.msg);
                        self.dialogEditAlbumFormVisible = false;
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                })
            },
            deleteAlbum(album_id) {
                let self = this;
                self.POST(ApiPath.maalbum.deleteAlbum, {
                    albu_id: album_id
                }).then(function (res) {
                    if(res.data.code === 0){
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                    return false;
                })

            },
            updateAlbumInfo() {
                let self = this;
                self.POST(ApiPath.maalbum.updateAlbumInfor, {
                    albu_id: self.albu_id,
                    albu_name: self.newAlbumForm.albu_name,
                    albu_introduce: self.newAlbumForm.albu_introduce,
                }).then(function (res) {
                    if(res.data.code === 0){
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                    return false;
                })

            },
            addSecretSecurity() {
                let self = this;
                self.POST(ApiPath.maalbum.addAlbumSecretSecurity, {
                    albu_id: self.albu_id,
                    albu_question: self.albu_question,
                    albu_answer: self.albu_answer
                }).then(function (res) {
                    if(res.data.code === 0){
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true
                    }
                    self.$message.error(res.data.msg);
                    return false;
                })
            },
            deleteSecretSecurity(album_id) {
                let self = this;
                self.POST(ApiPath.maalbum.deleteAlbumSecretSecurity,{ albu_id: album_id })
                    .then(function (res) {
                        if(res.data.code === 0){
                            self.$message.success(res.data.msg);
                            self.reload();
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        return false;
                    })
            },
            updateSecretSecurity() {
                let self = this;
                self.POST(ApiPath.maalbum.updateAlbumSecretSecurity, {
                    albu_id: self.albu_id,
                    albu_question: self.albu_question,
                    albu_answer: self.albu_answer,
                }).then(function (res) {
                    if(res.data.code === 0){
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                    return false;
                })
            },
            getAlbumData(){
                let self = this;
                self.GET(ApiPath.maalbum.getAlbumInfor)
                    .then(function (res) {
                        if(res.data.code === 0){
                            self.albumData = res.data.data;
                        }
                    })
            },
            showEdtSecStyModel(isUpdate, index) {
                this.diaEditSecStyFormVisible = true;
                if(isUpdate){
                    this.isUpdateSecSty = true;
                    this.secretSecurityTitle = "修改相册密保";
                    this.albu_question = this.albumData[index].albu_question;
                    this.albu_answer = this.albumData[index].albu_answer;
                    this.albu_id = this.albumData[index].albu_id;
                    return true;
                }
                this.albu_question = "";
                this.albu_answer = "";
                this.isUpdateSecSty = false;
                this.albu_id = this.albumData[index].albu_id;
                return true;

            },
            showAddAlbumDiag(index) {
                this.dialogEditAlbumFormVisible = true;
                if(index === -1){
                    this.isUpdateAlbumInfo = false;
                    this.newAlbumForm.albu_name = "";
                    this.newAlbumForm.albu_question = "";
                    this.newAlbumForm.albu_answer = "";
                    this.newAlbumForm.albu_introduce = "";
                    return true;
                }
                this.isUpdateAlbumInfo = true;
                this.secretSecurityTitle = "修改相册信息";
                this.newAlbumForm.albu_name   = this.albumData[index].albu_name;
                this.newAlbumForm.albu_question = this.albumData[index].albu_question;
                this.newAlbumForm.albu_answer   = this.albumData[index].albu_answer;
                this.newAlbumForm.albu_introduce   = this.albumData[index].albu_introduce;
                this.albu_id = this.albumData[index].albu_id;
            },
            showPhotoPage(albumId) {
                this.$router.push({ path: `showAlbumPhoto/${albumId}`});
            },
        },
        mounted() {
            this.getAlbumData();
        }
    }
</script>

<style>
    .el-dialog__body{
        padding: 4px 20px;
    }
    .el-form-item{
        margin-bottom: 10px;
    }
</style>
<style scoped>
    .main-album{
        overflow: hidden;
    }
    .show-photo{
        cursor: pointer;
    }
    .pic{
        padding: 0 0 0 13%;
        position: relative;
    }
    .el-icon-close{
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .operate-album{
        margin-top: 20px;
    }
    .el-dialog__footer{
        margin: 0 20px 20px;
    }
    .add-album{
        float: right;
        margin-right: 9%;
    }
    article{
        overflow: hidden;
    }
    .sec-sty-diag{
        width: 45%;
        margin: auto;
    }
    .operate-album button{
        font-size: 9px;
        width: 29%;
    }
    .show-album{
        margin-top: 2%;
        margin-left: 6%;
        width: 85%;
    }
    .album { margin: 44px 44px; overflow: hidden }
    .album figure { background: dimgray; border: #FFF 10px solid; width: 307px; height: 450px; float: left; margin: 0 16px 20px; overflow: hidden }
    .album figure img { display: block;margin-top:20px;width:200px;margin-left: 5px;height: 256px; overflow: hidden; }
    .album figure p { font-size: 14px;color: cyan; line-height: 26px; text-align: center;margin-bottom: 4px; font-weight: bold }
    .album figure figcaption { padding: 3px 9px 0 10px; line-height: 22px; color: aliceblue; }
    .album figure ul { overflow: hidden; height: 256px; }
    .album figure ul span { opacity: 0 }
    .album figure ul:hover span { opacity: 1 }
    .album figcaption p { color: yellow }
    .album figure ul a { position: relative; display: block }
    .album figure ul span { position: absolute; left: 0px; top: 0px; background: rgba(0,0,0,0.5)  no-repeat center 10px; color: #FFF; display: block; width: 100%; height: 100%; line-height: 256px; text-align: center; -webkit-transition: all 0.5s; -moz-transition: all 0.5s; -o-transition: all 0.5s; -ms-transition: all 0.5s; text-decoration: underline }
</style>