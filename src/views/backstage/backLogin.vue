<template>
    <div class="login-container">
        <h3 class="title">坏小哥博客后台登录</h3>
        <baseLogin :loginUrl="loginUrl" ref="baseLogin" @sendMsg="getLoginStatus"></baseLogin>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginUrl: ApiPath.common.backLogin,
            };
        },
        inject: ['reload'],
        methods: {
            getLoginStatus(information) {
                console.log(information);
                this.$router.push({path: '/admin/manageArtical'});
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
        color: #fff;
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
        height: 330px;
        padding: 35px 35px 15px 35px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        opacity: 0.9;
        background-color: #151515;
    }
    .remember {
        margin: 0 0 25px 0;
    }
    .title {
        margin: 0 auto 10px auto;
        color: white;
    }
</style>

