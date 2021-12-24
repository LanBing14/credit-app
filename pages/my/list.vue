<template>
    <view class="myList">
        <view class="redBlackList">
            <navigator v-if="title != '我的发布'" :url="`/pages/companyInfo/index?companyName=${item.COMPANY_NAME}&companyId=${item.COMPANY_ID}`" hover-class="none" class="li" v-for="(item,index) in list" :key="index">
                <view class="h1">
                    {{item.COMPANY_NAME}}
                </view>
                <view class="h2" v-if="title !='我的企业'">
                    {{title=='我的订单'?'订单生成时间：':'列入时间：'}}
                    <text>
                        {{item.CREATE_DATE | dateFormat('yyyy-MM-dd')}}
                    </text>
                </view>
                <view class="h2" v-else>
                    统一社会信用代码：
                    <text>
                        {{item.USERNAME}}
                    </text>
                </view>
            </navigator>
            <view v-if="title == '我的发布'" class="li" v-for="(item,index) in list" :key="index">
                <view class="h1">
                    {{item.TITLE}}
                </view>
                <view class="h2">
                    资讯状态：
                    <text v-if="item.RELEASE_STATUS == '0'">未发布</text>
                    <text v-if="item.RELEASE_STATUS == '1'">待审核</text>
                    <text v-if="item.RELEASE_STATUS == '2'">审核未通过</text>
                    <text v-if="item.RELEASE_STATUS == '3'">已发布</text>
                    <text v-if="item.RELEASE_STATUS == '4'">暂停发布</text>
                </view>
                <view class="h2">
                    编辑时间：
                    <text>
                        {{item.CREATE_DATE | dateFormat('yyyy-MM-dd')}}
                    </text>
                </view>
            </view>
            <uni-load-more status="loading" v-if="loading"></uni-load-more>
            <uni-load-more status="noMore" v-if="noMore"></uni-load-more>
            <noData style="margin-top: 80rpx;" info="暂无数据" v-if="noData"></noData>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import {dateFormat} from "../../utils/utils";

    export default {
        components: {

        },
        filters: {
            dateFormat
        },
        data () {
            return {
                title:'',
                list:[],
                pageNo:1,
                totalPages:0,
                noMore:false,
                loading:false,
                noData:false,
                userInfo:{}
            }
        },
        onLoad(options) {
            this.title = options.title;
            uni.setNavigationBarTitle({
                title: options.title
            });
            this.userInfo = uni.getStorageSync('userInfo')
            this.getList();
        },
        onShow(){

        },
        methods: {
            getList(){
                switch (this.title) {
                    case '我的监测':
                        this.getSuperviseList();
                        break;
                    case '我的关注':
                        this.getAttentionList();
                        break;
                    case '我的企业':
                        this.getEnterpriseListOnlyCerti();
                        break;
                    case '我的订单':
                        this.findPOrders();
                        break;
                    case '我的发布':
                        this.getContentByConditions();
                        break;
                }
            },
            getSuperviseList(){//我的监测
                request('/enterprise/detail/xhsRest/supervise/getSuperviseList',{
                    method:'get',
                    data:{
                        companyName: '',
                        pageNo: this.pageNo,
                        pageSize: 10
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '1'){
                        if(res.data.list){
                            this.totalPages = res.data.totalPages
                            this.list = this.list.concat(res.data.list);
                            this.loading = false;
                        } else{
                            this.noData = true;
                        }
                    } else{
                        this.noData = true;
                    }
                })
            },
            getAttentionList(){//我的关注
                request('/enterprise/detail/xhsRest/atten/getAttentionList',{
                    method:'get',
                    data:{
                        companyName: '',
                        groupId: '',
                        pageNo: this.pageNo,
                        pageSize: 10,
                        englishType:"0"
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '1'){
                        if(res.data.list){
                            this.totalPages = res.data.totalPages;
                            this.list = this.list.concat(res.data.list);
                            this.loading = false;
                        } else{
                            this.noData = true;
                        }
                    } else{
                        this.noData = true;
                    }
                })
            },
            findPOrders(){//我的订单
                request('/user/center/xhsRest/findPOrders',{
                    method:'post',
                    data:{
                        pUserId:this.userInfo.userId,
                        pageNo:this.pageNo,
                        pageSize:10
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '30301'){
                        this.totalPages = res.data.totalPages;
                        this.list = this.list.concat(res.data.list);
                        this.loading = false;
                    }
                })
            },
            getContentByConditions(){//我的发布
                request('/user/center/xhsRest/getContentByConditions',{
                    method:'post',
                    data:{
                        pageNo:this.pageNo,
                        pageSize:10
                    }
                }).then(res => {
                    console.log(res);
                    this.totalPages = res.data.totalPages;
                    this.list = this.list.concat(res.data.list);
                    this.loading = false;
                })
            },
            getEnterpriseListOnlyCerti(){//获取已入驻企业列表
                request('/enterprise/detail/xhsRest/ComAuthori/getEnterpriseListOnlyCerti',{
                    method:'get',
                    data:{
                        pageNo: this.pageNo,
                        pageSize: 10,
                        status:3
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '1'){
                        if(res.data.list){
                            let list = [];
                            res.data.list.forEach(item =>{
                                if(item.EXPIRE_STATUS == '0'){
                                    list.push(item);
                                }
                            })
                            this.totalPages = res.data.totalPages
                            this.list = this.list.concat(list);
                            this.loading = false;
                        } else{
                            this.noData = true;
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
            this.getList();
        }
    }
</script>

<style>
    .redBlackList{
        padding:0 30rpx;
    }
    .redBlackList .li{
        padding:30rpx 0;
        border-bottom: 1rpx solid #e5e5e5;
    }
    .redBlackList .li .h1{
        font-size: 28rpx;
        color: #222;
    }
    .redBlackList .li .h2{
        font-size: 24rpx;
        color: #9b9b9b;
        margin-top: 20rpx;
    }
    .redBlackList .li .h2 text{
        color: #666;
    }
</style>
