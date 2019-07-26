<template>
    <div class="contents">
        <div class="add">
            <el-form ref="form" :model="articalForm" label-width="90px">
                <el-form-item label="文章题目:" :required="true">
                    <el-input class="art-title" v-model="articalForm.arti_title"></el-input>
                </el-form-item>
                <el-form-item label="文章类型:" :required="true">
                    <el-checkbox-group v-model="articalForm.arti_type">
                        <el-checkbox-button v-for="type in artTypeData" :label="type.type_id" :key="type.type_id">{{ type.type_name }}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="文章封面:" :required="true">
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :show-file-list="false"
                            :auto-upload="false"
                            accept=".jpeg,.jpg,.png,.PNG,.JPEG,.JPG"
                            :on-change="addArticalCover"
                            :before-upload="beforeCoverUpload">
                        <img v-if="artCoverUrl" :src="artCoverUrl" class="avatar"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button v-if="isUpdateCover" @click="cancelUpdateCover">取消更改封面</el-button>
                </el-form-item>
                <mavon-editor v-model="articalForm.arti_content" :toolbars="toolbars" @keydown="" />
                <el-form-item class="submit">
                    <el-button v-if="isAdd" type="primary" @click="addArticalInfor">添加</el-button>
                    <el-button v-else type="primary" @click="updateArtInfor">修改</el-button>
                    <el-button><router-link to="/admin/manageArtical">取消</router-link></el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "editorArt",
        data() {
            return {
                art_id: '',
                isAdd: false,
                isUpdateCover: false,
                artTypeData: [],
                articalForm: {
                    arti_id: '',
                    arti_title: "",
                    arti_type: [],
                    arti_content: "",
                    orig_arti_type:[],
                    arti_cover: '',
                },
                artCoverUrl:'',
                formWidth: '120px',
                getArticalCover: ApiPath.common.getArticalCover,
                artFormData: new FormData(),
                originalArtCoverUrl: '',
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    help: true, // 帮助
                    code: true, // code
                    subfield: true, // 是否需要分栏
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    /* 1.3.5 */
                    undo: true, // 上一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true // 导航目录
                }
            }
        },
        methods: {
            addArticalCover(file) {
                let imageFile = file.raw;
                if(!this.beforeCoverUpload(imageFile))   return false;
                this.isUpdateCover = true;
                this.artFormData.delete('art_cover');
                this.artFormData.append('art_cover', imageFile);
                this.artCoverUrl = URL.createObjectURL(imageFile);
            },
            beforeCoverUpload(file) {
                return this.validatePhoto(file);
            },
            getArtInformation() {
                let self = this;
                self.GET(ApiPath.maartical.getAloneArtical, {
                    art_id: self.art_id,
                }).then(function (res) {
                    if(res.data.code === 3){
                        self.$message.error(res.data.msg);
                        setTimeout(function () {
                            self.$router.push({ path: '/backLogin' });
                        },2000);
                        return false;
                    }
                    console.log(res.data);
                    let data = res.data.data;
                    self.articalForm.arti_title     = data.artical[0].arti_title;
                    self.articalForm.arti_type      = data.art_type;
                    self.articalForm.orig_arti_type = data.art_type;
                    self.articalForm.arti_id        = data.artical[0].arti_id;
                    self.articalForm.arti_content   = data.artical[0].arti_content;
                    self.articalForm.arti_cover     = data.artical[0].arti_cover;
                    self.artTypeData                = data.art_type_data;
                    self.originalArtCoverUrl        = data.artical[0].arti_cover;
                    self.artCoverUrl                = self.getArticalCover + self.originalArtCoverUrl;
                })
            },
            cancelUpdateCover(){
                this.artFormData.delete('art_cover');
                this.artCoverUrl = this.getArticalCover + this.originalArtCoverUrl;
                this.isUpdateCover = false;
            },
            addArticalInfor(){
                let self = this;
                if(! self.artFormData.has('art_cover')) return self.$message.error("你没有上传文章封面");
                if(! self.validateArticalInfor()) return false;
                delete self.articalForm.orig_arti_type;
                delete self.articalForm.arti_id;
                delete self.articalForm.arti_cover;
                self.articalForm.arti_content = self.filterContent(self.articalForm.arti_content);
                $.each(self.articalForm,function (i, val) {
                    self.artFormData.append(i, val);
                });
                self.POST(ApiPath.maartical.addArtical, self.artFormData)
                    .then(function (res) {
                        if(res.data.code === 0){
                            self.$message.success(res.data.msg);
                            self.$router.push({ path: '/admin/manageArtical' });
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        return false;
                })
            },
            updateArtInfor() {
                let self = this;
                if(! self.validateArticalInfor()) return false;
                $.each(self.articalForm,function (i, val) {
                    self.artFormData.append(i, val);
                });
                self.articalForm.arti_content = self.filterContent(self.articalForm.arti_content);
                self.artFormData.append('is_update_cover', self.isUpdateCover);
                self.POST(ApiPath.maartical.updateArtical, self.artFormData)
                    .then(function (res) {
                        console.log(res.data);
                        if(res.data.code === 0){
                            self.$message.success(res.data.msg);
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        return false;
                    })
            },
            validateArticalInfor() {
                if(this.articalForm.arti_title.length > 10){
                    this.$message.error("文章题目过长");
                    return false;
                }
                if(this.articalForm.arti_type.length === 0){
                    this.$message.error("你没有选择文章类型");
                    return false;
                }
                if(this.isUpdateCover){
                    if(! this.artFormData.has('art_cover')){
                        this.$message.error("你没有上传文章封面");
                        return false;
                    }
                }
                return this.validateContent(this.articalForm.arti_content);
            },
        },
        mounted() {
            let self = this;
            if(self.$route.params.art_id !== undefined){     //是修改文章
                self.art_id = self.$route.params.art_id;
                self.getArtInformation();
                return true;
            }
            self.isAdd = true;                               //是添加文章
            self.GET(ApiPath.common.getArticalAllType).then(function (res) {
                if(res.data.code === 0){
                    self.artTypeData = res.data.data;
                }
            })
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style scoped>
    .art-title{
        width: 50%;
    }
    .submit{
        float: right;
        margin-top: 20px;
    }
    .contents{
        text-align: left;
        width: 75%;
        float: left;
    }
    .add{
        width: 73%;
        margin: 35px 0 0 35px;
    }
    .el-form-item__content{
        width: 30%;
    }
</style>