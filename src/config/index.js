import VueRouter from 'vue-router'
import store from '../store/store'
import * as types from '../store/types'
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
Vue.use(VueRouter);
Vue.use(mavonEditor);

//封装成一个指令
Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
});
//页面刷新的时，重新赋值
if (sessionStorage.getItem('user')) {
    store.commit(types.USER, JSON.parse(sessionStorage.getItem('user')));
}


/**
 * 加载路由
 */
import routers from '../router/routers'


//
const router = new VueRouter({
    mode: 'history',
    routes: routers,
    linkExactActiveClass:'active'
});

//
router.beforeEach((to, from, next) => {
    if(to.matched.some(r => r.meta.requireAuth)) {
        if(! store.state.user || store.state.user.role !== 1){
            next({
                path: '/404',
                // query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

// function getLoginUrl() {
//     let url = sessionStorage.getItem('url_login');
//     if (url == '' || url == null) {
//         url = '/404';
//     }
//     return url;
// }
export  default router;
