export default [
    {
      path: '/404',
      name: '404',
      component: resolve => void (require(['../views/error404.vue'], resolve))
    },
    /**
     * admin
     */
    {
        path: '/backLogin',
        name: 'backLogin',
        component: resolve => void (require(['../views/backstage/backLogin'], resolve))
    },
    {
        path: '/admin',
        name: 'admin',
        component: resolve => void (require(['../views/Admin'], resolve)),
        children: [
            {
                path: 'manageArtical',
                name: 'manageArtical',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showArticalInfor.vue'], resolve))
            },
            {
                path: 'editorArtical/:art_id?',
                name: 'editorArtical',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/editorArtical.vue'], resolve))
            },
            {
                path: 'showAlbumInfor',
                name: 'showAlbumInfor',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showAlbumInfor.vue'], resolve))
            },
            {
                path: 'showMottoInfor',
                name: 'showMottoInfor',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showMottoInfor.vue'], resolve))
            },
            {
                path: 'showFileInfor',
                name: 'showFileInfor',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showFileInfor.vue'], resolve))
            }
        ]
    },


]