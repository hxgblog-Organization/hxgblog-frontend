import store from '../store/store'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
    //get请求
    GET: function (url, param = {}) {
        console.log(store.state.user);
        if(store.state.user){      //用户只要处于登录状态，每一次get请求都要带着api_token
            param['api_token'] = store.state.user.api_token;
        }
        console.log(param);
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param,
            }).then(res => {
                resolve(res)
            })
        })
    },
    //post请求
    POST: function (url, param = {}) {
        console.log(param);
        if(store.state.user){      //用户只要处于登录状态，每一次post请求都要带着api_token
            //如果传来的对象为FormData,需要需要添加api_token
            if(Object.prototype.toString.call(param) === '[object FormData]'){
                param.append('api_token', store.state.user.api_token);
            }else{
                param['api_token'] = store.state.user.api_token;
            }
        }
        console.log(store.state.user);
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                headers: {
                    "Content-Type":"application/json;charset=utf-8"
                },
                data: param,
                timeout: 20000
            }).then(res => {
                resolve(res)
            })
        })
    },
    LOGINURL: function (url = '') {
        if(url == '' || url == null){
            return sessionStorage.getItem("url_login");
        }
        sessionStorage.setItem("url_login", url);
    },
    //数据加密
    RSA: function (plaintext) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----\n' +
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDxo1UPQvLpHLIrHnXPwvPxikd\n' +
            '/RhozdVr5duiYNYo242yLe9439+NNHj9enghCjHdfzqBEMTjkzJSh+aldTgGKcps\n' +
            'yke12zmvw03wEhZwKwTE0v+bKfUck5PhnIYe77tjExogWWg+yxKKDErf8ireSuX7\n' +
            'wOLwn+AVxjYmaQzCZwIDAQAB\n' +
            '-----END PUBLIC KEY-----\n');
        return encrypt.encrypt(plaintext);
    },
    //登录验证
    loginValidate: function (param = {}) {
        if(param.phone === ''){
            this.$message.error('请你填写手机号');
            return false;
        }
        if(param.password === ''){
            this.$message.error('请你填写密码');
            return false;
        }
        return true;
    },
    //清空本地用户信息，让用户重新登录
    emptyUserInformation: function () {
        console.log("empty");
        store.commit(types.LOGOUT);
        // this.$router.go(0);
        // window.reload();
    },
    //检查用户后台的登录状态
    checkBackLogin: function () {
        return new Promise((resolve, reject) => {
            let self = this;
            self.GET(ApiPath.common.checkLogin)
                .then(function (res) {
                    console.log(res.data);
                    if(res.data.code === 1){
                        console.log(res.data.data);
                        self.emptyUserInformation();  //清空前台信息
                        self.$message.warning("请你重新登录!asdasd");
                        return false;
                    }else {
                        return true;
                    }
                }).then(res => {
                resolve(res);
            })
        });
    },
    //检查用户前台的登录状态
    checkFrontLogin: function () {
        return store.state.user;
    },
    //更新store.state.user和本地的localStorage
    updateLocalStorage: function ($userInformation) {
        for(let key in $userInformation){
            console.log($userInformation[key]);
            store.state.user[key] = $userInformation[key];
        }
        sessionStorage.user = JSON.stringify(store.state.user);   //更新本地的sessionStorage
        this.$router.go(0);
    }
}