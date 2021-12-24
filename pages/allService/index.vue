<template>
    <view class="service">
        <view class="serviceBox">
            <!--<view class="proServeTitle">
                我的服务
            </view>-->
            <view class="indexNav clear">
                <navigator class="li" hover-class="none" url="/pages/creditBrandPromotion/index">
                    <image src="../../static/icon/02.png"></image>
                    <text>品牌名片</text>
                </navigator>
                <navigator url="/pages/creditGoods/index" class="li" hover-class="none">
                    <image src="../../static/icon/03.png"></image>
                    <text>信锐优品</text>
                </navigator>
                <navigator class="li" hover-class="none" url="/pages/creditReport/index">
                    <image src="../../static/icon/04.png"></image>
                    <text>信用报告</text>
                </navigator>
                <navigator class="li" hover-class="none" url="/pages/creditInvestigation/index">
                    <image src="../../static/icon/05.png"></image>
                    <text>信用调研</text>
                </navigator>
                <navigator url="/pages/creditPark/index" class="li" hover-class="none">
                    <image src="../../static/icon/73.png"></image>
                    <text>信用园区</text>
                </navigator>
                <view url="/pages/allService/index" class="li" hover-class="none">
                    <image src="../../static/icon/77.png"></image>
                    <text>信用修复</text>
                </view>
                <navigator url="/pages/creditLive/index" class="li" hover-class="none">
                    <image src="../../static/icon/80.png"></image>
                    <text>信锐直播</text>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        components: {

        },
        data() {
            return {

            }
        },
        onLoad() {

        },
        onShow() {

        },
        methods: {

        }
    }
</script>

<style>
    page{
        background: #f4f4f5;
    }
    .service{
        padding:0 30rpx;
    }
    .serviceBox{
        padding:30rpx 20rpx 0 20rpx;
        background: #fff;
        border-radius: 8rpx;
        margin-top: 20rpx;
    }
    .proServeTitle{
        position: relative;
        font-size: 30rpx;
        color: #000;
        padding-left: 22rpx;
        margin-bottom: 35rpx;
    }
    .proServeTitle:before{
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 6rpx;
        height:24rpx;
        background: #113090;
    }
    .indexNav{
        width: 100%;
    }
    .indexNav .li{
        width: 20%;
        text-align: center;
        float: left;
        margin-bottom: 30rpx;
    }
    .indexNav .li image{
        width: 60rpx;
        height: 60rpx;
    }
    .indexNav .li text{
        display: block;
        font-size: 24rpx;
        color: #555;
        margin-top: 15rpx;
    }
</style>
