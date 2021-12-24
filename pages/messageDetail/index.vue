<template>
    <view class="messageDetail">
        <view class="detailTitle">
            <rich-text :nodes="msgInfo.title"></rich-text>
        </view>
        <view class="detailSubTitle">
            <view class="detailTime">
                <uni-dateformat :date="msgInfo.createTime - 7200000" format="yyyy-MM-dd"></uni-dateformat>
            </view>
        </view>
        <view class="detailMain">
            <rich-text :nodes="msgInfo.detail"></rich-text>
        </view>
        <view v-if="msgInfo.messageType == '10'">
            <view class="detailImg" v-if="pictureList.length > 0">
                <view class="li" v-for="(item,index) in pictureList" :key="index">
                    <image :src="website + item.path" mode="widthFix"></image>
                </view>
            </view>
            <view class="detailFile" v-if="fileList.length > 0">
                <view class="h1">请去网页端进行下载:</view>
                <view class="li" v-for="(item,index) in fileList" :key="index">
                    {{item.name}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";

    export default {
        components: {

        },
        data () {
            return {
                id:'',
                msgInfo:{},
                pictureList:[],
                fileList:[]
            }
        },
        onLoad(options) {
            console.log(options);
            this.id = options.id;
            this.getMesDetailById();
        },
        onShow(){

        },
        methods: {
            getMesDetailById(){
                request('/user/center/myMessage/getMesDetailById',{
                    method:'get',
                    data:{
                        id:this.id
                    }
                }).then(res => {
                    if(res.stateCode == '70201'){
                        this.msgInfo = res.data.message;
                        if(res.data.message.messageType == '10'){
                            this.pictureList = res.data.pictureList;
                            this.fileList = res.data.fileList;
                        }
                    }
                })
            },
            downFile(url){//pdf下载
                uni.showLoading({
                    title:'正在下载...'
                })
                uni.downloadFile({
                    url: url,//下载地址接口返回
                    success: (data) => {
                        if (data.statusCode === 200) {
                            //文件保存到本地
                            uni.saveFile({
                                tempFilePath: data.tempFilePath, //临时路径
                                success: function(res) {
                                    uni.hideLoading();
                                    uni.showToast({
                                        icon: 'none',
                                        mask: true,
                                        title: '保存成功',
                                        duration: 1000,
                                    });
                                    setTimeout(() => {
                                        uni.showLoading({
                                            title:'加载中...'
                                        })
                                    },1000);
                                    setTimeout(() => {
                                        uni.hideLoading();
                                        //打开文档查看
                                        uni.openDocument({
                                            filePath: res.savedFilePath,
                                            success: function(res) {
                                                // console.log('打开文档成功');
                                            }
                                        });
                                    }, 3000)
                                }
                            });
                        }
                    },
                    fail: (err) => {
                        console.log(err);
                        uni.showToast({
                            icon: 'none',
                            mask: true,
                            title: '失败请重新下载',
                        });
                    },
                });
            }
        }
    }
</script>

<style>
    .messageDetail{
        padding: 40rpx 30rpx;
    }
    .detailTitle{
        text-align: center;
        font-size: 36rpx;
        font-weight: bold;
        color: #222;
    }
    .detailSubTitle{
        font-size: 24rpx;
        color: #333;
        margin-top: 30rpx;
    }
    .detailSubTitle .detailTime{
        float: right;
        font-size: 24rpx;
        color: #999;
    }
    .detailMain{
        font-size: 28rpx;
        line-height: 48rpx;
        color: #333;
        margin-top: 25rpx;
    }
    .detailFile{
        margin-top: 150rpx;
    }
    .detailFile .h1{
        font-size: 28rpx;
        color: #000;
    }
    .detailFile .li{
        font-size: 24rpx;
        line-height: 40rpx;
        color: #113090;
    }
    .detailImg{
        margin-top: 40rpx;
    }
    .detailImg .li{
        margin-top: 25rpx;
    }
    .detailImg .li image{
        width: 100%;
    }
</style>
