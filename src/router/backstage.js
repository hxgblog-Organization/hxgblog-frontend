export default [
    /**
     * admin
     */
    {
        path: '/admin/login',
        name: 'adminLogin',
        component: resolve => void (require(['../views/backstage/adminLogin.vue'], resolve))
    },
    {
        path: '/show/articalInfor',
        name: 'show/articalInfor',
        meta: {
            roles: ['admin'],
            requireAuth: true,
        },
        component: resolve => void (require(['../views/backstage/showArticalInfor.vue'], resolve))
    }
]