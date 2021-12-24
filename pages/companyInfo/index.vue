<template>
    <view>
        <!--背景图-->
        <image class="InfoBck" v-if="companyInfo.isHasCertific == '3'" src="../../static/img/jpg02.jpg" mode="widthFix"></image>
        <image class="InfoBck" v-else src="../../static/img/jpg01.jpg" mode="widthFix"></image>
        <view class="backTop"></view>
        <!--状态栏位置和顶部自定义导航-->
        <view class="statusBar" :style="{background:`rgba(17,48,144,${colorVal})`}"></view>
        <view class="infoNav" :style="{background:`rgba(17,48,144,${colorVal})`}">
            <view class="infoNavFl" @click="back()">
                <image src="../../static/icon/21.png"></image>
            </view>
            <view class="infoNavBtm">企业信息</view>
        </view>
        <!--状态栏占位和顶部自定义菜单占位-->
        <view style="height: 70rpx"></view>
        <view style="height: var(--status-bar-height)"></view>
        <!--主体内容-->
        <view class="infoMain">
            <view class="infoName clear">
                <view class="infoLogo">
<!--                    <image src="https://www.credit100.com/xinhuashe/waframework/upload/temp/981a433f-8d2f-4c05-a516-01c1567a2473.png" mode="widthFix"></image>-->
                    <image v-if="companyInfo.imgUrl != null && companyInfo.imgUrl != '' && companyInfo.isHasCertific== '3'" :src="website + companyInfo.imgUrl" mode="widthFix"></image>
                    <image v-if="(companyInfo.imgUrl == null || companyInfo.imgUrl == '') && companyInfo.isHasCertific== '3'" src="../../static/icon/82h2.png" mode="widthFix"></image>
                    <image v-if="companyInfo.isHasCertific != '3'" src="../../static/icon/82.png" mode="widthFix"></image>
                </view>
                <view class="infoNameMain">
                    <view class="h1 clear">
                        <view class="hiTitle" v-if="companyInfo.name">
                            {{companyInfo.name.length > 16 ? companyInfo.name.substring(0,16) + '...' : companyInfo.name}}
                        </view>
                        <!--<view class="grade">
                            <image src="../../static/icon/47.png"></image>
                            <text>V22</text>
                        </view>-->
                    </view>
                    <view class="infoNameTag">
                        <text>{{companyInfo.status}}</text>
                    </view>
                </view>
                <view v-if="companyInfo.isHasCertific == '3'" url="/pages/enterpSettle/index" class="settled" hover-class="none">
                    已入驻
                </view>
                <navigator v-else :url="`/pages/enterpSettle/index?companyId=${companyId}`" class="settled" hover-class="none">
                    我要入驻
                </navigator>
            </view>
            <view class="infoIntro">
                <image class="infoIntroBackOne" src="../../static/img/png_02.png"></image>
                <image class="infoIntroBackTwo" src="../../static/img/png_02.png"></image>
                <view class="introMain clear">
                    <view class="li">
                        <view class="h1">
                            {{companyInfo.operName ? companyInfo.operName : '-'}}
                        </view>
                        <view class="h2">法定代表人</view>
                    </view>
                    <view class="li">
                        <view class="h1">
                            {{companyInfo.registCapi ? companyInfo.registCapi : '-'}}
                        </view>
                        <view class="h2">注册资本</view>
                    </view>
                    <view class="li">
                        <view class="h1">
                            {{companyInfo.startDate ? companyInfo.startDate.substring(0,10) : '-'}}
                        </view>
                        <view class="h2">成立时间</view>
                    </view>
                </view>
            </view>
            <view class="infoContact">
                <view class="contactTop clear">
                    <view class="li">
                        <image src="../../static/icon/22.png"></image>
                        {{companyInfo.xhCode ? companyInfo.xhCode : '-'}}
                    </view>
                    <view class="li">
                        <image src="../../static/icon/23.png"></image>
                        <text v-if="companyInfo.website">
                            {{companyInfo.website.length > 16 ? companyInfo.website.substring(0,16) + '...' : companyInfo.website}}
                        </text>
                        <text v-else>
                            -
                        </text>
                    </view>
                    <view class="li">
                        <image src="../../static/icon/24.png"></image>
                        <text v-if="companyInfo.email">
                            {{companyInfo.email.length > 16 ? companyInfo.email.substring(0,16) + '...' : companyInfo.email}}
                        </text>
                        <text v-else>-</text>
                    </view>
                </view>
                <view class="contactBtm clear" v-if="isCertEnter">
                    <view class="li">
                        <image src="../../static/icon/02.png"></image>
                        <text>品牌名片</text>
                    </view>
                    <view class="li">
                        <image src="../../static/icon/03.png"></image>
                        <text>信用优选</text>
                    </view>
                    <view class="li">
                        <image src="../../static/icon/04.png"></image>
                        <text>信用报告</text>
                    </view>
                    <view class="li">
                        <image src="../../static/icon/06.png"></image>
                        <text>全部</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="infoMain infoBack">
            <view class="infoIcon clear">
                <navigator :url="`/pages/companyDetail/index?companyName=${companyName}&companyId=${companyId}`" hover-class="none" class="li">
                    <image src="../../static/icon/25.png"></image>
                    <text>基本信息</text>
                </navigator>
                <view class="li" @click="certiShare()">
                    <image src="../../static/icon/26.png"></image>
                    <text>入驻分享</text>
                </view>
                <view @click="creditCard()" class="li">
                    <image src="../../static/icon/27.png"></image>
                    <text>企业信用名片</text>
                </view>
                <navigator :url="`/pages/companyRoad/index?companyId=${companyId}`" hover-class="none" class="li">
                    <image src="../../static/icon/28.png"></image>
                    <text>信用路演</text>
                </navigator>
                <navigator :url="`/pages/companyArchList/index?type=1&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/29.png"></image>
                    <text>股权类信息</text>
                </navigator>
                <navigator :url="`/pages/companyArchList/index?type=2&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/30.png"></image>
                    <text>历史沿革</text>
                </navigator>
                <navigator :url="`/pages/companyArchList/index?type=3&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/31.png"></image>
                    <text>知识产权信息</text>
                </navigator>
                <navigator :url="`/pages/companyArchDetail/index?type=4&title=商标信息&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/32.png"></image>
                    <text>商标信息</text>
                </navigator>
                <view class="li" @click="showDeveloping()">
                    <image src="../../static/icon/33.png"></image>
                    <text>董监高对外<br>任职信息</text>
                </view>
                <navigator :url="`/pages/companyArchList/index?type=13&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/34.png"></image>
                    <text>经营状况</text>
                </navigator>
                <navigator :url="`/pages/companyArchDetail/index?type=6&title=动产抵押&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/35.png"></image>
                    <text>动产抵押</text>
                </navigator>
                <navigator :url="`/pages/companyArchDetail/index?type=7&title=股权出质&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/36.png"></image>
                    <text>股权出质</text>
                </navigator>
                <navigator :url="`/pages/companyArchDetail/index?type=9&title=清算信息&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/37.png"></image>
                    <text>清算信息</text>
                </navigator>
                <navigator :url="`/pages/companyArchDetail/index?type=10&title=工商异常名录&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/38.png"></image>
                    <text>工商异常名录</text>
                </navigator>
                <navigator :url="`/pages/companyArchDetail/index?type=14&title=抽查信息&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/39.png"></image>
                    <text>抽查信息</text>
                </navigator>
                <navigator :url="`/pages/companyArchDetail/index?type=15&title=行政处罚信息&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/40.png"></image>
                    <text>行政处罚信息</text>
                </navigator>
                <navigator :url="`/pages/companyArchList/index?type=11&companyId=${companyId}&companyName=${companyName}`" hover-class="none" class="li">
                    <image src="../../static/icon/41.png"></image>
                    <text>司法信息</text>
                </navigator>
                <navigator :url="`/pages/companyEmpScore/index`" hover-class="none" class="li">
                    <image src="../../static/icon/42.png"></image>
                    <text>用工评分</text>
                </navigator>
                <view class="li" @click="riskWarn()">
                    <image src="../../static/icon/43.png"></image>
                    <text>风险提示</text>
                </view>
                <view class="li" v-if="cochainStatus == '0'">
                    <image src="../../static/icon/44.png"></image>
                    <text>新华信用链</text>
                </view>
            </view>
        </view>
        <!--底部分享栏占位-->
        <view style="height: 108rpx;padding-bottom: constant(safe-area-inset-bottom);padding-bottom: env(safe-area-inset-bottom);box-sizing: content-box"></view>
        <!--底部分享栏-->
        <view class="infoShare clear">
            <view class="shareFl clear">
                <view class="li">
                    <image src="../../static/icon/46h.png" v-if="isSupervise == '0'" @click="cancelSupervise()"></image>
                    <image src="../../static/icon/46.png" v-else @click="gotoSupervise()"></image>
                </view>
                <!--<view class="li">
                    <image src="../../static/icon/45h.png"></image>
                    <image src="../../static/icon/45.png"></image>
                </view>-->
            </view>
            <view class="shareFr">
                分享企业信用
            </view>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import {arrIsNull} from "../../utils/utils";
    import {getIsLogin} from "../../api/login";

    export default {
        components: {
        },
        data () {
            return {
                colorVal:0,
                companyName:'',
                companyId:'',
                companyInfo:{},
                cochainStatus:'',
                showMain:false,
                isCertEnter:false,
                userType:'',
                canMonitor:Boolean,
                isSupervise:''
            }
        },
        onLoad(options) {
            this.companyName = options.companyName;
            this.companyId = options.companyId;
            uni.showLoading({
                title:'加载中...'
            });
            this.getCompanyInfo();
            this.isChain();
            this.getCertEnterByUId();
            this.isLogin();
            this.hasSupervisePm();
            this.hasSupervise();
        },
        onShow(){

        },
        methods: {
            back(){
                uni.navigateBack()
            },
            getCompanyInfo(){//企业基本信息
                console.log(this.companyName,this.companyId);
                request('/enterprise/detail/xhsRest/baseMsg/getCompanyInfo',{
                    method:'post',
                    data:{
                        companyId: this.companyId
                    }
                },true).then(data => {
                    console.log(data);
                    if(data.stateCode == '60111'){
                        if(!arrIsNull(data.data.returnData)){
                            let info = data.data.returnData[0];
                            request('/user/center/xhsRest/certifi/isHasCertific',{//是否入驻
                                method:'get',
                                data:{
                                    companyId:this.companyId
                                }
                            }).then(res => {
                                console.log(res);
                                info.isHasCertific = res.data;

                                request('/user/center/myMessage/getXhCodeByCompanyId',{//新华信用码
                                    method:'get',
                                    data:{
                                        companyId: this.companyId
                                    }
                                }).then(res => {
                                    console.log(res)
                                    if(res.data){
                                        info.xhCode = res.data.xhCode;
                                        this.companyInfo = info;
                                        console.log(this.companyInfo);
                                        this.showMain = true;
                                        uni.hideLoading();
                                    } else{
                                        console.log(info);
                                        this.companyInfo = info;
                                        console.log(this.companyInfo);
                                        this.showMain = true;
                                        uni.hideLoading();
                                    }
                                })
                            })
                        }
                    } else{

                    }
                })
            },
            isChain(){ //判断是否上链
                request('/enterprise/detail/card/getEnterpriseCard',{
                    method:'get',
                    data:{
                        type: '1',
                        companyId: this.companyId
                    }
                }).then(res => {
                    if (res.stateCode === '40301') {
                        this.cochainStatus = res.data.cochainStatus;
                    }
                })
            },
            getCertEnterByUId(){//判断当前用户是否存在该companyId企业
                request('/enterprise/detail/xhsRest/ComAuthori/getCertEnterByUId',{
                    method:'get',
                    data:{
                        companyId:this.companyId
                    }
                }).then(res => {
                    console.log(res);

                    if(res.stateCode == '1'){
                        this.isCertEnter = true;
                    } else{
                        this.isCertEnter = false;
                    }
                })
            },
            certiShare(){//入驻分享跳转时判断
                console.log(this.companyInfo.isHasCertific);
                if(this.companyInfo.isHasCertific != '3'){
                    uni.showModal({
                        title: '',
                        content: '企业尚未入驻！',
                        showCancel:false
                    });
                } else{
                    uni.navigateTo({
                        url:`../companyCertiShare/index?companyId=${this.companyId}&companyName=${this.companyName}`
                    })
                    console.log('我已入驻');
                }
            },
            creditCard(){//企业名片跳转时判断
                if(this.companyInfo.isHasCertific != '3'){
                    uni.showModal({
                        title: '',
                        content: '企业尚未入驻！',
                        showCancel:false
                    });
                } else{
                    uni.navigateTo({
                        url:`../creditCardDetail/index?companyId=${this.companyId}&companyName=${this.companyName}`
                    })
                    console.log('我已入驻');
                }
            },
            showDeveloping(){
                uni.showToast({
                    title: '敬请期待...',
                    duration: 2000,
                    icon: 'none'
                });
            },
            isLogin(){//判断是否登录
                getIsLogin().then(data => {
                    if (data.stateCode === '20111') {
                        this.userType = data.data.userType;
                    }
                })
            },
            riskWarn(){//登录后跳转风险提示页面，未登录跳转登录页面
                if(this.userType == 'person'){
                    uni.navigateTo({
                        url:`../companyRiskWarnList/?companyId=${this.companyId}&companyName=${this.companyName}`
                    })
                } else {
                    uni.navigateTo({
                        url:'../login/index'
                    })
                }
            },
            hasSupervisePm(){//查看当前用户是否有监测权限
                request('/user/center/xhsRest/hasPermission',{
                    method:'get',
                    data:{
                        permissionId: "company:checkMonitor"
                    }
                }).then(data => {
                    if (data.data > 0) {
                        this.canMonitor = true;
                    } else{
                        // 判断是否被授权和授权者是否有监测权限
                        request('/user/center/xhsRest/authorizationHasPermission',{
                            method:'get',
                            data:{
                                permissionId: "company:checkMonitor"
                            }
                        }).then(result => {
                            if (result.data > 0) {
                                this.canMonitor = true;
                            } else {
                                this.canMonitor = false;
                            }
                        })
                    }
                })
            },
            gotoSupervise(){//添加监测
                if(this.userType == 'person'){
                    if(this.canMonitor){
                        request('/enterprise/detail/xhsRest/supervise/addSuperviseOneByOne',{
                            method:'get',
                            data:{
                                companyIds:this.companyId
                            }
                        }).then(res => {
                            if(res.stateCode == '1'){
                                if(res.data=='overPermission'){
                                    uni.showModal({
                                        title: '',
                                        content: '您的监测数量已达上限，请联系客服进行数量升级！',
                                        showCancel:false
                                    });
                                } else{
                                    uni.showToast({
                                        title: '监测成功',
                                        duration: 2000
                                    });
                                    this.isSupervise = '0';
                                }
                            }
                        })
                    }
                } else{
                    uni.navigateTo({
                        url:'../login/index'
                    })
                }
            },
            hasSupervise(){//是否监测
                request('/enterprise/detail/xhsRest/supervise/hasSupervise',{
                    method:'get',
                    data:{
                        companyId: this.companyId
                    }
                }).then(data => {
                    this.isSupervise = data.data;
                })
            },
            cancelSupervise(){//取消监测
                uni.showModal({
                    title: '',
                    content: '确认取消监测？',
                    success:(data) => {
                        if (data.confirm) {
                            request('/enterprise/detail/xhsRest/supervise/unSuperviseCompany',{
                                method:'get',
                                data:{
                                    companyId: this.companyId
                                }
                            }).then(res => {
                                this.isSupervise = '-1';
                                uni.showToast({
                                    title: '已移出监测列表',
                                    duration: 2000
                                });
                            })
                        }
                    }
                });
            }
        },
        onPageScroll(e){
            //滑动滚动条添加自定义导航背景色
            this.colorVal = (e.scrollTop * (100/70) / 100)
        },
    }
