<template>
    <view class="road">
        <view class="li">
            <view class="liMain">
                {{content.title}}
            </view>
            <view class="liImg">
                <video class="visionVideo" :src="videoUrl" :poster="website + content.titlePic[0].path"></video>
            </view>
            <view class="roadMain">
                <rich-text :nodes="content.content.replace(/(<!--.*?-->)/g, '')"></rich-text>
            </view>
        </view>
        <view class="roadImg">
            <view class="ol" v-for="(item,index) in content.propagandaPic" :key="index">
                <image :src="website + item.path" mode="widthFix"></image>
            </view>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";

    export default {
        components: {

        },
        data() {
            return {
                id:'',
                content:{},
                videoUrl:''
            }
        },
        onLoad(options) {
            this.id = options.id;
            this.getContentById();
        },
        onShow() {

        },
        methods: {
            getContentById(){
                request('/web/app/xhsRest/content/getContentById',{
                    method:'get',
                    data:{
                        id:this.id
                    }
                }).then(res => {
                    console.log(res);
                    if (res.stateCode == "1"){
                        this.content = res.data;
                        if(res.data.videoList){
                            this.videoUrl = this.website + res.data.videoList[0].path
                        } else{
                            this.videoUrl = res.data.url;
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    .road{
        padding:30rpx;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .road .li .liMain{
        font-size: 32rpx;
        color: #222;
    }
    .road .li .liImg{
        position: relative;
        overflow: hidden;
        margin-top: 20rpx;
    }
    .road .li .liImg .visionVideo{
        width: 100%;
        height: 390rpx;
        border-radius: 10rpx;
    }
    .roadMain{
        margin-top: 15rpx;
    }
    .roadImg{
        margin-top: 30rpx;
    }
    .roadImg .ol image{
        width: 100%;
    }
</style>
