<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterAlive: true,
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true;
                })
            },
        },
        created() {
            // let self = this;
            //判断是否登录
            // self.checkBackLogin().then(function (res) {
            // if (res === false) {
            //     if (self.checkFrontLogin()) {
            //         self.$message.warning("请你重新登录!first");
            //     }
            //     return false;
            // }
            // if (! self.checkFrontLogin()) {
            //     store.commit(types.USER, res);
            //     self.reload();
            // }
            // });
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        /*margin-top: 20px;*/
    }

    button:focus {
        outline: 0;
    }

    button, a {
        cursor: pointer;
    }

    button:focus {
        outline: none !important;
    }
</style>
