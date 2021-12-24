<template>
    <view style="padding-bottom: constant(safe-area-inset-bottom);padding-bottom: env(safe-area-inset-bottom); ">
        <scroll-view scroll-x="true" show-scrollbar="false" class="searchNav">
            <view class="li" :class="{active:navIndex == 1}" @click="searchNav(1)">企业名称</view>
            <view class="li" :class="{active:navIndex == 2}" @click="searchNav(2)">法定代表人</view>
            <view class="li" :class="{active:navIndex == 6}" @click="searchNav(6)">股东高管</view>
            <view class="li" :class="{active:navIndex == 3}" @click="searchNav(3)">注册地址</view>
            <view class="li" :class="{active:navIndex == 4}" @click="searchNav(4)">品牌产品</view>
            <view class="li" :class="{active:navIndex == 5}" @click="searchNav(5)">经营范围</view>
            <navigator :url="`/pages/redBlackList/index`" hover-class="none" class="li">红黑名单</navigator>
        </scroll-view>
        <view class="searchMain" v-if="isHotHistory">
            <view style="height: 73rpx;"></view>
            <view class="hotSearch">
                <view class="hotTitle">
                    <image src="../../static/icon/18.png"></image>
                    热门搜索
                </view>
                <view class="hotMain clear">
                    <view class="li" v-for="(item,index) in recommComList" :key="index" @click="hotHistory(item.COMPANY_NAME)">
