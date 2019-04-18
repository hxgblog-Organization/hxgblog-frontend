import loadsh from 'lodash'
window._ = loadsh;
import 'bootstrap/dist/css/bootstrap.min.css'
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
import jQuery from "jquery"
window.$ = window.jQuery = jQuery;

/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

import Vue from 'vue'
window.Vue = Vue;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
import instance from './config/auth'
window.axios = instance;

import Mock from 'mockjs'
window.Mock = Mock;

/**
 * 引入自定义方法
 */
import base from './config/base'
Object.keys(base).forEach((key) => {
    Vue.prototype[key] = base[key]
});


/**
 * 状态码
 */
import * as types from './store/types'
window.types = types;

/**
 * 状态
 */
import store from './store/store'
window.store = store;

/**
 * ElementUI组件库
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/**
 *vue路由
 */
import router from './config/index'
window.router = router;

/**
 * api文档
 */
import api from './api/apipath'
window.ApiPath = api;

/**
 * 设置mock请求
 */

/**
 * 加载公共组件
 */
import components from './components/'
Object.keys(components).forEach((key) => {
   Vue.component(key, components[key])
});