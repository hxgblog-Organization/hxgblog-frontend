import store from '../store/store'
import * as types from '../store/types'

//页面刷新的时，重新赋值
if (sessionStorage.getItem('user')) {
    store.commit(types.USER, JSON.parse(sessionStorage.getItem('user')));
}

// router.beforeEach((to, from, next) => {
//     if(to.matched.some(r => r.meta.requireAuth)) {
//
//     }
// });
