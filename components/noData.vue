<template>
    <view class="noData">
        <image src="../static/img/png_06.png"></image>
        <text>
            {{info}}
        </text>
    </view>
</template>
<script>
    export default{
        data() {
            return {

            };
        },
        props:[
            "info",
        ],
    }
</script>
<style>
    .noData{
        text-align: center;
    }
    .noData image{
        width: 449rpx;
        height:364rpx;
    }
    .noData text{
        display: block;
        margin-top: 59rpx;
        font-size: 24prx;
        line-height: 40rpx;
        color: #999;
        text-align: center;
    }
</style>
