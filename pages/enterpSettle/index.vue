<template>
    <view class="enterpSettle">
        <uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" :label-position="'top'">
            <uni-forms-item label-width="180" label="企业类型（必选）" name="companyType">
                <uni-data-checkbox @change="companyTypeChange" v-model="customFormData.companyType" :localdata="companyType" />
            </uni-forms-item>
            <uni-forms-item label-width="180" label="企业名称（必选）" name="companyName">
                <uni-easyinput v-model="customFormData.companyName" @input="companyNameInput" @blur="companyNameBlur" placeholder="请输入公司/单位名称" />
                <view class="companyList" v-if="isCompanyList">
                    <view class="ol" v-for="(item,index) in companyList" :key="index" @click="companyListClick(item)">
                        {{item.companyName}}
                    </view>
                </view>
            </uni-forms-item>
            <uni-forms-item label-width="250" label="统一社会信用代码（必选）" name="creditCode">
                <uni-easyinput :disabled="creditCodeDisabled" v-model="customFormData.creditCode" placeholder="请输入统一社会信用代码" />
            </uni-forms-item>
            <uni-forms-item label-width="180" label="联系人（必选）" name="name">
                <uni-easyinput v-model="customFormData.name" placeholder="请输入联系人名称" />
            </uni-forms-item>
            <uni-forms-item label-width="180" label="联系电话（必选）" name="mobile" class="inputMobile">
                <uni-easyinput v-model="customFormData.mobile" placeholder="请输入联系电话" />
                <button class="settleBtn" :disabled="sum !== 61" @click="codeClick('customForm')">
                    {{sum == 61 ? '发送验证码' : sum + 's'}}
                </button>
            </uni-forms-item>
            <uni-forms-item label-width="180" label="验证码（必选）" name="code">
                <uni-easyinput v-model="customFormData.code" maxlength="6" placeholder="请输入验证码" />
            </uni-forms-item>
            <uni-forms-item label-width="180" label="电子邮箱" name="email">
                <uni-easyinput v-model="customFormData.email" placeholder="请输入您的电子邮箱地址" />
            </uni-forms-item>
            <uni-forms-item label-width="180" label="公司座机" name="phone">
                <uni-easyinput v-model="customFormData.phone" placeholder="请输入您的公司座机号码" />
            </uni-forms-item>
            <uni-forms-item label-width="180" label="请上传您的营业执照" name="permit">
                <uni-file-picker limit="1" @select="fileSuccess"></uni-file-picker>
            </uni-forms-item>
            <uni-forms-item label="" name="agree">
                <view class="agree">
                    <uni-data-checkbox v-model="customFormData.hobby" multiple :localdata="agree" />
                    <text class="agreeText">《新华信用企业入驻协议》</text>
                </view>
            </uni-forms-item>
        </uni-forms>
        <view class="submit" @click="submit('customForm')">
            提交
        </view>
        <!--底部分享栏占位-->
        <view style="height: 108rpx;padding-bottom: constant(safe-area-inset-bottom);padding-bottom: env(safe-area-inset-bottom);box-sizing: content-box"></view>
        <!--底部分享栏-->
        <view class="infoShare clear">
            <view class="shareFl clear">
                <view class="li">
                    企业入驻获取更多信用业务
                </view>
            </view>
            <view class="shareFr">
                样例查看
            </view>
        </view>
    </view>
</template>

