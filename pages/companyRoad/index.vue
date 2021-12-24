<template>
    <view class="road">
        <navigator hover-class="none" :url="`/pages/companyRoad/detail?id=${item.ID}`" class="li" v-for="(item,index) in contentList" :key="index">
            <view class="liMain">
                {{item.TITLE}}
            </view>
            <view class="liImg">
                <image class="play" src="../../static/icon/92.png"></image>
                <image class="imgUrl" :src="item.TITLE_PIC[0].path ? website + item.TITLE_PIC[0].path : '../../static/img/jpg07.jpg'"></image>
            </view>
            <view class="liTitle clear">
                <view class="logo">
                    <image :src="item.COMPANY_LOGO ? website + item.COMPANY_LOGO : '../../static/img/png_10.png'"></image>
                </view>
                <text>
                    {{item.COMPANY_NAME}}
                </text>
            </view>
        </navigator>
        <uni-load-more status="loading" v-if="loading"></uni-load-more>
        <uni-load-more status="noMore" v-if="noMore"></uni-load-more>
        <noData info="暂无信息" style="margin-top: 200rpx;" v-if="noData"></noData>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import noData from "../../components/noData";

    export default {
        components: {
            noData
        },
        data() {
            return {
                companyId:'',
                pageNo:1,
                contentList:[],
                totalPages:0,
                noMore:false,
                loading:false,
                noData:false
            }
        },
        onLoad(options) {
            uni.showLoading({
                title:'加载中...'
            })
            this.companyId = options.companyId;
            this.getContentListByPage();
        },
        onShow() {

        },
        methods: {
            getContentListByPage(){
                request('/web/app/xhsRest/content/getContentListByPage',{
                    method:'get',
                    data:{
                        pageNo:this.pageNo,
                        pageSize:10,
                        companyId:this.companyId
                    }
                }).then(result => {
                    console.log(result);
                    uni.hideLoading();
                    if (result.stateCode == "1") {
                        if(result.data.list.length > 0){
                            this.totalPages = result.data.totalPages;
                            this.contentList = this.contentList.concat(result.data.list);
                            this.noData = false;
                        } else{
                            this.noData = true;
                        }
                    }
                })
            }
        },
        onReachBottom(){
            if(this.pageNo == this.totalPages) return this.noMore = true;
            this.loading = true;
            this.pageNo ++;
            this.getContentListByPage();
        }
    }
</script>

<style>
    page{
        background: #f6f6f6;
    }
    .road .li{
        padding:30rpx;
        background: #fff;
        margin-top: 20rpx;
    }
    .road .li:first-child{
        margin-top: 0;
    }
    .road .li .liMain{
        font-size: 32rpx;
        color: #222;
    }
    .road .li .liImg{
        position: relative;
        border-radius: 10rpx;
        overflow: hidden;
        margin-top: 20rpx;
    }
    .road .li .liImg .imgUrl{
        width: 690rpx;
        height: 390rpx;
    }
    .road .li .liImg .play{
        width: 58rpx;
        height: 58rpx;
        position: absolute;
        left: 30rpx;
        bottom: 30rpx;
        z-index: 1;
    }
    .liTitle{
        margin-top: 15rpx;
    }
    .liTitle .logo{
        width: 50rpx;
        height: 50rpx;
        position: relative;
        border-radius: 10rpx;
        overflow: hidden;
        float: left;
    }
    .liTitle .logo image{
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .liTitle text{
        font-size: 26rpx;
        color: #333;
        line-height: 50rpx;
        display: inline-block;
        float: left;
        margin-left: 12rpx;
        width: calc(100% - 62rpx);
    }
</style>
