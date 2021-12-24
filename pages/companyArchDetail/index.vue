<template>
    <view class="archDetail">
        <view v-if="!noData">
            <!--股东及出资方-->
            <view v-if="type == '1.1'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.stockName ? item.stockName : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">出资额</view>
                                <view class="h2">
                                    {{item.shouldCapi ? item.shouldCapi : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">实缴额</view>
                                <view class="h2">
                                    {{item.realCapi ? item.realCapi : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">持股比例</view>
                                <view class="h2">
                                    {{item.stockPercent ? item.stockPercent : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">出资形式</view>
                                <view class="h2">
                                    {{item.investName ? item.investName : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont">
                                <view class="h1">股东类型</view>
                                <view class="h2">
                                    {{item.stockType ? item.stockType : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">证照号（企业代码/身份证）</view>
                                <view class="h2">
                                    {{item.identifyNo ? item.identifyNo : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--对外投资-->
            <view v-if="type == '1.2'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.name ? item.name : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">注册资本（万元）</view>
                                <view class="h2">
                                    {{item.registCapi ? item.registCapi : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">出资比例</view>
                                <view class="h2">
                                    -
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">社会统一信用代码（工商）</view>
                                <view class="h2">
                                    {{item.no ? item.no : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--分支机构-->
            <view v-if="type == '1.3'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.name ? item.name : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">负责人</view>
                                <view class="h2">
                                    {{item.operName ? item.operName : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">社会统一信用代码</view>
                                <view class="h2">
                                    {{item.creditCode ? item.creditCode : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFont borderBottom">
                                <view class="h1">注册机关</view>
                                <view class="h2">
                                    {{item.belongOrg ? item.belongOrg : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--工商变更记录-->
            <view v-if="type == '2.1'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.projectName ? item.projectName : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">变更前内容</view>
                                <view class="h2">
                                    <rich-text :nodes="item.beforeContent ? item.beforeContent : '-'"></rich-text>
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">变更后内容</view>
                                <view class="h2">
                                    <rich-text :nodes="item.afterContent ? item.afterContent : '-'"></rich-text>
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont">
                                <view class="h1">变更日期</view>
                                <view class="h2">
                                    {{item.changeDate ? item.changeDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--经营范围变更-->
            <view v-if="type == '2.2'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">变更前内容</view>
                                <view class="h2">
                                    <rich-text :nodes="item.beforeContent ? item.beforeContent : '-'"></rich-text>
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">变更后内容</view>
                                <view class="h2">
                                    <rich-text :nodes="item.afterContent ? item.afterContent : '-'"></rich-text>
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">变更日期</view>
                                <view class="h2">
                                    {{item.changeDate ? item.changeDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--专利信息-->
            <view v-if="type == '3.1'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.title ? item.title : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">公示号</view>
                                <view class="h2">
                                    {{item.publicationNumber?item.publicationNumber:'-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">专利类型</view>
                                <view class="h2">
                                    {{item.kindCodeDesc?item.kindCodeDesc:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">公开日期</view>
                                <view class="h2">
                                    {{item.pubDate ? item.pubDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--软件著作权信息-->
            <view v-if="type == '3.2'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.name ? item.name : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">登记号</view>
                                <view class="h2">
                                    {{item.registerNo?item.registerNo:'-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">著作权人</view>
                                <view class="h2">
                                    {{item.companyName?item.companyName:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">登记日期</view>
                                <view class="h2">
                                    {{item.registerAperDate ? item.registerAperDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">作品类型</view>
                                <view class="h2">
                                    {{item.category?item.category:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont">
                                <view class="h1">发布日期</view>
                                <view class="h2">
                                    {{item.publishDate ? item.publishDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--作品著作权信息-->
            <view v-if="type == '3.3'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.name ? item.name : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">登记号</view>
                                <view class="h2">
                                    {{item.registerNo ? item.registerNo : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">著作权人</view>
                                <view class="h2">
                                    {{item.owner ? item.owner : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">登记日期</view>
                                <view class="h2">
                                    {{item.registerDate ? item.registerDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">作品类型</view>
                                <view class="h2">
                                    {{item.category ? item.category : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont">
                                <view class="h1">发布日期</view>
                                <view class="h2">
                                    {{item.publishDate ? item.publishDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--网站信息-->
            <view v-if="type == '3.4'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.homeSite ? item.homeSite : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">网站类别</view>
                                <view class="h2">
                                    {{item.typeName ? item.typeName : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">域名</view>
                                <view class="h2">
                                    {{item.yuMing ? item.yuMing : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">网站备案/许可证号</view>
                                <view class="h2">
                                    {{item.beiAn ? item.beiAn : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">审核时间</view>
                                <view class="h2">
                                    {{item.sDate ? item.sDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--证书信息-->
            <view v-if="type == '3.5'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.name ? item.name : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">证书编号</view>
                                <view class="h2">
                                    {{item.certificateNumber ? item.certificateNumber : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">证书状态</view>
                                <view class="h2">
                                    {{item.currentState ? item.currentState : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">发证日期</view>
                                <view class="h2">
                                    {{item.startDate ? item.startDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--商标信息-->
            <view v-if="type == '4'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3" v-if="item.imageUrl">
                        <image :src="item.imageUrl" mode="heightFix"></image>
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">商标名称</view>
                                <view class="h2">
                                    {{item.name ? item.name : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">商标状态</view>
                                <view class="h2" v-if="item.status == 1">有效</view>
                                <view class="h2" v-if="item.status == 2">无效</view>
                                <view class="h2" v-if="item.status == 3">待定</view>
                                <view class="h2" v-if="item.status == 4">不定</view>
                                <view class="h2" v-if="item.status == 5">未知状态</view>
                                <view class="h2" v-if="item.status == null">-</view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">申请/注册号</view>
                                <view class="h2">
                                    {{item.regno ? item.regno : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">申请日期</view>
                                <view class="h2">
                                    {{item.appDate ? item.appDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">申请人名称</view>
                                <view class="h2">
                                    {{item.applicantCn ? item.applicantCn : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">商标类型</view>
                                <view class="h2">
                                    {{item.intClsDesc ? item.intClsDesc : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--商标信息-->
            <view v-if="type == '6'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.registerNo ? item.registerNo : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">登记日期</view>
                                <view class="h2">
                                    {{item.registerDate ? item.registerDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">登记机关</view>
                                <view class="h2">
                                    {{item.registerOffice ? item.registerOffice : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">被担保债权数额</view>
                                <view class="h2">
                                    {{item.debt_securedAmount ? item.debt_securedAmount : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">状态</view>
                                <view class="h2">
                                    {{item.status ? item.status : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">公示日期</view>
                                <view class="h2">
                                    {{item.registerDate ? item.registerDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--股权出质-->
            <view v-if="type == '7'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.registNo ? item.registNo : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">出质人</view>
                                <view class="h2">
                                    {{item.pledgor ? item.pledgor : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">证照/证件号码</view>
                                <view class="h2">
                                    {{item.pledgorNo ? item.pledgorNo : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">出质股权数额</view>
                                <view class="h2">
                                    {{item.pledgedAmount ? item.pledgedAmount : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">质权人</view>
                                <view class="h2">
                                    {{item.pledgee ? item.pledgee : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">证照/证件号码</view>
                                <view class="h2">
                                    {{item.pledgeeNo ? item.pledgeeNo : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">股权出质设立登记日期</view>
                                <view class="h2">
                                    {{item.regDate ? item.regDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">状态</view>
                                <view class="h2">
                                    {{item.status ? item.status : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">公示日期</view>
                                <view class="h2">
                                    {{item.regDate ? item.regDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--清算信息-->
            <view v-if="type == '9'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">清算组负责人</view>
                                <view class="h2">
                                    {{item.leader ? item.leader : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">清算组成员</view>
                                <view class="h2">
                                    {{item.member ? item.member : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--工商异常名录-->
            <view v-if="type == '10'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">列入异常名录原因</view>
                                <view class="h2">
                                    {{item.addReason ? item.addReason : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">列入日期</view>
                                <view class="h2">
                                    {{item.addDate ? item.addDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">移出经营异常原因</view>
                                <view class="h2">
                                    {{item.romoveReason ? item.romoveReason : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">移出日期</view>
                                <view class="h2">
                                    {{item.removeDate ? item.removeDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">作出决定单位</view>
                                <view class="h2">
                                    {{item.decisionOffice ? item.decisionOffice : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--被执行人信息-->
            <view v-if="type == '11.1'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.anNo ? item.anNo : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">执行法院</view>
                                <view class="h2">
                                    {{item.executeGov ? item.executeGov : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">执行标的</view>
                                <view class="h2">
                                    {{item.biaoDi ? item.biaoDi : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">立案时间</view>
                                <view class="h2">
                                    {{item.liAnDate ? item.liAnDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--失信被执行人信息-->
            <view v-if="type == '11.2'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.anNo ? item.anNo : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">被执行人履行情况</view>
                                <view class="h2">
                                    {{item.executeStatus ? item.executeStatus : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">法律文书确定的义务</view>
                                <view class="h2">
                                    {{item.yiWu ? item.yiWu : '-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">执行法院</view>
                                <view class="h2">
                                    {{item.executeUnit ? item.executeUnit : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">发布时间</view>
                                <view class="h2">
                                    {{item.publicDate ? item.publicDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--裁判文书信息-->
            <view v-if="type == '11.3'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.caseNo ? item.caseNo : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">标题</view>
                                <view class="h2">
                                    {{item.caseName ? item.caseName : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">类型</view>
                                <view class="h2" v-if="item.caseType=='ms'">民事案件</view>
                                <view class="h2" v-if="item.caseType=='zx'">执行案件</view>
                                <view class="h2" v-if="item.caseType=='xz'">行政案件</view>
                                <view class="h2" v-if="item.caseType=='zscq'">知识产权案件</view>
                                <view class="h2" v-if="item.caseType=='' || item.caseType==null">-</view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">执行法院</view>
                                <view class="h2">
                                    {{item.court ? item.court : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--法院公告信息-->
            <view v-if="type == '11.4'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.catagory ? item.catagory : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">公示时间</view>
                                <view class="h2">
                                    {{item.publicDate ? item.publicDate.substring(0,10) : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">当事人</view>
                                <view class="h2">
                                    {{item.litigant?item.litigant:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">公告内容</view>
                                <view class="h2">
                                    {{item.content ? item.content : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--企业舆情信息-->
            <view v-if="type == '12.1'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.title ? item.title : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">发生日期</view>
                                <view class="h2">
                                    {{item.publishTime ? item.publishTime.substring(0,10) : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">转载网站</view>
                                <view class="h2">
                                    {{item.source?item.source:'-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--招聘类信息-->
            <view v-if="type == '12.2'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.title ? item.title : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">工作内容（职位要求）</view>
                                <view class="h2">
                                    {{item.description ? item.description : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">发布日期</view>
                                <view class="h2">
                                    {{item.publishTime?item.publishTime.substring(0,10):'-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--招投标信息-->
            <view v-if="type == '12.3'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.title ? item.title : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">所属地区</view>
                                <view class="h2">
                                    {{item.provinceName ? item.provinceName : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">项目分类</view>
                                <view class="h2">
                                    {{item.channelName?item.channelName:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">发布日期</view>
                                <view class="h2">
                                    {{item.publishTime ? item.publishTime.substring(0,10) : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--融资信息-->
            <view v-if="type == '13.1'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">投资方</view>
                                <view class="h2">
                                    {{item.investment ? item.investment : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">级别</view>
                                <view class="h2">
                                    {{item.round?item.round:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">金额</view>
                                <view class="h2">
                                    {{item.amount ? item.amount : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">日期</view>
                                <view class="h2">
                                    {{item.date?item.date.substring(0,10):'-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--财务信息-->
            <view v-if="type == '13.2'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">公司实力等级(元)</view>
                                <view class="h2">
                                    {{item.revenueRange ? item.revenueRange : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">纳税区间(元)</view>
                                <view class="h2">
                                    {{item.taxRange?item.taxRange:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">销售净利润率</view>
                                <view class="h2">
                                    {{item.netProfitMargins ? item.netProfitMargins : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">销售毛利率</view>
                                <view class="h2">
                                    {{item.grossProfitMargins?item.grossProfitMargins:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">财务年度</view>
                                <view class="h2">
                                    {{item.year ? item.year : '-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--产品信息-->
            <view v-if="type == '13.3'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3" v-if="item.imageUrl">
                        <image :src="item.imageUrl" mode="heightFix"></image>
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">产品名</view>
                                <view class="h2">
                                    {{item.name ? item.name : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">所属领域</view>
                                <view class="h2">
                                    {{item.domain?item.domain:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">产品介绍</view>
                                <view class="h2">
                                    {{item.description ? item.description : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">网址</view>
                                <view class="h2">
                                    {{item.link?item.link:'-'}}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--抽查信息-->
            <view v-if="type == '14'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">检察实施机关</view>
                                <view class="h2">
                                    {{item.executiveOrg ? item.executiveOrg : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">类型</view>
                                <view class="h2">
                                    {{item.type?item.type:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">日期</view>
                                <view class="h2" v-if="item.date && item.date != '0001-01-01' && item.date != '0'">
                                    <uni-dateformat :date="item.date" format="yyyy-MM-dd"></uni-dateformat>
                                </view>
                                <view class="h2" v-if="!item.date || item.date == '0001-01-01' || item.date == '0'">
                                    -
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!--行政处罚信息-->
            <view v-if="type == '15'">
                <view class="li" v-for="(item,index) in dataList" :key="index">
                    <view class="h3">
                        {{item.docNo ? item.docNo : '-'}}
                    </view>
                    <view class="detailCode">
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">违法行为类型</view>
                                <view class="h2">
                                    {{item.penaltyType ? item.penaltyType : '-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">行政处罚内容</view>
                                <view class="h2">
                                    {{item.content?item.content:'-'}}
                                </view>
                            </view>
                        </view>
                        <view class="DetailMain clear">
                            <view class="codeFl codeFont borderRight">
                                <view class="h1">决定单位</view>
                                <view class="h2">
                                    {{item.officeName?item.officeName:'-'}}
                                </view>
                            </view>
                            <view class="codeFr codeFont paddingRight">
                                <view class="h1">决定日期</view>
                                <view class="h2" v-if="item.penaltyDate && item.penaltyDate != '0001-01-01' && item.penaltyDate != '0'">
                                    {{item.penaltyDate.substring(0,10)}}
                                </view>
                                <view class="h2" v-if="!item.penaltyDate || item.penaltyDate == '0001-01-01' || item.penaltyDate == '0'">
                                    -
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <uni-load-more status="loading" v-if="loading"></uni-load-more>
        <uni-load-more status="noMore" v-if="noMore"></uni-load-more>
        <noData info="暂无信息" style="margin-top: 200rpx;" v-if="noData"></noData>
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
                type:'',
                title:'',
                companyId:'',
                companyName:'',
                dataList:[],
                pageNo:1,
                noData:false,
                noMore:false,
                loading:false,
                totalPages:0
            }
        },
        onLoad(options) {
            console.log(options);
            this.type = options.type;
            this.title = options.title;
            this.companyId = options.companyId;
            this.companyName = options.companyName;
            uni.setNavigationBarTitle({
                title: this.title
            });
            this.conditionSearch();
        },
        onShow(){

        },
        methods: {
            getBasicInfo(type){
                console.log(type);
                let url = '/enterprise/detail/xhsRest/baseMsg';

                switch (type) {
                    case '1.1':  // 股权结构
                        url += '/getCompanyPartnersByPage';
                        break;
                    case '1.2': // 对外投资
                        url += '/getOperationInvestInfoByPage';
                        break;
                    case '1.3': // 分支机构
                        url += '/getCompanyBranchesByPage';
                        break;
                    case '2.1': // 工商记录变更
                        url += '/getCompanyChangeRecordsByPage';
                        break;
                    case '2.2': // 经营范围变更
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
                    case '4': // 商标信息
                        url += '/getAssetTmInfoByPage';
                        break;
                    case '6': // 动产抵押
                        url += '/getOperationMpledgeByPage';
                        break;
                    case '7': // 股权出质
                        url += '/getOperationPledgeByPage';
                        break;
                    case '9': // 清算信息
                        url += '/getOperationLiquidationByPage';
                        break;
                    case '10': // 工商异常名录
                        url += '/getCompanyOpexceptionByPage';
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
                    case '12.1': // 企业舆情信息
                        url += '/getOperationNewsInfoByPage';
                        break;
                    case '12.2': // 招聘信息
                        url += '/getOperationRecruitInfoByPage';
                        break;
                    case '12.3': // 招投标信息
                        url += '/getOperationTenderInfoByPage';
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
                    case '14': //抽查信息
                        url += '/getOperationSpotcheckByPage';
                        break;
                    case '15': //行政处罚信息
                        url += '/getDetailOperationPenaltyByPage';
                        break;
                }

                return request(url,{
                    method:'post',
                    data:{
                        companyId: this.companyId,
                        companyName: this.companyName,
                        pageNo: this.pageNo,
                        pageSize: 10
                    }
                },true)
            },
            conditionSearch(){
                this.loading = true;
                this.getBasicInfo(this.type).then(result => {
                    console.log(result);
                    if (result.stateCode == '60111'){
                        this.dataList = this.dataList.concat(result.data.returnData);
                        this.totalPages = result.data.totalPages;
                        if( this.type == '1.2'){
                            this.dataList.forEach(item =>{
                                item.no = item.creditCode ?  item.creditCode : item.no;
                                item.identifyNo = item.creditCode ? item.creditCode : item.identifyNo;
                            })
                        }

                        if(this.type == '1.1'){
                            this.dataList.forEach(item =>{
                                item.identifyNo = item.creditCode ? item.creditCode : item.identifyNo;
                            })
                        }
                        this.loading = false;
                    }

                    if (this.dataList.length == 0) {
                        this.noData = true;
                        this.loading = false;
                    }
                })
            }
        },
        onReachBottom(){
            if(this.pageNo == this.totalPages) return this.noMore = true;
            this.loading = true;
            this.pageNo ++;
            this.conditionSearch();
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
        font-size: 26rpx;
        font-weight: bold;
        color: #000;
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
