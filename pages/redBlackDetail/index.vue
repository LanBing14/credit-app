<template>
    <view class="archDetail">
        <view class="li">
            <view class="h3">
                {{companyName}}
                <text>{{title}}</text>
            </view>
        </view>
        <!--纳税信用A级企业-->
        <view v-if="type == '1'">
            <view class="li" v-for="(item,index) in redBlackInfo" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">纳税人识别号</view>
                            <view class="h2">
                                {{item.discernNumber ? item.discernNumber : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">纳税人名称</view>
                            <view class="h2">
                                {{item.name ? item.name : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">评价年度</view>
                            <view class="h2">
                                {{item.annualEvaluation ? item.annualEvaluation : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--失信被执行人-->
        <view v-if="type == '2'">
            <view class="li" v-for="(item,index) in redBlackInfo" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">被执行人名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">公布时间</view>
                            <view class="h2">
                                {{item.publicDate ? item.publicDate : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">执行法院</view>
                            <view class="h2">
                                {{item.executeGov ? item.executeGov : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">履行情况</view>
                            <view class="h2">
                                {{item.executeStatus ? item.executeStatus : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--重大税收违法案件当事人-->
        <view v-if="type == '3'">
            <view class="li" v-for="(item,index) in redBlackInfo" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">企业名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">税务登记号</view>
                            <view class="h2">
                                {{item.taxNo ? item.taxNo : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">组织机构代码</view>
                            <view class="h2">
                                {{item.organizationCode ? item.organizationCode : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">注册地</view>
                            <view class="h2">
                                {{item.registeredLand ? item.registeredLand : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">法人姓名</view>
                            <view class="h2">
                                {{item.legalPerson ? item.legalPerson : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">法人性别</view>
                            <view class="h2">
                                {{item.legalpersonSex ? item.legalpersonSex : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">证件类型</view>
                            <view class="h2">
                                {{item.documentType ? item.documentType : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">案件性质</view>
                            <view class="h2">
                                {{item.caseNature ? item.caseNature : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">处理结果</view>
                            <view class="h2">
                                {{item.dealResult ? item.dealResult : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">案件描述</view>
                            <view class="h2">
                                {{item.caseDes ? item.caseDes : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
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
                title:'',
                type:'',
                discernNumber:'',
                companyName:'',
                redBlackInfo:[],
                companyId:'',
                id:''
            }
        },
        onLoad(options) {
            uni.showLoading({
                title:'加载中...'
            })
            this.title = options.title;
            this.type = options.type;
            this.discernNumber = options.discernNumber;
            this.companyName = options.companyName;
            this.companyId = options.companyId;
            this.id = options.id;
            uni.setNavigationBarTitle({
                title: this.title
            });

            this.redBlackDetail();
        },
        onShow(){

        },
        methods: {
            redBlackDetail(){
                let url = '';
                switch (this.type) {
                    case '1':
                        //纳税信用A级企业
                        url = '/enterprise/detail/radBlackList/queryCompanyA';
                        break;
                    case '2':
                        //失信被执行人
                        url = '/esmongodb/redblacklist/getHighExecutedByCompanyId';
                        break;
                    case '3':
                        //重大税收违法案件当事人
                        url = '/enterprise/detail/radBlackList/queryDelinquentParty';
                        break;
                }

                if(this.type == '1' || this.type == '3'){
                    let params = {}
                    if(this.type == '1'){
                        params = {
                            discernNumber :this.discernNumber,
                            name:this.companyName
                        }
                    } else if(this.type == '3'){
                        params = {
                            companyName :this.companyName,
                            companyId :this.companyId
                        }
                    }
                    request(url,{
                        method:'post',
                        data:params
                    }).then(res => {
                        console.log(res);
                        this.redBlackInfo = res.data;
                        uni.hideLoading();
                    })
                }

                if(this.type == '2'){
                    request(url,{
                        method:'get',
                        data:{
                            id :this.id,
                            companyId :this.companyId
                        }
                    }).then(res => {
                        console.log(res);
                        this.redBlackInfo = res.returnData;
                        uni.hideLoading();
                    })
                }
            }
        }
    }
</script>

<style>
    .archDetail{
        padding:0 30rpx 30rpx 30rpx;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
    .archDetail .li{
        padding-top: 30rpx;
    }
    .archDetail .li .h3{
        font-size: 30rpx;
        font-weight: bold;
        color: #000;
    }
    .archDetail .li .h3 text{
        display: block;
        font-weight: normal;
        color: #6f6f6f;
        margin-top: 5rpx;
        font-size: 26rpx;
    }
    .archDetail .li .h3 image{
        height: 45rpx;
    }
    .detailCode{
        background: #fff;
        margin-top: 20rpx;
    }
    .detailCode .DetailMain{
        margin-top: 40rpx;
    }
    .detailCode .DetailMain:first-child{
        margin-top: 0;
    }
    .borderRight{
        border-right: 1rpx solid #dcdcdc;
    }
    .borderBottom{
        border-bottom: 1rpx solid #dcdcdc;
        padding-bottom: 22rpx;
    }
    .paddingRight{
        padding-left: 20rpx;
    }
    .codeFl{
        width: 50%;
        float: left;
    }
    .codeFr{
        width: 50%;
        float: right;
    }
    .codeFont .h1{
        font-size: 26rpx;
        color: #6f6f6f;
        line-height: 44rpx;
    }
    .codeFont .h2{
        font-size: 26rpx;
        color: #222;
        line-height: 44rpx;
    }
</style>
