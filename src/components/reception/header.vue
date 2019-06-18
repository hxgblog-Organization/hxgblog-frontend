<template>
    <div>
        <header class="headers">
            <div id="logo">
                <a href="/"></a>
            </div>
            <nav class="topnav" id="topnav">
                <router-link to="/"><span>首页</span><span class="en">Protal</span></router-link>
                <router-link to="/artical"><span>文章</span><span class="en">Artical</span></router-link>
                <router-link to="/album"><span>相册</span><span class="en">Album</span></router-link>
                <router-link to="/messageBoard"><span>闲言碎语</span><span class="en">Doing</span></router-link>
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
        <login ref='login' @sendMessage = "loginChild"></login>
        <infor ref="infor"></infor>
    </div>
</template>
<script>
    export default {
        name: "headers",
        inject: ['reload'],
        data() {
            return {
                information: {},
                isLogin: store.state.user,
                headPortraitUrl: ''
            }
        },
        methods: {
            showModel(num) {
                (num === 1) ? this.$refs.login.showLoginModel(true) : this.$refs.infor.showInforModel(true, 1);
            },
            showUpdateModel(){
                console.log(store.state.user);
                let self = this;
                //先检查前台登录状态
                if(!self.checkFrontLogin()) return self.$message.warning("请你先登录");
                //后台登录状态没有消失，再去请求用户信息
                this.checkBackLogin()
                    .then(function (res) {
                        (res) ? self.$refs.infor.showInforModel(true, 2) : self.$message.warning("请你重新登录!222");
                    })
            },
            showPasswordModel(){

            },
            loginChild(information) {
                // console.log(information);
                this.isLogin = true;
                this.information = information;
                // location.reload();
                console.log(store.state.user);
                this.headPortraitUrl = ApiPath.common.getHeadPortrait + information.head_portrait;
            },
            loginOut() {
                let self = this;
                self.GET(ApiPath.common.frontLogout)
                    .then(function (res) {
                        let data = res.data;
                        self.emptyUserInformation();
                        self.isLogin = store.state.user;
                        if(data.code === 2 || data.code === 3){
                            self.$message.error(res.data.msg);
                            return false;
                        }
                        location.reload();
                    })
            }
        },
        mounted() {
            if(this.isLogin){
                this.information = store.state.user;
                // this.information = JSON.parse(sessionStorage.getItem('user'));
                // console.log(this.information);
                this.headPortraitUrl = ApiPath.common.getHeadPortrait + this.information.head_portrait;
            }
        }
    }
</script>

<style>
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
    .box{ width:1000px; margin:auto; overflow:hidden}
    header { width: 80%; margin: auto; height: 115px; position: relative; overflow: hidden }
    #logo a { width: 362px; height: 105px; position: absolute; background: url(../../images/reception/logo.png) no-repeat; display: block }
    nav { float: right;  width: 57%; margin: 50px 0 0 0; text-align: right;display: flex;align-items: center; }
    nav a { position: relative; margin-right:2%;display: inline-block; font-size: 18px; font-family: "Î¢ÈíÑÅºÚ", Arial, Helvetica, sans-serif; }
    nav a:hover { text-decoration: none }
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
        background: #7fee1d;
        -moz-border-radius: 60px;
        -webkit-border-radius: 60px;
        border-radius: 60px;
    }
    .font-span{
        font-size: 15px;
    }
</style>