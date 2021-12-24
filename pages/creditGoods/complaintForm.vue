<template>
	<view>
		<view class="CompForm">

			<view class="topTitleCon" v-if="type == '1'">
				<view class="topTitle">
					<view class="leftImg">
						<view class="leftImgCon">
							<image :src="accountData.avatar ? accountData.avatar : '../../static/img/zhubo.jpg'" mode=""></image>
						</view>
					</view>
					<view class="rightCon">
						<view class="rightConTopTitle">
							{{accountData.accountName ? accountData.accountName : '-'}}
						</view>
						<view class="rightConBottomDes">
							{{selectTitle == 'douyin' ? '抖音' : '快手'}}号：{{accountData.account ? accountData.account : '-'}}
						</view>
					</view>
				</view>
			</view>
			<uni-forms :rules="rules" :value="formData" ref="form">
				<view class="CompFormTop">
					<view class="CompFormMain">
						<view class="formFl">
							<text>*</text>投诉类别 ：
						</view>
						<view class="formFr">
							<!-- <input type="text" /> -->
							<picker class="iconfont icon-jiantou" @change="bindPickerChange" :range-key="'text'" :range="dictsList">
								<view class="uni-input">{{pickerObj.text ? pickerObj.text : '请选择投诉类别'}}</view>
							</picker>
						</view>
					</view>
					<view class="CompFormMain">
						<view class="formFl">
							<text>*</text>投诉内容 ：
						</view>
						<view class="formFr">
							<uni-forms-item name="content">
								<textarea maxlength="500" v-model="formData.content" @input="binddata('content',$event.detail.value)" />
							</uni-forms-item>
						</view>
					</view>
					<view class="CompFormMain">
						<view class="formFl">
							上传图片 ：
						</view>
						<view class="formFr">
							<button class="iconfont icon-shangchuan" @tap="proImg()" hover-class="none">上传</button>
							<view class="proImgList">
								<view class="proImgMain" v-for="(item,index) in imgList" :key="index" @tap="proImgList(item)">
									<image :src="allUrl + item.path"></image>
									<view class="proImgDel iconfont icon-cha" @tap="proImgDel(index)"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="CompFormMain">
						<view class="formFl">
							<text>*</text>联系人 ：
						</view>
						<view class="formFr">
							<uni-forms-item name="name">
								<input type="text" maxlength="50" v-model="formData.name" @input="binddata('name',$event.detail.value)" />
							</uni-forms-item>
						</view>
					</view>
					<view class="CompFormMain">
						<view class="formFl">
							<text>*</text>联系方式 ：
						</view>
						<view class="formFr">
							<uni-forms-item name="phone">
								<input type="number" maxlength="11" v-model="formData.phone" @input="binddata('phone',$event.detail.value)" />
							</uni-forms-item>
						</view>
					</view>
				</view>
				<view class="CompFormBtm">
					<button @tap="submit()">提交</button>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		getKsAccountByUId,
		getDicts,
		saveAppletComplaint,
		getDyAccountByUId
	} from "../../api/creditLive"
	export default {

		data() {
			return {
				formData: {
					content:'',
					name:'',
					phone:''
				},
				rules: {
					content: {
						rules: [
							{required: true,errorMessage: '请输入内容'}
						]
					},
					name: {
						rules: [
							{required: true,errorMessage: '请输入联系人'}
						]
					},
					phone: {
						rules: [
							{required: true,errorMessage: '请输入联系方式'},
							{format: 'phone',errorMessage: '联系方式输入有误'}
						]
					}
				},
				uid:'',
				accountData:{},
				pickerObj:{},
				dictsList:[],
				imgList:[],
				allUrl:'',
				selectTitle:'',
				backNum:{},
				isShare:Boolean,
				type:'',
				sharpSuperiorId:''
			}
		},
		onLoad(options) {
			this.uid = options.uid;
			this.selectTitle = options.selectTitle;
			uni.showLoading({
				title:'加载中...'
			});
			this.allUrl = this.$url;
			this.isShare = options.share;
			this.type = options.type;
			this.sharpSuperiorId = options.id
		},
		mounted(){
			this.ksAccountById();
			this.dicts();
			if(this.isShare){
				this.backNum = {
					num:2,
					type:'myHome'
				}
			}

			uni.hideShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		methods: {
			//获取信锐直播间详情
			ksAccountById(){
				if(this.selectTitle == 'douyin'){
					getDyAccountByUId({
						uid:this.uid
					}).then(res=>{
						if(res.stateCode == '1'){
							this.accountData = res.data.accountData;
							uni.hideLoading();
						}
					})
				} else{
					getKsAccountByUId({
						uid:this.uid
					}).then(res => {
						if(res.stateCode == '1'){
							this.accountData = res.data.accountData;
							uni.hideLoading();
						}
					})
				}
			},
			//投诉类别选择
			bindPickerChange(e){
				this.pickerObj = this.dictsList[e.target.value];
			},
			//获取投诉类别
			dicts(){
				if(this.type == '1'){
					getDicts({
						groupKey:'LiveReaForCA'
					}).then(res => {
						if(res.stateCode = '1'){
							this.dictsList = res.data
						}
					})
				}

				if(this.type == '2'){
					getDicts({
						groupKey:'liveApproveType'
					}).then(res => {
						if(res.stateCode = '1'){
							this.dictsList = res.data
						}
					})
				}
			},
			//上传图片
			proImg(title){
				uni.chooseImage({
					count:1,
					success:res=> {
						res.tempFilePaths.forEach(item => {
							this.$http.WXAppletsAjaxFile(item).then(data => {
								this.imgList.push(JSON.parse(data).success[0]);
							})
						});

					}
				})
			},
			//预览图片
			proImgList(data){
				uni.previewImage({
					current:data,
					urls:this.imgList
				})
			},
			//删除图片
			proImgDel(i){
				this.imgList.splice(i,1)
				if(this.imgList.length == 0){
					this.isImgCoverList = false
				}

			},
			//表单提交
			submit(){
				this.$refs.form.submit().then(res => {
					if(!this.pickerObj.dictKey){
						uni.showModal({
							content:'请选择投诉类别',
							showCancel:false
						})
						return;
					}
					this.postComplaint(res);
				})
			},
			postComplaint(res){
				if(this.type == '1'){
					saveAppletComplaint({
						anchorName:this.accountData.accountName,
						platFromName:this.selectTitle == 'douyin' ? '抖音' : '快手',
						contactPhone:res.phone,
						provinceName:'',
						cityName:this.accountData.city,
						complainType:this.pickerObj.dictKey,
						backContent:res.content,
						path:this.imgList.length > 0 ? this.imgList[0].path : '',
						contactName:res.name,
						anchorId:this.accountData.account,
						anchorUid:this.accountData.uid,
						accountNumber:uni.getStorageSync('userId'),
						source:this.type,
					}).then(res => {
						if(res.stateCode == '1'){
							uni.navigateTo({
								url:'../myComplaint/index?anchorNo=' + this.accountData.account
							})
						}
					})
				} else if(this.type == '2'){
					saveAppletComplaint({
						anchorName:'',
						platFromName:'',
						contactPhone:res.phone,
						provinceName:'',
						cityName:'',
						complainType:this.pickerObj.dictKey,
						backContent:res.content,
						path:'',
						contactName:res.name,
						anchorId:'',
						anchorUid:'',
						accountNumber:uni.getStorageSync('userId'),
						source:this.type,
						sharpSuperiorId:this.sharpSuperiorId ? this.sharpSuperiorId : ''
					}).then(res => {
						if(res.stateCode == '1'){
							uni.navigateBack({
								delta:'1'
							})
						}
					})
				}

			}
		}
	}
</script>

<style>
.CompForm{
	padding:0 22rpx 40rpx 22rpx;
}
.topTitleCon {
	background-color: #f9f9f9;
	padding: 36rpx 0 0 0;
	width: 100%;
	height: 128rpx;
}

.topTitle {
	height: 100%;
	width: 100%;
	border-bottom: 2rpx solid #e5e5e5;
	display: flex;
}

.leftImg {
	height: 92rpx;
	width: 100rpx;
}

.leftImgCon {
	margin: 0 auto;
	width: 64rpx;
	height: 64rpx;
}

.leftImgCon image {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
}

.rightCon {
	width: calc(100% - 100rpx);
}

.rightConTopTitle {
	font-size: 28rpx;
	overflow: hidden;
}

.rightConBottomDes {
	font-size: 22rpx;
	overflow: hidden;
}
.CompFormTop{
	padding: 18rpx 12rpx 0 12rpx;
}
.CompFormMain{
	display: flex;
	justify-content: space-between;
	margin-top: 22rpx;
}
.formFl{
	width: 180rpx;
	text-align: right;
	font-size: 27rpx;
	color: #333;
	height: 55rpx;
	line-height: 55rpx;
}
.formFl text{
	color: #f00;
}
.formFr{
	width: calc(100% - 170rpx);
}
.formFr input{
	width: 100%;
	height: 55rpx;
	border:1px solid #bfbfbf;
	box-sizing: border-box;
	padding-left: 25rpx;
	border-radius: 3rpx;
	font-size: 24rpx;
}
.uni-error-message-text{
	font-size: 24rpx;
	color: #f00;
	margin-top: 10rpx;
}
.formFr picker{
	width: 100%;
	height: 55rpx;
	border:1px solid #bfbfbf;
	box-sizing: border-box;
	padding-left: 25rpx;
	border-radius: 3rpx;
	font-size: 24rpx;
	position: relative;
}
.formFr picker .uni-input{
	font-size: 24rpx;
	line-height: 55rpx;
}
.formFr picker::before{
	position: absolute;
	right: 10rpx;
	top: 0;
	color: #bfbfbf;
	font-size: 46rpx;
}
.formFr textarea{
	height: 245rpx;
	border:1px solid #bfbfbf;
	box-sizing: border-box;
	border-radius: 3rpx;
	width: 100%;
	font-size: 24rpx;
	padding: 15rpx 25rpx;
}
.formFr button{
	width: 150rpx;
	height: 46rpx;
	background-color: #dcdcdc;
	font-size: 24rpx;
	color: #666;
	line-height: 46rpx;
	border-radius: 3rpx;
	margin: 0;
}
.formFr button::after{
	border: none;
}
.formFr button::before{
	font-size: 30rpx;
	color: #416aa8;
	display: inline-block;
	margin-right: 12rpx;
}
.proImgList .proImgMain{
	width: 150rpx;
	height: 150rpx;
	margin-right: 15rpx;
	margin-top: 25rpx;
	display: inline-block;
	background-color: #bcbcbc;
	position: relative;
}
.proImgList .proImgMain image{
	width: 100%;
	height: 100%;
}
.proImgDel{
	width: 40rpx;
	height: 40rpx;
	background: rgba(0,0,0,0.7);
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
	font-size: 30rpx;
	color: #fff;
	text-align: center;
	line-height: 40rpx;
}
.CompFormBtm{
	margin-top: 80rpx;
}
.CompFormBtm button{
	width: 443rpx;
	height: 73rpx;
	background-color: #507cbe;
	border-radius: 5rpx;
	font-size: 26rpx;
	color: #fff;
	line-height: 73rpx;
}
.CompFormBtm button::after{
	border: none;
}
</style>
