import VueRouter from 'vue-router'
import store from '../store/store'
import * as types from '../store/types'
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(VueRouter);
Vue.use(mavonEditor);
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
    // console.log(to.name);
    // if(to.name === "admin"){                   //如果是后台登录路由，渲染后台视图
    //     next({
    //         path: '/admin',
    //     });
    // }
    if(to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.user) {
            next();
        } else {
            next({
                path: '/404',
                // query: { redirect: to.fullPath }
            });
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
