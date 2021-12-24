<template>
    <view class="repair">
        <view class="repairBox">
            <view class="proServeTitle">
                背景
            </view>
            <view class="repairMain">
                根据《国家发展改革委办公厅关于进一步完善“信用中国”网站及地方信用门户网站行政处罚信息信用修复机制的通知》（发改办财金〔2019〕527号）等相关文件，中国经济信息社作为第一批可承担信用修复专题培训及提供信用修复报告的机构，定期开展信用修复培训服务，并为企业提供信用修复报告及培训证明。
            </view>
        </view>
        <view class="repairBox">
            <view class="proServeTitle">
                修复效果
            </view>
            <view class="repairMain">
                完成修复后，企业的行政处罚公示期将缩短，具体情况如下表所示：
                <view class="table">
                    <view class="tr clear">
                        <view class="th">处罚等级</view>
                        <view class="th">修复前公示期</view>
                        <view class="th">修复后公示期</view>
                    </view>
                    <view class="tr clear">
                        <view class="td">一级</view>
                        <view class="td">1年</view>
                        <view class="td">3个月</view>
                    </view>
                    <view class="tr clear">
                        <view class="td">严重</view>
                        <view class="td">3年</view>
                        <view class="td">6个月</view>
                    </view>
                    <view class="tr clear">
                        <view class="td">特定严重</view>
                        <view class="td" style="width: calc(100% - 33.333%);">3年，不能修复</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="repairBox">
            <view class="proServeTitle">
                收费标准
            </view>
            <view class="repairMain">
                <view class="table table2">
                    <view class="tr clear">
                        <view class="th">专题培训</view>
                        <view class="th">修复报告</view>
                    </view>
                    <view class="tr clear">
                        <view class="td">1000元/人</view>
                        <view class="td">800元/份</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="repairBox">
            <view class="proServeTitle">
                培训时间
            </view>
            <view class="repairMain">
                每周五14:30-17:30（法定节假日除外）
            </view>
        </view>
        <view class="repairBox">
            <view class="proServeTitle">
                培训地点
            </view>
            <view class="repairMain">
                <navigator url="/pages/creditRepair/repairConsult" hover-class="none">
                    点击查看培训地点
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
    .repairMain .table{
        width: 100%;
        border:2rpx solid #dae6f0;
        margin-top: 10rpx;
    }
    .repairMain .table .tr .th{
        float: left;
        height: 64rpx;
        background: #e6f0fc;
        border-bottom:2rpx solid #dae6f0;
        border-left:2rpx solid #dae6f0;
        line-height: 64rpx;
        text-align: center;
        font-size: 24rpx;
        width: 33.333%;
    }
    .repairMain .table .tr .th:first-child{
        border-left: none;
    }
    .repairMain .table .tr .td{
        float: left;
        height: 64rpx;
        border-bottom:2rpx solid #dae6f0;
        border-left:2rpx solid #dae6f0;
        line-height: 64rpx;
        text-align: center;
        font-size: 24rpx;
        width: 33.333%;
        color: #666;
    }
    .repairMain .table .tr .td:first-child{
        border-left: none;
    }
    .repairMain .table .tr:last-child .td{
        border-bottom: none;
    }
    .repairMain .table2 .tr .th{
        width: 50%;
    }
    .repairMain .table2 .tr .td{
        width: 50%;
    }
    .repairMain navigator{
        color: #113090;
        text-decoration: underline;
        display: inline-block;
    }
</style>
