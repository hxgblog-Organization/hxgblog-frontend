<template>
    <div>
        <header class="headers">
            <div id="logo">
                <img src="../../images/reception/logo.png">
            </div>
            <nav class="topnav" id="topnav">
                <router-link target="_blank" to="/" id="main-page"><span>首页</span><span class="en">Protal</span></router-link>
                <router-link target="_blank" to="artical" id="artical"><span>文章</span><span class="en">Artical</span></router-link>
                <router-link target="_blank" to="album" id="album"><span>相册</span><span class="en">Album</span></router-link>
                <router-link target="_blank" to="messageBoard" id="speach"><span>闲言碎语</span><span class="en">Doing</span></router-link>
                <div class="infor-content" v-if="isLogin">
                    <ul class="infor-ul">
                        <li>
                            <el-col :span="12">
                                <el-dropdown>
                            <span class="el-dropdown-link">
                                 <img :src="headPortraitUrl" alt="无法加载" class="el-dropdown-link" id="head-img"/>
                                <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                            </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-plus"  @click.native="showUpdateModel">修改信息</el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-circle-plus" @click.native="showPasswordModel">修改密码</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </li>
                        <li><span class="font-span">{{ information.nick_name }}&nbsp;</span></li>
                        <el-button id="exit-btn"  @click="loginOut">退出</el-button>
                    </ul>
                </div>
                <div id="login-register" v-if="!isLogin">
                    <el-button type="text" @click="showModel(1)">登录</el-button>
                    <el-button type="text" @click="showModel(2)">注册</el-button>
                </div>
            </nav>
        </header>

        <frontLogin ref='frontLogin' @sendFatherMsg = "loginChild" @showByCodeUpdatePwd="showByCodeUpdatePwd"></frontLogin>
        <infor ref="infor"></infor>
        <byCodeUpdatePwd ref="byCodeUpdatePwd"></byCodeUpdatePwd>

        <el-dialog title="修改密码" :visible.sync="updatePasswordDiag" width="350px">
            <el-form>
                <el-form-item label="新密码" label-width="80px">
                    <el-input v-model="newPassword" type="password" maxlength="20px" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatePasswordDiag = false">取 消</el-button>
                <el-button type="primary" @click="updatePassword">修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "myHeader",
        inject: ['reload'],
        data() {
            return {
                information: {},
                isLogin: store.state.user,
                headPortraitUrl: '',
                updatePasswordDiag: false,
                newPassword: '',
                byCodeUpdatePasswordDiag: false,
            }
        },
        methods: {
            showByCodeUpdatePwd() {
                this.$refs.byCodeUpdatePwd.showUpdatePasswordModel();
            },
            showModel(num) {
                (num === 1) ? this.$refs.frontLogin.showLoginModel(true) : this.$refs.infor.showInforModel(true, 1);
            },
            updatePassword() {
                let self = this;
                self.POST(ApiPath.common.updatePassword, {
                    new_password: self.newPassword,
                    role: 'user'
                }).then(function (res) {
                    if(res.data.code === 1){
                        self.$message.error(res.data.msg);
                        return false;
                    }
                    (res.data.code === 0) ? self.$message.success(res.data.msg) : self.$message.error(res.data.msg);
                    self.emptyUserInformation();                     //修改密码后，重新登录
                    self.reload();
                    return false;
                })
            },
            showUpdateModel(){
                console.log(store.state.user);
                let self = this;
                //先检查前台登录状态
                if(!self.checkFrontLogin()) return self.$message.warning("请你先登录");
                //后台登录状态没有消失，再去请求用户信息
                this.checkBackLogin()
                    .then(function (res) {
                        if(res){
                            self.$refs.infor.showInforModel(true, 2);
                            return true;
                        }
                        self.emptyUserInformation();
                        self.$message.warning("请你重新登录!");
                        self.reload();
                    });
            },
            showPasswordModel(){
                let self = this;
                //先检查前台登录状态
                if(!self.checkFrontLogin()) return self.$message.warning("请你先登录");
                //后台登录状态没有消失，再去请求用户信息
                this.checkBackLogin()
                    .then(function (res) {
                        if(! res){
                            self.$message.warning("请你重新登录!");
                            self.emptyUserInformation();
                            self.reload();
                            return false;
                        }
                        self.updatePasswordDiag = true;
                    });


            },
            loginChild(information) {
                this.isLogin = true;
                this.information = information;
                this.reload();
            },
            loginOut() {
                let self = this;
                self.isLogin = false;
                self.GET(ApiPath.common.frontLogout)
                    .then(function (res) {
                        let data = res.data;
                        if(data.code === 2 || data.code === 3){
                            self.$message.error(res.data.msg);
                            return false;
                        }
                        setTimeout(function () {
                            self.emptyUserInformation();
                            self.isLogin = store.state.user;
                            self.reload();
                        }, 1500);
                    })
            },
            rushRouter:function(){
                setTimeout(() => {
                    let path = this.$route.matched[1].path;
                    if (path === "/home") {
                        $('#main-page').css('color','deepskyblue');
                    } else if(path === "/artical" || path === "/showArtical") {
                        $('#artical').css('color','deepskyblue');
                    } else if(path === "/album" || path === "/showPhoto") {
                        $('#album').css('color','deepskyblue');
                    } else if(path === "/messageBoard") {
                        $('#speach').css('color','deepskyblue');
                    }
                }, 1000);

            },
        },
        mounted() {
            this.rushRouter();
            if(this.isLogin){
                this.information = store.state.user;
                this.headPortraitUrl = ApiPath.common.getHeadPortrait + this.information.head_portrait;
            }
        }
    }
