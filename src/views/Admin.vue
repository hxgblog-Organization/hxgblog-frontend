<template>
    <div class="back-start">
        <div class="nav">
            <div class="navLeft">
                <img :src="headPortraitUrl" id="head-image"  alt="未加载">
                <span class="nick-name">{{ information.nick_name }}</span>
            </div>
            <div class="navRight">
                <span class="title">坏小哥博客后台管理</span>
                <div class="loginName">
                    <el-dropdown>
                      <span class="el-dropdown-link">功能列表
                          <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a" @click.native="showUpdatePwdDiag">修改密码</el-dropdown-item>
                            <el-dropdown-item command="b" @click.native="showUpdateInfoModel">修改信息</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <a style="margin-left: 10px;color: white" @click="backLoginOut">退出系统</a><i class="el-icon-caret-right"></i>
                </div>
            </div>
        </div>
        <div class="aside" style="max-height:1000px;z-index:1000;overflow-y:auto;overflow-x: hidden;">
            <el-row id="tac">
                <el-col :span="12">
                    <el-menu
                            :default-active="$route.path"
                            background-color="rgb(34,45,50)"
                            text-color="#fff"
                            activeTextColor="rgb(255, 208, 75)"
                            class="el-menu-vertical-demo"
                            router>
                        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.path" :id="i" >
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.navItem }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
        <div id="main">
            <div id="con">
                <router-view></router-view>
            </div>
        </div>
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
        <infor ref="adminInfo"></infor>
    </div>
</template>
<script>
    export default {
        name: 'Admin',
        inject:['reload'],
        data() {
            return {
                user: store.state.user,
                information: '',
                headPortraitUrl: '',
                updatePasswordDiag: false,
                newPassword: '',
                navList:[
                    { icon:'el-icon-edit',path:'/admin/showArtInfo',navItem:'随便写写' },
                    { icon:'el-icon-picture',path:'/admin/showAlbumInfo',navItem:'唯美相册' },
                    { icon:'el-icon-star-on',path:'/admin/showExhibitInfo',navItem:'前台展览' },
                    { icon:'el-icon-tickets',path:'/admin/showArtType',navItem:'文章类型' },
                ]
            }
        },
        methods: {
            showUpdateInfoModel(){
                console.log(store.state.user);
                let self = this;
                //先检查前台登录状态
                if(!self.checkFrontLogin()) return self.$message.warning("请你先登录");
                //后台登录状态没有消失，再去请求用户信息
                this.checkBackLogin(2)
                    .then(function (res) {
                        if(res){
                            self.$refs.adminInfo.showInforModel(true, 2);
                            return true;
                        }
                        self.emptyUserInformation();
                        self.$message.warning("请你重新登录!");
                        self.reload();
                    });

            },
            updatePassword() {
                let self = this;
                self.POST(ApiPath.common.updatePassword, {
                    new_password: self.newPassword,
                    role: "admin"
                }).then(function (res) {
                    console.log(res.data);
                    if(res.data.code === 1){
                        self.$message.error(res.data.msg);
                        return false;
                    }
                    (res.data.code === 0) ? self.$message.success(res.data.msg) : self.$message.error(res.data.msg);
                    self.emptyUserInformation();
                    setTimeout(function () {
                        self.$router.push({ path: '/backLogin' });   //修改密码后重新登录
                    },1500);
                    return false;
                })

            },
            showUpdatePwdDiag(){
                let self = this;
                //先检查前台登录状态
                if(!self.checkFrontLogin()) return self.$message.warning("请你先登录");
                //后台登录状态没有消失，再去请求用户信息
                this.checkBackLogin(2)
                    .then(function (res) {
                        console.log(res);
                        if(! res){
                            self.$message.warning("请你重新登录!");
                            self.$router.push({ path: '/backLogin' });
                            return false;
                        }
                        self.updatePasswordDiag = true;
                    });
            },
            rushRouter() {
                setTimeout(() => {
                    // console.log(this.$route.matched);
                    let path = this.$route.matched[1].name;
                    if (path === "showArtInfo"|| path === "editorArt") {
                        $('#0').addClass('is-active');
                        // $('#0').css({'color': 'yellow','background-color': 'black'});
                    } else if(path === "showAlbumInfo" || path === "showAlbumPhoto") {
                        $('#1').addClass('is-active');
                        // $('#1').css({'color': 'yellow','background-color': 'black'});
                    } else if(path === "showExhibitInfo") {
                        $('#2').addClass('is-active');
                        // $('#2').css({'color': 'yellow','background-color': 'black'});
                    } else if(path === "showArtType") {
                        $('#3').addClass('is-active');
                        // $('#3').css({'color': rgb(255, 208, 75),'background-color': 'black'});
                    }
                }, 1000);
            },
            backLoginOut() {
                let self = this;
                self.GET(ApiPath.common.backLogout)
                    .then(function (res) {
                        let data = res.data;
                        if(data.code === 2 || data.code === 3){
                            self.$message.error(res.data.msg);
                            return false;
                        }
                        setTimeout(function () {
                            self.emptyUserInformation();
                            self.$router.push({ path: '/backLogin' });
                        }, 800);
                    })
            },
        },
        watch:{
            $route(to,from){
                let isActiveObj = $('.is-active');
                for(let index = 0; index < isActiveObj.length; index++)$(isActiveObj[index]).removeClass('is-active');
                this.rushRouter();
            }
        },
        mounted() {
            this.rushRouter();
            let self = this;
            document.title = "坏小哥的博客后台";
            //前台登录,但是后台没有登录
            if(self.checkFrontLogin()){
                self.checkBackLogin(2).then(function (res) {
                    if(res) return true;
                    self.$message.warning("请你重新登录!");
                    setTimeout(function () {
                        self.$router.push({ path: '/backLogin' });
                    },2000);
                });
                return true;
            }
            setTimeout(function () {
                self.$router.push({ path: '/backLogin' });
            },2000);
        },
        created() {
            $('body').css('background-color','#fff');
            this.information = store.state.user;
            this.headPortraitUrl = ApiPath.common.getHeadPortrait + this.information.head_portrait;
        }
    }

