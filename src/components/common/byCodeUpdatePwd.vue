<template>
    <div @keyup.enter="byCodeUpdatePassword">
        <el-dialog title="修改密码" :visible.sync="byCodeUpdatePasswordDiag" width="400px" class="code-update-pwd">
            <el-form>
                <el-form-item label="手机号码:" :label-width="formLabelWidth">
                    <el-input v-model="updatePwdForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" label-width="80px">
                    <el-input v-model="updatePwdForm.new_password" type="password" maxlength="20px" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码:" :label-width="formLabelWidth">
                    <el-input class="code-input" v-model="updatePwdForm.sms_code" autocomplete="off"></el-input>
                    <el-button class="code-btn" v-show="verification" @click="getCode">获取验证码</el-button>
                    <el-button class="code-btn" v-show="!verification"><span>{{time}}</span>秒后重新获取</el-button>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="byCodeUpdatePasswordDiag = false">取 消</el-button>
                <el-button type="primary" @click="byCodeUpdatePassword">修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "byCodeUpdatePwd",
        data () {
            return {
                byCodeUpdatePasswordDiag: false,
                updatePwdForm: {
                    phone: '',
                    sms_code: '',
                    new_password: '',
                },
                time: 60,
                verification: true,
                formLabelWidth: '80px',
            }
        },
        methods: {
            getCode() {
                let self = this;
                if(self.updatePwdForm.phone === ""){
                    self.$message.error("请你输入手机号");
                    return false;
                }
                self.GET(ApiPath.common.getSmsCode, {
                    phone: self.updatePwdForm.phone
                }).then(function (res) {
                    if(res.data.code === 0){
                        self.verification = false;              //点击button改变v-show的状态
                        self.$message.success(res.data.msg);
                        let auth_timer = setInterval(()=>{      //定时器设置每秒递减
                            self.time--;                        //递减时间
                            if(self.time <= 0){
                                self.verification = true;       //60s时间结束还原v-show状态并清除定时器
                                clearInterval(auth_timer);
                                self.time = 60;
                            }
                        },1000);
                        return true;
                    }
                    self.$message.error(res.data.msg);          //出现错误
                    return false;
                });
            },
            byCodeUpdatePassword() {
                let self = this;
                if(self.updatePwdForm.new_password === "" || self.updatePwdForm.new_password.length > 20){
                    self.$message.error("你输入的密码不合法");
                    return false;
                }
                if(! self.smsLoginValidate(self.updatePwdForm)) return  false;
                self.POST(ApiPath.common.byCodeUpdatePassword,self.updatePwdForm)
                    .then(function (res) {
                    if(res.data.code === 0){
                        self.$message.success(res.data.msg);
                        self.byCodeUpdatePasswordDiag = false;
                        return true;
                    }
                    self.$message.error(res.data.msg);
                    return false;
                });
            },
            showUpdatePasswordModel() {
                let self = this;
                setTimeout(function () {        //延迟一下，平滑
                    self.byCodeUpdatePasswordDiag = true;
                },800);
            },
        }
    }
</script>

<style scoped>
    /*.el-dialog{*/
    /*    width: 30% !important;*/
    /*}*/
    .code-input{
        width: 40%;
        float: left;
    }
</style>