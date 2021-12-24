<template>
	<view>
		<view class="homeBack">
			<image src="../../static/img/arcBack.png" mode=""></image>
		</view>
		<view class="anchorHome">
			<view class="homeTop">
				<view class="homeTopMain">
					<view class="homeTopBac">
						<image src="../../static/img/map.png" mode=""></image>
					</view>
					<view class="homeTopBox">
						<view class="homeTopImg">
							<image v-if="selectTitle == 'douyin'" :src="mcnInfo.logo ? mcnInfo.logo : '../../static/img/icon_default.png'" mode=""></image>
							<image v-else src="../../static/img/icon_default.png" mode=""></image>
							<view class="iconfont icon-zu" v-if="mcnInfo.province">{{mcnInfo.province}}</view>
						</view>
						<view class="homeTopCon">
							<view class="h1">{{mcnInfo.mcnName ? mcnInfo.mcnName : '-'}}</view>
							<view class="h2">
								<text v-if="creditLevelInfo.creditLevel">
									<text style="color: #fff;font-weight: normal;">信锐等级：</text>
									{{creditLevelInfo.creditLevel}}
								</text>
								<text class="renzheng iconfont icon-v" v-if="isRenzheng">已认证</text>
							</view>
							<view class="isCer">{{isCerStatus ? '信锐机构' : '我要认证'}}</view>
						</view>
					</view>
					<view class="homeTopText" v-if="mcnInfo.companyName">
						<text :class="mcnInfo.companyId ? 'blue' : ''" @tap="credit100Mini(mcnInfo.companyId)">{{mcnInfo.companyName ? mcnInfo.companyName : '-'}}</text>
						<text>统一社会信用代码：{{mcnInfo.creditCode ? mcnInfo.creditCode : '-'}}</text>
					</view>
				</view>
				<view class="homeTopNum">
					<view class="homeTopNumMain">
						<text class="h1">{{!mcnInfo.coverFllower ? '' : mcnInfo.coverFllower | numberFormat}}</text>
						<text class="h2">覆盖粉丝数</text>
					</view>
					<view class="homeTopNumMain">
						<text class="h1">{{!mcnInfo.signKolNum ? '' : mcnInfo.signKolNum | numberFormat}}</text>
						<text class="h2">签约达人数</text>
					</view>
				</view>
			</view>
			<view class="homeCtn">
				<navigator :url="selectTitle == 'douyin' ? '../relationAnchor/index?mcnId=' + mcnId + '&selectTitle=douyin' : '../guanlianzhubo/index?mcnId=' + mcnId" hover-class="none">
					<view class="homeCtnMain iconfont icon-tubiaozhengli-628">关联主播</view>
				</navigator>
				<navigator :url="selectTitle == 'douyin' ? './baseInfo?mcnId=' + mcnId + '&selectTitle=douyin' : '../jibenxinxi/index?mcnId=' + mcnId" hover-class="none">
					<view class="homeCtnMain iconfont icon-jibenxinxi">基本信息</view>
				</navigator>
				<navigator :url="selectTitle == 'douyin' ? './creditEvaluation?companyId=' + mcnInfo.companyId + '&mcnId=' + mcnId + '&selectTitle=douyin' : '../xinyongpingjia/index?companyId=' + mcnInfo.companyId + '&mcnId=' + mcnId" hover-class="none">
					<view class="homeCtnMain iconfont icon-pingjia">信用评价</view>
				</navigator>
				<navigator hover-class="none" url="" @tap="creditPromise()">
					<view class="homeCtnMain iconfont icon-chengnuo">信用承诺</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMcnInfoByMcnId,
		isCertification,
		getCalcScore,
		getDyMcnInfoByMcnId
	} from '../../api/creditLive'
	export default {
		data() {
			return {
				barHeight:'',
				mcnId:'',
				mcnInfo:{},
				isFollow:false,
				isRenzheng:false,
				companyInfo:{},
				creditLevelInfo:{},
				userType:'',
				isShowAttention:false,
				selectTitle:'',
				isCerStatus:Boolean,
				isShare:Boolean
			};
		},
		onLoad(options) {
			this.mcnId = options.mcnId;
			uni.showLoading({
			    title: '加载中'
			});
			this.userType = uni.getStorageSync('userType');
			this.selectTitle = options.selectTitle;
			this.isShare = options.share;
		},
		mounted() {
			this.barHeight = uni.getSystemInfoSync().statusBarHeight;
		},
		onShow(){
			this.mcnInfoByMcnId();
		},
		methods:{
			back(){
				if(this.isShare){
					uni.reLaunch({
						url:'/pages/index/index'
					})
				} else{
					uni.navigateBack({
						delta:'1'
					})
				}
			},
			mcnInfoByMcnId(){
				if(this.selectTitle == 'douyin'){
					getDyMcnInfoByMcnId({
						mcnId:this.mcnId
					}).then(res => {
						if(res.stateCode == '1'){
							this.mcnInfo = res.data;
							uni.hideLoading();
							this.isCertif()
							this.calcScore(res.data.companyId);
							uni.$emit('shareEmit',{
								shareTitle:`新华信锐宝-信锐机构-${this.mcnInfo.mcnName}`
							})
						}
					})
				} else{
					getMcnInfoByMcnId({
						mcnId:this.mcnId
					}).then(res => {
						if(res.stateCode == '1'){
							this.mcnInfo = res.data;
							uni.hideLoading();
							this.isCertif()
							this.calcScore(res.data.companyId);
							uni.$emit('shareEmit',{
								shareTitle:`新华信锐宝-信锐机构-${this.mcnInfo.mcnName}`
							})
						}
					})
				}

			},
			// 是否认证
			isCertif(){
				isCertification({
					userId:uni.getStorageSync('userId'),
					uidOrMcnId:this.mcnId
				}).then(res => {
					if(res.stateCode == '1'){
						this.isRenzheng = res.data;
					}
				})

				isCertification({
					uidOrMcnId:this.mcnId
				}).then(res => {
					if(res.stateCode == '1'){
						this.isCerStatus = res.data;
					}
				})
			},
			calcScore(companyId){
				getCalcScore({
					companyId:companyId
				}).then(res => {
					if(res.stateCode == '1'){
						this.creditLevelInfo = res.data;
					}
				})
			},
			// 判断是否认证跳转承诺书
			creditPromise(){
				if(this.isRenzheng){
					uni.navigateTo({
						url:'./creditPromise?uidOrMcnId=' + this.mcnInfo.mcnId
					})
				} else{
					uni.showModal({
						content:'该机构尚未认证',
						showCancel:false
					})
				}
			},
			// 跳转到其他小程序-企业基本信息
			credit100Mini(companyId){
				if(companyId){
					uni.showLoading({
						title:'加载中...'
					})
					uni.navigateToMiniProgram({
						appId: 'wx8abb787d7883fc3a',
						path: '/pages/enterprise/enterpriseDetail?companyId=' + companyId,
						envVersion: 'release',// 打开正式版
						success(res) {
							// 打开成功
							uni.hideLoading();
						},
						fail: function (err) {
							uni.hideLoading();
						},
					})
				}
			}
		}
	}
