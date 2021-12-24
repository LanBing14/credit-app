<template>
	<view>
		<web-view :src="detailUrl + '?hideOther=0'"></web-view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				detailUrl:''
			}
		},
		onLoad(options) {
			this.detailUrl = options.url;
		},
		mounted() {
			
		},
		methods: {
		},
		onShareAppMessage() { //发送给朋友
			return {
				path:`/pages/consultDetail/index?url=${this.detailUrl}`
			}
		}
	}
</script>

<style>
.detail{
	padding:40rpx;
}
.detailTitle{
	text-align: center;
	font-size: 42rpx;
	color: #333;
	line-height: 55rpx;
	font-weight: bold;
}
.detailTime{
	text-align: center;
	font-size: 30rpx;
	color: #333;
	margin-top: 30rpx;
	padding-bottom: 20rpx;
	border-bottom: 1px dashed #b7b7b7;
	white-space:nowrap;
	
	overflow:hidden;
	
	text-overflow:ellipsis;
}
.detailSubTitle{
	padding:20rpx;
	background-color: #f6f5f5;
	font-size: 30rpx;
	line-height: 42rpx;
	color: #333;
	margin-top: 35rpx;
}
.detailSubTitle text{
	color: #C90500;
}
.detailMain{
	margin-top: 50rpx;
	font-size: 30rpx;
	line-height: 53rpx;
}
</style>
