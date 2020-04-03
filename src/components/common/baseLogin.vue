<template>
    <div @keyup.enter="login">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="tab" label="账号和密码" name="pwd"></el-tab-pane>
            <el-tab-pane class="tab" label="手机验证码" name="code"></el-tab-pane>
        </el-tabs>
        <el-form v-if="selectIndex === '0'" :model="passwordForm">
            <el-form-item label="手机号码:" :label-width="formLabelWidth">
                <el-input v-model="passwordForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码:" :label-width="formLabelWidth">
                <el-input type="password" v-model="passwordForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码:" :label-width="formLabelWidth">
                <el-input class="code-input" v-model="passwordForm.captcha_code" autocomplete="off"></el-input>
                <img class="get-code" :src="codeImageUrl" @click="changeCodeImage">
            </el-form-item>
        </el-form>
        <el-form v-else :model="codeForm">
            <el-form-item label="手机号码:" :label-width="formLabelWidth">
                <el-input v-model="codeForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码:" :label-width="formLabelWidth">
                <el-input class="code-input" v-model="codeForm.sms_code" autocomplete="off"></el-input>
                <el-button class="code-btn" v-show="verification" @click="getVerificationCode">获取验证码</el-button>
                <el-button class="code-btn" v-show="!verification"><span>{{time}}</span>秒后重新获取</el-button>
            </el-form-item>
        </el-form>
        <span>其他登录方式</span><span id="forget-span" @click="sendFatherMsg">/忘记密码？</span>
        <third-party :isBack="loginUrl.isBack"></third-party>
        <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        inject: ['reload'],
        name: "baseLogin",
        data() {
            return {
                dialogFormVisible: false,
                passwordForm: {
                    password: '',
                    phone: '',
                    captcha_code: '',
                },
                codeForm: {
                    phone: '',
                    sms_code: '',
                },
                formLabelWidth: '80px',
                activeName: 'pwd',
                selectIndex: '0',
                codeImageUrl: ApiPath.common.getcaptcha,
                baseCodeImageUrl: ApiPath.common.getcaptcha,
                time: 60,
                verification: true,
                isBack: false,
            };
        },
        props: ['loginUrl'],
        methods: {
            sendFatherMsg() {
                if (this.loginUrl.isBack) {
                    this.$emit('showByCodeUpdatePwdModel');
                }
                this.$emit('closeLoginDiag');
            },
            getVerificationCode() {
                let self = this;
                if (self.codeForm.phone === "") {
                    self.$message.error("请你输入手机号");
                    return false;
                }
                self.GET(ApiPath.common.getSmsCode, {
                    phone: self.codeForm.phone
                }).then(function (res) {
                    if (res.data.code === 0) {
                        self.verification = false;              //点击button改变v-show的状态
                        let auth_timer = setInterval(() => {      //定时器设置每秒递减
                            self.time--;                        //递减时间
                            if (self.time <= 0) {
                                self.verification = true;       //60s时间结束还原v-show状态并清除定时器
                                clearInterval(auth_timer);
                                self.time = 60;
                            }
                        }, 1000);
                        return true;
                    }
                    self.$message.error(res.data.msg);          //出现错误
                    return false;
                });
            },
            login() {
                let self = this;
                //账号密码登录
                if (self.selectIndex === '0') {
                    if (!self.loginValidate(self.passwordForm)) return false;
                    self.POST(self.loginUrl.passwordUrl, self.passwordForm)
                        .then(function (res) {
                            if (res.data.code == 0) {
                                self.$message.success(res.data.msg);
                                self.dialogFormVisible = false;      //隐藏模态框
                                store.commit(types.USER, res.data.data);
                                self.reload();
                                self.sendMessage(res.data.data);     //告诉父组件，用户登录成功
                                return true;
                            } else {
                                self.$message.error(res.data.msg);
                                self.changeCodeImage();
                                return false;
                            }
                        });
                    return true;
                }
                //短信登录
                if (self.verification) {
                    self.$message.error("请你先获取验证码");
                    return false;
                }
                if (!self.smsLoginValidate(self.codeForm)) return false;
                self.POST(self.loginUrl.smsUrl, self.codeForm)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            self.$message.success(res.data.msg);
                            self.dialogFormVisible = false;      //隐藏模态框
                            store.commit(types.USER, res.data.data);
                            self.reload();
                            self.sendMessage(res.data.data);     //告诉父组件，用户登录成功
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        self.changeCodeImage();
                        return false;
                    })
            },
            changeCodeImage() {
                this.codeImageUrl = this.baseCodeImageUrl + Math.random();
            },
            sendMessage(data) {                    //登录成功
                this.$emit("sendMsg", data);
            },
            handleClick(tab) {
                this.selectIndex = tab.index;
                this.changeCodeImage();
            },
        },
        mounted() {
            this.isBack = this.loginUrl.isBack;
            this.changeCodeImage();
        }
    }
</script>
<style scoped>
    #forget-span {
        cursor: pointer;
    }

    .code-btn {
        margin-left: 5%;
    }

    .el-form-item {
        margin-bottom: 10px;
    }

    .get-code {
        float: right;
        width: 100px;
        height: 40px;
        cursor: pointer;
    }

    .tab {
        margin-left: 60%;
    }

    .code-input {
        width: 40%;
        float: left;
    }
</style>

