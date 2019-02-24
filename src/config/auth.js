import axios from 'axios'
import store from "../store/store";
import * as types from "../store/types";
import router from "./index";
/**
 * 权限拦截验证
 * @type {*|void|any|{now}}
 */
var instance = axios.create({ timeout: 1000 * 12});
instance.defaults.withCredentials = true; //跨域
instance.defaults.baseURL = 'http://doclever.cn:8090/mock/5c3d98703dce46264b246eb3';// 设置默认请求url

instance.insterceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

instance.insterceptors.request.use(
    response => {
        if (response.headers.api_token){

        }
    }

);