<template>
    <view class="eval">
        <view v-if="!noData">
            <view class="evalRadar">
                <view class="h1">评估等级：<text>{{assLevel}}</text></view>
                <view class="charts-box">
                    <qiun-data-charts type="evalRadar" :chartData="chartData" background="none"/>
                </view>
                <view class="h2">风险等级由低到高：R1-R15</view>
            </view>
            <view class="summary">
                <view class="h1">
                    评估总结
                </view>
                <view class="h2">
                    {{assLevelDesc[0]}}
                </view>
                <view class="summaryMain">
                    <uni-table>
                        <uni-tr>
                            <uni-td width="90" align="center">外部环境</uni-td>
                            <uni-td>
                                {{assLevelDesc[1]}}
                            </uni-td>
                        </uni-tr>
                        <uni-tr>
                            <uni-td width="90" align="center">企业特质</uni-td>
                            <uni-td>
                                {{assLevelDesc[2]}}
                            </uni-td>
                        </uni-tr>
                        <uni-tr>
                            <uni-td width="90" align="center">股东背景</uni-td>
                            <uni-td>
                                {{assLevelDesc[3]}}
                            </uni-td>
                        </uni-tr>
                        <uni-tr>
                            <uni-td width="90" align="center">经营水平</uni-td>
                            <uni-td>
                                {{assLevelDesc[4]}}
                            </uni-td>
                        </uni-tr>
                        <uni-tr>
                            <uni-td width="90" align="center">信用历史</uni-td>
                            <uni-td>
                                {{assLevelDesc[5]}}
                            </uni-td>
                        </uni-tr>
                        <uni-tr>
                            <uni-td width="90" align="center">关联风险</uni-td>
                            <uni-td>
                                {{assLevelDesc[6]}}
                            </uni-td>
                        </uni-tr>
                    </uni-table>
                </view>
            </view>
        </view>
        <noData info="暂无信息" v-else style="margin-top: 200rpx"></noData>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import noData from "../../components/noData.vue"
    import {arrIsNull} from "../../utils/utils";

    export default {
        components:{
          noData
        },
        data () {
            return {
                companyName:'',
                assLevel:'',
                chartData:{},
                assLevelDesc:[],
                noData:false
            }
        },
        onLoad(options) {
            this.companyName = options.companyName;
            uni.showLoading({
                title:'加载中...'
            })
            this.getScoringModel();
        },
        onShow(){

        },
        methods: {
            getScoringModel(){
                request('/enterprise/detail/xhsRest/getScoringModel',{
                    method:'get',
                    data:{
                        companyname:this.companyName
                    }
                }).then(res => {
                    uni.hideLoading();
                    if(res.stateCode == '1'){
                        this.assLevel = res.data.data.qualratingnm
                        this.assLevelDesc = res.data.data.desc.split("<br /><br />")
                        this.chartData = {
                            "categories": [
                                "外部环境",//d1
                                "企业特质",//d2
                                "股东背景",//d3
                                "经营水平",//d4
                                "信用历史",//d5
                                "关联风险"//d6
                            ],
                            "series": [
                                {
                                    "name": "",
                                    "data": [
                                        res.data.data.d1,
                                        res.data.data.d2,
                                        res.data.data.d3,
                                        res.data.data.d4,
                                        res.data.data.d5,
                                        res.data.data.d6,
                                    ]
                                }
                            ]
                        }
                    } else{
                        this.noData = true;
                    }
                })
            }
        }
    }
</script>

<style>
    .eval{
        padding:30rpx 30rpx 0 30rpx;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .evalRadar .h1{
        font-size: 30rpx;
        color: #333;
    }
    .evalRadar .h1 text{
        color: #113090;
    }
    .evalRadar .h2{
        font-size: 26rpx;
        color: #666;
        margin-top: 20rpx;
    }
    .summary{
        margin-top: 30rpx;
        padding-bottom: 30rpx;
    }
    .summary .h1{
        font-size: 30rpx;
        color: #333;
    }
    .summary .h2{
        margin-top: 15rpx;
        font-size: 26rpx;
        color: #666;
    }
    .summaryMain{
        margin-top: 35rpx;
    }
    /deep/.uni-table-td{
        padding:15rpx 30rpx !important;
        vertical-align: middle;
    }
    /deep/.summaryMain .uni-table-tr .uni-table-td:nth-child(1){
        background: #e6f0fc;
        border-bottom: 1px solid #fff;
    }
    /deep/.summaryMain .uni-table-tr .uni-table-td:nth-child(2){
        font-size: 24rpx;
        line-height: 32rpx;
        color: #7e7e7f;
        border: 1px solid #cfe3fa;
        border-bottom: none;
    }
    /deep/.summaryMain .uni-table-tr:last-child .uni-table-td{
        border-bottom: 1px solid #cfe3fa;
    }
</style>
