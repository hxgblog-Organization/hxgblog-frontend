<template>
    <div>
        <el-dialog width="35%" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="userForm" :rules="rules" ref="userForm">
                <el-form-item label="昵称:" :label-width="formLabelWidth" prop="nickName">
                    <el-input v-model="userForm.nickName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别:" :label-width="formLabelWidth" :required="true">
                    <el-radio v-model="userForm.sex" label="0">男</el-radio>
                    <el-radio v-model="userForm.sex" label="1">女</el-radio>
                </el-form-item>
                <el-form-item label="电话:" :label-width="formLabelWidth" prop="phone">
                    <el-input v-if="status === 1" v-model.number="userForm.phone" autocomplete="off"></el-input>
                    <el-input v-else v-model.number="userForm.phone" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="emails" label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="userForm.emails" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="status === 1" label="密码:" :label-width="formLabelWidth" prop="password">
                    <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传头像:" :label-width="formLabelWidth" :required="true">
                    <el-upload
                            class="avatar-uploader"
                            action="#"
                            :show-file-list="false"
                            :auto-upload="false"
                            accept=".jpeg,.jpg,.png,.PNG,.JPEG,.JPG,"
                            :on-change="addHeadPortrait"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="个人介绍" :label-width="formLabelWidth" prop="introduce">
                    <el-input class="introduce" type="textarea" v-model="userForm.introduce" autocomplete="off"></el-input>
                </el-form-item>
                <div v-if="status === 1">
                    <span>其他注册方式</span>
                    <thirdParty></thirdParty>
                </div>
                <div>
                    <el-button v-if="status === 1" style="width: 100%" type="primary" @click="submitValidate('userForm')" v-on:keyup.enter="submitValidate('userForm')">注册</el-button>
                    <el-button v-if="status === 2" style="width: 100%" type="primary" @click="submitValidate('userForm')" v-on:keyup.enter="submitValidate('userForm')">修改</el-button>

                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "infor",
        data() {
            return {
                dialogFormVisible: false,
                imageUrl: '',
                userForm: {
                    sex: '0',
                    nickName: '',
                    phone: '',
                    emails: '',
                    password: '',
                    introduce: '',
                },
                isUpdateImg: false,
                title: '注册',
                status: '',
                formData : new FormData(),
                formLabelWidth: '82px',
                rules: {
                    nickName:[
                        { required: true, message: '请输入昵称', trigger: 'blur'},
                        { required: true, max: 5, message: '长度在3-5个字符', trigger: 'blur'}
                    ],
                    emails: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                    ],
                    phone: [
                        { required: true, message: '手机号不能为空', trigger: ['blur'] },
                        { message: '手机号不正确', trigger: ['blur'] }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: ['blur'] },
                        { max: '15', message: '密码不能超过15个字符' , trigger: ['blur'] }
                    ],
                    introduce: [
                        { max: '3', message: '自我介绍不能超过30个字符', trigger: ['blur']}
                    ]
                }
            }
        },
        methods:{
            showInforModel(visible, status){
                console.log(status);
                this.dialogFormVisible = visible;
                this.status = status;
                if(status === 2){
                    this.title = '修改信息';
                    this.getInformation();
                    return true;
                }
            },
            addHeadPortrait(file){
                let imageFile = file.raw;
                if(!this.beforePhotoUpload(imageFile))   return ;
                this.formData.delete('headPortrait');
                this.formData.append('headPortrait', imageFile);
                this.imageUrl = URL.createObjectURL(imageFile);
            },
            beforeAvatarUpload(file) {
                return this.validatePhoto(file);
            },
            submitValidate(formName) {
                let self = this;
                this.$refs[formName].validate((valid) => {
                    if(!valid){
                        self.$message.error("你填写的信息有误!");
                        return false;
                    }
                    $.each(self.userForm,function (i, val) {
                        self.formData.append(i, val);
                    });
                    (self.status === 1) ? self.registerUser() : self.updateInformation();
                });
            },
            registerUser(){
                self.POST(ApiPath.homePage.register,self.formData)
                    .then(function (res) {
                        if(res.data.code == 0){
                            self.$message.success(res.data.msg);
                            self.dialogFormVisible = false;
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        console.log(res.data);
                        return false;
                    })
            },
            updateInformation(){
                let self = this;
                self.formData.delete('password');
                self.POST(ApiPath.common.updateUserInformation, self.formData)
                    .then(function (res) {
                        console.log(res.data);
                        if(res.data.code === 0){
                            self.$message.success(res.data.msg);
                            self.updateLocalStorage(res.data.data);
                            self.dialogFormVisible = false;
                        }else {
                            self.$message.error(res.data.msg);
                        }
                    })
            },
            getInformation(){
                let self = this;
                let userInformation = store.state.user;
                self.userForm.sex       = userInformation.sex.toString();
                self.userForm.nickName  = userInformation.nick_name;
                self.userForm.phone     = userInformation.phone;
                self.userForm.emails    = userInformation.email;
                self.userForm.introduce = userInformation.introduce;
                self.imageUrl           = ApiPath.common.getHeadPortrait + userInformation.head_portrait;
            }
        }
    }
</script>
<style>
    .introduce{
        margin-bottom: 20px;
    }
    .el-radio {
        float: left;
        line-height: 3;
    }
    .el-form-item{
        margin-bottom: 15px;
    }
    .el-form-item__content{
        height: 40px;
    }
    .el-upload {
        float: left;
        border: 1px dashed #d9d9d9;
        border-radius: 90px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader, .el-upload:hover {
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
