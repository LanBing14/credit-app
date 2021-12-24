<template>
    <view class="news">
        <view class="dynaMain" v-if="!noData">
            <navigator class="li clear" :url="`/pages/newsDetail/index?url=${item.artUrl}`" hover-class="none" v-for="(item,index) in XHEnterpInfoList" :key="index">
                <image :src="item.picLinks"></image>
                <view class="liMain">
                    <view class="liTitle">
                        {{item.title.length > 27 ? item.title.substring(0,27) + '...' : item.title}}
                    </view>
                    <text v-if="item.publishDate">
                        {{item.publishDate.substring(0,10)}}
                    </text>
                </view>
            </navigator>
            <uni-load-more status="loading" v-if="loading"></uni-load-more>
            <uni-load-more status="noMore" v-if="noMore"></uni-load-more>
        </view>
        <noData v-else info="暂无信息" style="margin-top:200rpx"></noData>
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
                companyName:'',
                XHEnterpInfoList:[],
                totalPages:0,
                pageNo:1,
                noMore:false,
                loading:false,
                noData:false
            }
        },
        onLoad(options) {
            this.companyName = options.companyName;
            // this.companyName = '中国经济信息社有限公司';
            this.getArticleList();
        },
        onShow(){

        },
        methods: {
            getArticleList(){
                request(`/creditPlus/xhsRest/cms/getArticleList?pageSize=10&pageNo=${this.pageNo}&current=true&copytype=true&categoryIds=15912,15913,15914,15915,15916,15917,15918,15919,15920&tag=${this.companyName}`,{
                    method:'post'
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '50101'){
                        if(!arrIsNull(res.data.returnData)){
                            this.XHEnterpInfoList = this.XHEnterpInfoList.concat(res.data.returnData)
                        }
                        this.totalPages = res.data.totalPages;
                        if(res.data.totalPages == this.pageNo){
                            this.noMore = true;
                        }
                    } else{
                        this.noData = true;
                    }
                })
            }
        },
        onReachBottom(){
            if(this.pageNo == this.totalPages) return this.noMore = true;
            this.loading = true;
            this.pageNo ++;
            this.getArticleList();
        }
    }
</script>

<style>
    .news{
        padding:0 30rpx;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
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
