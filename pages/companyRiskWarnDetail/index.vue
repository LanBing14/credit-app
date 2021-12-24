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
            <view class="li" v-for="(item,index) in companyList" :key="index">
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
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">失信人名</view>
                            <view class="h2">
                                {{item.name ? item.name : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">法定代表人</view>
                            <view class="h2">
                                {{item.buesinessentity ? item.buesinessentity : '-'}}
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
                            <view class="h1">执行法院</view>
                            <view class="h2">
                                {{item.courtName ? item.courtName : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">被执行人的履行情况</view>
                            <view class="h2">
                                {{item.performance ? item.performance : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">法律生效文书确定的义务</view>
                            <view class="h2">
                                {{item.duty ? item.duty : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">失信被执行人行为具体情形</view>
                            <view class="h2">
                                {{item.disreputTypeName ? item.disreputTypeName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">发布时间</view>
                            <view class="h2">
                                <uni-dateformat v-if="item.publishDate" :date="item.publishDate" format="yyyy-MM-dd"></uni-dateformat>
                                <text v-else>-</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--重大税收违法案件当事人-->
        <view v-if="type == '3'">
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">组织机构代码</view>
                            <view class="h2">
                                {{item.organizationCode ? item.organizationCode : '-'}}
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
                            <view class="h1">注册地</view>
                            <view class="h2">
                                {{item.registeredLand ? item.registeredLand : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">案件性质</view>
                            <view class="h2">
                                {{item.caseNature ? item.caseNature : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">案件描述</view>
                            <view class="h2">
                                {{item.caseDes ? item.caseDes : '-'}}
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
                    </view>
                </view>
            </view>
        </view>
        <!--经营异常名录-->
        <view v-if="type == '4'">
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">企业名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">统一社会信用代码</view>
                            <view class="h2">
                                {{item.number ? item.number : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">法定代表人</view>
                            <view class="h2">
                                {{item.operName ? item.operName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">注册地址</view>
                            <view class="h2">
                                {{item.address ? item.address : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">列入经营异常名录原因</view>
                            <view class="h2">
                                {{item.abnormalContent ? item.abnormalContent : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">列入时间</view>
                            <view class="h2">
                                {{item.establishmentDate ? item.establishmentDate : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">决定机关</view>
                            <view class="h2">
                                {{item.orgName ? item.orgName : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--统计上严重失信企业-->
        <view v-if="type == '5'">
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">企业名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">统一社会信用代码</view>
                            <view class="h2">
                                {{item.number ? item.number : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">处罚决定书文号</view>
                            <view class="h2">
                                {{item.punishNumber ? item.punishNumber : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">处罚名称</view>
                            <view class="h2">
                                {{item.punishContent ? item.punishContent : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">处罚事由</view>
                            <view class="h2">
                                {{item.punishReason ? item.punishReason : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">处罚类别</view>
                            <view class="h2">
                                {{item.punishTypeOne ? item.punishTypeOne : '-'}}，
                                {{item.punishTypeTwo ? item.punishTypeTwo : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">处罚依据</view>
                            <view class="h2">
                                {{item.punishGist ? item.punishGist : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">处罚结果</view>
                            <view class="h2">
                                {{item.punishResult ? item.punishResult : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">处罚决定日期</view>
                            <view class="h2">
                                {{item.punishDecisionDate ? item.punishDecisionDate.substring(0,10) : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">公示期限</view>
                            <view class="h2">
                                {{item.deadline ? item.deadline : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">处罚机关</view>
                            <view class="h2">
                                {{item.punishOrg ? item.punishOrg : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--海关失信认证企业-->
        <view v-if="type == '6'">
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">海关编码</view>
                            <view class="h2">
                                {{item.hsCode ? item.hsCode : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">企业名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">统一社会信用代码</view>
                            <view class="h2">
                                {{item.number ? item.number : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">注册时间</view>
                            <view class="h2">
                                {{item.registDate ? item.registDate.substring(0,10) : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">信用等级</view>
                            <view class="h2">
                                {{item.creditRating ? item.creditRating : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">等级认定时间</view>
                            <view class="h2">
                                {{item.thatTime ? item.thatTime.substring(0,10) : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">法人代表</view>
                            <view class="h2">
                                {{item.operName ? item.operName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">注册地址</view>
                            <view class="h2">
                                {{item.address ? item.address : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--海关高级认证企业-->
        <view v-if="type == '7'">
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">海关注册编码</view>
                            <view class="h2">
                                {{item.hsCode ? item.hsCode : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">企业名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">统一社会信用代码</view>
                            <view class="h2">
                                {{item.number ? item.number : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">注册时间</view>
                            <view class="h2">
                                {{item.registDate ? item.registDate.substring(0,10) : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">信用等级</view>
                            <view class="h2">
                                {{item.creditRating ? item.creditRating : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">等级认定时间</view>
                            <view class="h2">
                                {{item.thatTime ? item.thatTime.substring(0,10) : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">注册地址</view>
                            <view class="h2">
                                {{item.address ? item.address : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--证监会行政处罚-->
        <view v-if="type == '8'">
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">企业名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">统一社会信用代码/组织机构代码</view>
                            <view class="h2">
                                {{item.number ? item.number : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">处罚处理日期</view>
                            <view class="h2">
                                {{item.punishDate ? item.punishDate.substring(0,10) : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">处罚处理种类</view>
                            <view class="h2">
                                {{item.punishType ? item.punishType : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">处罚处理名称</view>
                            <view class="h2">
                                {{item.punishGist ? item.punishGist : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">处罚机关</view>
                            <view class="h2">
                                {{item.punishOrg ? item.punishOrg : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--安全生产黑名单-->
        <view v-if="type == '9'">
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">企业名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">统一社会信用代码</view>
                            <view class="h2">
                                {{item.number ? item.number : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">纳入理由</view>
                            <view class="h2">
                                {{item.breakFaithReason ? item.breakFaithReason : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">主要负责人</view>
                            <view class="h2">
                                {{item.operName ? item.operName : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">注册地址</view>
                            <view class="h2">
                                {{item.address ? item.address : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">报送机关</view>
                            <view class="h2">
                                {{item.sourceUnit ? item.sourceUnit : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">失信行为简况</view>
                            <view class="h2">
                                {{item.breakFaithBehaviors ? item.breakFaithBehaviors : '-'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!--交通运输黑名单-->
        <view v-if="type == '10'">
            <view class="li" v-for="(item,index) in companyList" :key="index">
                <view class="detailCode">
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">企业名称</view>
                            <view class="h2">
                                {{item.companyName ? item.companyName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">统一社会信用代码</view>
                            <view class="h2">
                                {{item.number ? item.number : '-'}}
                            </view>
                        </view>
                    </view>
                    <view class="DetailMain clear">
                        <view class="codeFl codeFont borderRight">
                            <view class="h1">法人代表</view>
                            <view class="h2">
                                {{item.operName ? item.operName : '-'}}
                            </view>
                        </view>
                        <view class="codeFr codeFont paddingRight">
                            <view class="h1">道路运输许可证号</view>
                            <view class="h2">
                                {{item.roadTransportCertificate ? item.roadTransportCertificate : '-'}}
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
                type:'',
                title:'',
                companyName:'',
                discernNumber:'',
                companyList:[]
            }
        },
        onLoad(options) {
            console.log(options);
            uni.showLoading({
                title:'加载中...'
            })
            this.companyName = options.companyName;
            this.type = options.type;
            this.discernNumber = options.discernNumber;
            switch(this.type){
                case '1':
                    this.title = '纳税信用A级企业';
                    break;
                case '2':
                    this.title = '失信被执行人';
                    break;
                case '3':
                    this.title = '重大税收违法案件当事人';
                    break;
                case '4':
                    this.title = '经营异常名录';
                    break;
                case '5':
                    this.title = '统计上严重失信企业';
                    break;
                case '6':
                    this.title = '海关失信认证企业';
                    break;
                case '7':
                    this.title = '海关高级认证企业';
                    break;
                case '8':
                    this.title = '证监会行政处罚';
                    break;
                case '9':
                    this.title = '安全生产黑名单';
                    break;
                case '10':
                    this.title = '交通运输黑名单';
                    break;
                case '11':
                    this.title = '环保行政处罚';
                    break;
            }

            uni.setNavigationBarTitle({
                title: this.title
            });

            this.getList();
        },
        onShow(){

        },
        methods: {
            subscribe(){
                let url = '';
                switch(this.type){
                    case '1':
                        //纳税信用A级企业详情
                        url = '/enterprise/detail/radBlackList/queryCompanyA'
                        break;
                    case '2':
                        //失信被执行人详情
                        url = '/enterprise/detail/radBlackList/getQueryPersonByCompanyName'
                        break;
                    case '3':
                        //重大税收违法案件当事人详情
                        url = '/enterprise/detail/radBlackList/getDelinquentPartyByCompanyName'
                        break;
                    case '4':
                        //异常经营名录--详情
                        url = '/esmongodb/v1/redblacklist/queryAbnormalOperationByCompanyName'
                        break;
                    case '5':
                        //统计上严重失信企业--详情
                        url = '/esmongodb/v1/redblacklist/queryCensusCreditBreakerPublishByCompanyName'
                        break;
                    case '6':
                        //海关失信认证企业--详情
                        url = '/esmongodb/v1/redblacklist/queryCustomsCreditBreakerByCompanyName'
                        break;
                    case '7':
                        //海关高级认证企业--详情
                        url = '/esmongodb/v1/redblacklist/queryCustomsCreditAuthenticationByCompanyName'
                        break;
                    case '8':
                        //证监会行政处罚--详情
                        url = '/esmongodb/v1/redblacklist/queryAdministrationPunishByCompanyName'
                        break;
                    case '9':
                        //安全生产黑名单--详情
                        url = '/esmongodb/v1/redblacklist/queryProduceSecurityBlackListByCompanyName'
                        break;
                    case '10':
                        //交通运输黑名单--详情
                        url = '/esmongodb/v1/redblacklist/queryOverLimitTransCompanyByCompanyName'
                        break;
                }

                if(this.type == '1'){
                    return request(url,{
                        method:'post',
                        data:{
                            name:this.companyName,
                            discernNumber:this.discernNumber
                        }
                    })
                } else{
                    return request(url,{
                        method:'get',
                        data:{
                            companyName:this.companyName
                        }
                    })
                }
            },
            getList(){
                if(this.type == '1' || this.type == '2' || this.type == '3'){
                    this.subscribe().then(result => {
                        console.log(result);
                        this.companyList = result.data;
                        uni.hideLoading();
                    })
                } else{
                    this.subscribe().then(result => {
                        this.companyList = result.returnData;
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
