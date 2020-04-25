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
            //判断是否登录
            self.checkBackLogin().then(function (res) {
                if (res === false) {
                    if (self.checkFrontLogin()) {
                        self.$message.warning("请你重新登录!first");
                    }
                    return false;
                }
                if (! self.checkFrontLogin()) {
                    store.commit(types.USER, res);
                    self.reload();
                }
            });
        }
    }
</script>
<style>
    #front {
        /*background: url(./../images/reception/article-back.jpg)  no-repeat right top #D6E0E1;*/
        min-height: 100vh;
        height: 100%;
        width: 100%;
    }
</style>
