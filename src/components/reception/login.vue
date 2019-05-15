<template>
    <div @keyup.enter="login">
        <el-dialog width="35%" title="登录" :visible.sync="dialogFormVisible">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane class="tab" label="账号和密码" name="pwd"></el-tab-pane>
                <el-tab-pane class="tab" label="手机验证码" name="code"></el-tab-pane>
            </el-tabs>
            <el-form v-if="selectIndex === '0'" :model="passwordForm">
                <el-form-item label="手机号码:" :label-width="formLabelWidth">
                    <el-input v-model="phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" :label-width="formLabelWidth">
                    <el-input type="password" v-model="passwordForm.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form v-else :model="codeForm">
                <el-form-item label="手机号码:" :label-width="formLabelWidth">
                    <el-input v-model="phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码:" :label-width="formLabelWidth">
                    <el-input class="code-input" v-model="codeForm.code" autocomplete="off"></el-input>
                    <el-button class="get-code">获取验证码</el-button>
                </el-form-item>
            </el-form>
            <span>其他登录方式</span>
            <third-party></third-party>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                dialogFormVisible: false,
                passwordForm: {
                    password: '',
                },
                phone: '',
                codeForm: {
                    code: '',
                },
                formLabelWidth: '80px',
                activeName: 'pwd',
                selectIndex: '0',
            };
        },
        methods: {
            showLoginModel(visible) {
                this.dialogFormVisible = visible;
            },
            login() {
                console.log("sdds");
                let self = this;
                self.passwordForm.phone = self.phone;
                //账号密码登录
                if (self.selectIndex === '0') {
                    if (!self.loginValidate(self.passwordForm)) return false;
                    self.POST(ApiPath.common.frontLogin, self.passwordForm)
                        .then(function (res) {
                            if (res.data.code == 0) {
                                self.$message.success(res.data.msg);
                                self.dialogFormVisible = false;      //隐藏模态框
                                self.sendMessage(res.data.data);     //告诉父组件，用户登录成功
                                store.commit(types.USER, res.data.data);
                            } else {
                                self.$message.error(res.data.msg);
                            }
                        });
                    return true;
                }
            },
            sendMessage(data) {
                this.$emit("sendMessage", data);
            },
            handleClick(tab) {
                this.selectIndex = tab.index;
            },
        },
    }
</script>
<style>
    .el-dialog__body{
        padding: 0 30px 20px !important;
    }
    .el-dialog{
        width: 30% !important;
    }
</style>
<style scoped>
    .get-code{
        float: right;
    }
    .tab{
        margin-left: 60%;
    }
    .code-input{
        width: 50%;
        float: left;
    }
</style>