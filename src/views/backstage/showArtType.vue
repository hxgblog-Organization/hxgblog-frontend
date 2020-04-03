<template>
    <div class="show-art-type">
        <div class="headers">
            <el-button type="primary" class="add-art-type">
                <i class="el-icon-plus el-icon--left" @click="showUpdateTypeDiag(-1)">添加文章类型</i>
            </el-button>
            <div class="exhibit-title">
                <span class="art">文章类型（{{ total }}）</span>
                <div class="block">
                    <span>时间查询：</span>
                    <el-date-picker
                        class="date-select"
                        v-model="timeSection"
                        type="daterange"
                        value-format="timestamp"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                    <el-button @click="byTimeSelectArtTypeInfo">搜索</el-button>
                </div>
            </div>
        </div>
        <el-table
            class="exhibit-table"
            ref="multipleTable"
            :data="artTypeData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="type_name"
                label="名字"
                width="200">
            </el-table-column>
            <el-table-column
                prop="type_count"
                label="文章数量"
                width="150">
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="创建时间"
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
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="showUpdateTypeDiag(scope.$index)">编辑
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="beforedeleteArtType(artTypeData[scope.$index].type_id)">删除
                        </el-button>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="operate">
            <el-button @click="toggleSelection">取消选择</el-button>
            <el-button @click="deleteArtType">删除</el-button>
        </div>
        <div class="page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPages"
                :page-sizes="[2, 10, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="editArtTypeTitle" :visible.sync="editTypeVisible" width="350px">
            <el-form>
                <el-form-item label="文章类型名" :label-width="showLabelWidth">
                    <el-input v-model="newArtTypeName" maxlength="20px" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateTypeVisible = false">取 消</el-button>
                <el-button type="primary" v-if="isUpdate" @click="updateArtType">修改</el-button>
                <el-button type="primary" v-else @click="addArtType">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "showArtType",
        inject: ['reload'],
        data() {
            return {
                msg: 'ArtType',
                artTypeData: [],
                timeSection: [],
                artTypeIdData: [],
                pageSize: 2,
                currentPages: 1,
                total: 0,
                editTypeVisible: false,
                showLabelWidth: '100px',
                newArtTypeName: '',
                editArtTypeTitle: '修改文章类型',
                isUpdate: true,
                typeId: '',
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.artTypeIdData = [];   //每次添加前，先清空之前的。
                for (let i = 0; i < val.length; i++) this.artTypeIdData[i] = val[i].type_id;
            },
            handleCurrentChange(val) {
                this.currentPages = val;
                if (this.timeSection.length !== 0) return this.byTimeSelectArtTypeInfo();
                this.getArtTypeData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
            getArtTypeData() {
                let self = this;
                self.GET(ApiPath.matype.getArtType, {
                    total: self.pageSize,
                    page: self.currentPages,
                }).then(function (res) {
                    if (res.data.code === 0) {
                        self.artTypeData = res.data.data.data;
                        self.total = res.data.data.total;
                    }
                })
            },
            addArtType() {
                let self = this;
                self.POST(ApiPath.matype.addArtType, {
                    type_name: self.newArtTypeName
                }).then(function (res) {
                    if (res.data.code === 0) {
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                    return false;
                })

            },
            beforedeleteArtType(typeId) {
                this.artTypeIdData = [];
                this.artTypeIdData.push(typeId);
                this.deleteArtType();
            },
            updateArtType() {
                let self = this;
                self.POST(ApiPath.matype.updateArtType, {
                    type_id: self.typeId,
                    type_name: self.newArtTypeName
                }).then(function (res) {
                    if (res.data.code === 0) {
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                    return false;
                })
            },
            showUpdateTypeDiag(index) {
                this.newArtTypeName = "";
                this.editTypeVisible = true;
                if (index === -1) {
                    this.isUpdate = false;
                    this.editArtTypeTitle = '添加文章类型';
                    return true;
                }
                this.isUpdate = true;
                this.editArtTypeTitle = '修改文章类型';
                this.newArtTypeName = this.artTypeData[index].type_name;
                this.typeId = this.artTypeData[index].type_id;
                return true;
            },
            byTimeSelectArtTypeInfo() {
                let self = this;
                let time = [];
                time[0] = self.timeSection[0] / 1000;
                time[1] = self.timeSection[1] / 1000;
                self.GET(ApiPath.matype.byTimeSelectArtType, {
                    total: self.pageSize,
                    page: self.currentPages,
                    time: time
                }).then(function (res) {
                    if (res.data.code === 0) {
                        self.artTypeData = res.data.data.data;
                        self.total = res.data.data.total;
                    }
                })
            },
            deleteArtType() {
                let self = this;
                self.POST(ApiPath.matype.deleteArtType, {
                    type_id_data: self.artTypeIdData,
                }).then(function (res) {
                    if (res.data.code === 0) {
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                    return false;
                })
            },
        },
        mounted() {
            this.getArtTypeData();
        }
    }
</script>

<style scoped>
    .add-art-type {
        margin-left: 78%;
    }

    .exhibit-table {
        width: 80%;
        margin-top: 2%;
    }

    .page {
        margin-top: 20px;
    }

    .operate {
        margin-left: 70%;
        margin-top: 20px;
    }

    .block {
        margin-left: 28%;
    }

    .exhibit-title {
        margin: 20px 0 0 0;;
    }

    .show-art-type {
        margin: 79px 129px 0 230px;
        min-height: 800px;
        width: 60%;
    }

    .art {
        float: left;
        margin-top: 10px;
        /*align-items: center;*/
        border-right: 1px #d4d8d7 solid;
    }

    .headers {
        overflow: hidden;
    }

</style>
