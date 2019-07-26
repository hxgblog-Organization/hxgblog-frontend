<template>
    <div class="photo-content">
        <h1>
            斯样流年,笑靥缅怀。相册流云~~~~~~~
        </h1>
        <div class="album-operate-btn">
            <el-checkbox @change="editAllCheckBox()">全选</el-checkbox>
            <el-button @click="deletePhoto">删除照片</el-button>
            <el-button @click="uploadVisible = true">上传照片</el-button>
        </div>
        <div class="jq22-container">
            <div class="demo">
                <div class="grid"></div>
            </div>

        </div>
        <el-dialog
                title="上传照片"
                :visible.sync="uploadVisible"
                width="30%">
            <el-upload
                    rel="upload"
                    class="upload-photo"
                    action="#"
                    :file-list="fileList"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :multiple="true"
                    accept=".jpeg,.jpg,.png,.PNG,.JPEG,.JPG"
                    list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelUpload">取 消</el-button>
                <el-button type="primary" @click="addAlbumPhoto">上传</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import  '../../assets/waterfall/js/jquery-1.11.1.min';
    import  { minigrid } from '../../assets/waterfall/js/minigrid';
    export default {
        name: "showAlbumPhoto",
        inject: ['reload'],
        data () {
            return {
                msg: 'showAlbumPhoto',
                imageArr: [],
                page: 0,
                albumId: '',
                getPhotoBaseUrl: ApiPath.common.getAlbumPhoto,
                data:[],
                isHave: true,
                isSelected: false,
                deletePhotoRoadData: [],
                deletePhotoIdData: [],
                uploadVisible: false,
                photoFormData: new FormData(),
                del_index:0,
                index:0,
                fileList: [],
            }
        },
        methods: {
            cancelUpload() {
                this.uploadVisible = false;
                this.fileList = [];
            },
            addAlbumPhoto() {
                let self = this;
                for(let index in self.fileList)self.photoFormData.append(index, self.fileList[index].raw);
                self.photoFormData.append('album_id',this.albumId);
                self.POST(ApiPath.maalbum.addAlbumImage, self.photoFormData)
                    .then(function (res) {
                    if(res.data.code === 0){
                        self.$message.success(res.data.msg);
                        self.uploadVisible = false;
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                    return false;
                });
            },
            handleChange(file,fileList) {
                if(this.validatePhoto(file.raw)){
                    this.fileList.push(file);
                    return true;
                }
                fileList.pop();
                return false;
            },
            deletePhoto() {
                var del_id,del_road;
                let self = this;
                let checkBoxSelected = $(".demo").find("input:checkbox[name='check-box']:checked");
                for(let index = 0; index < checkBoxSelected.length; index++){
                    del_id = $(checkBoxSelected[index]).attr("id");
                    del_road = ($(checkBoxSelected[index]).next().attr('src').split('&')[1]).split('=')[1];
                    self.deletePhotoRoadData.push(del_road);
                    self.deletePhotoIdData.push(del_id);
                }
                self.POST(ApiPath.maalbum.deleteAlbumPhoto, {
                    album_id: self.albumId,
                    del_photo_road: self.deletePhotoRoadData,
                    del_photo_id: self.deletePhotoIdData
                }).then(function (res) {
                    if(res.data.code === 0){
                        self.$message.success(res.data.msg);
                        self.reload();
                        return true;
                    }
                    self.$message.error(res.data.msg);
                });
            },
            editAllCheckBox() {
                if(this.isSelected){
                    $(".demo").find('input:checkbox').each(function () {
                        $(this).prop('checked',false);
                    });
                    this.isSelected = false;
                    return true;
                }
                $(".demo").find('input:checkbox').each(function() {
                    $(this).prop('checked', true);
                });
                this.isSelected = true;
                return true;
            },
            getAlbumImage(){
                let self = this;
                self.GET(ApiPath.maalbum.selectAlbumPhoto, {
                    albu_id: self.albumId,
                    page: self.page
                })
                    .then(function (res) {
                        if(res.data.data.length === 0){
                            self.isHave = false;
                            return ;
                        }
                        self.data = res.data.data;
                        for(var i = 0; i < self.data.length; i++){
                            //生成一个div盒子对象
                            var oDiv = document.createElement("div");
                            var oCheckbox = document.createElement("input");
                            oCheckbox.setAttribute("name",'check-box');
                            $(oCheckbox).css({
                                "position": "absolute",
                                "top": "5px",
                                "right": "6px",
                                "z-index": "1",
                                "width": "16px",
                                "height": "16px"
                            });
                            oCheckbox.setAttribute("type","checkbox");
                            oCheckbox.setAttribute("id",self.data[i].phot_id);
                            oDiv.appendChild(oCheckbox);
                            oDiv.className = "grid-item";
                            //生成一个图片对象
                            var oImg = new Image();
                            $(oImg).css('position','relative');
                            oImg.src = self.getPhotoBaseUrl + self.data[i].phot_path;
                            //把图片放入div盒子
                            oDiv.appendChild(oImg);
                            //把div放入大盒子
                            $(".grid").append(oDiv);
                            (function(oImg){
                                setTimeout(function(){
                                    oImg.style.cssText = "opacity:1;transform:scale(1);";
                                },100);
                            })(oImg); //立马调用
                        }
                        var done = function (){
                            var d = document.querySelector('.demo');
                            d.style.opacity = 1;
                        };
                        minigrid('.grid', '.grid-item', 6, null,done);//调用外部文件
                    })

            },
            scrollGetAlbumImage() {
                let self = this;
                if (! self.isHave) return ;
                let obj = $("#con");
                var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
                var nScrollTop = 0;   //滚动到的当前位置
                var nDivHight = $(obj).height();
                nScrollHight = $(obj)[0].scrollHeight;
                nScrollTop = $(obj)[0].scrollTop;
                // console.log(nScrollTop + "-----" +  nDivHight + "-----" + nScrollHight)
                if(nScrollTop + nDivHight + 1 >= nScrollHight){
                    setTimeout(function () {
                        self.page++;
                        self.getAlbumImage();
                    },100);
                }
            },
        },
        mounted() {
            this.albumId = this.$route.params.album_id;
            this.getAlbumImage();
            let self = this;
            $('#con').on('scroll', function () {
                self.scrollGetAlbumImage();
            });
            // window.addEventListener('resize', function(){
            //     minigrid('.grid', '.grid-item');
            // });
        }
    }
</script>
<style>
    .album-operate-btn{
        width: 48%;
        margin: 20px 0 20px 0;
    }
    .photo-content{
        min-height: 800px;
        margin-top: 2%;
        margin-left: 6%;
        width: 85%;
    }
    .album-title-fir{
        margin-top: 40px;
        margin-right: 350px;
        font-size: 20px;
        color: darkblue;
    }
    .album-title-sec{
        margin-top: 20px;
        margin-right: 50px;
        font-size: 20px;
        color: darkblue;
    }
    .album-title-thi{
        margin-top: 20px;
        margin-left: 110px;
        font-size: 20px;
        color: darkblue;
    }
    .jq22-container{
        height: auto;
        min-height: 200px;
        width: 74%;
        margin: auto;
        border-radius:15px;
        border-style:ridge;
        border-width:20px;
        margin-bottom: 20px;
    }
    .demo {
        position: relative;
        opacity: 1;
        transition: .2s ease;
        margin-bottom: 60px;
    }
    .grid {
        position: relative;
        /* fluffy */
        margin: 0 auto;
        width: 98%;
        /* end fluffy */
    }
    .grid-item {
        position: absolute;
        top: 0;
        width: 180px;
        border-radius: 30px;
        background-color: #EDEDED;
        /* end fluffy */
        -webkit-transition: .3s ease-in-out;
        -o-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
        border: 1px solid #ADADAD;
        overflow: hidden;
    }
    .grid-item img{opacity:0;transform:scale(0); width: 100%;height:auto; vertical-align: middle; transition: all 1s; -webkit-transition: all 1s;}
    /* mq */
    @media (max-width: 600px) {
        .grid-item {
            width: 120px;
            height: 80px;
        }
    }
</style>