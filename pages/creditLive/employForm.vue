<template>
	<view>
		<view class="form">
			<uni-forms :rules="rules" :value="formData" ref="form">
				<view class="formBox">
					<view class="formTitle">
						<text>*</text>申请收录账号所在平台
					</view>
					<view class="formInput iconfont icon-jiantou">
						<picker @change="bindPickerChange" :range="select">
							<view class="uni-input">{{selectTitle == 'douyin' ? '抖音' : '快手'}}</view>
						</picker>
					</view>
				</view>
				<view class="formBox">
					<view class="formTitle">
						<text>*</text>申请收录{{type == '1' ? '账号' : 'mcn机构'}}名称
					</view>
					<view class="formInput">
						<uni-forms-item name="accountName">
							<input type="text" maxlength="100" v-model="formData.accountName" @input="binddata('accountName',$event.detail.value)" :placeholder="'请输入申请收录' + (type == '1' ? '账号' : 'mcn机构') + '名称'">
						</uni-forms-item>
					</view>
				</view>
				<view class="formBox">
					<view class="formTitle">
						<text v-if="type=='1'">*</text>申请收录{{type == '1' ? '账号id（抖音号/快手号）' : 'mcn机构关联企业'}}
					</view>
					<view class="formInput">
						<uni-forms-item name="accountId" v-if="type == '1'">
							<input type="text" maxlength="100" v-model="formData.accountId" @input="binddata('accountId',$event.detail.value)" placeholder="请输入申请收录账号id（抖音号/快手号）">
						</uni-forms-item>
						<uni-forms-item name="companyName" v-else>
							<input type="text" maxlength="100" v-model="formData.companyName" @input="binddata('companyName',$event.detail.value)" placeholder="请输入申请mcn机构关联企业">
						</uni-forms-item>
					</view>
				</view>
				<view class="formBox">
					<view class="formTitle">
						备注
					</view>
					<view class="formInput formTextarea">
						<uni-forms-item name="content">
							<textarea maxlength="200" v-model="formData.content" @input="binddata('content',$event.detail.value)" />
						</uni-forms-item>
					</view>
				</view>
				<view class="formBox">
					<view class="formTitle">
						<text>*</text>联系人
					</view>
					<view class="formInput">
						<uni-forms-item name="name">
							<input type="text" maxlength="50" v-model="formData.name" @input="binddata('name',$event.detail.value)">
						</uni-forms-item>
					</view>
				</view>
				<view class="formBox">
					<view class="formTitle">
						<text>*</text>联系电话
					</view>
					<view class="formInput formPhone">
						<uni-forms-item name="phone">
							<input type="text" maxlength="11" v-model="formData.phone" @input="binddata('phone',$event.detail.value)" >
						</uni-forms-item>
						<button @tap="sendMsg()" :disabled="sum !== 61">{{sum == 61 ? '发送验证码' : sum + 's后重发'}}</button>
					</view>
				</view>
				<view class="formBox">
					<view class="formTitle">
						<text>*</text>短信验证码
					</view>
					<view class="formInput">
						<uni-forms-item name="code">
							<input type="text" maxlength="6" v-model="formData.code" @input="binddata('code',$event.detail.value)" >
						</uni-forms-item>
					</view>
				</view>
				<view class="submit">
					<button @click="submit" hover-class="none">提交</button>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		getSmsCode,
		validateSmsCode,
		saveLiveRecord
	} from "../../api/creditLive"

	export default {
		data() {
			return {
				formData: {
					accountName: '',
					accountId:'',
					content:'',
					name:'',
					phone:'',
					code:'',
					companyName:''
				},
				rules: {
					accountName: {
					 	rules: [
							{required: true,errorMessage: '请输入账号名称'}
						]
					},
					accountId: {
					 	rules: [
							{required: true,errorMessage: '请输入账号ID'}
						]
					},
					name: {
					 	rules: [
							{required: true,errorMessage: '请输入联系人'}
						]
					},
					phone: {
						rules: [
							{required: true,errorMessage: '请输入手机号'},
							{format: 'phone',errorMessage: '手机号错误'}
						]
					},
					code: {
						rules: [
							{required: true,errorMessage: '请输入验证码'},
						]
					}
				},
				type:'',
				select:['抖音','快手'],
				selectTitle:'douyin',
				sum:61, //验证码
				backNum:{},
				isShare:Boolean
			}
		},
		onShow() {
			uni.$emit('shareEmit',{
				shareTitle:`新华信锐宝-信锐收录`
			})
		},
		onLoad(options) {
			this.type = options.type;
			this.isShare = options.share;
		},
		mounted() {
			if(this.isShare){
				this.backNum = {
					num:2,
					type:'myHome'
				}
			}
			uni.$emit('shareEmit',{
				shareTitle:`新华信锐宝-信锐收录`
			})
		},
		methods: {
			postSaveLiveRecord(data){
				let inclusionCode = ''
				if(this.type == '1'){
					inclusionCode = data.accountId
				} else{
					inclusionCode = data.companyName
				}
				saveLiveRecord({
					userId:uni.getStorageSync('userId'),
					platformName:this.selectTitle,
					inclusionName:data.accountName,
					inclusionCode:inclusionCode,
					reason:data.content,
					contactName:data.name,
					phone:data.phone,
					type:this.type
				}).then(res => {
					if(res.stateCode == '1'){
						uni.reLaunch({
							url:"employ"
						})
					}
				})
			},
			verifySMSCode(data){
				validateSmsCode({
					mobile:data.phone,
					smsCode:data.code,
					type:''
				}).then(result=>{
					if (result.stateCode === '00002') {
						uni.showModal({
							content:'短信验证码错误！',
							showCancel:false
						})
						return;
					} else if (result.stateCode === '00003') {
						uni.showModal({
							content:'短信验证码超时，请重新获取！',
							showCancel:false
						})
						return;
					} else if (result.stateCode === '00004') {
						uni.showModal({
							content:'短信验证码无效，请重新获取！',
							showCancel:false
						})
						return;
					}else{
						this.postSaveLiveRecord(data);
					}
				})
			},
			sendMsg(){
				let that = this;
				this.$refs.form.validateField(['phone']).then(res => {
          that.sum = 60;
					this.timerCode = setInterval(() => {
            that.sum--;
						if (this.sum < 1) {
							clearInterval(this.timerCode);
              that.sum = 61;
						}
					}, 1000);
					getSmsCode(
						res.phone,
						"申请信锐收录"
					).then(result=>{
						if (result.stateCode == "00001") {
							uni.showModal({
								content:'短信发送成功',
								showCancel:false
							})
						} else if (result.stateCode == "00005") {
							// 获取短信验证码受限，访问次数达到上限
							uni.showModal({
								content:'获取短信验证码受限，由于您今日请求次数已达上限，请明日再试。如需紧急帮助，可联系客服，客服电话：010-88052705。',
								showCancel:false
							})
							clearInterval(this.timerCode);
              that.sum = 61;
						} else {
							uni.showModal({
								content:'信息发送失败，请重新发送！',
								showCancel:false
							})
							clearInterval(thiss.timerCode);
              that.sum = 61;
						}
					})
				})
			},
			bindPickerChange(e){
				this.selectTitle = this.select[e.detail.value];
				if(this.select[e.detail.value] == '抖音'){
					this.selectTitle = 'douyin'
				} else {
					this.selectTitle = 'kuaishou'
				}
			},
			submit(){
				this.$refs.form.submit().then(res => {
					this.verifySMSCode(res)
				})
			}
		}
	}
