<template>
    <view class="repair">
        <navigator url="/pages/creditRepair/repairBusIntro" hover-class="none" class="li">
            <image src="../../static/img/png_12.png"></image>
            <view class="h1">相关介绍</view>
            <view class="h2">更多“信用修复”详细信息</view>
        </navigator>
        <navigator url="/pages/creditRepair/repairCourceIntro" hover-class="none" class="li">
            <image src="../../static/img/png_13.png"></image>
            <view class="h1">课程简介</view>
            <view class="h2">三大类课程详情</view>
        </navigator>
        <navigator url="/pages/creditRepair/repairSignUp" hover-class="none" class="li">
            <image src="../../static/img/png_14.png"></image>
            <view class="h1">报名入口</view>
            <view class="h2">快速提交报名信息</view>
        </navigator>
        <navigator url="/pages/creditRepair/repairConsult" hover-class="none" class="li">
            <image src="../../static/img/png_15.png"></image>
            <view class="h1">我要咨询</view>
            <view class="h2">更多问题请点这里</view>
        </navigator>
    </view>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {

            }
        },
        onLoad() {

        },
        onShow(){

        },
        methods: {

        }
    }
</script>

<style>
    .repair{
        padding: 30rpx;
    }
    .repair .li{
        height: 206rpx;
        margin-top: 20rpx;
        position: relative;
    }
    .repair .li:first-child{
        margin-top: 0;
    }
    .repair .li image{
        width: 690rpx;
        height: 206rpx;
        margin: 0;
        padding:0;
    }
    .repair .li .h1{
        font-size: 32rpx;
        color: #fff;
        position: absolute;
        top: 60rpx;
        left: 218rpx;
    }
    .repair .li .h2{
        font-size: 26rpx;
        color: rgba(255,255,255,0.8);
        position: absolute;
        top: 117rpx;
        left: 218rpx;
    }
</style>
