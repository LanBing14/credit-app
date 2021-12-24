<template>
    <view class="my">
        <image class="topBack" src="../../static/img/png_07.png"></image>
        <!--状态栏位置和顶部自定义导航-->
        <view class="statusBar" :style="{background:`rgba(17,48,144,${colorVal})`}"></view>
        <view class="infoNav" :style="{background:`rgba(17,48,144,${colorVal})`}">
            <view class="infoNavBtm" v-if="colorVal > 0.6">我的</view>
            <view class="infoNavFr" @click="logout()">
<!--                <image src="../../static/icon/65.png"></image>-->
                退出
            </view>
        </view>
        <!--状态栏占位和顶部自定义菜单占位-->
        <view style="height: 70rpx"></view>
        <view style="height: var(--status-bar-height)"></view>
        <!--主体内容-->
        <view class="myMain">
            <view class="myLogoName clear">
                <view class="myLogo">
                    <image :src="userInfo.picture ? website + userInfo.picture.path : '../../static/img/jpg08.jpg'" mode="aspectFill"></image>
                </view>
                <view class="myName">
                    <view class="nameTitle">
                        {{userInfo.username}}
                    </view>
                    <!--VIP会员-->
                    <view class="nameVip clear">
                        <!--<view class="vipFl">
                            <image src="../../static/icon/47.png"></image>
                            <text>V22</text>
                        </view>-->
                        <view class="vipFr" v-if="enterpriseList.length > 0">
                            到期时间：<text>{{enterpriseList[0].EXPIRE_DATE | dateFormat('yyyy-MM-dd')}}</text>
                        </view>
                    </view>
                    <view class="nameMain" v-if="enterpriseList.length > 0">
                        已入驻企业：
                        <text v-if="enterpriseList[0].COMPANY_NAME">
                            {{enterpriseList[0].COMPANY_NAME.length > 13 ? enterpriseList[0].COMPANY_NAME.substring(0,13) + '...' : enterpriseList[0].COMPANY_NAME}}
                        </text>
                    </view>
                    <!--普通会员-->
                    <!--<view class="ordinary">
                        普通会员
                    </view>-->
                    <view class="noData" v-if="enterpriseList.length == 0">
                        企业：
                        <strong>暂无企业信息</strong>
                        <navigator url="/pages/enterpSettle/index" class="goPerfect" hover-class="none">去完善</navigator>
                    </view>
                </view>
            </view>
            <view class="myData clear">
                <navigator :url="`/pages/my/list?title=我的监测`" hover-class="none" class="li">
                    <view class="h1">我的监测</view>
                    <view class="h2">{{superviseNum}}</view>
                </navigator>
                <navigator :url="`/pages/my/list?title=我的关注`" hover-class="none" class="li">
                    <view class="h1">我的关注</view>
                    <view class="h2">{{attentionNum}}</view>
                </navigator>
                <navigator :url="`/pages/my/list?title=我的企业`" hover-class="none" class="li">
                    <view class="h1">我的企业</view>
                    <view class="h2">{{enterpriseList.length}}</view>
                </navigator>
                <navigator url="/pages/message/index" open-type="switchTab" hover-class="none" class="li">
                    <view class="h1">消息通知</view>
                    <view class="h2">{{messageNum}}</view>
                </navigator>
                <view class="li">
                    <view class="h1">我的品牌</view>
                    <view class="h2">0</view>
                </view>
                <navigator url="/pages/creditGoods/index" hover-class="none" class="li">
                    <view class="h1">我的产品</view>
                    <view class="h2">{{sharpNum}}</view>
                </navigator>
            </view>
            <navigator url="/pages/enterpSettle/index" hover-class="none" class="myAdver" v-if="enterpriseList.length == 0">
                <image src="../../static/img/jpg06.jpg" mode="aspectFill"></image>
            </navigator>
            <view class="archives clear">
                <navigator :url="`/pages/my/list?title=我的企业`" hover-class="none" class="li">
                    <image src="../../static/icon/66.png"></image>
                    <text>信用档案</text>
                </navigator>
                <navigator url="/pages/my/myCreditCard" hover-class="none" class="li">
                    <image src="../../static/icon/67.png"></image>
                    <text>信用名片</text>
                </navigator>
                <navigator :url="`/pages/my/list?title=我的订单`" hover-class="none" class="li">
                    <image src="../../static/icon/68.png"></image>
                    <text>我的订单</text>
                </navigator>
                <navigator :url="`/pages/my/list?title=我的发布`" hover-class="none" class="li">
                    <image src="../../static/icon/69.png"></image>
                    <text>我的发布</text>
                </navigator>
            </view>
            <view class="server">
                <view class="charaServeTitle">
                    推荐服务
                </view>
                <view class="serverMain clear">
                    <navigator url="/pages/creditBrandPromotion/index" hover-class="hover" class="li">
                        <image src="../../static/icon/70.png"></image>
                        <text>品牌推广</text>
                    </navigator>
                    <navigator url="/pages/creditGoods/index" hover-class="hover" class="li">
                        <image src="../../static/icon/71.png"></image>
                        <text>产品优选</text>
                    </navigator>
                    <navigator url="/pages/creditReport/index" hover-class="hover" class="li">
                        <image src="../../static/icon/76.png"></image>
                        <text>信用报告</text>
                    </navigator>
                    <navigator url="/pages/creditInvestigation/index" hover-class="hover" class="li">
                        <image src="../../static/icon/72.png"></image>
                        <text>信用调研</text>
                    </navigator>
                </view>
            </view>
            <view class="server">
                <view class="charaServeTitle">
                    更多功能
                </view>
                <view class="serverMain clear">
                    <navigator url="/pages/creditPark/index" hover-class="hover" class="li">
                        <image src="../../static/icon/73.png"></image>
                        <text>信用园区</text>
                    </navigator>
                    <navigator url="/pages/creditRepair/index" hover-class="hover" class="li">
                        <image src="../../static/icon/77.png"></image>
                        <text>信用修复</text>
                    </navigator>
                    <navigator url="/pages/creditLive/index" hover-class="hover" class="li">
                        <image src="../../static/icon/80.png"></image>
                        <text>信锐直播</text>
                    </navigator>
                    <navigator url="/pages/allService/index" hover-class="hover" class="li">
                        <image src="../../static/icon/81.png"></image>
                        <text>全部</text>
                    </navigator>
                    <!--<view class="li">
                        <image src="../../static/icon/74.png"></image>
                        <text>入驻证书</text>
                    </view>
                    <view class="li">
                        <image src="../../static/icon/75.png"></image>
                        <text>信用承诺</text>
                    </view>
                    <view class="li">
                        <image src="../../static/icon/78.png"></image>
                        <text>员工名片</text>
                    </view>
                    <view class="li">
                        <image src="../../static/icon/79.png"></image>
                        <text>立信企业商机</text>
                    </view>-->
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {getAuthTourist} from "../../api/login";
    import request from "../../utils/request";
    import {dateFormat} from "@/utils/utils.js";
    import {getSharpListForIndex} from "../../api/creditLive";

    export default {
        components: {

        },
        filters: {
            dateFormat
        },
        data () {
            return {
                colorVal:0,
                userInfo:{},
                enterpriseList:[],
                superviseNum:0,
                attentionNum:0,
                messageNum:0,
                sharpNum:0
            }
        },
        onLoad() {
            this.getPerUser();
            this.getEnterpriseListOnlyCerti();
            this.getSuperviseList();
            this.getAttentionList();
            this.findPMessage();
            this.findPageBusiness();
        },
        onShow(){

        },
        methods: {
            logout(){//退出登录
                uni.showModal({
                    title:'',
                    content:'您是否要退出？',
                    success: function (res) {
                        if (res.confirm) {
                            uni.clearStorage();
                            uni.switchTab({
                                url:'/pages/index/index'
                            })
                            getAuthTourist().then(data => {
                                if (data.stateCode === '20112') {
                                    // 游客登录
                                    uni.setStorageSync('userType', '2');
                                    this.$isResolve();
                                } else {
                                    this.$isResolve();
                                }
                            })
                        } else if (res.cancel) {

                        }
                    }
                })
            },
            getPerUser(){//获取用户头像
                request('/user/center/xhsRest/getPerUser',{
                    method:'get',
                    data:{
                        userId:uni.getStorageSync('userInfo').userId
                    }
                }).then(res => {
                    console.log(res);
                    this.userInfo = res.data;
                })
            },
            getEnterpriseListOnlyCerti(){//获取已入驻企业列表
                request('/enterprise/detail/xhsRest/ComAuthori/getEnterpriseListOnlyCerti',{
                    method:'get',
                    data:{
                        pageNo: 1,
                        pageSize: 1000,
                        status:3
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '1'){
                        res.data.list.forEach(item =>{
                            if(item.EXPIRE_STATUS == '0'){
                                this.enterpriseList.push(item);
                                console.log(this.enterpriseList,'123456');
                            }
                        })

                    }
                })
            },
            getSuperviseList(){//我的监测数量
                request('/enterprise/detail/xhsRest/supervise/getSuperviseList',{
                    method:'get',
                    data:{
                        companyName:'',
                        pageNo:1,
                        pageSize:1000
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '1'){
                        this.superviseNum = res.data.list.length;
                    }
                })
            },
            getAttentionList(){//我的关注数量
                request('/enterprise/detail/xhsRest/atten/getAttentionList',{
                    method:'get',
                    data:{
                        companyName: '',
                        groupId: '',
                        pageNo: 1,
                        pageSize: 1000,
                        englishType:"0"
                    }
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '1'){
                        this.attentionNum = res.data.list.length;
                    }
                })
            },
            findPMessage(){//消息通知未读消息数量
                request('/user/center/myMessage/findPMessage',{
                    method:'post',
                    data:{
                        pageNo: 1,
                        pageSize: 10000
                    }
                }).then(res => {
                    if(res.stateCode == '70206'){
                        res.data.list.forEach(item => {
                            if(item.READ_STATUS == 0){
                                this.messageNum ++;
                            }
                        })
                    }
                })
            },
            findPageBusiness() {//我的产品数量
                getSharpListForIndex({
                    pageNo: 1,
                    pageSize: 10000,
                    name: '',
                    companyName: ''
                }).then(res => {
                    if (res.stateCode == '1') {
                        this.sharpNum = res.data.list.length;
                    }
                })
            },
        },
        onPageScroll(e){
            //滑动滚动条添加自定义导航背景色
            this.colorVal = (e.scrollTop * (100/70) / 100)
        },
    }
