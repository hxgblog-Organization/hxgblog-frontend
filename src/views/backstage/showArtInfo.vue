<template>
    <div class="show-artical">
        <div class="headers">
            <router-link to="/admin/editorArtical" class="add-artical-btn">
                <el-button type="primary"><i class="el-icon-plus el-icon--left">添加文章</i></el-button>
            </router-link>
            <span class="art">文章（{{ total }}）</span>
            <div class="block">
                <span>时间查询：</span>
                <el-date-picker class="date-select"
                        v-model="timeSection"
                        type="daterange"
                        value-format="timestamp"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        default-value="2019-3-01">
                </el-date-picker>
                <span class="artical-name">文章名字：</span>
                <el-input placeholder="请输入文章名字" v-model="articalName" @keyup.enter.native=""></el-input>
                <el-button @click="selectArticalData">搜索</el-button>
                <el-popover
                        placement="top-start"
                        width="500"
                        trigger="click">
                    <el-form ref="form"  label-width="80px">
                        <el-form-item label="文章类型">
                            <el-checkbox-group :indeterminate="isIndeterminate" v-model="typeIdData">
                                <el-checkbox v-for="type in artTypeGroup" :key="type.type_id" :label="type.type_id">{{ type.type_name }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="byTypeSelectArtical">确定</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                    <div slot="reference" class="art-type">高级筛选
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                </el-popover>
            </div>
        </div>
        <el-table
                ref="multipleTable"
                :data="articalData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="arti_title"
                    label="题目"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="arti_content"
                    label="内容"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="arti_reward_money"
                    label="赏钱"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="arti_praise_points"
                    label="赞"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="arti_trample_points"
                    label="踩"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="arti_browse"
                    label="浏览量"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="创作时间"
                    width="150">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            size="small">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateArtical(articalData[scope.$index].arti_id)">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="beforedeleteArtical(articalData[scope.$index].arti_id)">删除</el-button>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="operate">
            <el-button @click="toggleSelection">取消选择</el-button>
            <el-button @click="deleteArtical">删除</el-button>
        </div>
        <div class="page">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPages"
                    :page-sizes="[3, 10, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        name: "showArtInfo",
        data(){
            return {
                timeSection: '',
                articalData: [],
                multipleSelection:[],
                articalName: '',
                isIndeterminate: true,
                artTypeGroup: [],
                page: 0,
                pageSize: 3,
                currentPages: 0,
                total: 0,
                typeIdData: [],
                isTypeSelect: false,
                art_id_data: [],
            }
        },
        methods: {
            cancel() {
                document.querySelector("body").click();
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            beforedeleteArtical(artId) {
                this.art_id_data = [];
                this.art_id_data.push(artId);
                this.deleteArtical();
            },
            handleCurrentChange(val) {
                this.currentPages=val;
                if(this.isTypeSelect){
                    this.byTypeSelectArtical();
                    return true;
                }
                (this.timeSection.length === 0 && this.articalName === '') ? this.getArtifcalData() : this.selectArticalData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleSelectionChange(val) {
                this.art_id_data = [];   //每次添加前，先清空之前的。
                for(let i = 0; i < val.length; i++) this.art_id_data[i] = val[i].arti_id;
            },
            getArtifcalData() {
                let self = this;
                self.isTypeSelect = false;
                self.GET(ApiPath.maartical.getArtical, {
                    total: self.pageSize,
                    page: self.currentPages
                }).then(function (res) {
                    let data = res.data;
                    console.log(data);
                    if(data.code === 0){
                        self.total =  data.data.art_data.total;
                        self.articalData = data.data.art_data.data;
                        self.artTypeGroup = data.data.art_type_data;
                        console.log(self.articalData);
                    }
                })
            },
            selectArticalData() {
                let self = this;
                self.isTypeSelect = false;
                if(self.timeSection.length !== 0){
                    self.timeSection[0] = self.timeSection[0] / 1000;
                    self.timeSection[1] = self.timeSection[1] / 1000;
                }
                self.GET(ApiPath.maartical.combinateSelectArtical, {
                    time: self.timeSection,
                    art_name: self.articalName,
                    total: self.pageSize,
                    page: self.currentPages
                }).then(function (res) {
                    let data = res.data;
                    if(data.code === 0){
                        self.total =  data.data.total;
                        self.articalData = data.data.data;
                        console.log(self.articalData);
                    }

                })
            },
            byTypeSelectArtical() {
                let self = this;
                self.isTypeSelect = true;
                console.log(self.typeIdData);
                self.GET(ApiPath.maartical.byTypeSelectArtical, {
                    type_id_data: self.typeIdData,
                    total: self.pageSize,
                    page: self.currentPages
                }).then(function (res) {
                    let data = res.data;
                    console.log(res.data);
                    if(data.code === 0){
                        self.articalData = data.data.art_data;
                        self.total = data.data.total;
                    }
                })
            },
            deleteArtical() {
                console.log(this.art_id_data);
                let self = this;
                self.POST(ApiPath.maartical.deleteArtical,{ art_id_data: self.art_id_data })
                    .then(function (res) {
                        console.log(res.data);
                        if(res.data.code === 0){
                            self.$message.success(res.data.msg);
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        return false;
                    })
            },
            updateArtical(art_id) {
                this.$router.push({ path: `editorArt/${art_id}` });
            },
        },
        mounted() {
            this.getArtifcalData();
        }
    }
</script>

<style scoped>
    .date-select{
        width: 25%;
    }
    .add-artical-btn{
        float: right;
    }
    .show-artical{
        min-height: 800px;
        margin-top: 5%;
        margin-left: 10%;
        width: 77%;
    }
    .art-type{
        width: 5%;
        display: inline;
    }
    .el-input{
        width: 20%;
    }
    .artical-name{
        margin-left: 10px;
    }
    .block{
        margin-left: 60px;
    }
    .el-checkbox{
        margin-bottom: 0;
    }
    .art{
        float: left;
        margin-top: 10px;
        border-right: 1px #d4d8d7 solid;
    }
    .operate{
        margin-left: 70%;
        margin-top: 20px;
    }

</style>