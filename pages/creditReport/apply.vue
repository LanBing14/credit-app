<template>
  <view class="form">
    <uni-forms class="formDetail" ref="form" :modelValue="formData" :rules="rules">
      <uniSection title="信用报告" type="line"/>
      <uni-forms-item label="企业名称">
        <uni-easyinput :inputBorder="false" placeholder="请填写企业名称" v-model="report.name" type="text" disabled/>
      </uni-forms-item>
      <uni-forms-item label="统一社会信用代码">
        <uni-easyinput :inputBorder="false" placeholder="自动带入" v-model="report.reportDate" type="text" disabled/>
      </uni-forms-item>
      <uni-forms-item label="报告类型">
		  <view class="inputBox">
			  <uni-combox  :candidates="candidates" placeholder="标准版"v-model="report.researchTypeDesc"></uni-combox>
		  </view>
		  <view class="imgIconbox">
		  	<image src="../../static/icon/sc.png" mode="" class="imgIcon1"></image>
			报告样例
		  </view>
      </uni-forms-item>
    
      <uniSection title="报告申请人信息" type="line"/>
      <uni-forms-item name="applyName" label="申请人姓名">
        <uni-easyinput :inputBorder="false" v-model="formData.applyName" type="text" placeholder="请输入联系人名称" />
      </uni-forms-item>
      <uni-forms-item name="phone" label="联系人电话">
        <uni-easyinput :inputBorder="false" v-model="formData.phone" type="text" placeholder="请填写电话" />
      </uni-forms-item>
      <uniSection title="接收方式" type="line"/>
      <uni-forms-item name="email" label="电子邮箱">
        <uni-easyinput :inputBorder="false" v-model="formData.email" type="text" placeholder="请填写接收的电子邮箱" />
      </uni-forms-item>
    </uni-forms>
    <button class="button btn"  type="primary" @click="submit">提交</button>
  </view>
</template>
<script>
import uniSection from "@/components/uni-section/uni-section"
import {dateFormat} from "@/utils/utils.js";
import {Api_getResearchReportById, Api_saveResearchReportApply} from "../../api/creditResearch";
export default{
  components:{
    uniSection
  },
  data() {
    return{
	  candidates:['基础版','标准版','深度版'],
      formData: {},
      report: {},
      index: "",
      array: [1,2,3],
      rules: {
        applyName: {
          rules: [{
            required: true,
            errorMessage: '请输入联系人名称',
          },
            {
              maxLength: 50,
              errorMessage: '联系人最多输入 {maxLength} 个字符',
            }
          ]
        },
        phone: {
          rules: [{
            required: true,
            errorMessage: '请输入联系电话',
          },
            {
              validateFunction:function(rule,value,data,callback){
                const reg =  /^((0\d{2,3}-\d{7,8})|(1[3|4|5|7|8|9]\d{9}))$/;
                if (!reg.test(value)) {
                  callback('联系电话格式不正确')
                }
                return true
              }
            }
          ]
        },
        email: {
          rules: [{
            required: true,
            errorMessage: '请输入电子邮箱',
          },
            {
              validateFunction:function(rule,value,data,callback){
                const reg =  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (!reg.test(value)) {
                  callback('邮箱格式不正确')
                }
                return true
              }
            }
          ]
        }
      }
    }

  },
  onLoad: function (option) {
    this.formData.researchReportId = option.researchReportId;

    // 获取详情
    let that = this;
    Api_getResearchReportById(this.formData.researchReportId).then(res => {
      if (res.stateCode == '1') {
        if (res.data.reportDate) {
          res.data.reportDate = dateFormat(res.data.reportDate, 'yyyy-MM-dd');
        }
        that.report = res.data;
      }
    });
  },
  methods: {
    bindPickerChange(e) {
      this.index = e.target.value;
      this.formData.content = this.array[this.index];
    },
    submit(){
      let that = this;
      this.$refs.form.validate().then(res=>{
        res.researchReportId = that.formData.researchReportId;
        console.log('表单数据信息：', res);
        Api_saveResearchReportApply(res).then(result => {
          if (result.stateCode == '1') {
            uni.showToast({
              title: '提交成功',
              mask: false,
              duration: 1500
            });
            setTimeout(function() {
              uni.navigateBack({
                delta: 1
              });
            }, 2000);
          } else {
            uni.showToast({
              icon:'none',
              title: '提交失败',
              mask: false,
              duration: 1500
            });
          }
        });
      }).catch(err =>{
        console.log('表单错误信息：', err);
      })
    }
  }
}
</script>
<style>
page{
  background: #f6f6f6;
}
</style>
<style scoped lang="scss">

/deep/ .is-disabled {
  background: #fff !important;
}
/deep/ .uni-input-input:disabled {
  background: #fff;
}

.form{

  .button{
    background: #113090;
    margin:125rpx 30rpx 0;
  }
  .uni-easyinput{
    text-align: right;
  }
  /deep/ .uni-forms-item{
    background: #fff;
    padding: 0 30rpx;
  }
  /deep/ .uni-forms-item__inner{
    padding: 30rpx 0;
    border-bottom: 1px solid #e5e5e5;
  }
}

.inputBox {
	width: 20%;
	position: absolute;
	right: 150rpx;
	top: 35rpx;
	/deep/ .uni-combox{
	  border: none;
	 .uni-icons{
		color: #fff!important;  
	  }
	  .uniui-bottom:before,
	  .uniui-top:before{
		content:''!important;
	  }
	}
	
}
.imgIconbox{
	position: absolute;
	right: 0;
	top: 50rpx;
	color: #113090;
	display: flex;
	justify-content: center;
	align-items: center;
	.imgIcon1{
		width: 24rpx;
		height: 26rpx;
		margin-right: 10rpx;
		font-size: 24rpx;
	}
}
</style>
