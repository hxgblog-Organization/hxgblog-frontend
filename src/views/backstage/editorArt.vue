<template>
    <div class="contents">
        <div class="add">
            <el-form ref="form" :model="articleForm" label-width="90px">
                <el-form-item label="文章题目:" :required="true">
                    <el-input class="art-title" v-model="articleForm.art_title"></el-input>
                </el-form-item>
                <el-form-item label="文章类型:" :required="true">
                    <el-checkbox-group v-model="articleForm.art_type">
                        <el-checkbox-button v-for="type in artTypeData" :label="type.type_id" :key="type.type_id">{{
                            type.type_name }}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="文章封面:" :required="true">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :auto-upload="false"
                        accept=".jpeg,.jpg,.png,.PNG,.JPEG,.JPG"
                        :on-change="addArticleCover"
                        :before-upload="beforeCoverUpload">
                        <img v-if="artCoverUrl" :src="artCoverUrl" class="avatar art-cover-img"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button v-if="isUpdateCover" @click="cancelUpdateCover">取消更改封面</el-button>
                </el-form-item>
                <mavon-editor v-model="articleForm.art_content" :toolbars="toolbars"/>
                <el-form-item class="submit">
                    <el-button v-if="isAdd" type="primary" @click="addArticleInfo">添加</el-button>
                    <el-button v-else type="primary" @click="updateArtInfo">修改</el-button>
                    <el-button>
                        <router-link to="/admin/manageArticle">取消</router-link>
                    </el-button>
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
                articleForm: {
                    art_id: '',
                    art_title: "",
                    art_type: [],
                    art_content: "",
                    orig_art_type: [],
                    art_cover: '',
                },
                artCoverUrl: '',
                formWidth: '120px',
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
                    fullscreen: false, // 全屏编辑
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
            addArticleCover(file) {
                let imageFile = file.raw;
                if (!this.beforeCoverUpload(imageFile)) return false;
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
                self.GET(ApiPath.maArticle.getAloneArticle, {
                    art_id: self.art_id,
                }).then(function (res) {
                    if (res.data.code === 3) {
                        self.$message.error(res.data.msg);
                        setTimeout(function () {
                            self.$router.push({path: '/backLogin'});
                        }, 2000);
                        return false;
                    }
                    let data = res.data.data;
                    self.articleForm.art_title = data.article[0].art_title;
                    self.articleForm.art_type = data.art_type;
                    self.articleForm.orig_art_type = data.art_type;
                    self.articleForm.art_id = data.article[0].art_id;
                    self.articleForm.art_content = data.article[0].art_content;
                    self.articleForm.art_cover = data.article[0].art_cover;
                    self.artTypeData = data.art_type_data;
                    self.originalArtCoverUrl = data.article[0].art_cover;
                    self.artCoverUrl = self.originalArtCoverUrl;
                })
            },
            cancelUpdateCover() {
                this.artFormData.delete('art_cover');
                this.artCoverUrl = this.originalArtCoverUrl;
                this.isUpdateCover = false;
            },
            addArticleInfo() {
                let self = this;
                if (!self.artFormData.has('art_cover')) return self.$message.error("你没有上传文章封面");
                if (!self.validateArticleInfor()) return false;
                delete self.articleForm.orig_art_type;
                delete self.articleForm.art_id;
                delete self.articleForm.art_cover;
                self.articleForm.art_content = self.filterContent(self.articleForm.art_content);
                $.each(self.articleForm, function (i, val) {
                    self.artFormData.append(i, val);
                });
                self.POST(ApiPath.maArticle.addArticle, self.artFormData)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            self.$message.success(res.data.msg);
                            self.$router.push({path: '/admin/manageArticle'});
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        return false;
                    })
            },
            updateArtInfo() {
                let self = this;
                if (!self.validateArticleInfor()) return false;
                $.each(self.articleForm, function (i, val) {
                    self.artFormData.append(i, val);
                });
                self.articleForm.art_content = self.filterContent(self.articleForm.art_content);
                self.artFormData.append('is_update_cover', self.isUpdateCover);
                self.POST(ApiPath.maArticle.updateArticle, self.artFormData)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            self.$message.success(res.data.msg);
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        return false;
                    })
            },
            validateArticleInfor() {
                if (this.articleForm.art_title.length > 100) {
                    this.$message.error("文章题目过长");
                    return false;
                }
                if (this.articleForm.art_type.length === 0) {
                    this.$message.error("你没有选择文章类型");
                    return false;
                }
                if (this.isUpdateCover) {
                    if (!this.artFormData.has('art_cover')) {
                        this.$message.error("你没有上传文章封面");
                        return false;
                    }
                }
                return true;
            },
        },
        mounted() {
            let self = this;
            if (self.$route.params.art_id !== undefined) {     //是修改文章
                self.art_id = self.$route.params.art_id;
                self.getArtInformation();
                return true;
            }
            self.isAdd = true;                               //是添加文章
            self.GET(ApiPath.common.getArticleAllType).then(function (res) {
                if (res.data.code === 0) {
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

    .markdown-body {
        margin-top: 2%;
    }
</style>
<style scoped>
    .art-cover-img {

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
        width: 180px;
        height: 180px;
        display: block;
    }

    .art-title {
        width: 66%;
    }

    .submit {
        float: right;
        margin-top: 20px;
    }

    .contents {
        text-align: left;
        width: 75%;
        float: left;
    }

    .add {
        width: 73%;
        margin: 35px 0 0 35px;
    }

    .add form {
        text-align: left;
        margin-top: 3%;
        margin-left: 2%;
    }

    .el-form-item__content {
        width: 30%;
    }
</style>