</script>

<style>
    .el-dropdown-link{
        color:rgb(255,152,41);
    }
    .title{
        float: left;
        font-size: 30px;
        margin-left: 25%;
        margin-top: 10px;
        height: 50px;
    }
    .nick-name{
        margin-left: 15px;
    }
    #head-image{
        width: 40px;
        height: 40px;
        margin-top: 5px;
        -moz-border-radius: 60px;
        -webkit-border-radius: 60px;
        border-radius: 60px;
        margin-left: 20px;
    }
    .nav{
        width:100%;
        height:44px;
        position:absolute;
        background: cadetblue;
        top:0;
        left:0;
        right:0;
        color:#fff;
    }

    .navLeft{
        width: 11%;
        height: 100%;
        display: flex;
        align-items: center;
        float: left;
        text-align: center;
    }
    @media screen and (max-width: 1400px){
        body{
            font-size: 12px;
        }
        .navLeft{
            width: 11%;
        }
        .aside{
            width: 11% !important;
            color: white;
            background-color:rgb(34,45,50);
            position:absolute;
            top:35px;
            left:0;
            bottom:0;
        }
        .el-menu-item{
            font-size: 12px !important;
        }
        .el-submenu .el-menu-item{
            min-width: 160px !important;
        }
    }
    .navRight{
        width: 89% !important;
        height: 100%;
        float: right;
        color: white;
        text-align: center;
        line-height:31px;
    }
    .loginName{
        width:24%;
        float: right;
        margin-right: 10%;
        margin-top: 9px;
    }
    .loginName img{
        width:8%;
        vertical-align:middle;
    }
    .aside{
        width: 11%;
        color: white;
        background-color:rgb(34,45,50);
        position:absolute;
        top:44px;
        left:0;
        right: 0;
        bottom:0;
    }
    #main{
        position: absolute;
        left: 185px;
        top: 44px;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
    #con{
        height:100%;
        overflow:auto;
    }
    .aside li{
        height: 100px;
        width: 100%;
        line-height: 100px;
    }
    .signIn img{
        width:22%;
        vertical-align:middle;
    }
    .signIn a{
        color: white;
    }
    .aside li{
        text-align :left;
    }
    .aside li a{
        list-style: none;
        color: white;
        text-decoration: none;
    }
    /*组件*/
    .el-col-12 {
        width: 100%;
    }
    .aside .is-active{
        color: rgb(255, 208, 75) !important;
        background-color: black !important;
    }
    .el-menu-item-group__title{
        display: none;
    }
    .el-submenu__icon-arrow {
        font-size: 16px;
    }
    .el-icon-arrow-down:before{
        font-weight: 800;
    }
    .el-menu-item-group>ul{
        overflow: hidden;
    }
    .el-submenu .el-menu-item{
        min-width: 160px;
    }

</style>

