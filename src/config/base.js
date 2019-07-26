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
            //如果传来的对象为FormData,需要需要添加api_token
            if(Object.prototype.toString.call(param) === '[object FormData]'){
                param.append('api_token', store.state.user.api_token);
            }else{
                param['api_token'] = store.state.user.api_token;
            }
        }
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
        if(param.captcha_code === ''){
            this.$message.error('请你填写验证码');
            return false;
        }
        return true;
    },
    smsLoginValidate: function(param = {}) {
        if(param.phone === ""){
            this.$message.error("请你输入手机号");
            return false;
        }
        if(param.sms_code === ""){
            this.$message.error("请你输入验证码");
            return false;
        }
        return true;

    },
    //清空本地用户信息，让用户重新登录
    emptyUserInformation: function () {
        store.commit(types.LOGOUT);
        // this.reload();
        // self.GET(ApiPath.common.checkUserOrAdminLogin).then(function (res) {
        //     console.log(res.data);
        //     if(res.data.code === 2){  //后台管理员与前台用户都不在线，清空前台信息
        //         console.log("1111111111");
        //
        //     }
        // });
    },
    //检查用户后台的登录状态
    checkBackLogin: function (status = 1) {
        return new Promise((resolve, reject) => {
            let self = this;
            self.GET(ApiPath.common.checkLogin, {
                status: status
            }).then(function (res) {
                    if(res.data.code === 2){
                        self.emptyUserInformation();  //清空前台信息
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
            store.state.user[key] = $userInformation[key];
        }
        sessionStorage.user = JSON.stringify(store.state.user);   //更新本地的sessionStorage
    },
    validateContent: function (content) {                         //验证用户输入的内容是否合法
        var  reg = /<\/?[^>]*>/g;
        if(reg.test(content)){
            this.$message.error("你输入的字符非法！");
            return false;
        }
       return true;
    },
    filterContent: function (content) {                                  //过滤用户输入的不合法的内容
        content = content.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
        content = content.replace(/[|]*\n/, '');      //去除行尾空格
        content = content.replace(/&npsp;/ig, '');    //去掉npsp——转义字符
        return content;

    },
    validatePhoto: function (file) {                  //判断用户上传的照片是否合法
        let imageType = ['jpeg','JPEG','png','PNG','jpg','JPG'];
        const isJPG = imageType.indexOf(file.name.split('.')[1]) === -1 ? false : true;
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message.error('只能上传图片!');
            return false;
        }
        if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
            return  false;
        }
        return true;
    }
}