<template>
    <view class="archList">
        <view>
            <navigator :url="`/pages/companyArchDetail/index?type=${item.type}&title=${item.title}&companyId=${companyId}&companyName=${companyName}`" class="li" v-for="(item,index) in tabList" :key="index">
                {{item.title}}
                <text>
                    {{item.total}}
                    <image src="../../static/icon/89.png"></image>
                </text>
            </navigator>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";

    export default {
        components: {

        },
        data () {
            return {
                companyId:'',
                companyName:'',
                title:'',
                type:'',
                tabList:[],
                params:{}
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            this.companyName = options.companyName;
            this.type = options.type;
            this.params = {
                companyId:this.companyId,
                companyName:this.companyName,
                pageNo:1,
                pageSize:10
            }
            this.initData(this.type);
        },
        onShow(){

        },
        methods: {
            initData(type){
                switch (type){
                    case '1':
                        this.title = '股权类信息'
                        uni.setNavigationBarTitle({
                            title: this.title
                        });
                        this.getBasicInfo(this.params, '1.1').then(result => {
                            this.pushData(1, '1.1', '股东及出资方', result);
                        });
                        this.getBasicInfo(this.params, '1.2').then(result => {
                            this.pushData(2, '1.2', '对外投资', result);
                        });
                        this.getBasicInfo(this.params, '1.3').then(result => {
                            this.pushData(3, '1.3', '分支机构', result);
                        });
                        break;
                    case '2':
                        this.title = '历史沿革';
                        uni.setNavigationBarTitle({
                            title: this.title
                        });
                        this.getBasicInfo(this.params, '2.1').then(
                            result => {
                                this.pushData(1, '2.1', '工商变更记录', result);
                            });
                        this.getBasicInfo(this.params, '2.2').then(
                            result => {
                                this.pushData(2, '2.2', '经营范围变更', result);
                            });
                        break;
                    case '3':
                        this.title = '知识产权信息'
                        uni.setNavigationBarTitle({
                            title: this.title
                        });
                        this.getBasicInfo(this.params, '3.1').then(
                            result => {
                                this.pushData(1, '3.1', '专利信息', result);
                            });
                        this.getBasicInfo(this.params, '3.2').then(
                            result => {
                                this.pushData(2, '3.2', '软件著作权信息', result);
                            });
                        this.getBasicInfo(this.params, '3.3').then(
                            result => {
                                this.pushData(3, '3.3', '作品著作权信息', result);
                            });
                        this.getBasicInfo(this.params, '3.4').then(
                            result => {
                                this.pushData(4, '3.4', '网站信息', result);
                            });
                        this.getBasicInfo(this.params, '3.5').then(
                            result => {
                                this.pushData(5, '3.5', '证书信息', result);
                            });
                        break;
                    case '11':
                        this.title = '司法信息';
                        uni.setNavigationBarTitle({
                            title: this.title
                        });
                        this.getBasicInfo(this.params, '11.1').then(
                            result => {
                                this.pushData(1, '11.1', '被执行人信息', result);
                            });
                        this.getBasicInfo(this.params, '11.2').then(
                            result => {
                                this.pushData(2, '11.2', '失信被执行人信息', result);
                            });
                        this.getBasicInfo(this.params, '11.3').then(
                            result => {
                                this.pushData(3, '11.3', '裁判文书信息', result);
                            });
                        this.getBasicInfo(this.params, '11.4').then(
                            result => {
                                this.pushData(4, '11.4', '法院公告信息', result);
                            });
                        break;
                    case '13':
                        this.title = '经营状况';
                        uni.setNavigationBarTitle({
                            title: this.title
                        });
                        this.getBasicInfo(this.params, '13.1').then(
                            result => {
                                this.pushData(1, '13.1', '融资信息', result);
                            });
                        this.getBasicInfo(this.params, '13.2').then(
                            result => {
                                this.pushData(2, '13.2', '财务总览信息', result);
                            });
                        this.getBasicInfo(this.params, '13.3').then(
                            result => {
                                this.pushData(3, '13.3', '产品信息', result);
                            });
                        break
                }
            },
            getBasicInfo(params,type){
                let url = '/enterprise/detail/xhsRest/baseMsg';
                switch (type){
                    case '1.1':  // 股权结构
                        url += '/getCompanyPartnersByPage';
                        console.log('123456');
                        break;
                    case '1.2': // 对外投资
                        url += '/getOperationInvestInfoByPage';
                        break;
                    case '1.3': // 分支机构
                        url += '/getCompanyBranchesByPage';
                        console.log('123456789');
                        break;
                    case '2.1': // 工商记录变更
                        // url += this.isFromQi ? '/getCompanyChangeRecords' : '/getCompanyChangeRecordsByPage';
                        url += '/getCompanyChangeRecordsByPage';
                        break;
                    case '2.2': // 经营范围变更
                        // url += this.isFromQi ? '/getCompanyChangeScope' : '/getCompanyChangeScopeByPage';
                        url += '/getCompanyChangeScopeByPage';
                        break;
                    case '3.1': // 专利信息
                        url += '/getAssetPatentDetailByPage';
                        break;
                    case '3.2': // 软件著作权信息
                        url += '/getOperationSoftwareCopyrightsByPage';
                        break;
                    case '3.3': // 作品著作权信息
                        url += '/getOperationCopyrightByPage';
                        break;
                    case '3.4': // 网站信息
                        url += '/getOperationWebsiteByPage';
                        break;
                    case '3.5': // 证书信息
                        url += '/getAssetCertificationByPage';
                        break;
                    case '11.1': // 被执行人信息
                        url += '/getAssetZhiXingByPage';
                        break;
                    case '11.2': // 失信被执行信息
                        url += '/getAssetShiXinByPage';
                        break;
                    case '11.3': // 裁判文书信息
                        url += '/getAssetCaseByPage';
                        break;
                    case '11.4': // 法院公告信息
                        url += '/getAssetChinacourtByPage';
                        break;
                    case '13.1': // 融资信息
                        url += '/getOperationFinancingByPage';
                        break;
                    case '13.2': // 财务总览信息
                        url += '/getOperationFinancingTaxByPage';
                        break;
                    case '13.3': // 产品信息
                        url += '/getOperationProductByPage';
                        break;
                }

                return request(url,{
                    method:'post',
                    data:this.params
                },true)
            },
            pushData(sort, type, title, httpResult) {
                let total = 0;
                if (httpResult.stateCode == '60111') {
                    total = httpResult.data.totalCount;
                }
                this.tabList.push({sort: sort, type: type, title: title, total: total});
                this.tabList.sort((a, b) => a.sort - b.sort);
                console.log(this.tabList);
            }
        }
    }
</script>

<style>
    page{
        background: #f6f6f6;
    }
    .archList .li{
        height: 106rpx;
        line-height: 106rpx;
        font-size: 32rpx;
        color: #333;
        background: #fff;
        padding:0 30rpx;
        margin-top: 20rpx;
    }
    .archList .li text{
        float: right;
        font-size: 26rpx;
        color: #6f6f6f;
    }
    .archList .li text image{
        width: 15rpx;
        height: 26rpx;
        margin-left: 15rpx;
        position: relative;
        top: 4rpx;
    }
</style>
