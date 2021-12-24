<template>
	<view class="outView">
		<view class="topTitleCon">
			<view class="topTitle">
				<view class="leftImg">
					<view class="leftImgCon">
						<image :src="accountData.avatar ? accountData.avatar : '../../../static/img/zhubo.jpg'" mode=""></image>
					</view>
				</view>
				<view class="rightCon">
					<view class="rightConTopTitle">
						{{accountData.accountName}}
					</view>
					<view class="rightConBottomDes">
						{{selectTitle == 'douyin' ? '抖音' : '快手'}}号：{{accountData.account}}
					</view>
				</view>
			</view>
		</view>
		<view class="userPerfor" v-if="selectTitle == 'douyin'">
			<view class="userPerforBox">
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							粉丝数
						</view>
						<view class="userPerforNum">
							{{!accountData.followerNum ? '0' : accountData.followerNum | numberFormat}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							总获赞
						</view>
						<view class="userPerforNum">
							{{!accountData.thumb_num ? '0' : accountData.thumb_num | numberFormat}}
						</view>
					</view>
				</view>
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							作品数
						</view>
						<view class="userPerforNum">
							{{!accountData.awemeNum ? '0' : accountData.awemeNum | numberFormat}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							赞粉比
						</view>
						<view class="userPerforNum">
							{{!accountData.favoritedFollowerRate ? '0' : accountData.favoritedFollowerRate | numberFormat}}
						</view>
					</view>
				</view>
			</view>
			<view class="userPerforBox">
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							粉丝数昨日<br>增量
						</view>
						<view class="userPerforNum">
							{{!accountData.followerTrendTotal ? '0' : accountData.followerTrendTotal | numberFormat}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							获赞数昨日<br>增量
						</view>
						<view class="userPerforNum">
							{{!accountData.thumbTrendIncr ? '0' : accountData.thumbTrendIncr | numberFormat}}
						</view>
					</view>
				</view>
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							作品数昨日<br>增量
						</view>
						<view class="userPerforNum">
							{{!accountData.awemeTrendIncr ? '0' : accountData.awemeTrendIncr | numberFormat}}
						</view>
					</view>
					<!-- <view class="userPerforMain">
						<view class="userPerforTitle">
							集均分享
						</view>
						<view class="userPerforNum">
							{{accountData.shareAvg | numberFormat}}
						</view>
					</view> -->
				</view>
			</view>
			<view class="userPerforBox">
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							 综合指数
						</view>
						<view class="userPerforNum">
							{{accountData.comprehensive ? accountData.comprehensive : '0'}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							合作指数
						</view>
						<view class="userPerforNum">
							{{accountData.cooperateIndex ? accountData.cooperateIndex : '0'}}
						</view>
					</view>
				</view>
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							传播指数
						</view>
						<view class="userPerforNum">
							{{accountData.spreadIndex ? accountData.spreadIndex : '0'}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							种草指数
						</view>
						<view class="userPerforNum">
							{{accountData.seedIndex ? accountData.seedIndex : '0'}}
						</view>
					</view>
				</view>
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							涨粉指数
						</view>
						<view class="userPerforNum">
							{{accountData.followerIndex ? accountData.followerIndex : '0'}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							性价比指数
						</view>
						<view class="userPerforNum">
							{{accountData.costIndex ? accountData.costIndex : '0'}}
						</view>
					</view>
				</view>
			</view>
			<!--<view class="userPerforBox">
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							 传播力<br>(昨日)
						</view>
						<view class="userPerforNum">
							{{accountData.spread ? accountData.spread : '0'}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							 影响力<br>(昨日)
						</view>
						<view class="userPerforNum">
							{{accountData.influence ? accountData.influence : '0'}}
						</view>
					</view>
				</view>
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							 勤勉度<br>(昨日)
						</view>
						<view class="userPerforNum">
							{{accountData.diligent ? accountData.diligent : '0'}}
						</view>
					</view>
				</view>
			</view>-->
		</view>
		<view class="userPerfor" v-else>
			<view class="userPerforBox">
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							粉丝数总量
						</view>
						<view class="userPerforNum">
							{{!accountData.followerNum ? '0' : accountData.followerNum | numberFormat}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							粉丝数昨日<br>增量
						</view>
						<view class="userPerforNum">
							{{!accountData.followerTrendIncr ? '0' : accountData.followerTrendIncr | numberFormat}}
						</view>
					</view>
				</view>
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							作品数总量
						</view>
						<view class="userPerforNum">
							{{!accountData.awemeNum ? '0' : accountData.awemeNum | numberFormat}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							作品数昨日<br>增量
						</view>
						<view class="userPerforNum">
							{{!accountData.awemeTrendIncr ? '0' : accountData.awemeTrendIncr | numberFormat}}
						</view>
					</view>
				</view>
			</view>
			<view class="userPerforBox">
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							集均播放
						</view>
						<view class="userPerforNum">
							{{!accountData.playAvg ? '0' : accountData.playAvg | numberFormat}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							集均点赞
						</view>
						<view class="userPerforNum">
							{{!accountData.thumbAvg ? '0' : accountData.thumbAvg | numberFormat}}
						</view>
					</view>
				</view>
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							集均评价
						</view>
						<view class="userPerforNum">
							{{!accountData.commentAvg ? '0' : accountData.commentAvg | numberFormat}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							集均分享
						</view>
						<view class="userPerforNum">
							{{!accountData.shareAvg ? '0' : accountData.shareAvg | numberFormat}}
						</view>
					</view>
				</view>
			</view>
			<view class="userPerforBox">
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							 近7天直播<br>场次
						</view>
						<view class="userPerforNum">
							{{!accountData.liveNum ? '0' : accountData.liveNum | numberFormat}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							总礼物收入
						</view>
						<view class="userPerforNum">
							{{!accountData.giftIncome ? '0' : accountData.giftIncome | numberFormat}}
						</view>
					</view>
				</view>
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							平均单场直<br>播时间
						</view>
						<view class="userPerforNum">
							{{!accountData.liveDistributeAvg ? '0' : accountData.liveDistributeAvg | toDayHours}}
						</view>
					</view>
					<view class="userPerforMain">
						<view class="userPerforTitle">
							场均礼物收<br>入
						</view>
						<view class="userPerforNum">
							{{!accountData.giftIncomeAvg ? '0' : accountData.giftIncomeAvg | numberFormat}}
						</view>
					</view>
				</view>
			</view>
			<view class="userPerforBox">
				<view class="userPerforCon">
					<view class="userPerforMain">
						<view class="userPerforTitle">
							 单场在线峰<br>值
						</view>
						<view class="userPerforNum">
							{{!accountData.onlinePeak ? '0' : accountData.onlinePeak | numberFormat}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getKsAccountById,
		getDyAccountByUId
	} from "../../api/creditLive"
	export default {
		data() {
			return {
				id:'',
				accountData:{},
				selectTitle:'',
				uid:'',
				backNum:{},
				isShare:Boolean
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.selectTitle = options.selectTitle;
			this.uid = options.uid;
			this.isShare = options.share;
		},
		mounted() {
			if(this.isShare){
				this.backNum = {
					num:2,
					type:'myHome'
				}
			}
		},
		onShow(){
			this.ksAccountById();
		},
		methods: {
			ksAccountById(){

				if(this.selectTitle == 'douyin'){
					getDyAccountByUId({
						uid:this.uid
					}).then(res => {
						if(res.stateCode == '1'){
							this.accountData = res.data.accountData;
							uni.$emit('shareEmit',{
								shareTitle:`新华信锐宝-${this.accountData.accountName}-账号表现`
							})
						}
					})
				} else{
					getKsAccountById({
						id:this.id
					}).then(res => {
						if(res.stateCode == '1'){
							this.accountData = res.data.accountData;
							uni.$emit('shareEmit',{
								shareTitle:`新华信锐宝-${this.accountData.accountName}-账号表现`
							})
						}
					})
				}

			}
		}
	}
</script>

<style>
page{
	background: #f9f9f9;
}
.outView {
	padding: 0 22rpx;
}

.topTitleCon {
	background-color: #fff;
	margin:0 -22rpx;
	padding: 36rpx 22rpx 0 22rpx;
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
.userPerfor{
	padding:0 22rpx
}
.userPerforBox{
	margin-top: 30rpx;
	padding:0 26rpx;
	background-color: #fff;
}
.userPerforCon{
	display: flex;
}
.userPerforMain{
	width: 50%;
	display: flex;
	padding:26rpx 0;
}
.userPerforTitle{
	width: 50%;
	font-size: 23rpx;
	color: #333;
}
.userPerforNum{
	width: 50%;
	font-size: 26rpx;
	color: #444;
	font-weight: bold;
	padding-right: 15rpx;
}
</style>
