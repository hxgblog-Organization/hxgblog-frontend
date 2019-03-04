export default [
    {
        path: '/',
        name: 'homePage',
        component: resolve => void (require(['../views/reception/homePage.vue'], resolve))
    },
    {
        path: '/artical',
        name: 'artical',
        component: resolve => void (require(['../views/reception/artical.vue'], resolve))

    },
    {
        path: '/showArtical',
        name: 'showArtical',
        component: resolve => void (require(['../views/reception/showArtical.vue'], resolve))

    },
    {
        path: '/album',
        name: 'album',
        component: resolve => void (require(['../views/reception/album.vue'], resolve))
    },
    {
        path: '/showPhoto',
        name: 'showPhoto',
        component: resolve => void (require(['../views/reception/showPhoto.vue'], resolve))
    },
    {
        path: '/messageBoard',
        name: 'messageBoard',
        component: resolve => void (require(['../views/reception/messageBoard.vue'], resolve))

    }
]