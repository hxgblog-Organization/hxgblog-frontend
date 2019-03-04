import store from '../store/store'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
    //get请求
    GET: function (url, param = {}) {
        if(store.state.user){      //用户只要处于登录状态，每一次get请求都要带着api_token
            param['api_token'] = store.state.user.api_token;
        }
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
        if(store.state.user){      //用户只要处于登录状态，每一次post请求都要带着api_token
            param['api_token'] = store.state.user.api_token;
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param,
                headers: {
                    "Content-Type":"application/json;charset=utf-8"
                }
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
    RSA: function (plaintext) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----\n' +
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDxo1UPQvLpHLIrHnXPwvPxikd\n' +
            '/RhozdVr5duiYNYo242yLe9439+NNHj9enghCjHdfzqBEMTjkzJSh+aldTgGKcps\n' +
            'yke12zmvw03wEhZwKwTE0v+bKfUck5PhnIYe77tjExogWWg+yxKKDErf8ireSuX7\n' +
            'wOLwn+AVxjYmaQzCZwIDAQAB\n' +
            '-----END PUBLIC KEY-----\n');
        return encrypt.encrypt(plaintext);
    }

}