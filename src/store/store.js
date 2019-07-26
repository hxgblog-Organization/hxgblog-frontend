import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        [types.USER]: (state, data) => {
            console.log(state);
            sessionStorage.user = JSON.stringify(data);//从sessionStorage获取用户登录状态（从一个对象解析出字符串）
            state.user = data;
        },
        [types.LOGOUT]: (state) => {                   //用户退出，清除sessionStorage
            sessionStorage.removeItem('user');
            state.user = null;
        }
    }
});