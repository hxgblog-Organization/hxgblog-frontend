import axios from 'axios'
import store from "../store/store";
import * as types from "../store/types";
import router from "./index";
/**
 * 权限拦截验证
 * @type {*|void|any|{now}}
 */
var instance = axios.create({
    timeout: 1000 * 1200,
});
instance.defaults.withCredentials = true; //跨域
// instance.defaults.baseURL = 'http://doclever.cn:8090/mock/5c3d98703dce46264b246eb3';// 设置默认请求url
// instance.defaults.baseURL = 'http://localhost:88';   //线下
instance.defaults.baseURL = 'https://blogback.zhangtengfei-steven.cn/';  //线上
//
instance.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

//当api_token在后台更新后，前台直接截获重新给localstorage里的api_token重新赋值
instance.interceptors.response.use(
    response => {
        if (response.headers.api_token){
            console.log(response.headers.api_token);
            let user = store.state.user;
            user.api_token = response.headers.api_token;
            store.commit(types.USER, user);
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // store.commit(types.LOGOUT);
                    //只有在当前路由，不是在登录页面才跳转
                    router.currentRoute.path !== this.LOGINURL() && router.replace({
                        path: this.LOGINURL(),
                        query: { redirect: router.currentRoute.path },
                    });
                    break;
                case 404:
                    // router.replace({path: "/404"});
                    break;
            }
        }
        return Promise.reject(error.response.data);
    });
export default instance;
