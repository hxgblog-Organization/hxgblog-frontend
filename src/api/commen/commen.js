var basePath = 'http://localhost:88/';
export default {
    /**
     * 接口路由
     */
    frontLogin: 'frontLogin',                                   //前台登录
    frontSmsLogin: 'frontSmsLogin',                             //前台短信登录
    frontLogout: 'frontLogout',                                 //前台退出
    backLogin: 'backLogin',                                     //后台登录
    backSmsLogin: 'backSmsLogin',                               //后台短信登录
    backLogout: 'backLogout',                                   //后台退出
    getHeadPortrait: basePath + 'getPhoto?disk=head_portrait&filename=', //获取头像路径
    getMusicFile: basePath + 'getPhoto?disk=music&filename=',            //获取音乐文件路径
    getArticalCover: basePath + 'getPhoto?disk=artical&filename=',       //获取文章封面路径
    getAlbumPhoto: basePath + 'getPhoto?disk=image&filename=',           //获取相册照片路径
    getUserInformation: 'getUserInformation',                            //获取用户信息
    updateUserInformation: 'updateUserInformation',                      //修改用户信息
    checkLogin: 'checkLogin',                                            //检查是否登录
    checkUserOrAdminLogin: 'checkUserOrAdminLogin',             //判断后台管理员与前台用户是否同时在线
    getArticalAllType: 'getArticalAllType',                     //获取所有文章类型
    downLoadFile: basePath + 'downloadFile',                    //下载后台文件
    getcaptcha: basePath + 'captcha/',                          //获取验证码
    getSmsCode: 'getSmsCode',                                   //获取短信验证码
    getCityName: 'getCityName',                                 //获取天气城市名字
    updatePassword: 'updatePassword',                           //修改密码
    byCodeUpdatePassword: 'byCodeUpdatePassword',               //用户根据短信验证码修改密码
}