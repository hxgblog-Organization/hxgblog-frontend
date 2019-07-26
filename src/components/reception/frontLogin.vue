<template>
    <div>
        <el-dialog width="450px" title="登录" :visible.sync="dialogFormVisible">
            <baseLogin :loginUrl="loginUrl" ref="baseLogin" @sendMsg = "sendMsg" @closeLoginDiag="closeLoginDiag"></baseLogin>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        inject: ['reload'],
        name: "frontLogin",
        data() {
            return {
                dialogFormVisible: false,
                VerificationCode: '',
                formLabelWidth: '80px',
                activeName: 'pwd',
                selectIndex: '0',
                loginUrl: {
                    passwordUrl: ApiPath.common.frontLogin,
                    smsUrl: ApiPath.common.frontSmsLogin,
                    isBack: false,
                }
            };
        },
        methods: {
            closeLoginDiag() {
                this.dialogFormVisible = false;
                this.$emit("showByCodeUpdatePwd");
            },
            showLoginModel(visible) {
                this.dialogFormVisible = visible;
            },
            sendMsg(data) {                    //登录成功
                this.$emit("sendFatherMsg", data);
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
    /*.el-dialog{*/
    /*    width: 30% !important;*/
    /*}*/
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