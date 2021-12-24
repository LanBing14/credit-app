<template>
	<view>
		<navigator class="liveBox" v-for="item in liveList" :url="selectTitle == 'douyin' ? '../liveRecord/index?id=' + item.id + '&roomId=' + item.liveId + '&selectTitle=douyin' + '&uid=' + item.uid : '../liveRecord/index?id=' + item.id + '&roomId=' + item.roomId" :key="item.id" hover-class="none">
			<view class="liveImg">
				<image :src="item.coverUrl ? item.coverUrl : '../static/img/zhibo.jpg'" mode="aspectFill"></image>
			</view>
			<view class="liveCon">
				<view class="h1" v-if="selectTitle == 'douyin'">
					{{item.liveName ? item.liveName : accountName + '的直播间'}}
				</view>
				<view class="h1" v-else>
					{{item.caption ? item.caption : accountName + '的直播间'}}
				</view>
				
				<view class="p">
					{{selectTitle == 'douyin' ? '开播时间：' : '直播开始时间：'}}
					{{item.startTime | toTimeYear}}
				</view>
				
				<view class="p">
					{{selectTitle == 'douyin' ? '预估总销售额：' : '预估销售额：'}}{{item.predictSaleMoney | numberFormat}}元
				</view>
				
				<view class="p" v-if="selectTitle == 'douyin'">
					开播时长：{{Math.floor(item.duration/60) + '小时' + (item.duration%60) + '分钟'}}
				</view>
				<view class="p" v-else>
					直播时长：{{item.liveDuration | toDayHours}}
				</view>
				
				<view class="p" v-if="selectTitle == 'douyin'">
					累计观看数：{{item.statsTotalUser | numberFormat}}
				</view>
				<view class="p" v-else>
					累计观看人数：{{item.watchTotalNum | numberFormat}}
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props:[
			"liveList",
			"accountName",
			"selectTitle"
		],
		data() {
			return {
				
			};
		},
		methods:{
			liveBox(item){
				uni.navigateTo({
					url:'../liveRecord/index?id='+ item.id +'&roomId=' + item.roomId
				})
			}
		}
	}
</script>

<style>
.liveBox{
	padding:23rpx 30rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #dcdcdc;
}
.liveBox:last-child{
	border-bottom: none;
}
.liveImg{
	width: 150rpx;
}
.liveImg image{
	width: 100%;
	height: 193rpx;
	border-radius: 5rpx;
}
.liveCon{
	width: calc(100% - 170rpx);
}
.liveCon .h1{
	font-size: 25rpx;
	color: #333;
	font-weight: bold;
}
.liveCon .p{
	font-size: 23rpx;
	color: #666;
	margin-top: 11rpx;
}
</style>
