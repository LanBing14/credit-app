<template>
	<view>
		<view class="employ">
			<navigator class="myCtnList" hover-class="none" url="./employForm?type=1">
				<text class="iconfont icon-zhubo">主播收录</text>
				<text class="iconfont icon-chevron-right"></text>
			</navigator>
			<navigator class="myCtnList" hover-class="none" url="./employForm?type=2">
				<text class="iconfont icon-xindiantu">MCN机构收录</text>
				<text class="iconfont icon-chevron-right"></text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userType:''
			}
		},
		onShow() {
			this.userType = uni.getStorageSync('userType');
		},
		onLoad() {

		},
		mounted() {
			uni.$emit('shareEmit',{
				shareTitle:`新华信锐宝-信锐收录`
			})
		},
		methods: {

		}
	}
</script>

<style>
page{
	background: #f2f2f2;
}
.unLogin{
	text-align: center;
	font-size: 24rpx;
	color: #666;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.unLogin navigator{
	width: 440rpx;
	height: 75rpx;
	border-radius: 5rpx;
	background-color: #59c9d4;
	font-size: 26rpx;
	color: #fff;
	line-height: 75rpx;
	margin-top: 40rpx;
}
.employ{
	padding:0 22rpx
}
.myCtnList{
	height: 111rpx;
	background-color: #fff;
	padding:0 22rpx 0 41rpx;
	line-height: 111rpx;
	font-size: 30rpx;
	color: #666;
	display: flex;
	justify-content: space-between;
	margin-top: 22rpx;
}
.myCtnList:last-child{
	border-bottom: none;
}
.myCtnList .iconfont::before{
	font-size: 45rpx;
	margin-right: 35rpx;
	display: inline-block;
	position: relative;
	top: 4rpx;
	-webkit-background-clip: text;
	color: transparent;
}
.icon-zhubo::before{
	background-image: linear-gradient(90deg, #f8a42c, #f0ba78);
}
.icon-xindiantu::before{
	background-image: linear-gradient(90deg, #6069f1, #9da9fe);
}
.icon-chevron-right::before{
	background-image: linear-gradient(90deg, #d5d5d5, #d5d5d5);
	font-weight: bold;
}
</style>