<!--                        <navigator url="/pages/companyInfo/index">测试点击</navigator>-->
                        <text>{{index + 1}}</text>
                        {{item.COMPANY_NAME.length > 12 ? item.COMPANY_NAME.substring(0,12) + '...' : item.COMPANY_NAME}}
                    </view>
                </view>
            </view>
            <view class="history">
                <view class="hotTitle">
                    <image src="../../static/icon/19.png"></image>
                    浏览历史
                </view>
                <view class="historyMain" v-if="historyList.length > 0">
                    <view class="li" v-for="(item,index) in historyList" :key="index" @click="hotHistory(item.SEARCH_CONTENT)">
                        <text>{{index+1}}</text>
                        {{item.SEARCH_CONTENT.length > 25 ? item.SEARCH_CONTENT.substring(0,25) : item.SEARCH_CONTENT}}
                    </view>
                </view>
                <view class="historyNoData" v-else>
                    暂无历史数据
                </view>
            </view>
        </view>
        <view v-if="!isHotHistory">
            <view class="selectNav"></view>
            <HM-filterDropdown @confirm="confirm" :filterData="filterData" :menuTop="'71'" :defaultSelected="defaultSelected"></HM-filterDropdown>

            <view class="infoTips" v-if="moreThan">新华信用为您找到 <text style="color: #113090;">{{showTotals}}</text> 家符合条件的企业<text
                    v-if="!showPrompt">，为您展示前<text style="color: #113090;">{{showNum}}</text>家企业</text></view>
            <view class="infoTips" v-if="!moreThan">新华信用为您找到 <text style="color: #113090;">1000+</text> 家符合条件的企业<text
                    v-if="!showPrompt">，为您展示前<text style="color: #113090;">{{showNum}}</text>家企业</text></view>

            <view class="enterpList">
                <navigator :url="`/pages/companyInfo/index?companyName=${item.companyName}&companyId=${item.keyNo}`" hover-class="none" class="li clear" v-for="(item,index) in companyList" :key="index">
                    <view class="liTop clear">
                        <view class="liLogo">
                            <image v-if="item.tmImageUrl != null && item.tmImageUrl != '' && item.isHasCertific== '3'" :src="website + item.tmImageUrl" mode="widthFix"></image>
                            <image v-if="(item.tmImageUrl == null || item.tmImageUrl == '') && item.isHasCertific== '3'" src="../../static/icon/82h2.png" mode="widthFix"></image>
                            <image v-if="item.isHasCertific != '3'" src="../../static/icon/82.png" mode="widthFix"></image>
                        </view>
                        <view class="liTitleTag">
                            <view class="liTitle">
                                <rich-text :nodes="item.name"></rich-text>
                                <image v-if="item.isHasCertific == '3'" src="../../static/icon/20.png"></image>
                            </view>
                            <view class="liTag">
                                <text>{{item.status ? item.status : '-'}}</text>
                            </view>
                        </view>
                    </view>
                    <view class="liBtm clear">
                        <view class="liTd">
                            <view class="h1">法定代表人</view>
                            <view class="h2">
                                <rich-text :nodes="item.operName"></rich-text>
                            </view>
                        </view>
                        <view class="liTd">
                            <view class="h1">注册资本</view>
                            <view class="h2">
                                {{item.registCapi ? item.registCapi : '-'}}
                            </view>
                        </view>
                        <view class="liTd">
                            <view class="h1">成立时间</view>
                            <view class="h2" v-if="item.startDate">
                                {{item.startDate ? item.startDate.substring(0,10) : '-'}}
                            </view>
                        </view>
                    </view>
                </navigator>
                <uni-load-more status="loading" v-if="loading"></uni-load-more>
                <uni-load-more status="noMore" v-if="noMore"></uni-load-more>
                <noData style="margin-top: 80rpx;" info="暂无数据" v-if="noData"></noData>

            </view>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import {getIsLogin} from "../../api/login";
    import noData from "../../components/noData";
    import {html2Text} from "../../utils/utils"

    export default {
        components: {
            noData
        },
        data () {
            return {
                navIndex:1,
                isHotHistory:true,
                defaultSelected:[],
                redBlackSelected:[],
                filterData: [],
                recommComList:Array,
                historyList:Array,
                companyList:[],
                showTotals:0,
                moreThan:true,
                // 用户根据用户权益，能获取的搜索企业数量；游客默认200家
                showNum:200,
                showPrompt:true,
                keyword:String,
                pageNo:1,
                totalPages:0,
                noMore:false,
                loading:false,
                noData:false
            }
        },
        onLoad() {
            this.filterData = [
                {
                    "name":'全部领域',
                    "type": 'hierarchy-column',
                    "submenu": [
                        {
                            "name": '全部区域',
                            "value": "全部区域"
                        },
                        {
                            "name": '北京市',
                            "value": "北京市",
                            "submenu": [
                                {"name": '通州区',"value": "通州区"},
                                {"name": '朝阳区',"value": "朝阳区"}
                            ]
                        },
                        {
                            "name": '河南省',
                            "value": "河南省",
                            "submenu": [
                                {
                                    "name": '郑州市',
                                    "value": "郑州市",
                                    "submenu": [
                                        {"name": '惠济区',"value": "惠济区"},
                                        {"name": '金水区',"value": "金水区"}
                                    ]
                                },
                                {
                                    "name": '洛阳市',
                                    "value": "洛阳市",
                                    "submenu": [
                                        {"name": '涧西区',"value": "涧西区"}
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    "name":'全部行业',
                    "type": 'hierarchy-column',
                    "submenu": [
                        {
                            "name": '全部行业',
                            "value": "全部行业"
                        },
                        {
                            "name": '农、林、牧、浴业',
                            "value": "农、林、牧、浴业",
                            "submenu": [
                                {"name":"农业","value":"农业"},
                                {"name":"林业","value":"林业"},
                                {"name":"牧业","value":"牧业"},
                                {"name":"浴业","value":"浴业"}
                            ]
                        }
                    ]
                },
                {
                    "name":'更多筛选',
                    "type": "filter",
                    "submenu":[
                        {
                            "name": "搜索范围",
                            "submenu": [
                                {"name": "企业名/注册号","value": "企业名/注册号"},
                                {"name": "法定代表人","value": "法定代表人"},
                                {"name": "股东","value": "股东"},
                                {"name": "高管","value": "高管"},
                                {"name": "品牌项目","value": "品牌项目"},
                                {"name": "联系地址","value": "联系地址"},
                                {"name": "经营范围","value": "经营范围"},
                            ]
                        },
                        {
                            "name": "成立年限",
                            "submenu": [
                                {"name": "一年内","value": "一年内"},
                                {"name": "1-2年","value": "1-2年"},
                                {"name": "2-3年","value": "2-3年"},
                                {"name": "3-5年","value": "3-5年"},
                                {"name": "5-10年","value": "5-10年"},
                                {"name": "10年以上","value": "10年以上"},
                            ]
                        },
                        {
                            "name": "注册资本",
                            "submenu": [
                                {"name": "10万以内","value": "10万以内"},
                                {"name": "10-50万","value": "10-50万"},
                                {"name": "50-100万","value": "50-100万"},
                                {"name": "100-200万","value": "100-200万"},
                                {"name": "200-500万","value": "200-500万"},
                                {"name": "500-1000万","value": "500-1000万"},
                                {"name": "1000-5000万","value": "1000-5000万"},
                                {"name": "5000万以上","value": "5000万以上"},
                            ]
                        },
                        {
                            "name": "注册资本",
                            "submenu": [
                                {"name": "人民币","value": "人民币"},
                                {"name": "美元","value": "美元"},
                                {"name": "其他","value": "其他"}
                            ]
                        }
                    ]
                }
            ]
            this.getRecommendCompany();
            this.getSearchHistory();
            this.findTypeOperationCount();
        },
        onShow(){

        },
        methods: {
            //筛选条件选择完成触发
            confirm(e){
                // console.log(e);
            },
            getRecommendCompany(){//热门搜索
                request('/user/center/xhsRest/recommend/getRecommendCompany',{
                    method:'get',
                    data:{
                        pageNo: 1,
                        pageSize: 10,
                    },
                    type:1
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == 1){
                        this.recommComList = res.data.list;
                    } else{
                        this.recommComList = [];
                    }
                })
            },
            getSearchHistory(){//浏览历史
                request('/enterprise/detail/xhsRest/search/getSearchHistory',{
                    method:'get'
                }).then(res => {
                    console.log(res);
                    if (res.stateCode == "50301"){
                        this.historyList = res.data;
                    } else{
                        this.historyList = [];
                    }
                })
            },
            companySearchByPage(name,type){//高级搜索
                request('/enterprise/detail/xhsRest/search/companySearchByPage',{
                    method:'post',
                    data:{
                        pageSize: 10,
                        pageNo: this.pageNo,
                        queryValue: name,
                        queryType: type,
                        highLight: '1',
                        isFromSearch : '1',
                    }
                },true).then(result => {
                    console.log(result);

                    if (result.stateCode == '50001'){
                        this.showTotals = result.data.totalCount || 0;

                        //判断查询结果是否超过1000+
                        this.moreThan = this.showTotals <= 1000;

                        // 判断总数是否超过权益里面的数量
                        if (result.data.totalCount > this.showNum) {
                            //是否隐藏 - 否
                            this.showPrompt = false;
                        } else {
                            //是否隐藏 - 是
                            this.showPrompt = true;
                        }

                        let arrList = [];
                        arrList = result.data.returnData;
                        this.totalPages = result.data.totalPages;
                        arrList.forEach((item,index) => {
                            arrList[index].companyName = html2Text(item.name);
                            request('/user/center/xhsRest/certifi/isHasCertific',{//是否入驻
                                method:'get',
                                data:{
                                    companyId:item.keyNo
                                }
                            }).then(data => {
                                arrList[index].isHasCertific = data.data;
                                if((index + 1) == arrList.length){
                                    this.companyList = this.companyList.concat(arrList);
                                    uni.hideLoading();
                                    this.loading = false;
                                    if(this.companyList.length < 10){
                                        this.noMore = true;
                                    } else{
                                        this.noMore = false;
                                    }
                                    console.log(this.companyList);

                                }
                            })

                        })
                    } else if(result.stateCode == '50103'){
                        uni.hideLoading();
                        uni.showModal({
                            title: '',
                            content: '请输入更详细的关键词！',
                            showCancel:false
                        });
                        this.companyList = [];
                        this.noData = true;
                    } else if(result.code && result.code == '40303'){
                        uni.hideLoading();
                        uni.showModal({
                            title: '',
                            content: '游客状态只能搜索3次，请登录后继续！',
                            showCancel:false
                        })
                        this.companyList = [];
                        this.noData = true;
                    } else{
                        uni.hideLoading();
                        this.showTotals = 0;
                        this.moreThan = true;
                        this.showPrompt = true;
                        this.companyList = [];
                        this.noData = true;
                    }
                })
            },
            findTypeOperationCount(){// 获取权益数据 展示搜索企业数量
                getIsLogin().then(res=>{
                    console.log(res);
                    if(res.stateCode == '20111'){
                        if(res.data.userType == 'person'){
                            request('/user/center/xhsRest/findTypeOperationCount',{
                                method:'get',
                                data:{
                                    customerPermissionId: "company:showNumber"
                                }
                            }).then(data => {
                                this.showNum = data.data;
                            })
                        }
                    }
                })
            },
            searchNav(type){//Tab切换筛选企业
                uni.showLoading({
                    title:'加载中...'
                })
                this.navIndex = type;
                this.companyList = [];
                this.noData = false;
                this.pageNo = 1;
                this.companySearchByPage(this.keyword,this.navIndex);
            },
            hotHistory(name){
                // console.log('123456789');
                uni.showLoading({
                    title:'加载中...'
                })
                this.keyword = name
                this.navIndex = 1;
                this.companyList = [];
                this.noData = false;
                this.pageNo = 1;
                this.isHotHistory = false;
                //动态给搜索框赋值
                let webView =this.$mp.page.$getAppWebview();
                webView.setTitleNViewSearchInputText(this.keyword);
                this.companySearchByPage(this.keyword,this.navIndex);
            }
        },
		onNavigationBarSearchInputConfirmed(e){
            console.log(e);
            this.keyword = e.text;
            //点击搜索按钮的时候触发
            if(this.keyword == ''){
                uni.showModal({
                    title: '',
                    content: '请输入搜索的关键词！',
                    showCancel:false
                })
            } else{
                this.isHotHistory = false;
                uni.hideKeyboard();
                uni.showLoading({
                    title:'加载中...'
                })
                this.companyList = []
                this.noMore = false;
                this.pageNo = 1;
                this.noData = false;
                this.companySearchByPage(this.keyword,this.navIndex);
            }


        },
        onNavigationBarSearchInputChanged(e){
            if(e.text == ''){
                this.isHotHistory = true;
                this.companyList = Array;
            }
        },
        onReachBottom(){
            if(this.pageNo == this.totalPages) return this.noMore = true;
            this.loading = true;
            this.pageNo ++;
            this.companySearchByPage(this.keyword,this.navIndex);
        }
    }
</script>

<style>
    /deep/.uni-scroll-view::-webkit-scrollbar {
        display: none
    }
    .searchNav{
        white-space: nowrap;
        height: 73rpx;
        border-bottom: 1rpx solid #eceff7;
        line-height: 73rpx;
        position: fixed;
        top: var(--window-top);
        left: 0;
        z-index: 3;
        background: #fff;
        width: 100%;
    }
    .searchNav .li{
        display: inline-block;
        font-size: 28rpx;
        color: #333;
        text-align: center;
        width: 170rpx;
        position: relative;
    }
    .searchNav .li.active{
        color: #113090;
    }
    .searchNav .li.active:after{
        content: '';
        display: block;
        width: 36rpx;
        height: 6rpx;
        background: #113090;
        border-radius: 2rpx;
        position: absolute;
        bottom: 1rpx;
        left: 50%;
        margin-left: -18rpx;
    }
    .searchNav .li:first-child{
        margin-left: 0;
    }
    .searchMain{
        padding:0 29rpx;
    }
    .hotSearch{
        margin-top: 31rpx;
    }
    .hotTitle{
        font-size: 30rpx;
        color: #222;
        font-weight: bold;
        line-height: 37rpx;
    }
    .hotTitle image{
        display: inline-block;
        vertical-align: top;
        width: 37rpx;
        height: 37rpx;
        margin-right: 12rpx;
    }
    .hotMain .li{
        padding:0 15rpx;
        width: 50%;
        float: left;
        font-size: 26rpx;
        color: #333;
        margin-top: 30rpx;
    }
    .hotMain .li text{
        display: inline-block;
        margin-right: 15rpx;
    }
    .hotMain .li:nth-child(even){
        float: right;
    }
    .hotMain .li:nth-child(1) text{
        color: #fca032;
    }
    .hotMain .li:nth-child(2) text{
        color: #55caa1;
    }
    .hotMain .li:nth-child(3) text{
        color: #f26665;
    }
    .history{
        margin-top: 40rpx;
    }
    .historyMain .li{
        font-size: 26rpx;
        color: #333;
        margin-top: 30rpx;
        padding-left: 15rpx;
    }
    .historyMain .li text{
        display: inline-block;
        margin-right: 15rpx;
    }
    .selectNav{
        height: 143rpx;
    }
    .infoTips{
        text-align: center;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 22rpx;
        color: #666;
        background: #f6f6f6;
    }
    /*.infoTips text{
        color: #113090;
        display: inline-block;
        margin: 0 5rpx;
    }*/
    .enterpList{
        padding:0 29rpx;
    }
    .enterpList .li{
        padding: 33rpx 0;
        border-bottom: 1rpx solid #d2d2d2;
    }
    .enterpList .li:last-child{
        border-bottom: none;
    }
    .enterpList .liLogo{
        width: 90rpx;
        height: 90rpx;
        position: relative;
        float: left;
    }
    .enterpList .liLogo image{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .enterpList .liTitleTag{
        width: calc(100% - 140rpx);
        float: right;
    }
    .enterpList .liTitleTag .liTitle{
        font-size: 28rpx;
        color: #333;
        line-height: 35rpx;
    }
    .enterpList .liTitleTag .liTitle rich-text{
        display: inline-block;
    }
    .enterpList .liTitleTag .liTitle image{
        width: 32rpx;
        height: 26rpx;
        vertical-align: top;
        margin-left: 20rpx;
        position: relative;
        top: 3rpx;
    }
    .enterpList .liTag text{
        display: inline-block;
        height: 38rpx;
        padding:0 13rpx;
        line-height: 38rpx;
        background: #ecf2ff;
        font-size: 24rpx;
        color: #4a69c7;
        border-radius: 3rpx;
        margin-right: 24rpx;
        margin-top: 18rpx;
    }
    .enterpList .liBtm{
        margin-top: 25rpx;
    }
    .enterpList .liBtm .liTd{
        width: 33.33%;
        text-align: center;
        font-size: 28rpx;
        line-height: 40rpx;
        color: #333;
        float: left;
    }
    .enterpList .liBtm .liTd:nth-child(1){
        border-right: 1rpx solid #dcdcdc;
    }
    .enterpList .liBtm .liTd:nth-child(2){
        padding:0 10rpx;
    }
    .enterpList .liBtm .liTd:nth-child(3){
        border-left: 1rpx solid #dcdcdc;
    }
    .enterpList .liBtm .liTd .h1{
        color: #999;
    }
    .historyNoData{
        text-align: center;
        margin-top: 40rpx;
        font-size: 24rpx;
        color: #999;
    }
</style>