</script>

<style>
page{
	background: #edeff3;
}
.isCer{
	height: 35rpx;
	padding:0 10rpx;
	background: rgba(65,106,168,0.66);
	color: #fff;
	font-size: 23rpx;
	line-height: 35rpx;
	display: inline-block;
	margin-top: 17rpx;
}
.blue{
	color: #416aa8;
}
.header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding:0 22rpx;
	z-index: 2;
}
.header .backImg{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 130rpx;
	z-index: 3;
	overflow: hidden;
	background: #416aa8;
}
.headerTitle{
	position: relative;
	z-index: 3;
	line-height: 40px;
}
.titleCen{
	text-align: center;
	font-size: 34rpx;
	color: #fff;
	font-weight: bold;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.titleFl{
	height: 40px;
	width: 40px;
	position: absolute;
	left: 0;
	top: 0;
	font-size: 30px;
	color: #fff;
}
.homeBack{
	position: absolute;
	left: 0;
	width: 100%;
}
.homeBack image{
	width: 100%;
}
.anchorHome{
	position: relative;
	z-index: 2;
	padding:37rpx 60rpx 0 60rpx;
}
.homeTop{
	border-radius: 5rpx;
	background: #fff;
	box-shadow: 0 10rpx 25rpx rgba(40,40,40,0.1);
}
.homeTopMain{
	background: linear-gradient(#3468b9,#fff);
	position: relative;
	padding: 39rpx 33rpx 35rpx 33rpx;
	border-bottom: 1px solid #e5e5e5;
}
.homeTopBac{
	position: absolute;
	top: 7rpx;
	left: 50%;
	transform: translateX(-50%);
}
.homeTopBox{
	position: relative;
	z-index: 2;
	display: flex;
	justify-content: space-between;
}
.homeTopImg{
	width: 108rpx;
	text-align: center;
}
.homeTopImg > image{
	width: 108rpx;
	height: 108rpx;
	border-radius: 50%;
}
.homeTopImg .icon-zu{
	font-size: 25rpx;
	color: #fff;
	margin-top: 10rpx;
}
.homeTopImg .icon-zu::before{
	font-size: 21rpx;
	margin-right: 10rpx;
	position: relative;
	top: -2rpx;
}
.homeTopCon{
	width: 300rpx;
}
.homeTopCon .h1{
	font-size: 35rpx;
	color: #fff;
	font-weight: bold;
}
.homeTopCon .h2{
	font-size: 25rpx;
	color: #fff;
	margin-top: 17rpx;
	width: 422rpx;
}
.homeTopCon .h2 text{
	font-size: 27rpx;
	font-weight: bold;
	color: #ff8f00;
}
.homeTopCon .h2 .renzheng{
	font-size: 25rpx;
	margin-left: 33rpx;
	display: inline-block;
	color: #fff;
}
.homeTopCon .h2 .renzheng::before{
	color: #ff8f00;
	font-size: 36rpx;
	position: relative;
	top: 4rpx;
	margin-right: 7rpx;
}
.followBlue{
	font-size: 23rpx;
	color: #fff;
	padding:10rpx;
	border-radius: 5rpx;
	background: rgba(65,106,168,0.66);
}
.followOran{
	font-size: 23rpx;
	padding:8rpx 15rpx;
	border-radius: 5rpx;
	border:1px solid #ff8f00;
	color: #ff8f00;
	box-sizing: border-box;
}
.homeTopText{
	margin-top: 35rpx;
	font-size: 25rpx;
	color: #666;
	line-height: 40rpx;
}
.homeTopText text{
	display: block;
	position: relative;
	z-index: 2;
}
.homeTopNum{
	height: 167rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.homeTopNumMain .h1{
	display: block;
	font-size: 35rpx;
	color: #ff8f00;
	font-weight: bold;
	text-align: center;
}
.homeTopNumMain .h2{
	display: block;
	font-size: 26rpx;
	color: #333;
	text-align: center;
}
.homeCtn{
	margin-top: 35rpx;
	background-color: #fff;
	border-radius: 5rpx;
	display: flex;
	flex-wrap: wrap;
	align-items: left;
	padding-bottom: 40rpx;
}
.homeCtn navigator{
	width: 33.333%;
	text-align: center;
	font-size: 25rpx;
	color: #333;
	margin-top: 40rpx;
	position: relative;
	z-index: 2;
}
.homeCtnMain::before{
	display: block;
	margin-bottom: 20rpx;
	font-size: 52rpx;
	-webkit-background-clip: text;
	color: transparent;
	background-image: linear-gradient(90deg, #8c95b7, #b9c0dd);
}
.icon-jibenxinxi::before{
	background-image: linear-gradient(90deg, #33ac77, #73dfae);
}
.icon-pingjia::before{
	background-image: linear-gradient(90deg, #f8a42c, #f0ba78);
}
.icon-tubiaozhengli-628::before{
	font-size: 60rpx;
	margin-bottom: 12rpx;
	background-image: linear-gradient(90deg, #4a94fe, #9ec8fd);
}
.icon-chengnuo::before{
	background-image: linear-gradient(90deg, #c14cc5, #dbaeec);
}
</style>
