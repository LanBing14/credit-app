<template>
    <view class="info">
        <view class="infoMain">
            <view class="infoMainTop clear">
                <view class="infoLogo">
                    <image :src="logoImg ? website + logoImg : '../../static/icon/82.png'" mode="widthFix"></image>
                </view>
                <view class="infoMainFr">
                    <view class="h1">{{companyInfo.name ? companyInfo.name : '-'}}</view>
                    <view class="h2">法人代表：<text>{{companyInfo.operName ? companyInfo.operName : '-'}}</text></view>
                    <view class="h2">固定电话：<text>{{telephone ? telephone : '-'}}</text></view>
                </view>
            </view>
            <view class="infoMainBtm">
                <view class="p clear">
                    <image src="../../static/icon/61.png"></image>
                    公司官网：
                    <text>
                        {{companyInfo.website ? companyInfo.website : '-'}}
                    </text>
                </view>
                <view class="p clear">
                    <image src="../../static/icon/62.png"></image>
                    统一社会信用代码：
                    <text>
                        {{companyInfo.creditCode ? companyInfo.creditCode : '-'}}
                    </text>
                </view>
                <view class="p clear">
                    <image src="../../static/icon/63.png"></image>
                    主营业务：
                    <text v-if="companyInfo.scope">
                        {{companyInfo.scope.length > 37 ? companyInfo.scope.substring(0,37) + '...' : companyInfo.scope}}
                    </text>
                    <text v-else>-</text>
                </view>
            </view>
        </view>
        <view class="infoLine"></view>
        <view class="proServe">
            <view class="proServeTitle">
                产品服务
            </view>
            <view class="proServeMain" v-if="proSerList.length > 0">
                <view class="li" v-for="item in proSerList" :key="item.id">
                    <view class="liImg">
                        <image :src="website + item.picture.path" mode="widthFix"></image>
                    </view>
                    <view class="p">
                        {{item.detail}}
                    </view>
                </view>
            </view>
            <noData info="暂无信息" v-if="proSerList.length == 0" style="margin-top: 40rpx"></noData>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import noData from "../../components/noData"
    import {arrIsNull} from "../../utils/utils";

    export default {
        components: {
            noData
        },
        data () {
            return {
                companyId:'',
                logoImg:'',
                companyInfo:{},
                telephone:'',
                proSerList:[]
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            uni.showLoading({
                title:'加载中...'
            })
            this.getImgAndVideoCompanyId();
            this.getCompanyInfo();
            this.getPersonInfoByCompanyId();
            this.getEnterpriseCard();
        },
        onShow(){

        },
        methods: {
            getImgAndVideoCompanyId(){//获取企业logo
                request('/user/center/xhsRest/cards/getImgAndVideoCompanyId?companyId=' + this.companyId,{
                    method:'post'
                }).then(res => {
                    if (res.stateCode == '1') {
                        this.logoImg = res.data.log[0];
                    }
                })
            },
            getCompanyInfo(){//企业基本信息
                request('/enterprise/detail/xhsRest/baseMsg/getCompanyInfo',{
                    method:'post',
                    data:{
                        companyId: this.companyId
                    }
                },true).then(data => {
                    if(data.stateCode == '60111'){
                        if(!arrIsNull(data.data.returnData)){
                            this.companyInfo = data.data.returnData[0];
                            uni.hideLoading();
                        }
                    }
                })
            },
            getPersonInfoByCompanyId(){//获取联系方式
                request('/web/app/xhsRest/base/getPersonInfoByCompanyId',{
                    method:'get',
                    data:{
                        companyId: this.companyId
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '1'){
                        this.telephone = result.data.telephone;
                    }
                })
            },
            getEnterpriseCard(){//产品服务
                request('/enterprise/detail/card/getEnterpriseCard',{
                    method:'get',
                    data:{
                        type:2,
                        companyId:this.companyId,
                        queryType:1
                    }
                }).then(res => {
                    if(res.data != ''){
                        this.proSerList = res.data.productList;
                        console.log(this.proSerList);
                    }
                })
            },
        }
    }
</script>

<style>
    .info{
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .infoMain{
        padding:30rpx 29rpx;
    }
    .infoLogo{
        width: 176rpx;
        float: left;
        height: 176rpx;
        position: relative;
        box-shadow: 0 0 10rpx rgba(181,181,181,0.29);
    }
    .infoLogo image{
        max-width: 80%;
        max-height: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .infoMainFr{
        width: calc(100% - 231rpx);
        float: right;
    }
    .infoMainFr .h1{
        font-size: 30rpx;
        color: #222;
        margin-top: 17rpx;
    }
    .infoMainFr .h2{
        font-size: 24rpx;
        color: #333;
        margin-top: 25rpx;
    }
    .infoMainFr .h2 text{
        color:#999;
    }
    .infoMainBtm{
        margin-top: 25rpx;
    }
    .infoMainBtm .p image{
        float: left;
        width: 23rpx;
        height:23rpx;
        position: relative;
        top: 7rpx;
        margin-right: 11rpx;
    }
    .infoMainBtm .p{
        font-size: 24rpx;
        color: #333;
        line-height: 36rpx;
        margin-top: 10rpx;
    }
    .infoMainBtm .p text{
        color: #999;
    }
    .infoLine{
        height:20rpx;
        background: #f7f7f7;
    }
    .proServe{
        padding:13rpx 29rpx 30rpx 29rpx;
    }
    .proServeTitle{
        position: relative;
        font-size: 30rpx;
        color: #000;
        padding-left: 22rpx;
        line-height: 62rpx;
        border-bottom: 1rpx solid #dcdcdc;
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
    .proServeMain .li{
        margin-top: 48rpx;
    }
    .proServeMain .li .liImg{
        text-align: center;
    }
    .proServeMain .li .liImg image{
        max-width: 100%;
    }
    .proServeMain .li .p{
        font-size: 24rpx;
        line-height: 48rpx;
        color: #333;
        margin-top: 30rpx;
        text-indent: 2em;
    }
</style>
