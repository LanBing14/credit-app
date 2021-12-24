<template>
    <view class="repair">
        <view class="repairMain">
            <uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
                <view class="li">
                    <uni-forms-item label-width="80" label="企业名称" required name="companyName">
                        <uni-easyinput v-model="customFormData.companyName" @input="companyNameInput" @blur="companyNameBlur" placeholder="请输入需要信用修复的公司/单位名称" />
                    </uni-forms-item>
                    <view class="companyList" v-if="isCompanyList">
                        <view class="ol" v-for="(item,index) in companyList" :key="index" @click="companyListClick(item)">
                            {{item.companyName}}
                        </view>
                    </view>
                </view>
                <view class="li">
                    <uni-forms-item label-width="160" label="统一社会信用代码" required name="creditCode">
                        <uni-easyinput v-model="customFormData.creditCode" disabled placeholder="请输入统一社会信用代码" />
                    </uni-forms-item>
                </view>
                <view class="li">
                    <uni-forms-item label-width="70" label="联系人" required name="name">
                        <uni-easyinput v-model="customFormData.name" placeholder="请输入联系人名称" />
                    </uni-forms-item>
                </view>
                <view class="li">
                    <uni-forms-item label-width="80" label="联系电话" required name="phone">
                        <uni-easyinput v-model="customFormData.phone" placeholder="请输入联系电话" />
                    </uni-forms-item>
                </view>
                <view class="li">
                    <uni-forms-item label-width="140" label="拟参与培训人数" required name="trainNumber">
                        <uni-easyinput v-model="customFormData.trainNumber" placeholder="请输入拟参与培训人数" />
                    </uni-forms-item>
                </view>
                <view class="li">
                    <uni-forms-item label-width="140" label="拟参与培训地点" required name="keyTrainAdd">
                        <picker @change="bindPickerChange" :value="trainIndex" :range="trainAdd">
                            <view class="uni-input">{{trainAdd[trainIndex]}}</view>
                        </picker>
                    </uni-forms-item>
                </view>
            </uni-forms>
        </view>
        <view class="submit" @click="submit('customForm')">
            提交
        </view>
    </view>
</template>

