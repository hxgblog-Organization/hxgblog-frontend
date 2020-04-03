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
        inject: ['reload'],
        created() {
            let self = this;
            //前台登录,但是后台没有登录
            if (self.checkFrontLogin()) {
                self.checkBackLogin().then(function (res) {
                    if (res) return true;
                    self.$message.warning("请你重新登录");
                    self.emptyUserInformation();
                    self.reload();
                });
            }
        }
    }
</script>
<style>
    #front {
        /*background: url(./../images/reception/artical-back.jpg)  no-repeat right top #D6E0E1;*/
        min-height: 100vh;
        height: 100%;
        width: 100%;
    }
</style>
