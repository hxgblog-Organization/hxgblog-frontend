export default [
    {
        path: '/',
        name: '/',
        component: resolve => void (require(['../views/Front.vue'], resolve)),
        children: [
            {
                path: '/home',
                name: 'home',
                component: resolve => void (require(['../views/reception/homePage.vue'], resolve))
            },
            {
                path: '/article',
                name: 'article',
                component: resolve => void (require(['../views/reception/article.vue'], resolve)),

            },
            {
                path: '/showArticle',
                name: 'showArticle',
                component: resolve => void (require(['../views/reception/showArticle.vue'], resolve))

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
    },


]
