<template>
    <view>
        <view class="redBlackBox" @click="isRedBlack = false" v-if="isRedBlack"></view>
        <view class="redBlackTitle">
            <view class="h1" @click="isRedBlack = true">
                {{redBlackTitle}}
                <image :class="{rotate:isRedBlack}" src="../../static/icon/90.png"></image>
            </view>
            <view class="redBlackMain clear" v-if="isRedBlack">
                <view class="redBlackFl">
                    <view class="li" @click="redBlack = 1" :class="{active:redBlack == 1}">红名单</view>
                    <view class="li" @click="redBlack = 2" :class="{active:redBlack == 2}">黑名单</view>
                </view>
                <view class="redBlackFr">
                    <view v-if="redBlack == 1">
                        <view class="li" :class="{active:item.type == type}" v-for="(item,index) in redBlackList.redList" :key="index" @click="redBlackClick(item)">
                            {{item.name}}
                        </view>
                    </view>
                    <view v-if="redBlack == 2">
                        <view class="li" :class="{active:item.type == type}" v-for="(item,index) in redBlackList.blackList" :key="index" @click="redBlackClick(item)">
                            {{item.name}}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="redBlackList">
            <view class="li" v-for="(item,index) in list" :key="index" @click="skipLink(item)">
                <view class="h1" v-if="type == '1'">{{item.NAME}}</view>
                <view class="h1" v-if="type == '2' || type == '4' || type == '5' || type == '6' || type == '7' || type == '8' || type == '9' || type == '10'">{{item.companyName}}</view>
                <view class="h1" v-if="type == '3'">{{item.COMPANY_NAME}}</view>
                <view class="h1" v-if="type == '11'">{{item.company}}</view>
                <view class="h2">
                    组织机构代码/身份证：
                    <text v-if="type == '1'">{{item.DISCERN_NUMBER}}</text>
                    <text v-if="type == '2'">{{item.orgNo}}</text>
                    <text v-if="type == '3'">{{item.ORGANIZATION_CODE}}</text>
                    <text v-if="type == '4' || type == '5' || type == '6' || type == '7' || type == '8' || type == '9' || type == '10'">{{item.number}}</text>
                    <text v-if="type == '11'">{{item.credit_number}}</text>
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
    import noData from "../../components/noData";

    export default {
        components: {
            noData
        },
        data () {
            return {
                redBlack:1,
                isRedBlack:false,
                redBlackTitle:'纳税信用A级企业',
                redBlackList:{},
                type:'1',
                keyword:'',
                pageNo:1,
                list:[],
                noMore:false,
                loading:false,
                isSearch:false,
                noData:false,
            }
        },
        onLoad() {
            this.redBlackList = {
                'redList':[
                    {name:'纳税信用A级企业',type:'1'},
                    {name:'海关高级认证企业',type:'7'}
                ],
                'blackList':[
                    {name:'重大税收违法案件当事人',type:'3'},
                    {name:'失信被执行人',type:'2'},
                    {name:'经营异常名录',type:'4'},
                    {name:'海关失信认证企业',type:'6'},
                    {name:'统计上严重失信企业',type:'5'},
                    {name:'证监会行政处罚',type:'8'},
                    {name:'安全生产黑名单',type:'9'},
                    {name:'交通运输黑名单',type:'10'},
                    {name:'环保行政处罚',type:'11'},
                ]
            }
            uni.showLoading({
                title:'加载中...'
            })
            this.radBlackList();
        },
        onShow(){

        },
        methods: {
            redBlackClick(data){
                uni.showLoading({
                    title:'加载中...'
                })
                this.type = data.type;
                this.redBlackTitle = data.name;
                this.isRedBlack = false;
                this.list = [];
                this.pageNo = 1;
                this.noMore = false;
                this.isSearch = false;
                this.noData = false;
                //动态给搜索框赋值
                this.$mp.page.$getAppWebview().setTitleNViewSearchInputText('');
                this.radBlackList();
            },
            radBlackList(){
                let url = '';
                switch (this.type) {
                    case '1':
                        //纳税信用A级企业
                        url='/enterprise/detail/radBlackList/findPageCompanyA'
                        break;
                    case '2':
                        //失信被执行人
                        if(!this.isSearch){
                            url='/esmongodb/redblacklist/queryHighExecutedByPage'
                        } else{
                            url='/esmongodb/redblacklist/getHighExecutedByCompanyName'
                        }
                        break;
                    case '3':
                        //重大税收违法案件当事人
                        url='/enterprise/detail/radBlackList/findPageQueryDelinquentParty'
                        break;
                    case '4':
                        //异常经营名录
                        if(!this.isSearch){
                            url='/esmongodb/v1/redblacklist/queryAbnormalOperationByPage'
                        } else{
                            url='/esmongodb/v1/redblacklist/queryAbnormalOperationByCompanyNameByPage'
                        }
                        break;
                    case '5':
                        //统计上严重失信企业
                        if(!this.isSearch){
                            url='/esmongodb/v1/redblacklist/queryCensusCreditBreakerPublishByPage'
                        } else{
                            url='/esmongodb/v1/redblacklist/queryCensusCreditBreakerPublishByCompanyNameByPage'
                        }
                        break;
                    case '6':
                        //海关失信认证企业
                        if(!this.isSearch){
                            url='/esmongodb/v1/redblacklist/queryCustomsCreditBreakerByPage'
                        } else{
                            url='/esmongodb/v1/redblacklist/queryCustomsCreditBreakerByCompanyNameByPage'
                        }
                        break;
                    case '7':
                        //海关高级认证企业
                        if(!this.isSearch){
                            url='/esmongodb/v1/redblacklist/queryCustomsCreditAuthenticationByPage'
                        } else{
                            url='/esmongodb/v1/redblacklist/queryCustomsCreditAuthenticationByCompanyNameByPage'
                        }
                        break;
                    case '8':
                        //证监会行政处罚
                        if(!this.isSearch){
                            url='/esmongodb/v1/redblacklist/queryAdministrationPunishByPage'
                        } else{
                            url='/esmongodb/v1/redblacklist/queryAdministrationPunishByCompanyNameByPage'
                        }
                        break;
                    case '9':
                        //安全生产黑名单
                        if(!this.isSearch){
                            url='/esmongodb/v1/redblacklist/queryProduceSecurityBlackListByPage'
                        } else{
                            url='/esmongodb/v1/redblacklist/queryProduceSecurityBlackListByCompanyNameByPage'
                        }
                        break;
                    case '10':
                        //交通运输黑名单
                        if(!this.isSearch){
                            url='/esmongodb/v1/redblacklist/queryOverLimitTransCompanyByPage'
                        } else{
                            url='/esmongodb/v1/redblacklist/queryOverLimitTransCompanyByCompanyNameByPage'
                        }
                        break;
                    case '11':
                        //环保行政处罚
                        url='/user/center/eia/getEiaSewageDischList'
                        break;
                }
                if(this.type == '1' || this.type == '3'){
                    request(url,{
                        method:'post',
                        data:{
                            name: this.keyword,
                            pageNo: this.pageNo,
                            pageSize: 10
                        }
                    }).then(res => {
                        uni.hideLoading();
                        if(res.data.list.length > 0){
                            this.list = this.list.concat(res.data.list);
                            this.totalPages = res.data.totalPages;
                            this.loading = false;
                        } else{
                            this.noData = true;
                        }

                    })
                } else if(this.type == '2'){
                    let params = {};
                    if(!this.isSearch){
                        params = {
                            name: this.keyword,
                            pageNo: this.pageNo,
                            pageSize: 10
                        }
                    } else{
                        params = {
                            companyName: this.keyword,
                            pageNo: this.pageNo,
                            pageSize: 10
                        }
                    }
                    request(url,{
                        method:'get',
                        data:params
                    }).then(res => {
                        uni.hideLoading();
                        if(res.returnData){
                            this.list = this.list.concat(res.returnData);
                            this.totalPages = res.totalPages;
                            this.loading = false;
                        } else{
                            this.noData = true;
                        }

                    })
                } else if(this.type == '4' || this.type == '5' || this.type == '6' || this.type == '7' || this.type == '8' || this.type == '9' || this.type == '10'){
                    let params = {}
                    if(!this.isSearch){
                        params = {
                            pageNo: this.pageNo,
                            pageSize: 10,
                        }
                    } else{
                        params = {
                            pageNo: this.pageNo,
                            pageSize: 10,
                            companyName:this.keyword
                        }
                    }
                    request(url,{
                        method:'get',
                        data:params
                    }).then(res => {
                        uni.hideLoading();
                        if(res.returnData){
                            this.list = this.list.concat(res.returnData);
                            this.totalPages = res.totalPages;
                            this.loading = false;
                        } else{
                            this.noData = true;
                        }
                    })
                } else if(this.type == '11'){
                    request(url,{
                        method:'post',
                        data:{
                            item_id: 6,
                            current_page:this.pageNo,
                            page_size:10,
                            search_text:this.keyword
                        }
                    }).then(res => {
                        uni.hideLoading();
                        this.list = this.list.concat(res.data.data.res);
                        this.totalPages = this.pageTotal(res.data.data.count,10);
                        this.loading = false;
                    })
                }

            },
            pageTotal(rowCount, pageSize){//计算总页数
                if (rowCount == null || rowCount == "") {
                    return 0;
                } else {
                    if (pageSize != 0 && rowCount % pageSize == 0) {
                        return parseInt(rowCount / pageSize)
                    }
                    if (pageSize != 0 && rowCount % pageSize != 0) {
                        return parseInt(rowCount / pageSize) + 1;
                    }
                }
            },
            skipLink(item){
                console.log(item);
                if(this.type=='1'){
                    uni.navigateTo({
                        url:`../redBlackDetail/index?discernNumber=${item.DISCERN_NUMBER}&companyName=${item.NAME}&type=${this.type}&title=${this.redBlackTitle}`
                    })
                } else if(this.type == '2'){
                    uni.navigateTo({
                        url:`../redBlackDetail/index?companyId=${item.companyId}&id=${item.id}&type=${this.type}&title=${this.redBlackTitle}&companyName=${item.companyName}`
                    })
                } else if(this.type == '3'){
                    uni.navigateTo({
                        url:`../redBlackDetail/index?companyId=${item.COMPANY_ID}&companyName=${item.COMPANY_NAME}&type=${this.type}&title=${this.redBlackTitle}`
                    })
                } else if(this.type == '4' || this.type == '5' || this.type == '6' || this.type == '7' || this.type == '8' || this.type == '9' || this.type == '10'){
                    uni.navigateTo({
                        url:`../companyRiskWarnDetail/index?companyName=${item.companyName}&type=${this.type}`
                    })
                }
            }
        },
        onNavigationBarSearchInputConfirmed(e){
            //点击搜索按钮的时候触发
            // console.log(e.text);
            uni.showLoading({
                title:'加载中...'
            })
            this.keyword = e.text;
            this.list = [];
            this.pageNo = 1;
            this.noMore = false;
            this.noData = false;
            uni.hideKeyboard();
            if(e.text == ''){
                this.isSearch = false
            } else{
                this.isSearch = true
            }
            this.radBlackList();
            uni.pageScrollTo({
                scrollTop: 0,
                duration: 100,
            });
        },
        onNavigationBarSearchInputChanged(e){
            /*if(e.text == ''){
                this.isSearch = false;
                this.noMore = false;
                this.pageNo = 1;
                this.list = [];
            }*/
        },
        onReachBottom(){
            if(this.pageNo == this.totalPages) return this.noMore = true;
            this.loading = true;
            this.pageNo ++;
            this.radBlackList();
        }
    }
