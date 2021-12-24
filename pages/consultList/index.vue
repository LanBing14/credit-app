<template>
	<view class="creditInvestigation">
		<swiper
				class="swiper"
				:indicator-dots="indicatorDots"
				:autoplay="autoplay"
				:interval="interval"
				:duration="duration"
				indicator-color="rgba(255,255,255,.41)"
				indicator-active-color="#fff"
		>
			<swiper-item v-for="(item,index) in swiperItemList" :key="index">
				<view class="swiper-item" @click="toNewsDetail(item.artUrl)">
					<image :src="item.picLinks" style="width:100%;height:100%"></image>
					<text>{{item.titile}}</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="inveReportsCon">
			<view class="list-con">
				<uni-row class="list-items" v-for="(item, index) in newsList" :key="index" @click.native="toNewsDetail(item.artUrl)">
					<uni-col :span="6">
						<view class="imgCon">
							<image style="width: 100%;height:100%" :src="item.picLinks"></image>
						</view>
					</uni-col>
					<uni-col :span="17" :offset="1">
						<view class="list-actions-item">
							<view class="card-actions-item-text company-name">{{item.title}}</view>
							<view class="card-actions-item-text date flex-s-b  color9b9b9b mt50">
								<view>{{item.source}}</view>
								<view>{{item.pubTime | dateFormat('yyyy-MM-dd')}}</view>
							</view>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>
	</view>
</template>
<script>
	import {dateFormat} from "@/utils/utils.js";
	import {Api_getNewsList} from "../../api/common";

	export default {
		filters: {dateFormat},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				url: '',
				pageNo: 1,
				pageSize: 10,
				totalPages: 1,
				swiperItemList:[],
				newsList: []
			};
		},
		onLoad(options) {
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				})
			}
			this.url = options.url;
			this.getResearchNewsList(true);
		},
		// 上拉加载
		onReachBottom() {
			if (this.pageNo < this.totalPages) {
				this.pageNo++;
				this.getResearchNewsList(false);
			}
		},
		methods:{
			/**
			 * 分页查询
			 * @param flag
			 */
			getResearchNewsList(flag) {
				let that = this;
				if (flag) {// 初始化
					this.pageNo = 1;
					this.totalPages = 0;
					this.newsList = [];
				}
				console.log(this.url)
				let url = this.url.substring(0, this.url.lastIndexOf("/") + 1);
				let last = "index.json";
				if(this.pageNo > 1) {
					last = "index_" + this.pageNo + ".json";
				}
				url += last;
				console.log(url)
				Api_getNewsList(url).then(res => {
					if (res.stateCode == "1") {
						// 请求成功
						for (let i = 0; i < res.data.list.length; i++) {
							if (res.data.list[i].title.length > 30) {
								res.data.list[i].title = res.data.list[i].title.substring(0,28) + "...";
							}
						}
						that.totalPages = Math.ceil(res.data.pageTotal/res.data.pageSize); // 总页数
						if (flag) {
							for (let i = 0; i < 3; i++) {
								if (res.data.list[i].title.length > 20) {
									res.data.list[i].title = res.data.list[i].title.substring(0,18) + "...";
								}
							}
							that.swiperItemList = res.data.list.slice(0,3);
							that.newsList = res.data.list.slice(3,res.data.list.length);
						} else {
							that.newsList = that.newsList.concat(res.data.list); // 添加数据
						}
					}
				})
			},
			toNewsDetail(url) {
				uni.navigateTo({
					url: `/pages/consultDetail/index?url=${url}`
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	.creditInvestigation{
		padding: 30rpx;
	}
	.swiper{
		height: 346rpx;
		.swiper-item{
			position: relative;
			height: 346rpx;
			border-radius: 10px;
			overflow: hidden;
			text{
				position: absolute;
				left: 30rpx;
				bottom: 20rpx;
				font-size: 30rpx;
				color:#fff
			}
		}
	}
	.inveReportCon{
		.imgPush{
			padding: 0 10rpx;
		}
		.imgCon{
			height: 308rpx;
			border: solid 1px #e5e5e5;
			border-radius: 10px;
		}
	}
	.inveProjectCon{
		.con{
			display: flex;
			.comon-con {
				flex: 1;
				text-align: center;
				background-size: 100% 100% !important;
				height: 250rpx;
				color:#fff;
				font-size: 28rpx;
				border-radius: 10px;
			}
		}
		.l-Con{
			height: 100%;
			margin-right: 20rpx;
			padding-top: 45rpx;
			background: url("../../static/cardImages/ci_cs_bg.png") no-repeat center center;
		}
		.r-Con{
			display: flex;
			flex-direction: column;
			.comon-con_r{
				height: 100%;
				padding: 0 30rpx;
			}
			.r_t_con{
				background: url("../../static/cardImages/ci_qypx_bg.png") no-repeat center center;
			}
			.r_b_con{
				margin-top: 20rpx;
				background: url("../../static/cardImages/ci_qyxh_bg.png") no-repeat center center;
			}
		}
	}
	.list-items{
		padding: 20rpx;
		height: 220rpx;
		border-bottom: 1px solid #e5e5e5;
		.imgCon{
			width: 100%;
			height: 180rpx;
			border-radius: 8px;
			border: solid 1px #e5e5e5;
			overflow: hidden;
		}
		.card-actions-item-text{
			font-size: 22rpx;
			&.company-name{
				font-size: 28rpx;
				color: #222;
			}
		}
	}
</style>
