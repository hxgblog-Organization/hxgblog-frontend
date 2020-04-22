<template>
    <ul class="login-ul">
        <li class="third-login-li"><img class="login-logo" @click="thirdPartyLogin(thirdPartyURL.bai_du)" src="../../images/reception/bai_du_logo.png"/></li>
        <li class="third-login-li"><img class="login-logo" @click="thirdPartyLogin(thirdPartyURL.ali_pay)" src="../../images/reception/alipay.png"/></li>
        <li v-if="isBackLogin" class="first-li"><img class="login-logo" @click="thirdPartyLogin(thirdPartyURL.qq)" src="../../images/reception/qq.png"/></li>
        <li v-else class="first-li" style="margin-left: 10%"><img class="login-logo" @click="thirdPartyLogin(thirdPartyURL.qq)" src="../../images/reception/qq.png"/></li>
        <li class="third-login-li"><img class="login-logo" @click="thirdPartyLogin(thirdPartyURL.wei_bo)" src="../../images/reception/wei_bo.png"/></li>
        <li class="third-login-li"><img class="login-logo" @click="thirdPartyLogin(thirdPartyURL.git_hub)" src="../../images/reception/github.jpg"/></li>
    </ul>
</template>

<script>
    export default {
        name: "thirdParty",
        props: ['isBack'],
        data() {
            return {
                isBackLogin: false,
                thirdPartyURL: [],
            }

        },
        methods: {
            getThirdPartyURL() {
                let self = this;
                self.GET(ApiPath.common.getThirdPartyUrl, {
                    frontend_url: window.location.href
                })
                    .then(function (res) {
                        self.thirdPartyURL = res.data.data;
                })
            },
            thirdPartyLogin(loginURL) {
                window.open(loginURL, '_blank');
            }
        },
        mounted() {
            this.isBackLogin = this.isBack;
            this.getThirdPartyURL();
        }
    }
</script>
<style scoped>
    .login-ul li {
        list-style: none;
    }

    .first-li {
        float: left;
        margin-left: 2%;
    }

    .login-logo {
        cursor: pointer;
    }

    .login-ul {
        margin-bottom: 0;
        margin-top: 4%;
        height: 50px;
        width: 100%;
        margin-left: 2%;
    }

    .third-login-li {
        float: left;
        margin-left: 8%;
        list-style: none;
    }

</style>
