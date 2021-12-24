<template>
	<view>
		<view class="listOutCon" v-for="item in goodList" :key="item.id">
		    <view class="listImg">
		        <image :src="item.imageUrl ? item.imageUrl : '../static/img/shangpin.jpg'" mode="aspectFill"></image>
		    </view>
			<view class="listCon">
			    <view class="listConTitle">
					<text>{{item.goodsName}}</text>
			    </view>
			    <view class="listConPrice">
					<text>直播价格: {{item.promotedPrice | numberFormat}}</text>
			    </view>
			    <view class="listConRatio">
					<text>上架时间: {{item.collectionTime | toTimeYear}}</text>
			    </view>
			    <view class="listConSales">
			    	<text>预估销量: {{item.volume | numberFormat}}</text>
			    </view>
			    <view class="listConSale">
			        预估销售额: {{item.predictSaleMoney | numberFormat}}
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			"goodList",
			"selectTitle"
		],
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.listOutCon {
	width: 100%;
	padding: 28rpx;
	height: 246rpx;
	display: flex;
	border-bottom: 1px solid #e5e5e5;
}

.listImg {
	width: 150rpx;
	height: 100%;
}

.listImg image {
	width: 150rpx;
	height: 194rpx;
	border-radius: 9rpx;
}

.listCon {
	width: calc(100% - 150rpx);
	padding-left: 24rpx;
	overflow: hidden;
}

.listConTitle {
	font-size: 25rpx;
	font-weight: bold;
	line-height: 38rpx;
}

.listConPrice {
	font-size: 23rpx;
	line-height: 38rpx;
	color: #666666;
}

.listConRatio {
	font-size: 23rpx;
	line-height: 38rpx;
	color: #666666;
}

.listConSales {
	font-size: 23rpx;
	line-height: 38rpx;
	color: #666666;
}

.listConSale {
	font-size: 23rpx;
	line-height: 38rpx;
	color: #666666;
}
</style>
