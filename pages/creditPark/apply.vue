<template>
    <view class="form">
          <uni-forms class="formDetail" ref="form" :modelValue="formData" :rules="rules">
              <uni-forms-item required name="parkName" label="园区名称">
                <uni-easyinput :inputBorder="false" v-model="formData.parkName" type="text" placeholder="请输入所在园区名称" />
              </uni-forms-item>
              <uni-forms-item required name="parkAddress" label="园区地址">
                  <uni-easyinput :inputBorder="false" v-model="formData.parkAddress" type="text" placeholder="请输入园区地址" />
              </uni-forms-item>
             <uni-forms-item required name="applyName" label="联系人">
                <uni-easyinput :inputBorder="false" v-model="formData.applyName" type="text" placeholder="请输入联系人名称" />
            </uni-forms-item>
              <uni-forms-item required name="phone" label="联系电话">
                <uni-easyinput :inputBorder="false" v-model="formData.phone" type="text" placeholder="请输入联系电话" />
            </uni-forms-item>
        </uni-forms>
         <button class="button btn"  type="primary" @click="submit">提交</button>
    </view>
</template>
<script>
	import {Api_saveParkApply} from "../../api/park";
export default{
    data() {
        return{
            formData: {},
            index: "",
            rules: {
                 parkName: {
                     rules: [{
                             required: true,
                             errorMessage: '请输入园区名称',
                         },
                         {
                             maxLength: 50,
                             errorMessage: '园区名称最多输入 {maxLength} 个字符',
                         }
                     ]
                 },
                 parkAddress: {
                     rules: [{
                             required: true,
                             errorMessage: '请输入园区地址',
                         },
                 		{
                 		    maxLength: 100,
                 		    errorMessage: '园区地址最多输入 {maxLength} 个字符',
                 		}
                     ]
                 },
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
                 }
            }
        }
      
    },
    onLoad(options){
         
    },
    methods: {
        submit(){
            this.$refs.form.validate().then(res=>{
                console.log('表单数据信息：', res);
				Api_saveParkApply(res).then(result => {
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
        height: 100%;
    }
</style>
<style scoped lang="scss">
    .form{
        position: relative;
        height:100%;
           .button{
                width: 100%;
                position: absolute;
                left:30rpx;
                bottom: 45rpx;
                background: #113090;
        }
       
        .formDetail{
            background: #fff;
            padding: 0 30rpx;
        }
        .uni-easyinput,.uni-forms-item{
            text-align: right;
        }
       /deep/ .uni-forms-item__inner{
            padding: 30rpx 0;
            border-bottom: 1px solid #e5e5e5;
        }  
   }
</style>