<script>
    import {mobile,number} from "../../validators/validate";
    import request from "../../utils/request";

    export default {
        components: {

        },
        data () {
            return {
                // 自定义表单校验规则
                customRules: {
                    companyName: {
                        rules: [{
                            required: true,
                            errorMessage: '企业名称不能为空！'
                        }]
                    },
                    creditCode: {
                        rules: [{
                            required: true,
                            errorMessage: '统一社会信用代码不能为空！'
                        }]
                    },
                    name: {
                        rules: [
                            {
                                required: true,
                                errorMessage: '联系人不能为空！'
                            },
                            {
                                minLength: 0,
                                maxLength: 10,
                                errorMessage: '联系人长度不能超过 {maxLength} 个字符',
                            }
                        ]
                    },
                    phone: {
                        rules: [
                            {
                                required: true,
                                errorMessage: '联系电话不能为空！'
                            },
                            {
                                validateFunction(rule, value, data, callback) {
                                    mobile(value) ? '' : callback('您输入的手机号格式有误')
                                    return true
                                }
                            }
                        ]
                    },
                    trainNumber: {
                        rules: [
                            {
                                required: true,
                                errorMessage: '培训人数不能为空！'
                            },
                            {
                                validateFunction(rule, value, data, callback) {
                                    number(value) ? '' : callback('培训人数不可输入非数字格式')
                                    return true
                                }
                            },
                            {
                                minLength: 0,
                                maxLength: 3,
                                errorMessage: '培训人数最大长度不超过 {maxLength} 个字符',
                            }
                        ]
                    },
                    keyTrainAdd: {
                        rules: [
                            {
                                required: true,
                                errorMessage: '请选择培训地点！'
                            }
                        ]
                    }

                },
                // 自定义表单数据
                customFormData: {
                    companyName:'',
                    creditCode:'',
                    name:'',
                    phone:'',
                    trainNumber:'',
                    keyTrainAdd:''
                },
                trainAdd: [],
                trainIndex: 0,
                isCompanyList:false,
                companyList:[],
                isClick:false
            }
        },
        onLoad() {
            this.trainAdd = [
                '合肥市',
                '北京市',
                '福州市',
                '兰州市',
                '广州市',
                '南宁市',
                '贵阳市',
                '海口市',
                '郑州市',
                '哈尔滨市',
                '武汉市',
                '长沙市',
                '长春市',
                '南京市',
                '南昌市',
                '沈阳市',
                '呼和浩特市',
                '银川市',
                '西宁市',
                '济南市',
                '太原市',
                '西安市',
                '上海市',
                '成都市',
                '乌鲁木齐市',
                '昆明市',
                '杭州市',
                '重庆市',
            ];
            this.customFormData.keyTrainAdd = this.trainAdd[this.trainIndex];
        },
        onShow(){

        },
        methods: {
            submit(ref) {
                this.$refs[ref].validate().then(res => {
                    request('/enterprise/detail/xhsRest/applyRecord/save',{
                        method:'post',
                        data:{
                            companyName:res.companyName,
                            creditCode:res.creditCode,
                            linkName:res.name,
                            phoneNo:res.phone,
                            trainCount:res.trainNumber,
                            address:res.keyTrainAdd,
                        }
                    }).then(data => {
                        if(data.stateCode == '1'){
                            uni.showToast({
                                title: `提交成功`
                            })
                            uni.navigateTo({
                                url:'/pages/creditRepair/index'
                            })
                        } else{
                            uni.showToast({
                                title: `提交失败`,
                                icon:'error'
                            })
                        }
                    })
                    /*uni.showToast({
                        title: `校验通过`
                    })*/
                }).catch(err => {
                    // console.log('err', err);
                })
            },
            bindPickerChange(e){
                this.trainIndex = e.target.value
                this.customFormData.keyTrainAdd = this.trainAdd[e.target.value];
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
                this.isClick = true;
                this.customFormData.companyName = item.companyName;
                this.customFormData.creditCode = item.creditCode;
                this.isCompanyList = false;
                setTimeout(() => {
                    this.isClick = false;
                },1000);
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
    page{
        background: #f6f6f6;
    }
    .repairMain{
        background: #fff;
        padding:0 30rpx;
    }
    .repairMain .li{
        height: 97rpx;
        border-bottom:1rpx solid #e5e5e5;
        position: relative;
    }
    .repairMain .li:last-child{
        border-bottom:0;
    }
    /deep/.uni-forms-item__label{
        height: 97rpx !important;
        padding:0 !important;
    }
    /deep/.uni-forms-item__label .label-text{
        font-size: 30rpx !important;
        color: #222 !important;
    }
    /deep/.is-required{
        font-size: 30rpx !important;
        margin-right: 5rpx !important;
    }
    /deep/.uni-forms-item__inner{
        padding-bottom: 0 !important;
    }
    /deep/.uni-forms-item__content{
        min-height:97rpx !important;
    }
    /deep/.uni-easyinput__content{
        min-height:97rpx !important;
        border:none !important;
        text-align: right;
    }
    /deep/.uni-easyinput__content-input{
        font-size: 28rpx !important;
        padding-right: 10rpx;
    }
    /deep/.uni-easyinput__placeholder-class{
        font-size: 28rpx !important;
    }
    /deep/.uni-error-message{
        padding-left: 0 !important;
    }
    uni-picker{
        text-align: right;
        height: 97rpx;
        line-height: 97rpx;
        padding-right: 10rpx;
        font-size: 28rpx;
    }
    .submit{
        margin: 0 30rpx;
        width: calc(100% - 60rpx);
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 32rpx;
        color: #fff;
        background: #113090;
        border-radius: 10rpx;
        margin-top: 70rpx;
    }
    .companyList{
        position: absolute;
        top: 97rpx;
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