</script>

<style>
    @media screen and (min-width:992px){
        #exit-btn{
            margin-left: 80px;
        }
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
        .demonstration {
            display: block;
            color: #8492a6;
            font-size: 14px;
            margin-bottom: 20px;
        }
        * { margin: 0; padding: 0 }
        body { font: 12px "ËÎÌå", Arial, Helvetica, sans-serif; color: #756F71 }
        img { border: 0; display: block }
        ul, li { list-style: none; }
        a:link, a:visited, a:active { text-decoration: none; color: #fff }
        a:hover { text-decoration: none; color: #fff; }
        .clear { clear: both; }
        .blank { height: 8px; overflow: hidden; width: 100%; margin: auto; clear: both }
        .f_l { float: left }
        .f_r { float: right }
        .containers{ background: url(../../images/reception/album-back.jpg) repeat; overflow: hidden; margin: 20px; box-shadow: #075498 0px 1px 10px; }
        .page{ margin:20px 0 ; text-align:center; width:100%;overflow: hidden;}
        .page a b {color: #aee1ff;}
        .page>b,.page a {margin: 0 2px;height: 26px;line-height: 26px;border-radius: 50%;width: 26px;text-align: center;display: inline-block}
        .page a {margin: 0 2px;height: 26px;line-height: 26px;border-radius: 50%;width: 26px;text-align: center;display: inline-block}/* Õë¶ÔIE6 */
        .page>b,.page a:hover{background: #2a455d;color: #FFF;}
        .page a {color: #aee1ff;border: #89c9ef 1px solid}
        .ctitle{ position:relative}
        .ctitle b{font-size: 22px; margin-bottom: 20px; background: #2a7497; padding: 10px 0; width: 200px; text-align: center; border-radius: 0 30px 30px 0; box-shadow: #21566f 1px 1px 1px; border-left: #dae1e4 6px solid; display:block; margin:30px 0 0 30px}
        .ctitle span{ float:right; font-size:14px; position:absolute; right:20px ; top:20px;text-shadow: rgba(7, 84, 152, 0.71) 1px 1px 1px;}


        a:link, a:visited {text-decoration: none; color: #333;}
        .left { float: left; }
        .right { float: right; }
        .blank { height: 5px; overflow: hidden; width: 100%; margin: auto; clear: both }
        /*.box{ width:1000px; margin:auto; overflow:hidden}*/
        header { width: 80%; margin: auto; height: 115px;  display: flex;}
        #logo{width: 50%;}
        nav { width: 60%; margin: 50px 0 0 0; text-align: right;display: flex;align-items: center; }
        nav a { position: relative; margin-right:2%;display: inline-block; font-size: 18px; font-family: "Î¢ÈíÑÅºÚ", Arial, Helvetica, sans-serif; }
        nav a:hover { text-decoration: none; color: #37ccca}
        .topnav a { margin: 0 20px; padding: 0 8px; }
        .topnav a span:first-child { z-index: 2; display: block; }
        .topnav a span:last-child { z-index: 1; display: block; color: #999; font: 12px Georgia, serif; opacity: 0; -webkit-transition: -webkit-transform 0.3s, opacity 0.3s; -moz-transition: -moz-transform 0.3s, opacity 0.3s; transition: transform 0.3s, opacity 0.3s; -webkit-transform: translateY(-100%); -moz-transform: translateY(-100%); transform: translateY(-100%); text-align: center }
        .topnav a:hover span:last-child, .topnav a:focus span:last-child { opacity: 1; -webkit-transform: translateY(0%); -moz-transform: translateY(0%); transform: translateY(0%); }
        #topnav_current { color: #e15782; }
        .en { color: #999; font-size: 12px; z-index: 1; display: block; }/* ie */
        article { width: 1000px; margin: 20px auto; overflow: hidden; text-align: left}
        aside { width: 250px; }
        .infor-ul li{
            float: left;
            width: 150px;
        }
        .infor-content, #login-register{
            float: right;
            width: 38%;
        }
        .infor-ul{
            margin-left: 24px;
            align-items: center;
            display: flex;
            margin-bottom: 0;
        }
        #head-img{
            width: 40px;
            height: 40px;
            -moz-border-radius: 60px;
            -webkit-border-radius: 60px;
            border-radius: 60px;
        }
        .font-span{
            font-size: 15px;
        }
    }

    @media screen and (max-width:991px){
        header { width: 90%; display: flex; margin:0;flex-wrap: wrap;justify-content:center}
        #logo{width: 80%;}
        #logo img{width: 100%;}
        nav { width: 90%; text-align: right;display: flex;align-items: center; }
        nav a { margin-right:2%;display: inline-block; font-size: 13px; font-family: "Î¢ÈíÑÅºÚ", Arial, Helvetica, sans-serif; }
        nav a:hover { text-decoration: none; color: #37ccca}

    }
</style>