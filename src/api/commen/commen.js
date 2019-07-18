var basePath = 'http://localhost:88/';
export default {
    /**
     * 接口路由
     */
    frontLogin: 'frontLogin',
    frontLogout: 'frontLogout',
    backLogin: 'backLogin',
    backLogout: 'backLogout',
    getHeadPortrait: basePath + 'getPhoto?disk=head_portrait&filename=',
    getArticalCover: basePath + 'getPhoto?disk=artical&filename=',
    getAlbumPhoto: basePath + 'getPhoto?disk=image&filename=',
    getUserInformation: 'getUserInformation',
    updateUserInformation: 'updateUserInformation',
    checkLogin: 'checkLogin',
    checkUserOrAdminLogin: 'checkUserOrAdminLogin',             //判断后台管理员与前台用户是否同时在线
    getArticalAllType: 'getArticalAllType',                     //获取所有文章类型

}