</script>
<style>
    .redBlackTitle{
        position: fixed;
        top: var(--window-top);
        z-index: 3;
        background: #fff;
        width: 100%;
    }
    .redBlackTitle .h1{
        height: 70rpx;
        line-height: 70rpx;
        padding:0 30rpx;
        background: #fff;
        box-shadow: 0 0 25rpx rgba(41,44,51,0.07);
        font-size: 24rpx;
        color: #333;
    }
    .redBlackTitle .h1 image{
        width: 14rpx;
        height: 9rpx;
        margin-left: 10rpx;
        position: relative;
        top: -2rpx;
    }
    .redBlackBox{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 2;
    }
    .redBlackFl{
        width: 250rpx;
        float: left;
        font-size: 26rpx;
        color: #666;
    }
    .redBlackFr{
        width: calc(100% - 250rpx);
        float: right;
        padding-left: 30rpx;
        background: #f6f6f6;
        height: 820rpx;
    }
    .redBlackFl .li{
        height: 90rpx;
        line-height: 90rpx;
        padding-left: 30rpx;
    }
    .redBlackFl .li.active{
        background: #f6f6f6;
        color: #113090;
    }
    .redBlackFr .li{
        height: 90rpx;
        line-height: 90rpx;
        color: #666;
        font-size: 26rpx;
    }
    .redBlackFr .li.active{
        color: #113090;
    }
    .rotate{
        transition: 0.3s;
        transform: rotate(180deg);
    }
    .redBlackList{
        padding:70rpx 30rpx 30rpx 30rpx;
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
