<template>
    <view class="report">
        <view class="atlas">
            <view class="charaServeTitle">
                入驻图集
            </view>
            <view class="atlasMain">
                <swiper class="swiper">
                    <swiper-item>
                        <view class="swiper-item">
                            <view class="atlasBox">
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                            </view>
                        </view>
                    </swiper-item>
                    <swiper-item>
                        <view class="swiper-item">
                            <view class="atlasBox">
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                            </view>
                        </view>
                    </swiper-item>
                    <swiper-item>
                        <view class="swiper-item">
                            <view class="atlasBox">
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                                <view class="li">
                                    <image src="../../static/img/jpg04.jpg"></image>
                                </view>
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        <view class="guest">
            <view class="charaServeTitle">
                邀请嘉宾
            </view>
            <view class="guestMain">
                <view class="li">
                    <image src="../../static/img/jpg04.jpg" mode="aspectFill"></image>
                    <text>嘉宾名</text>
                </view>
                <view class="li">
                    <image src="../../static/img/jpg04.jpg" mode="aspectFill"></image>
                    <text>嘉宾名</text>
                </view>
                <view class="li">
                    <image src="../../static/img/jpg04.jpg" mode="aspectFill"></image>
                    <text>嘉宾名</text>
                </view>
                <view class="li">
                    <image src="../../static/img/jpg04.jpg" mode="aspectFill"></image>
                    <text>嘉宾名</text>
                </view>
            </view>
        </view>
        <view class="guest">
            <view class="charaServeTitle">
                相关报道
            </view>
            <view class="dynaMain">
                <navigator class="li clear" hover-class="none">
                    <image src="https://www.credit100.com/xhxy/upload/resources/image/2021/11/22/227023.jpg"></image>
                    <view class="liMain">
                        <view class="liTitle">湘煤集团：汲取红色动能 建设百年湘煤动能</view>
                        <text>2021/10/14</text>
                    </view>
                </navigator>
                <navigator class="li clear" hover-class="none">
                    <image src="https://www.credit100.com/xhxy/upload/resources/image/2021/11/22/227023.jpg"></image>
                    <view class="liMain">
                        <view class="liTitle">湘煤集团：汲取红色动能 建设百年湘煤动能</view>
                        <text>2021/10/14</text>
                    </view>
                </navigator>
                <navigator class="li clear" hover-class="none">
                    <image src="https://www.credit100.com/xhxy/upload/resources/image/2021/11/22/227023.jpg"></image>
                    <view class="liMain">
                        <view class="liTitle">湘煤集团：汲取红色动能 建设百年湘煤动能</view>
                        <text>2021/10/14</text>
                    </view>
                </navigator>
                <navigator class="li clear" hover-class="none">
                    <image src="https://www.credit100.com/xhxy/upload/resources/image/2021/11/22/227023.jpg"></image>
                    <view class="liMain">
                        <view class="liTitle">湘煤集团：汲取红色动能 建设百年湘煤动能</view>
                        <text>2021/10/14</text>
                    </view>
                </navigator>
                <navigator class="li clear" hover-class="none">
                    <image src="https://www.credit100.com/xhxy/upload/resources/image/2021/11/22/227023.jpg"></image>
                    <view class="liMain">
                        <view class="liTitle">湘煤集团：汲取红色动能 建设百年湘煤动能</view>
                        <text>2021/10/14</text>
                    </view>
                </navigator>
                <navigator class="li clear" hover-class="none">
                    <image src="https://www.credit100.com/xhxy/upload/resources/image/2021/11/22/227023.jpg"></image>
                    <view class="liMain">
                        <view class="liTitle">湘煤集团：汲取红色动能 建设百年湘煤动能</view>
                        <text>2021/10/14</text>
                    </view>
                </navigator>
            </view>
        </view>
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
    page{
        background: #f6f6f6;
    }
    .charaServeTitle{
        font-size: 30rpx;
        color: #222;
        position: relative;
        padding-left: 20rpx;
    }
    .charaServeTitle:after{
        content: '';
        display: block;
        width: 6rpx;
        height: 20rpx;
        background: #113090;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .atlas{
        padding:30rpx 30rpx 40rpx 30rpx;
        background: #fff;
    }
    .atlasMain{
        margin-top: 30rpx;
    }
    .atlasBox{
        display: flex;
        justify-content: space-between;
    }
    .atlasBox .li{
        width: 215rpx;
        height: 146rpx;
        border-radius: 8rpx;
        overflow: hidden;
    }
    .atlasBox .li image{
        width: 100%;
        height: 100%;
    }
    /deep/.atlasMain .swiper{
        height: 146rpx;
    }
    .guest{
        margin-top: 20rpx;
        padding:30rpx 30rpx 40rpx 30rpx;
        background: #fff;
    }
    .guestMain{
        display: flex;
        justify-content: space-between;
        padding:0 40rpx;
        margin-top: 35rpx;
    }
    .guestMain .li{
        width: 90rpx;
        text-align: center;
    }
    .guestMain .li image{
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
    }
    .guestMain .li text{
        display: block;
        font-size: 24rpx;
        color: #333;
        margin-top: 5rpx;
    }

    .dynaMain .li{
        padding:32rpx 0;
        border-bottom: 1px solid #e5e5e5;
    }
    .dynaMain .li:last-child{
        border: none;
    }
    .dynaMain .li image{
        width: 250rpx;
        height: 146rpx;
        float: left;
        border-radius: 5rpx;
    }
    .dynaMain .li .liMain{
        width: calc(100% - 276rpx);
        height: 146rpx;
        float: right;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .dynaMain .li .liMain .liTitle{
        font-size: 28rpx;
        line-height: 40rpx;
        color: #222;
    }
    .dynaMain .li .liMain text{
        font-size: 22rpx;
        color: #9b9b9b;
    }
</style>
