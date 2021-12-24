<template>
    <view class="archList">
        <navigator :url="`/pages/companyRiskWarnDetail/index?type=3&companyName=${companyName}`" hover-class="none" class="li">
            重大税收违法案件当事人
            <text>
                {{totalNum1}}
                <image src="../../static/icon/89.png"></image>
            </text>
        </navigator>
        <navigator :url="`/pages/companyRiskWarnDetail/index?type=2&companyName=${companyName}`" hover-class="none" class="li">
            失信被执行人
            <text>
                {{totalNum2}}
                <image src="../../static/icon/89.png"></image>
            </text>
        </navigator>
        <navigator :url="`/pages/companyRiskWarnDetail/index?type=4&companyName=${companyName}`" hover-class="none" class="li">
            经营异常名录
            <text>
                {{totalNum3}}
                <image src="../../static/icon/89.png"></image>
            </text>
        </navigator>
        <navigator :url="`/pages/companyRiskWarnDetail/index?type=6&companyName=${companyName}`" hover-class="none" class="li">
            海关失信认证企业
            <text>
                {{totalNum4}}
                <image src="../../static/icon/89.png"></image>
            </text>
        </navigator>
        <navigator :url="`/pages/companyRiskWarnDetail/index?type=5&companyName=${companyName}`" hover-class="none" class="li">
            统计上严重失信企业
            <text>
                {{totalNum5}}
                <image src="../../static/icon/89.png"></image>
            </text>
        </navigator>
        <navigator :url="`/pages/companyRiskWarnDetail/index?type=8&companyName=${companyName}`" hover-class="none" class="li">
            证监会行政处罚
            <text>
                {{totalNum6}}
                <image src="../../static/icon/89.png"></image>
            </text>
        </navigator>
        <navigator :url="`/pages/companyRiskWarnDetail/index?type=9&companyName=${companyName}`" hover-class="none" class="li">
            安全生产黑名单
            <text>
                {{totalNum7}}
                <image src="../../static/icon/89.png"></image>
            </text>
        </navigator>
        <navigator :url="`/pages/companyRiskWarnDetail/index?type=10&companyName=${companyName}`" hover-class="none" class="li">
            交通运输黑名单
            <text>
                {{totalNum8}}
                <image src="../../static/icon/89.png"></image>
            </text>
        </navigator>
    </view>
</template>

<script>
    import request from "../../utils/request";

    export default {
        components: {

        },
        data () {
            return {
                companyId:'',
                companyName:'',
                totalNum1 :0,
                totalNum2 :0,
                totalNum3 :0,
                totalNum4 :0,
                totalNum5 :0,
                totalNum6 :0,
                totalNum7 :0,
                totalNum8 :0
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            this.companyName = options.companyName;
            uni.setNavigationBarTitle({
                title: this.companyName
            });

            this.getDelinquentPartyByCompanyName();
            this.getQueryPersonByCompanyName();
            this.queryAbnormalOperationByCompanyName();
            this.queryCustomsCreditBreakerByCompanyName();
            this.queryCensusCreditBreakerPublishByCompanyName();
            this.queryAdministrationPunishByCompanyName();
            this.queryProduceSecurityBlackListByCompanyName();
            this.queryOverLimitTransCompanyByCompanyName();
        },
        onShow(){

        },
        methods: {
            getDelinquentPartyByCompanyName(){
                //重大税收违法案件当事人
                request('/enterprise/detail/radBlackList/getDelinquentPartyByCompanyName',{
                    method:'get',
                    data:{
                        companyName:this.companyName
                    }
                }).then(res => {
                    if(res.stateCode == '1'){
                        this.totalNum1 = res.data.length;
                    }
                })
            },
            getQueryPersonByCompanyName(){
                //失信被执行人
                request('/enterprise/detail/radBlackList/getQueryPersonByCompanyName',{
                    method:'get',
                    data:{
                        companyName:this.companyName
                    }
                }).then(res => {
                    if(res.stateCode == '1'){
                        this.totalNum2 = res.data.length;
                    }
                })
            },
            queryAbnormalOperationByCompanyName(){
                //异常经营名录
                request('/esmongodb/v1/redblacklist/queryAbnormalOperationByCompanyName',{
                    method:'get',
                    data:{
                        companyName:this.companyName
                    }
                }).then(res => {
                    this.totalNum3 = res.returnData.length;
                })
            },
            queryCustomsCreditBreakerByCompanyName(){
                //海关失信认证企业
                request('/esmongodb/v1/redblacklist/queryCustomsCreditBreakerByCompanyName',{
                    method:'get',
                    data:{
                        companyName:this.companyName
                    }
                }).then(res => {
                    this.totalNum4 = res.returnData.length;
                })
            },
            queryCensusCreditBreakerPublishByCompanyName(){
                //统计上严重失信企业
                request('/esmongodb/v1/redblacklist/queryCensusCreditBreakerPublishByCompanyName',{
                    method:'get',
                    data:{
                        companyName:this.companyName
                    }
                }).then(res => {
                    this.totalNum5 = res.returnData.length;
                })
            },
            queryAdministrationPunishByCompanyName(){
                //证监会行政处罚
                request('/esmongodb/v1/redblacklist/queryAdministrationPunishByCompanyName',{
                    method:'get',
                    data:{
                        companyName:this.companyName
                    }
                }).then(res => {
                    this.totalNum6 = res.returnData.length;
                })
            },
            queryProduceSecurityBlackListByCompanyName(){
                //安全生产黑名单
                request('/esmongodb/v1/redblacklist/queryProduceSecurityBlackListByCompanyName',{
                    method:'get',
                    data:{
                        companyName:this.companyName
                    }
                }).then(res => {
                    this.totalNum7 = res.returnData.length;
                })
            },
            queryOverLimitTransCompanyByCompanyName(){
                //交通运输黑名单
                request('/esmongodb/v1/redblacklist/queryOverLimitTransCompanyByCompanyName',{
                    method:'get',
                    data:{
                        companyName:this.companyName
                    }
                }).then(res => {
                    this.totalNum8 = res.returnData.length;
                })
            }
        }
    }
</script>

<style>
    page{
        background: #f6f6f6;
    }
    .archList .li{
        height: 106rpx;
        line-height: 106rpx;
        font-size: 32rpx;
        color: #333;
        background: #fff;
        padding:0 30rpx;
        margin-top: 20rpx;
    }
    .archList .li text{
        float: right;
        font-size: 26rpx;
        color: #6f6f6f;
    }
    .archList .li text image{
        width: 15rpx;
        height: 26rpx;
        margin-left: 15rpx;
        position: relative;
        top: 4rpx;
    }
</style>