</script>

<style>
    .statusBar{
        height: var(--status-bar-height);
        position: relative;
        z-index: 6;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }
    .backTop{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: #f6f6f6;
    }
    .InfoBck{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
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
    .infoNavFl{
        width: 70rpx;
        height: 70rpx;
        position: absolute;
        left: 15rpx;
        top: 0;
        z-index: 5;
    }
    .infoNavFl image{
        width: 18rpx;
        height: 33rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 2;
    }
    .infoMain{
        padding:0 29rpx 0 29rpx;
        position: relative;
        z-index: 1;
    }
    .infoName{
        padding-top: 35rpx;
        position: relative;
    }
    .infoName .infoLogo{
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        border:4rpx solid #3278f1;
        background: #fff;
        position: relative;
        box-shadow: 0 0 9rpx rgba(0,8,114,0.2);
        float: left;
        margin-left: 8rpx;
        overflow: hidden;
    }
    .infoName .infoLogo image{
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .infoNameMain{
        width: calc(100% - 120rpx);
        float: right;
    }
    .infoNameMain .h1 .hiTitle{
        font-size: 28rpx;
        color: #fff;
        font-weight: bold;
        float: left;
    }
    .infoNameMain .h1 .grade{
        width: 67rpx;
        height: 31rpx;
        position: relative;
        margin-left: 20rpx;
        float: left;
        top: 2rpx;
    }
    .infoNameMain .h1 .grade image{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .infoNameMain .h1 .grade text{
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
    .infoNameTag text{
        display: inline-block;
        height: 29rpx;
        border-radius: 29rpx;
        padding:0 12rpx;
        background: #1f56c3;
        font-size: 16rpx;
        color: #fff;
        line-height: 29rpx;
        margin-right: 10rpx;
        margin-top: 15rpx;
    }
    .settled{
        position: absolute;
        top: 7rpx;
        right: -29rpx;
        padding:0 22rpx;
        height: 45rpx;
        line-height: 45rpx;
        border-top-left-radius: 45rpx;
        border-bottom-left-radius: 45rpx;
        background: #1f56c3;
        font-size: 24rpx;
        color: #fff;
    }
    .infoIntro{
        padding:20rpx 0;
        background: #fff;
        border-radius: 10rpx;
        overflow: hidden;
        position: relative;
        margin-top: 45rpx;
        box-shadow: 0 0 12rpx rgba(181,181,181,0.1);
    }
    .infoIntroBackOne{
        width: 425rpx;
        height: 425rpx;
        position: absolute;
        top: -341rpx;
        left: -225rpx;
        z-index: 3;
    }
    .infoIntroBackTwo{
        width: 425rpx;
        height: 425rpx;
        position: absolute;
        top: -59rpx;
        right: -258rpx;
        z-index: 3;
    }
    .introMain{
        position: relative;
        z-index: 3;
    }
    .introMain .li{
        width: 33.33%;
        border-right: 1rpx solid #eaeaea;
        text-align: center;
        float: left;
    }
    .introMain .li:last-child{
        border-right: none;
    }
    .introMain .li .h1{
        font-size: 30rpx;
        color: #113090;
        /*height: 30rpx;*/
        line-height: 30rpx;
    }
    .introMain .li .h2{
        font-size: 24rpx;
        color: #666;
        margin-top: 15rpx;
    }
    .infoContact{
        background: #fff;
        border-radius: 10rpx;
        box-shadow: 0 0 12rpx rgba(181,181,181,0.1);
        padding:23rpx 0;
        margin: 21rpx 0;
    }
    .contactTop .li{
        float: left;
        font-size: 18rpx;
        color: #666;
        line-height: 20rpx;
        padding: 7rpx 0;
        width: 33.33%;
        text-align: center;
        border-right: 1rpx solid #eaeaea;
    }
    .contactTop .li:last-child{
        border-right: none;
    }
    .contactTop .li image{
        width: 20rpx;
        height: 20rpx;
        margin-right: 10rpx;
        vertical-align: top;
        position: relative;
        top: 1rpx;
    }
    .contactBtm{
        margin: 25rpx 18rpx 0 18rpx;
        padding-top:25rpx;
        border-top: 1rpx solid #eaeaea;
    }
    .contactBtm .li{
        float: left;
        width: 25%;
        text-align: center;
    }
    .contactBtm .li image{
        width: 60rpx;
        height: 60rpx;
    }
    .contactBtm .li text{
        display: block;
        margin-top: 15rpx;
        font-size: 24rpx;
        color: #555;
    }
    .infoBack{
        background: #fff;
    }
    .infoIcon{
        padding-bottom: 50rpx;
    }
    .infoIcon .li{
        width: 25%;
        float: left;
        text-align: center;
        margin-top: 50rpx;
    }
    .infoIcon .li image{
        width: 60rpx;
        height: 60rpx;
    }
    .infoIcon .li text{
        font-size: 24rpx;
        line-height: 30rpx;
        color: #444;
        height: 30rpx;
        display: block;
        margin-top: 10rpx;
    }
    .infoShare{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 108rpx;
        background: #4159a6;
        /*line-height: 108rpx;*/
        z-index: 5;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        box-sizing: content-box;
    }
    .infoShare .shareFl{
        float: left;
        margin-left: 54rpx;
    }
    .shareFl .li{
        width: 41rpx;
        height: 41rpx;
        float: left;
        margin-right: 55rpx;
        margin-top: 30rpx;
    }
    .shareFl .li image{
        width: 100%;
        height: 100%;
    }
    .shareFr{
        float: right;
        width: 186rpx;
        height: 60rpx;
        border-radius: 10rpx;
        background: #fff;
        text-align: center;
        line-height: 60rpx;
        font-size: 26rpx;
        color: #113090;
        margin-right: 40rpx;
        margin-top: 24rpx;
    }
</style>
