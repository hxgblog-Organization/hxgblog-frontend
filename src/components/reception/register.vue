<template>
    <div>
        <el-dialog width="35%" title="注册" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="form.sex" label="1">男</el-radio>
                    <el-radio v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <span>其他注册方式</span>
            <ul class="login-ul">
                <li><img src="../../images/reception/qq.png"/></li>
                <li><img src="../../images/reception/wei_xin.png"/></li>
                <li><img src="../../images/reception/wei_bo.png"/></li>
                <li><img src="../../images/reception/alipay.png"/></li>
            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button style="width: 100%" type="primary" @click="dialogFormVisible = false">注册</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "register",
        data(){
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    sex:'0'
                },
                formLabelWidth: '60px'
            }
        },
        methods:{
            showRegisterModel(visible){
                this.dialogFormVisible = visible;
                console.log("dsds");
            }
        }
    }
</script>

<style scoped>
    .login-ul{
        margin-top: 2%;
    }
    .login-ul li{
        float: left;
        margin-left: 12%;
    }
</style>