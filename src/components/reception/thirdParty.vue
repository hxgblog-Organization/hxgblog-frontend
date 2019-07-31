<template>
    <ul class="login-ul">
        <li v-if="isBackLogin" class="first-li"><img src="../../images/reception/qq.png"/></li>
        <li v-else class="first-li" style="margin-left: 10%"><img src="../../images/reception/qq.png"/></li>
        <li class="third-login-li"><img src="../../images/reception/wei_xin.png"/></li>
        <li class="third-login-li"><img src="../../images/reception/wei_bo.png"/></li>
        <li class="third-login-li"><img src="../../images/reception/alipay.png"/></li>
    </ul>
</template>

<script>
    export default {
        name: "thirdParty",
        props:['isBack'],
        data () {
            return {
                isBackLogin: false,
            }

        },
        mounted() {
            this.isBackLogin = this.isBack;
        }
    }
</script>
<style scoped>
    .login-ul li{
        list-style: none;
    }
    .first-li{
        float: left;
        margin-left: 2%;
    }
    .login-ul{
        margin-bottom: 0;
        margin-top: 4%;
        height: 50px;
        width: 100%;
        margin-left: 2%;
    }
    .third-login-li{
        float: left;
        margin-left: 12%;
        list-style: none;
    }

</style>