<script>
    import {mobile,telephone} from '../../validators/validate'
    import request from "../../utils/request";
    export default {
        data () {
            return {
                // 自定义表单校验规则
                customRules: {
                    companyType: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择企业类型'
                        }]
                    },
                    companyName:{
                        rules:[{
                            required: true,
                            errorMessage: '企业名称不能为空'
                        }]
                    },
                    creditCode:{
                        rules:[
                            {
                                required: true,
                                errorMessage: '统一社会信用代码不能为空'
                            },
                            {
                                minLength: 0,
                                maxLength: 50,
                                errorMessage: '统一社会信用代码不得大于{maxLength}个字符',
                            }
                        ]
                    },
                    name:{
                        rules:[{
                            required: true,
                            errorMessage: '联系人不能为空'
                        },{
                            minLength: 0,
                            maxLength: 20,
                            errorMessage: '联系人不得大于{maxLength}个字符',
                        }]
                    },
                    mobile:{
                        rules:[{
                            required: true,
                            errorMessage: '联系电话不能为空'
                        },{
                            validateFunction(rule, value, data, callback) {
                                mobile(value) ? '' : callback('您输入的手机号格式有误')
                                return true
                            }
                        }]
                    },
                    code:{
                        rules:[{
                            required: true,
                            errorMessage: '验证码不能为空'
                        }]
                    },
                    email:{
                        rules:[{
                            format: 'email',
                            errorMessage: '您输入的邮箱格式有误'
                        }]
                    },
                    phone:{
                        rules:[{
                            validateFunction(rule, value, data, callback) {
                                telephone(value) ? '' : callback('您输入的座机号码格式有误')
                                return true
                            }
                        }]
                    },
                    agree:{
                        rules:[{
                            required: true,
                            errorMessage: '请勾选企业入驻协议'
                        }]
                    }

                },
                // 自定义表单数据
                customFormData: {
                    companyType: 1,
                    companyName:'',
                    creditCode:'',
                    name:'',
                    mobile:'',
                    code:'',
                    email:'',
                    phone:'',
                    permit:''
                },
                // 企业类型数据
                companyType: [{
                    text: '企业',
                    value: 1
                }, {
                    text: '非企业',
                    value: 2
                }],
                // 复选框
                agree: [{
                    text: '提交入驻后自动为您开通账号，请您阅读并接受',
                    value: 0
                }],
                creditCodeDisabled:false,
                companyId:'',
                imageValue:[],
                isCompanyList:false,
                companyList:[],
                isClick:false,
                sum:61
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            if(this.customFormData.companyType == 1){
                this.creditCodeDisabled = true;
            }else{
                this.creditCodeDisabled = false;
            }

            if(this.companyId){

                this.getESCompanyByCompanyId();
            }

        },
        onShow(){

        },
        methods: {
            submit(ref) {
                console.log(ref);
                this.$refs[ref].validate().then(res => {
                    this.verifySMSCode(res);
                }).catch(err => {
                    console.log('err', err);
                })
            },
            verifySMSCode(res){
                request('/user/center/xhsRest/validateSmsCode',{
                    method:'get',
                    data:{
                        mobile:res.mobile,
                        smsCode:res.code
                    }
                }).then(result => {
                    if (result.stateCode === '00002') {
                        uni.showModal({
                            title:'',
                            content:'短信验证码错误',
                            showCancel: false
                        })
                        return;
                    } else if (result.stateCode === '00003') {
                        uni.showModal({
                            title:'',
                            content:'短信验证码超时，请重新获取',
                            showCancel: false
                        })
                        return;
                    } else if (result.stateCode === '00004') {
                        uni.showModal({
                            title:'',
                            content:'短信验证码无效，请重新获取',
                            showCancel: false
                        })
                        return;
                    } else {
                        this.saveFactorySuperior(res);
                    }
                })
            },
            saveFactorySuperior(res){
                request('/enterprise/detail/xhsRest/Intention/saveIntentionMessage',{
                    method:'post',
                    data:{
                        businessLicence:res.permit,
                        captcha:res.code,
                        code:res.creditCode,
                        companyName:res.companyName,
                        companyType:res.companyType,
                        email:res.email,
                        name:res.name,
                        phone:res.mobile,
                        telephone:res.phone,
                        type:'2'
                    }
                }).then(data => {
                    if (data.stateCode == '1') {
                        uni.showModal({
                            title:'',
                            content:'感谢您提交资料，我们将尽快审核。预计三个工作日内会有线下客服与您联系，请您注意保持电话畅通。',
                            success: function (res) {
                                if (res.confirm) {
                                    //跳转到个人中心页面
                                    console.log('用户点击确定');
                                } else if (res.cancel) {

                                }
                            }
                        })
                    } else {
                        uni.showModal({
                            title:'',
                            content:'保存失败',
                            showCancel:false
                        })
                    }
                })
            },
            codeClick(ref){
                this.$refs[ref].validateField(['mobile']).then(res => {
                    this.sum = 60;
                    this.timer = setInterval(() => {
                        this.sum--;
                        if (this.sum < 1) {
                            clearInterval(this.timer);
                            this.sum = 61;
                        }
                    }, 1000);
                    request('/user/center/xhsRest/getSmsCode',{
                        method:'get',
                        data:{
                            mobile:res.mobile,
                            msg:'入驻新华信用验证'
                        }
                    }).then(result => {
                        if (result.stateCode == '00001') {
                            uni.showToast({
                                title: `短信发送成功`
                            })
                        } else if (result.stateCode == '00005') {
                            // 获取短信验证码受限，访问次数达到上限
                            uni.showModal({
                                title:'',
                                content:'获取短信验证码受限，由于您今日请求次数已达上限，请明日再试。如需紧急帮助，可联系客服，客服电话：010-88052705。',
                                showCancel:false
                            })
                            clearInterval(this.timer);
                            this.sum = 61;
                        } else {
                            uni.showModal({
                                title:'',
                                content:'信息发送失败，请重新发送！',
                                showCancel:false
                            })
                            clearInterval(this.timer);
                            this.sum = 61;
                        }
                    })
                }).catch(err => {
                    console.log('err', err);
                })
            },
            companyTypeChange(e){
                if(e.detail.value == 1){
                    this.creditCodeDisabled = true;
                } else{
                    this.creditCodeDisabled = false;
                    this.customFormData.companyName = '';
                    this.customFormData.creditCode = '';
                }
            },
            getESCompanyByCompanyId(){
                request('/enterprise/detail/xhsRest/search/getESCompanyByCompanyId',{
                    method:'post',
                    data:{
                        companyId:this.companyId
                    }
                }).then(res => {
                    if (res.data.returnData) {
                        console.log(res.data.returnData);
                        this.customFormData.companyName = res.data.returnData[0].name;
                        this.customFormData.creditCode = res.data.returnData[0].creditCode;
                    }
                })
            },
            fileSuccess(e){
                e.tempFilePaths.forEach(item =>{
                    uni.uploadFile({
                        url: `${this.website}/zuul/xhsCreditApi/v1/user/center/common/file/ajaxUpload`,
                        filePath: item,
                        name: 'files',
                        success: (uploadFileRes) => {
                            this.customFormData.permit = JSON.parse(uploadFileRes.data).success[0];
                        }
                    });
                })
            },
            companyNameInput(e){
                if(e != ''){
                    request('/user/center/xhsRest/getEnterpriseInfo',{
                        method:'post',
                        data:{
                            companyName:e
                        }
                    },true).then(res => {
                        if(res.data.length > 0){
                            this.isCompanyList = true;
                            this.companyList = res.data;
                        }
                    })
                } else{
                    this.isCompanyList = false;
                    this.customFormData.creditCode = '';
                }
            },
            companyListClick(item){
                console.log('123456');
                console.log(item);
                request('/user/center/xhsRest/certifi/isHasCertific',{
                    method:'get',
                    data:{
                        companyId:item.companyId
                    }
                }).then(res => {
                    if (res.data == '3') {
                        uni.showModal({
                            title:'',
                            content:'该企业已入驻，请选择其他企业！',
                            showCancel:false
                        })
                    } else{
                        this.isClick = true;
                        this.customFormData.companyName = item.companyName;
                        this.customFormData.creditCode = item.creditCode;
                        this.isCompanyList = false;
                        setTimeout(() => {
                            this.isClick = false;
                        },1000);
                    }
                })
            },
            companyNameBlur(){
                setTimeout(() => {
                    if(!this.isClick){
                        this.customFormData.companyName = '';
                        this.customFormData.creditCode = '';
                        this.isCompanyList = false;
                    }
                },300)
            }
        }
    }
