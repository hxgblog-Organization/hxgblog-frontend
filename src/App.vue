<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App',
        methods:{
            judgeLogin(){
                let isLogin = store.state.user;
                if(isLogin){

                }
            }
        },
        created(){
            this.judgeLogin();
        }
    }
</script>

<style>
#app {
  background: url(./images/reception/artical-back.jpg)  no-repeat right top #D6E0E1;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 20px;*/
}
</style>
