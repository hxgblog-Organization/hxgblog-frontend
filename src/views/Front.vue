<template>
    <div id="front">
        <myHeader></myHeader>
        <router-view></router-view>
        <myFooter></myFooter>
    </div>
</template>

<script>
    export default {
        name: "Front",
        created() {
            let self = this;
            //前台登录,但是后台没有登录
            if(self.checkFrontLogin()){
                self.checkBackLogin().then(function (res) {
                    console.log(res);
                    if(res) return true;
                    self.$message.warning("请你重新登录!first");
                    self.emptyUserInformation();   //清空前台的登录状态
                    self.reload();
                });
            }
        }
    }
</script>

<style>
    body {
        background: url(./../images/reception/artical-back.jpg)  no-repeat right top #D6E0E1;
    }


</style>