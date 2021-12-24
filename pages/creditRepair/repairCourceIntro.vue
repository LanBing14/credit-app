<template>
    <view class="repair">
        <view class="repairBox">
            <view class="proServeTitle">
                相关法规及政策文件解读
            </view>
            <view class="repairMain">
                系统学习习近平总书记关于诚信建设的重要讲话精神；学习信用领域政策法规文件。
            </view>
        </view>
        <view class="repairBox">
            <view class="proServeTitle">
                联合奖惩备忘录相关内容
            </view>
            <view class="repairMain">
                学习已出台的联合奖惩备忘录及配套措施；分领域分专题解读联合奖惩备忘录相关内容；讲解各项限制性措施适用范围。
            </view>
        </view>
        <view class="repairBox">
            <view class="proServeTitle">
                信用修复方式与流程
            </view>
            <view class="repairMain">
                学习与信用修复相关的国家政策及地方政策；信用修复的内涵及方式；信用修复流程指引。
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
    .repair{
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .repair .repairBox{
        margin-top: 20rpx;
    }
    .repair .repairBox:first-child{
        margin-top: 0;
    }
    .repairBox{
        padding:30rpx;
        background: #fff;
    }
    .proServeTitle{
        position: relative;
        font-size: 30rpx;
        color: #000;
        padding-left: 22rpx;
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
    .repairMain{
        font-size: 28rpx;
        line-height: 48rpx;
        margin-top: 10rpx;
    }
</style>
