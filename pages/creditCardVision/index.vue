<template>
    <view class="vision">
        <view class="video" v-if="videoList != ''">
            <video class="visionVideo" :src="website + videoList"></video>
        </view>
        <view v-if="!(videoList == '' && visionImgList.length == 0)">
            <noData info="暂无视频" style="margin: 40rpx 0" v-if="videoList == '' || visionImgList.length == 0"></noData>
        </view>
        <view class="visionImg" v-if="visionImgList.length > 0">
            <swiper class="swiper" display-multiple-items="3">
                <swiper-item v-for="(item,index) in visionImgList" :key="index">
                    <view class="itemImg">
                        <image :src="website + item.picture.path" @click="previewImage(index)"></image>
                    </view>
                </swiper-item>
            </swiper>
        </view>
        <!--暂无数据展示内容-->
        <noData info="暂无信息" style="margin-top: 200rpx" v-if="videoList == '' && visionImgList.length == 0"></noData>
    </view>
</template>

<script>
    import noData from "../../components/noData"
    import request from "../../utils/request";
    export default {
        components: {
            noData
        },
        data () {
            return {
                companyId:'',
                videoList:String,
                visionImgList:Array,
                photoList:[]
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            this.getEnterpriseCard(3);
            this.getEnterpriseCard(2);
        },
        onShow(){

        },
        methods: {
            getEnterpriseCard(type){
                request('/enterprise/detail/card/getEnterpriseCard',{
                    method:'get',
                    data:{
                        type:type,
                        companyId:this.companyId,
                        queryType:1
                    }
                }).then(res => {
                    if(res.data != ''){
                        switch (type) {
                            case 3:
                                if(res.data.videoList.length > 0){
                                    this.videoList = res.data.videoList[0].path;
                                } else{
                                    request('/enterprise/detail/card/getQualification',{
                                        method:'get',
                                        data:{
                                            companyId:this.companyId
                                        }
                                    }).then(data => {
                                        if(data.data != null){
                                            if(data.data.videourl != null){
                                                this.videoList = data.data.videourl;
                                            } else{
                                                this.videoList = '';
                                            }
                                        }
                                    })
                                }
                                break;
                            case 2:
                                this.visionImgList = res.data.pictureList;
                                this.photoList = this.visionImgList.map(item => {
                                    return this.website + item.picture.path;
                                });
                                break;
                        }

                    } else{
                        this.videoList = '';
                        this.visionImgList = [];
                    }
                })
            },
            previewImage(index){//预览图片
                uni.previewImage({
                    current: index,
                    urls: this.photoList
                });
            }
        }
    }
</script>

<style>
    .vision{
        width: 100%;
        overflow: hidden;
    }
    /deep/.visionVideo{
        width: 100%;
        height: 420rpx;
    }
    .visionImg{
        margin:0 -15rpx;
        margin-top: 15rpx;
    }
    .itemImg{
        height: 135rpx;
        padding:0 15rpx;
    }
    .itemImg image{
        width: 100%;
        height: 100%;
    }
</style>