</script>

<style>
    page{
        background: #f4f4f6;
    }
    .topBack{
        width: 750rpx;
        height: 400rpx;
        position: absolute;
        top: 0;
        left: 0;
    }
    .statusBar{
        height: var(--status-bar-height);
        position: relative;
        z-index: 6;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }
    .infoNav{
        position: fixed;
        top: var(--status-bar-height);
        left: 0;
        width: 100%;
        height: 70rpx;
        line-height: 70rpx;
        transition: 0s;
        z-index: 6;
    }
    .infoNavBtm{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;
        font-size: 34rpx;
        color: #fff;
        text-align: center;
    }
    .infoNavFr{
        width: 70rpx;
        height: 70rpx;
        position: absolute;
        right: 15rpx;
        top: 0;
        z-index: 5;
        text-align: center;
        line-height: 70rpx;
        font-size: 28rpx;
        color: #fff;
    }
    .infoNavFr image{
        width: 42rpx;
        height: 40rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 2;
    }
    .myMain{
        padding: 10rpx 30rpx 45rpx 30rpx;
        position: relative;
        z-index: 2;
    }
    .myLogo{
        width: 130rpx;
        height: 130rpx;
        float: left;
        border-radius: 50%;
        position: relative;
        border: 2rpx solid #317cf8;
        background: #fff;
        box-shadow: 0 0 9rpx rgba(0,8,114,0.2);
        overflow: hidden;
        margin-left: 15rpx;
    }
    .myLogo image{
        width: 100%;
        height: 100%;
    }
    .myName{
        float: right;
        width: calc(100% - 185rpx);
    }
    .nameTitle{
        font-size: 32rpx;
        color: #fff;
    }
    .nameVip{
        margin-top: 20rpx;
    }
    .vipFl{
        float: left;
        width: 67rpx;
        height: 31rpx;
        position: relative;
    }
    .vipFl image{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .vipFl text{
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
    .vipFr{
        float: left;
        /*margin-left: 23rpx;*/
        font-size: 22rpx;
        color: #fff;
    }
    .vipFr text{
        font-weight: bold;
    }
    .nameMain{
        font-size: 24rpx;
        color: #fff;
        margin-top: 15rpx;
    }
    .nameMain text{
        font-weight: bold;
    }
    .myData{
        margin-top: 25rpx;
        background: #fff;
        padding: 35rpx 0;
        border-radius: 10rpx;
        box-shadow: 0 0 12rpx rgba(181,181,181,0.1);
    }
    .myData .li{
        width: 33.333%;
        text-align: center;
        border-right:1rpx solid #e5e5e5;
        float: left;
    }
    .myData .li:nth-child(3n){
        border-right: none;
    }
    .myData .li:nth-child(n+4){
        margin-top: 35rpx;
    }
    .myData .li .h1{
        font-size: 24rpx;
        color: #999;
    }
    .myData .li .h2{
        font-size: 28rpx;
        color: #222;
        margin-top: 15rpx;
    }
    .archives{
        margin-top: 24rpx;
        padding: 30rpx 0;
        background: #fff;
        border-radius: 10rpx;
    }
    .archives .li{
        width: 25%;
        text-align: center;
        float: left;
    }
    .archives .li image{
        width: 60rpx;
        height: 60rpx;
    }
    .archives .li text{
        display: block;
        font-size: 24rpx;
        color: #555;
        margin-top: 10rpx;
    }
    .server{
        margin-top: 24rpx;
        background: #fff;
        border-radius: 10rpx;
        padding-top: 30rpx;
    }
    .charaServeTitle{
        font-size: 30rpx;
        color: #373737;
        position: relative;
        padding-left: 20rpx;
        margin: 0 30rpx;
    }
    .charaServeTitle:after{
        content: '';
        display: block;
        width: 6rpx;
        height: 20rpx;
        background: #113090;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .serverMain{
        padding-bottom: 30rpx;
    }
    .serverMain .li{
        width: 25%;
        text-align: center;
        float: left;
        margin-top: 30rpx;
    }
    .serverMain .li image{
        width: 60rpx;
        height: 60rpx;
    }
    .serverMain .li text{
        display: block;
        font-size: 24rpx;
        color: #555;
        margin-top: 10rpx;
    }
    .myAdver{
        margin-top: 24rpx;
        height: 100rpx;
        border-radius: 10rpx;
        overflow: hidden;
    }
    .myAdver image{
        width: 100%;
        height: 100%;
    }
    .ordinary{
        height: 30rpx;
        line-height: 30rpx;
        padding: 0 20rpx;
        background: #7eaefd;
        font-size: 20rpx;
        color: #fff;
        border-radius: 5rpx;
        display: inline-block;
    }
    .noData{
        margin-top: 15rpx;
        font-size: 24rpx;
        color: #fff;
    }
    .noData .goPerfect{
        display: inline-block;
        border-radius: 5rpx;
        border:1rpx solid #fff;
        padding: 3rpx 20rpx;
        font-size: 20rpx;
        color: #fff;
        margin-left: 15rpx;
    }
</style>
