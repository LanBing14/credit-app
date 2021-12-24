<template>
    <view class="message">
        <view @click="openDetail(item.ID)" class="li clear" v-for="(item,index) in messageList" :key="index">
            <view class="liFl">
                <text v-if="item.READ_STATUS == 0"></text>
            </view>
            <view class="liFr">
                <view class="liTitle clear">
                    <view class="h1">
                        <rich-text :nodes="item.TITLE"></rich-text>
                    </view>
                    <view class="liTime">
                        <uni-dateformat :date="item.CREATE_TIME - 7200000" format="yyyy-MM-dd"></uni-dateformat>
                    </view>
                </view>
                <view class="liMain">
                    <rich-text :nodes="item.DETAIL ? item.DETAIL.substring(0,65) + '...' : '-'"></rich-text>
                </view>
            </view>
        </view>
        <uni-load-more status="loading" v-if="loading"></uni-load-more>
        <uni-load-more status="noMore" v-if="noMore"></uni-load-more>
        <noData info="暂无信息" style="margin-top: 200rpx" v-if="noData"></noData>
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
                messageList:[],
                pageNo:1,
                totalPages:0,
                noMore:false,
                loading:false,
                noData:false
            }
        },
        onLoad() {

        },
        onShow(){
            uni.showLoading({
                title:'加载中...'
            });
            this.messageList = [];
            this.pageNo = 1;
            this.findPMessage();
        },
        methods: {
            findPMessage(){
                request('/user/center/myMessage/findPMessage',{
                    method:'post',
                    data:{
                        pageNo:this.pageNo,
                        pageSize:10
                    }
                }).then(res => {
                    console.log(res);
                    if (res.stateCode == '70206'){
                        this.totalPages = res.data.totalPages;
                        this.messageList = this.messageList.concat(res.data.list);
                        this.loading = false;
                    }
                    if (this.messageList.length == 0) {
                        this.noData = true;
                    }
                    uni.hideLoading();
                })
            },
            openDetail(id){
                uni.navigateTo({
                    url:`/pages/messageDetail/index?id=${id}`
                })
                request('/user/center/myMessage/editPMesReadStatus',{
                    method:'post',
                    data:id
                }).then(res => {
                    console.log(res);
                })
            }
        },
        onReachBottom(){
            if(this.pageNo == this.totalPages) return this.noMore = true;
            this.loading = true;
            this.pageNo ++;
            this.findPMessage();
        }
    }
</script>

<style>
    page{
        background: #f6f6f6;
    }
    .message{
        padding: 0 30rpx 20rpx 30rpx;
    }
    .message .li{
        padding:30rpx 15rpx;
        background: #fff;
        border-radius: 7rpx;
        margin-top: 20rpx;
    }
    .message .li .liFl{
        width: 15rpx;
        float: left;
        line-height: 28rpx;
    }
    .message .li .liFl text{
        display: inline-block;
        width: 15rpx;
        height: 15rpx;
        border-radius: 50%;
        background: #e70f1c;
    }
    .message .li .liFr{
        width: calc(100% - 30rpx);
        float: right;
    }
    .message .li .liFr .liTitle{
        font-size: 28rpx;
        color: #222;
        line-height: 28rpx;
    }
    .message .li .liFr .liTitle .h1{
        height: 28rpx;
        width: 500rpx;
        float: left;
        overflow: hidden;
        word-break: break-all;  /* break-all(允许在单词内换行。) */
        text-overflow: ellipsis;  /* 超出部分省略号 */
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 1; /** 显示的行数 **/
    }
    .message .li .liFr .liTitle .liTime{
        float: right;
        font-size: 20rpx;
        color: rgba(108,123,138,0.5);
    }
    .liMain{
        margin-top: 15rpx;
        font-size: 24rpx;
        line-height: 40rpx;
        color: #999;
    }
</style>
