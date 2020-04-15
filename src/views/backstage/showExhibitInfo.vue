<template>
    <div class="show-exhibit">
        <div class="headers">
            <el-radio-group v-model="exhibitDist" class="exhibit-type" @change="getSelectExhibit">
                <el-radio-button label=1>首页名言</el-radio-button>
                <el-radio-button label=2>文章名言</el-radio-button>
                <el-radio-button label=3>留言名言</el-radio-button>
                <el-radio-button label=4>音乐资源</el-radio-button>
            </el-radio-group>
            <el-button class="add-exhibit" type="primary" @click="diaAddMusicVisible = true">上传音乐<i
                class="el-icon-upload el-icon--right"></i></el-button>
            <el-button type="primary"><i class="el-icon-plus el-icon--left" @click="showEditExhibitDiag">添加名言</i>
            </el-button>
            <div class="exhibit-title">
                <span class="art">文章（{{ exhibitNum }}）</span>
                <div class="block">
                    <span>时间查询：</span>
                    <el-date-picker class="date-select"
                                    v-model="timeSection"
                                    type="daterange"
                                    value-format="timestamp"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                    <el-button @click="byTimeSelectExhibitInfo">搜索</el-button>
                </div>
            </div>
        </div>
        <el-table
            class="exhibit-table"
            ref="multipleTable"
            :data="exhibitData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="exht_name"
                label="名字"
                width="200">
            </el-table-column>
            <el-table-column
                v-if="exhibitDist !== '4'"
                prop="exht_content"
                label="内容"
                width="200">
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="添加时间"
                width="150">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="370">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small">
                        <el-button type="primary" v-if="exhibitDist !== '4'" icon="el-icon-edit" size="mini"
                                   @click="showUpdateDiag(scope.$index)">编辑
                        </el-button>
                        <el-button type="info" v-if="exhibitDist !== '4'" icon="el-icon-view" size="mini"
                                   @click="showDetails(scope.$index)">查看详情
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="beforedeleteExhibit(exhibitData[scope.$index].exht_id)">删除
                        </el-button>
                        <el-button v-if="exhibitData[scope.$index].exht_status !== 1 " type="warning"
                                   icon="el-icon-edit" size="mini"
                                   @click="replaceExhibitData(exhibitData[scope.$index].exht_id)">替换
                        </el-button>
                        <el-button v-if="exhibitDist === '4'" type="success" icon="el-icon-download" size="mini"
                                   @click="downloadExhibit(exhibitData[scope.$index].exht_name)">下载
                        </el-button>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="operate">
            <el-button @click="toggleSelection">取消选择</el-button>
            <el-button @click="deleteExhibit">删除</el-button>
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
        <el-dialog :title="editExhibitTitle" :visible.sync="diaEditExhibitVisible" width="350px">
            <el-form>
                <el-form-item label="名字" :label-width="formLabelWidth" :required="true">
                    <el-input v-model="exhibitName" maxlength="20px" auto-complete="off"></el-input>
                </el-form-item>
                <div v-if="exhibitDist === '1'">
                    <el-form-item label="First" :label-width="formLabelWidth" :required="true">
                        <el-input type="textarea" v-model="homeExhibitForm.first" maxlength="20px"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Second" :label-width="formLabelWidth" :required="true">
                        <el-input type="textarea" v-model="homeExhibitForm.second" maxlength="20px"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Third" :label-width="formLabelWidth" :required="true">
                        <el-input type="textarea" v-model="homeExhibitForm.third" maxlength="20px"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                </div>
                <el-form-item v-if="exhibitDist === '2'" label="文章名言" :label-width="formLabelWidth" :required="true">
                    <el-input type="textarea" v-model="exhibitContent" maxlength="200px" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="exhibitDist === '3'" label="留言名言" :label-width="formLabelWidth" :required="true">
                    <el-input type="textarea" v-model="exhibitContent" maxlength="10px" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diaEditExhibitVisible = false">取 消</el-button>
                <el-button type="primary" v-if="isUpdateExhibit" @click="updateContent">修改</el-button>
                <el-button type="primary" v-else @click="addExhibit">添加</el-button>
            </div>
        </el-dialog>
        <el-dialog title="上传音乐文件" :visible.sync="diaAddMusicVisible" width="350px">
            <el-upload
                rel="upload"
                class="upload-demo"
                action="#"
                :auto-upload="false"
                :limit="1"
                :on-change="validateMusic"
                accept=".mp3,.MP3"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传音频文件，且不超过10M</div>
            </el-upload>
            <el-upload
                style="margin-top: 40px"
                rel="upload"
                class="upload-demo"
                action="#"
                :auto-upload="false"
                :limit="1"
                :on-change="validateMusicLyric"
                accept=".lrc,.LRC"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传lrc格式文件，且不超过1M</div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diaEditExhibitVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMusic">添加</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="showDetailTitle" :visible.sync="diaShowDetailVisible" width="350px">
            <el-form>
                <el-form-item label="创建时间" :label-width="showLabelWidth">
                    <span>{{ exhibitCreatedTime }}</span>
                </el-form-item>
                <el-form-item label="名字" :label-width="showLabelWidth">
                    <span>{{ exhibitName }}</span>
                </el-form-item>
                <div v-if="exhibitDist === '1'">
                    <el-form-item label="First" :label-width="showLabelWidth">
                        <span>{{ homeExhibitForm.first }}</span>
                    </el-form-item>
                    <el-form-item label="Second" :label-width="showLabelWidth">
                        <span>{{ homeExhibitForm.second }}</span>
                    </el-form-item>
                    <el-form-item label="Third" :label-width="showLabelWidth">
                        <span>{{ homeExhibitForm.third }}</span>
                    </el-form-item>
                </div>
                <el-form-item v-else label="内容" :label-width="showLabelWidth">
                    <span>{{ exhibitContent }}</span>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "showExhibitInfo",
        inject: ['reload'],
        data() {
            return {
                timeSection: '',
                exhibitDist: '1',
                exhibitData: [],
                pageSize: 2,
                currentPages: 1,
                total: 0,
                delExhibitIdData: [],
                editExhibitTitle: "修改文章名言",
                diaEditExhibitVisible: false,
                formLabelWidth: '80px',
                exhibitContent: '',
                isUpdateExhibit: true,
                exhibitName: '',
                homeExhibitForm: {
                    first: '',
                    second: '',
                    third: '',
                },
                exhibitNum: 0,
                diaAddMusicVisible: false,
                musicFormData: new FormData(),
                exhibitId: '',
                diaShowDetailVisible: false,
                showDetailTitle: '',
                exhibitCreatedTime: '',
                showLabelWidth: '120px',
                downFileBaseUrl: ApiPath.common.downLoadFile + '?file=music/',
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
            handleCurrentChange(val) {
                this.currentPages = val;
                if (this.timeSection.length !== 0) return this.byTimeSelectExhibitInfo();
                this.getSelectExhibit();
            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleSelectionChange(val) {
                this.delExhibitIdData = [];   //每次添加前，先清空之前的。
                for (let i = 0; i < val.length; i++) this.delExhibitIdData[i] = val[i].exht_id;
            },
            validateMusic(file, fileList) {
                if (file.size / 1024 / 1024 >= 10) {                 //图片大小不超过10MB
                    this.$message.error("上传文件不能超过5M！");
                    fileList = [];
                    return false;
                }
                let fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
                if (fileType !== 'mp3') {
                    this.$message.error("上传文件只能是mp3格式！");
                    fileList = [];
                    return false;
                }
                this.musicFormData.append('exht_music', file.raw);
                return true;
            },
            validateMusicLyric(file, fileList) {
                if (file.size / 1024 / 1024 >= 1) {                 //图片大小不超过10MB
                    this.$message.error("上传文件不能超过1M！");
                    fileList = [];
                    return false;
                }
                let fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
                if (fileType !== 'lrc') {
                    this.$message.error("上传文件只能是lrc格式！");
                    fileList = [];
                    return false;
                }
                this.musicFormData.append('exht_lyric', file.raw);
            },
            addMusic() {
                let self = this;
                self.musicFormData.append('exht_dist', 4);
                self.POST(ApiPath.maexhibit.addExhibit, self.musicFormData)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            self.$message.success(res.data.msg);
                            self.reload();
                            return true;
                        }
                        self.$message.error(res.data.msg);
                        return false;
                    })

            },
            showEditExhibitDiag() {
                this.isUpdateExhibit = false;
                switch (this.exhibitDist) {
                    case '1':
                        this.editExhibitTitle = "添加首页名言";
                        break;
                    case '2':
                        this.editExhibitTitle = "添加文章名言";
                        break;
                    case '3':
                        this.editExhibitTitle = "添加留言名言";
                        break;
                }
                this.diaEditExhibitVisible = true;
            },
            addExhibit() {
                let self = this;
                let exhibitContentData;
                (self.exhibitDist === 1) ? exhibitContentData = self.homeExhibitForm.first + '+' + self.homeExhibitForm.second + '+' + self.homeExhibitForm.third
                    : exhibitContentData = self.exhibitContent;
                self.POST(ApiPath.maexhibit.addExhibit, {
                    exht_dist: self.exhibitDist,
                    exht_name: self.exhibitName,
                    exht_content: exhibitContentData
                }).then(function (res) {
                    if (res.data.code === 0) {
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true
                    }
                    self.$message.error(res.data.msg);
                    return false;
                });
            },
            byTimeSelectExhibitInfo() {
                let self = this;
                let time = [];
                time[0] = self.timeSection[0] / 1000;
                time[1] = self.timeSection[1] / 1000;
                self.GET(ApiPath.maexhibit.byTimeSelectExhibit, {
                    exht_dist: self.exhibitDist,
                    page: self.pageSize,
                    total: self.currentPages,
                    time: time
                }).then(function (res) {
                    let data = res.data;
                    if (res.data.code === 0) {
                        self.exhibitData = data.data.exhibit_data;
                        self.total = data.data.total;
                    }
                })
            },
            getSelectExhibit() {
                let self = this;
                self.GET(ApiPath.maexhibit.selectExhibit, {
                    exht_dist: self.exhibitDist,
                    page: self.currentPages,
                    total: self.pageSize
                }).then(function (res) {
                    let data = res.data;
                    if (data.code === 0) {
                        self.exhibitData = data.data.exhibit_data;
                        self.total = data.data.total;
                        self.exhibitNum = self.total + 1;
                    }
                })
            },
            showUpdateDiag(index) {
                let self = this;
                self.isUpdateExhibit = true;
                switch (this.exhibitDist) {
                    case '1':
                        self.editExhibitTitle = "修改首页名言";
                        break;
                    case '2':
                        self.editExhibitTitle = "修改文章名言";
                        break;
                    case '3':
                        self.editExhibitTitle = "修改留言名言";
                        break;
                }
                self.exhibitName = self.exhibitData[index].exht_name;
                self.exhibitId = self.exhibitData[index].exht_id;
                self.GET(ApiPath.maexhibit.selectAloneExhibit, {
                    exht_id: self.exhibitId
                }).then(function (res) {
                    if (res.data.code === 0) {
                        (self.exhibitDist === '1') ? self.convertHomeExtData(res.data.data.exht_content.split('+')) : self.exhibitContent = res.data.data.exht_content;
                    }
                });
                self.diaEditExhibitVisible = true;
            },
            showDetails(index) {
                console.log(index);
                let self = this;
                switch (this.exhibitDist) {
                    case '1':
                        self.showDetailTitle = "首页名言详情";
                        break;
                    case '2':
                        self.showDetailTitle = "文章名言详情";
                        break;
                    case '3':
                        self.showDetailTitle = "留言名言详情";
                        break;
                }
                self.exhibitName = self.exhibitData[index].exht_name;
                self.exhibitId = self.exhibitData[index].exht_id;
                self.exhibitCreatedTime = self.exhibitData[index].created_at;
                self.GET(ApiPath.maexhibit.selectAloneExhibit, {
                    exht_id: self.exhibitId
                }).then(function (res) {
                    if (res.data.code === 0) {
                        (self.exhibitDist === '1') ? self.convertHomeExtData(res.data.data.exht_content.split('+')) : self.exhibitContent = res.data.data.exht_content;
                    }
                });
                self.diaShowDetailVisible = true;
            },
            convertHomeExtData(data) {
                this.homeExhibitForm.first = data[0];
                this.homeExhibitForm.second = data[1];
                this.homeExhibitForm.third = data[2];
            },
            updateContent() {
                let self = this;
                (self.exhibitDist === '1') ? self.content = this.homeExhibitForm.first + '+' + this.homeExhibitForm.second + '+' + this.homeExhibitForm.third
                    : self.content = self.exhibitContent;
                self.POST(ApiPath.maexhibit.updateExhibit, {
                    exht_id: self.exhibitId,
                    exht_name: self.exhibitName,
                    exht_content: self.content
                }).then(function (res) {
                    if (res.data.code === 0) {
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                })
            },
            beforedeleteExhibit(exhitbitId) {
                this.delExhibitIdData = [];
                this.delExhibitIdData.push(exhitbitId);
                this.deleteExhibit();
            },
            deleteExhibit() {
                let self = this;
                self.POST(ApiPath.maexhibit.deleteExhibit, {
                    exht_id_data: self.delExhibitIdData,
                    exht_dist: self.exhibitDist
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
            replaceExhibitData(exhibitId) {
                let self = this;
                self.POST(ApiPath.maexhibit.replaceExhibit, {
                    orig_select_id: self.exhibitData[0].exht_id,
                    new_select_id: exhibitId
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
            downloadExhibit(fileName) {
                let url = this.downFileBaseUrl + fileName;
                window.location.href = url;
            }
        },
        mounted() {
            this.getSelectExhibit();
        }
    }
</script>

<style scoped>
    .page {
        margin-top: 20px;
    }

    .operate {
        margin-left: 70%;
        margin-top: 20px;
    }

    .add-exhibit {
        margin-left: 20%;
    }

    .block {
        margin-left: 33%;
    }

    .exhibit-table {
        width: 59%;
        margin-top: 2%;
    }

    .exhibit-title {
        margin: 58px 0 0 0;;
    }

    .exhibit-type {
        float: left;
    }

    .show-exhibit {
        margin: 79px 129px 0 140px;
        min-height: 800px;
        width: 77%;
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
