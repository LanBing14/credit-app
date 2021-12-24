<template>
    <view class="history">
        <view class="li" v-if="historyList.length > 0" v-for="(item,index) in historyList" :key="index">
            <view class="liTitle">
                <view class="circle"></view>
                {{item.occurTime}}
            </view>
            <view class="liMain">
                {{item.detail}}
            </view>
        </view>
        <noData info="暂无信息" style="margin-top: 200rpx;" v-else></noData>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import noData from "../../components/noData";

    export default {
        components: {
            noData
        },
        data () {
            return {
                companyId:String,
                historyList:Array
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            this.getEnterpriseCard();
        },
        onShow(){

        },
        methods: {
            getEnterpriseCard(){
                request('/enterprise/detail/card/getEnterpriseCard',{
                    method:'get',
                    data:{
                        type:1,
                        companyId:this.companyId,
                        queryType:1
                    }
                }).then(res => {
                    console.log(res);
                    if(res.data != ''){
                        if(res.data.developmentList.length > 0){
                            this.historyList = res.data.developmentList;
                        } else {
                            this.historyList = [];
                        }
                    } else{
                        this.historyList = [];
                    }
                })
            }
        }
    }
</script>

<style>
    .history{
        padding:35rpx 30rpx 35rpx 57rpx;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .history .li{
        border-left: 2rpx solid rgba(17,48,144,0.3);
        padding-left: 40rpx;
        padding-top: 25rpx;
    }
    .history .li .circle{
        padding: 10rpx 0;
        background: #fff;
        display: inline-block;
        position: relative;
        top: 5rpx;
        margin-right: 20rpx;
    }
    .history .li .circle:before{
        content: '';
        display: inline-block;
        width: 32rpx;
        height: 32rpx;
        border:6rpx solid #113090;
        border-radius: 50%;
        background: #fff;
        box-sizing: border-box;
    }
    .history .li .liTitle{
        font-size: 28rpx;
        color: #666;
        font-weight: bold;
        position: relative;
        left: -57rpx;
    }
    .history .li .liMain{
        padding:20rpx 30rpx;
        font-size: 30rpx;
        line-height: 44rpx;
        color: #333;
        background: #f6f6f6;
        border-radius: 7rpx;
        margin-top: 10rpx;
    }
    .liLast{
        padding-top: 5rpx;
        background: #fff;
        position: relative;
        left: -57rpx;
    }
    .liLast image{
        width: 32rpx;
        height: 32rpx;
    }
</style>
