<template>
    <div class="login-container">
        <h3 class="login-title">坏小哥博客后台登录</h3>
        <baseLogin :loginUrl="loginUrl" ref="baseLogin" @sendMsg="getLoginStatus" @showByCodeUpdatePwdModel="showByCodeUpdatePwd"></baseLogin>
        <byCodeUpdatePwd ref="byCodeUpdatePwd"></byCodeUpdatePwd>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginUrl: {
                    passwordUrl: ApiPath.common.backLogin,
                    smsUrl: ApiPath.common.backSmsLogin,
                    isBack: true,
                }
            };
        },
        inject: ['reload'],
        methods: {
            showByCodeUpdatePwd() {
                this.$refs.byCodeUpdatePwd.showUpdatePasswordModel();
            },
            getLoginStatus(information) {
                this.$router.push({path: '/admin/showArtInfo'});
            },

        },
        mounted() {
            $('body').css('background-color','#000');
        }
    }
</script>


<style>
    .inputBac input {
        background-color: #252323;
        color: white;
    }
    .el-tabs__item, .el-form-item__label{
        color: #37ccca;
    }
</style>
<style  scoped>

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
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 28%;
        padding: 35px 35px 15px 35px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        background-color: #151515;
    }
    .remember {
        margin: 0 0 25px 0;
    }
    .login-title {
        margin: 0 0 24px 0;;
        color: white;
    }
</style>

