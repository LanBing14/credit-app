<template>
    <view class="detail" v-if="showMain">
        <view class="detailLogoNameLegal">
            <view class="detailLogoName clear">
                <view class="detaillogo">
                    <image :src="companyInfo.imgUrl ? website + companyInfo.imgUrl : '../../static/icon/82.png'" mode="widthFix"></image>
                </view>
                <view class="detailName">
                    <view class="h1">
                        {{companyInfo.name}}
                    </view>
                    <view class="h2">
                        {{companyInfo.econKind ? companyInfo.econKind : '-'}}
                    </view>
                </view>
            </view>
            <view class="detailLegal clear">
                <view class="li">
                    <view class="h1">法定代表人</view>
                    <view class="h2">
                        {{companyInfo.operName ? companyInfo.operName : '-'}}
                    </view>
                </view>
                <view class="li">
                    <view class="h1">注册资本</view>
                    <view class="h2">
                        {{companyInfo.registCapi ? companyInfo.registCapi : '-'}}
                    </view>
                </view>
                <view class="li">
                    <view class="h1">成立时间</view>
                    <view class="h2">
                        {{companyInfo.startDate ? companyInfo.startDate.substring(0,10) : '-'}}
                    </view>
                </view>
            </view>
        </view>
        <view class="detailCode">
            <view class="DetailMain clear">
                <view class="codeFl codeFont borderRight">
                    <view class="h1">统一信用代码</view>
                    <view class="h2">
                        {{companyInfo.creditCode ? companyInfo.creditCode : '-'}}
                    </view>
                </view>
                <view class="codeFr codeFont paddingRight">
                    <view class="h1">最新登记日期</view>
                    <view class="h2">
                        {{companyInfo.checkDate ? companyInfo.checkDate.substring(0,10) : '-'}}
                    </view>
                </view>
            </view>
            <view class="DetailMain clear">
                <view class="codeFl codeFont borderRight">
                    <view class="h1">经营状态</view>
                    <view class="h2">
                        {{companyInfo.status ? companyInfo.status : '-'}}
                    </view>
                </view>
                <view class="codeFr codeFont paddingRight">
                    <view class="h1">所属行业</view>
                    <view class="h2">
                        {{companyInfo.industry ? companyInfo.industry : '-'}}
                    </view>
                </view>
            </view>
        </view>
        <view class="detailCode">
            <view class="DetailMain clear">
                <view class="codeFl codeFont borderRight">
                    <view class="h1">所属地区</view>
                    <view class="h2">
                        {{companyInfo.province?companyInfo.province:'-'}} {{companyInfo.city?companyInfo.city:'-'}}
                    </view>
                </view>
                <view class="codeFr codeFont paddingRight">
                    <view class="h1">企业网址</view>
                    <view class="h2">
                        {{companyInfo.website?companyInfo.website:'-'}}
                    </view>
                </view>
            </view>
            <view class="DetailMain clear">
                <view class="codeFl codeFont borderRight">
                    <view class="h1">公司注册号</view>
                    <view class="h2">
                        {{companyInfo.no?companyInfo.no:'-'}}
                    </view>
                </view>
                <view class="codeFr codeFont paddingRight">
                    <view class="h1">营业期限</view>
                    <view class="h2">
                        {{companyInfo.termStart?companyInfo.termStart.substring(0,10):'-'}}至{{companyInfo.teamEnd?companyInfo.teamEnd.substring(0,10):'-'}}
                    </view>
                </view>
            </view>
        </view>
        <view class="detailCode">
            <view class="DetailMain clear">
                <view class="codeFont borderBottom">
                    <view class="h1">曾用名</view>
                    <view v-if="companyInfo.originalName">
                        <view class="h2" v-for="(item,index) in companyInfo.originalName.split('|')" :key="index">{{item}}</view>
                    </view>
                    <view class="h2" v-else>-</view>
                </view>
            </view>
            <view class="DetailMain clear">
                <view class="codeFont borderBottom">
                    <view class="h1">英文名</view>
                    <view class="h2">
                        {{companyInfo.englishName?companyInfo.englishName:'-'}}
                    </view>
                </view>
            </view>
            <view class="DetailMain clear">
                <view class="codeFont borderBottom">
                    <view class="h1">登记机关</view>
                    <view class="h2">
                        {{companyInfo.belongOrg?companyInfo.belongOrg:'-'}}
                    </view>
                </view>
            </view>
            <view class="DetailMain clear">
                <view class="codeFont">
                    <view class="h1">注册地址</view>
                    <view class="h2">
                        {{companyInfo.address?companyInfo.address:'-'}}
                    </view>
                </view>
            </view>
        </view>
        <view class="detailCode">
            <view class="DetailMain clear">
                <view class="codeFont">
                    <view class="h1">经营范围</view>
                    <view class="h2">
                        {{companyInfo.scope?companyInfo.scope:'-'}}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import {arrIsNull} from "../../utils/utils";

    export default {
        components: {

        },
        data () {
            return {
                companyName:'',
                companyId:'',
                showMain:false,
                companyInfo:{}
            }
        },
        onLoad(options) {
            this.companyName = options.companyName;
            this.companyId = options.companyId;
            uni.showLoading({
                title:'加载中...'
            })
            this.getCompanyInfo();
        },
        onShow(){

        },
        methods: {
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
                            console.log(this.companyInfo);

                            this.showMain = true;
                            uni.hideLoading();
                        }
                    }
                })
            },
        }
    }
</script>

<style>
    page{
        background: #f6f6f6;
    }
    .detail{
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .detailLogoNameLegal{
        background: #fff;
        padding: 35rpx 30rpx;
    }
    .detaillogo{
        width: 96rpx;
        height: 96rpx;
        border:1rpx solid #e5e5e5;
        border-radius: 3rpx;
        position: relative;
        float: left;
    }
    .detaillogo image{
        width: 80%;
        height: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .detailName{
        width: calc(100% - 119rpx);
        float: right;
    }
    .detailName .h1{
        font-size: 32rpx;
        color: #222;
    }
    .detailName .h2{
        font-size: 26rpx;
        color: #666;
        margin-top: 15rpx;
    }
    .detailLegal{
        margin-top: 30rpx;
    }
    .detailLegal .li{
        width: 33.333%;
        float: left;
        border-right: 1rpx solid #dcdcdc;
        text-align: center;
    }
    .detailLegal .li:last-child{
        border-right: none;
    }
    .detailLegal .li .h1{
        font-size: 26rpx;
        color: #999;
        height: 26rpx;
        line-height: 26rpx;
    }
    .detailLegal .li .h2{
        font-size: 28rpx;
        color: #333;
        margin-top: 15rpx;
        height: 28rpx;
        line-height: 28rpx;
    }
    .detailCode{
        background: #fff;
        margin-top: 20rpx;
        padding: 30rpx;
    }
    .detailCode .DetailMain{
        margin-top: 40rpx;
    }
    .detailCode .DetailMain:first-child{
        margin-top: 0;
    }
    .borderRight{
        border-right: 1rpx solid #dcdcdc;
    }
    .borderBottom{
        border-bottom: 1rpx solid #dcdcdc;
        padding-bottom: 22rpx;
    }
    .paddingRight{
        padding-left: 20rpx;
    }
    .codeFl{
        width: 50%;
        float: left;
    }
    .codeFr{
        width: 50%;
        float: right;
    }
    .codeFont .h1{
        font-size: 26rpx;
        color: #6f6f6f;
        line-height: 44rpx;
    }
    .codeFont .h2{
        font-size: 26rpx;
        color: #222;
        line-height: 44rpx;
    }
</style>