</script>

<style>
.form{
	padding:35rpx 34rpx 110rpx 34rpx;
}
.formBox{
	margin-top: 30rpx;
}
.formTitle{
	font-size: 27rpx;
	color: #333;
}
.formTitle text{
	color: #f00;
}
.formInput{
	margin-top: 20rpx;
	width: 100%;
	height: 55rpx;
	border:1px solid #bfbfbf;
	border-radius: 3rpx;
	position: relative;
}
.formInput input{
	width: 100%;
	height: 55rpx;
	line-height: 55rpx;
	box-sizing: border-box;
	padding-left: 25rpx;
	font-size: 27rpx;
}
.formTextarea{
	width: 100%;
	height: auto;
	border: none;
	border-radius: 0;
}
.formInput textarea{
	width: 100%;
	height: 110rpx;
	line-height: 35rpx;
	font-size: 27rpx;
	border:1px solid #bfbfbf;
	border-radius: 3rpx;
	padding:10rpx 27rpx;
	box-sizing:border-box;
}
.formBtn{
	border:none;
	border-radius: 0;
}
.formPhone input{
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}
.formPhone button{
	position: absolute;
	right: 0;
	top: 8rpx;
	height: 35rpx;
	width: 210rpx;
	font-size: 25rpx;
	color: #416aa8;
	background-color: #fff;
	line-height: 35rpx;
	z-index: 2;
}
.formPhone button::after{
	border: none;
	border-left:1px solid #d2d2d2;
}
.submit{
	margin-top: 75rpx;
}
.submit button{
	width: 444rpx;
	height: 74rpx;
	background-color: #507cbe;
	border-radius: 3rpx;
	font-size: 29rpx;
	color: #fff;
}
.submit button::after{
	border: none;
}
.uni-error-message-text{
	position: absolute;
	bottom: -32rpx;
	left: 0;
	font-size: 24rpx;
	color: #f00;
}
.icon-jiantou::before{
	position: absolute;
	right: 10rpx;
	top: 0;
	color: #bfbfbf;
	font-size: 46rpx;
}
.uni-input{
	height: 55rpx;
	line-height: 55rpx;
	box-sizing: border-box;
	padding-left: 25rpx;
	font-size: 27rpx;
}
</style>

<style lang="scss" scoped>
	/deep/.uni-forms-item__inner{
		padding-bottom: 18rpx;
	}
</style>