</script>

<style>
    .enterpSettle{
        padding:29rpx;
    }
    /deep/.uni-data-checklist{
        display: inline-block;
    }
    /deep/.uni-forms-item__label .label-text{
        font-size: 30rpx !important;
        color: #222;
    }
    /deep/.uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text{
        font-size: 28rpx !important;
    }
    /deep/.uni-forms-item__inner{
        padding-bottom: 35rpx !important;
    }
    /deep/.uni-forms-item__label{
        padding: 0 !important;
        height: auto !important;
        padding-bottom: 12rpx !important;
    }
    /deep/.uni-easyinput__placeholder-class{
        font-size: 28rpx !important;
        color: #6f6f6f;
    }
    /deep/.uni-easyinput__content{
        height: 80rpx !important;
    }
    /deep/.uni-easyinput__content-input{
        font-size: 28rpx !important;
        color: #222;
    }
    /deep/.is-input-border{
        border-radius: 0 !important;
        border-top: none !important;
        border-left: 0 !important;
        border-right: 0 !important;
    }
    /deep/.agree .uni-data-checklist .checklist-group .checklist-box{
        margin-right: 0 !important;
    }
    /deep/.agree .uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text{
        font-size: 24rpx !important;
        color: #666 !important;
    }
    /deep/.inputMobile .uni-icons{
        position: relative;
        right: 175rpx;
    }
    .agreeText{
        font-size: 24rpx;
        color: #2e5ad1;
        position: relative;
        top: -4rpx;
        line-height: 36rpx;
    }
    .permit{
        width: 313rpx;
        height: 196rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%,-50%);
    }
    .permit image{
        width: 100%;
        height: 100%;
    }
    .submit{
        width: 100%;
        height: 75rpx;
        background: #4159a6;
        font-size: 30rpx;
        color: #fff;
        text-align: center;
        line-height: 75rpx;
        border-radius: 10rpx;
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
        height: 60rpx;
        float: left;
        margin-top: 24rpx;
        font-size: 24rpx;
        color: #fff;
        line-height: 60rpx;
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
    .settleBtn{
        display: inline-block;
        position: absolute;
        background: none;
        right: 0;
        bottom: 63rpx;
        width: 155rpx;
        height: 30rpx;
        line-height: 30rpx;
        font-size: 24rpx;
        color: #113090;
        border-left:1rpx solid #d2d2d2;
        border-radius: 0;
        padding: 0;
    }
    .settleBtn:after{
        border:none;
    }
    .companyList{
        position: absolute;
        top: 130rpx;
        left: 0;
        right: 0;
        background: #f6f6f6;
        padding:10rpx 20rpx;
        z-index: 1;
    }
    .companyList .ol{
        line-height: 60rpx;
        font-size: 25rpx;
        color: #333;
    }
</style>
