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
                path: 'showArtInfo',
                name: 'showArtInfo',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showArtInfo.vue'], resolve))
            },
            {
                path: 'editorArt/:art_id?',
                name: 'editorArt',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/editorArt.vue'], resolve))
            },
            {
                path: 'showAlbumInfo',
                name: 'showAlbumInfo',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showAlbumInfo.vue'], resolve))
            },
            {
                path: 'showExhibitInfo',
                name: 'showExhibitInfo',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showExhibitInfo.vue'], resolve))
            },
            {
                path: 'showFileInfo',
                name: 'showFileInfo',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showFileInfo.vue'], resolve))
            },
            {
                path: 'showAlbumPhoto/:album_id?',
                name: 'showAlbumPhoto',
                meta: {
                    roles: ['admin'],
                    requireAuth: true
                },
                component: resolve => void (require(['../views/backstage/showAlbumPhoto.vue'], resolve))
            },
            {
                path: 'showArtType',
                name: 'showArtType',
                meta: {
                    roles: ['admin'],
                    requireAuth: true,
                },
                component: resolve => void (require(['../views/backstage/showArtType.vue'], resolve))
            },
        ]
    },


]