<template>
    <view class="cardList">
        <view class="li" v-for="(item,index) in cardsList" :key="index">
            <navigator :url="`/pages/creditCardDetail/index?companyId=${item.companyId}&companyName=${item.name}`" hover-class="none" class="liTop">
                <image class="liTopBck" src="../../static/img/jpg03.jpg"></image>
                <image class="liTopLink" src="../../static/img/png_04.png" v-if="item.cochainStatus == 0"></image>
                <view class="liTopMain">
                    <view class="h1 clear">
                        <view class="h1Title">
                            {{item.name}}
                        </view>
                        <!--<view class="h1Vip">
                            <image src="../../static/icon/47.png"></image>
                            <text>V22</text>
                        </view>-->
                    </view>
                    <view class="liTopList">
                        <text>统一社会信用代码：{{item.creditCode ? item.creditCode : '-'}}</text>
                        <text v-if="item.companyInfo">地址：{{item.companyInfo.address.length > 15 ? item.companyInfo.address.substring(0,15) + '...' :item.companyInfo.address}}</text>
                        <text v-if="item.companyInfo">法定代表人：{{item.companyInfo.operName}}</text>
                        <text>新华信用码：{{item.xhCode ? item.xhCode : '-'}}</text>
                    </view>
                </view>
            </navigator>
            <view class="liBtm clear">
                <navigator :url="`/pages/creditCardCerti/index?companyId=${item.companyId}&companyName=${item.name}`" hover-class="none" class="li">入驻证书</navigator>
                <navigator :url="`/pages/creditCardCommit/index?companyId=${item.companyId}&companyName=${item.name}`" hover-class="none" class="li">入驻承诺书</navigator>
                <navigator :url="`/pages/creditCardInfo/index?companyId=${item.companyId}`" hover-class="none" class="li">基本详情</navigator>
            </view>
        </view>
        <uni-load-more status="loading" v-if="loading"></uni-load-more>
        <uni-load-more status="noMore" v-if="noMore"></uni-load-more>
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
                cardsList:[],
                pageNo:1,
                loading:false,
                totalPages:0,
                noMore:false
            }
        },
        onLoad() {
            uni.showLoading({
                title:'加载中...'
            })
            this.getCreditCardsByPage();
        },
        onShow(){

        },
        methods: {
            getCreditCardsByPage(){
                request('/user/center/xhsRest/cards/getCreditCardsByPage',{
                    method:'get',
                    data:{
                        pageNo: this.pageNo,
                        pageSize: 10
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '1'){
                        if(!arrIsNull(res.data.list)){
                            let arrList = [];
                            arrList = res.data.list;
                            this.totalPages = res.data.totalPages;
                            arrList.forEach((item,index) => {
                                //获取企业基本信息
                                request('/enterprise/detail/xhsRest/baseMsg/getCompanyInfo',{
                                    method:'post',
                                    data:{
                                        companyId: item.companyId
                                    }
                                },true).then(data => {
                                    if(data.stateCode == '60111'){
                                        arrList[index].companyInfo = data.data.returnData[0];

                                        //获取新华信用码
                                        request('/user/center/myMessage/getXhCodeByCompanyId',{
                                            method:'get',
                                            data:{
                                                companyId: item.companyId
                                            }
                                        }).then(xhCodeData => {
                                            arrList[index].xhCode = xhCodeData.data.xhCode;

                                            //获取是否上链
                                            request('/enterprise/detail/card/getEnterpriseCard',{
                                                method:'get',
                                                data:{
                                                    type:1,
                                                    companyId:item.companyId,
                                                    queryType:1
                                                }
                                            }).then(linkData =>{
                                                arrList[index].cochainStatus = linkData.data.cochainStatus;
                                                if((index + 1) == arrList.length){
                                                    this.cardsList = this.cardsList.concat(arrList);
                                                    console.log(this.cardsList);
                                                    uni.hideLoading();
                                                    this.loading = false;
                                                }
                                            })
                                        })
                                    }
                                })
                            })

                        }
                    }
                })
            }
        },
        onReachBottom(){
            if(this.pageNo == this.totalPages) return this.noMore = true;
            this.loading = true;
            this.pageNo ++;
            this.getCreditCardsByPage();
        }
    }
</script>

<style>
    .cardList{
        padding: 8rpx 30rpx 30rpx 30rpx;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        box-sizing: content-box;
    }
    .cardList > .li{
        margin-top: 20rpx;
    }
    .cardList .liTop{
        width: 690rpx;
        height: 348rpx;
        position: relative;
        border-top-left-radius: 20rpx;
        border-top-right-radius: 20rpx;
        overflow: hidden;
        padding:37rpx 0 0 30rpx
    }
    .cardList .liTop .liTopBck{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .cardList .liTop .liTopLink{
        width: 159rpx;
        height: 163rpx;
        position: absolute;
        top: 131rpx;
        right: 42rpx;
    }
    .cardList .liTop .liTopMain{
        position: relative;
    }
    .cardList .liTop .liTopMain .h1 .h1Title{
        float: left;
        font-size: 30rpx;
        color: #fff;
        font-weight: bold;
    }
    .cardList .liTop .liTopMain .h1 .h1Vip{
        float: left;
        width: 67rpx;
        height: 31rpx;
        position: relative;
        margin-left: 25rpx;
        top: 5rpx;
    }
    .cardList .liTop .liTopMain .h1 .h1Vip image{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .cardList .liTop .liTopMain .h1 .h1Vip text{
        font-size: 18rpx;
        color: #fff;
        position: absolute;
        right: 0;
        display: block;
        width: 36rpx;
        height: 100%;
        text-align: center;
        line-height: 35rpx;
    }
    .cardList .liTop .liTopMain .liTopList{
        margin-top: 25rpx;
    }
    .cardList .liTop .liTopMain .liTopList text{
        display: block;
        font-size: 24rpx;
        color: rgba(255,255,255,0.8);
        font-weight: bold;
        margin-top: 13rpx;
    }
    .cardList .liBtm{
        height: 80rpx;
        background: #e0efff;
        border-bottom-left-radius: 20rpx;
        border-bottom-right-radius: 20rpx;
    }
    .cardList .liBtm .li{
        line-height: 80rpx;
        width: 33.33%;
        text-align: center;
        font-size: 28rpx;
        color: #333;
        float: left;
    }
</style>
