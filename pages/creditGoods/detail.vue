<template>
	<view>
		<view class="detail">
			<view class="detailTitle" v-if="BusinessList.sharp.name">
				<rich-text :nodes="BusinessList.sharp.name"></rich-text>
			</view>
			<view class="detailBtn">
				<navigator class="linkInfo" :url="`./linkInfo?id=${BusinessList.sharp.id}`" hover-class="none">
					点击查看上链信息
				</navigator>
				<navigator :url="userType == 'person' ? `./complaintForm?type=2&id=${BusinessList.sharp.id}` : '../login/index'" class="iconfont icon-tousu1 complain" hover-class="none">
					我要投诉
				</navigator>
			</view>
			<view class="tagList">
				<text v-for="item in BusinessList.sharp.labelList" :key="item.id">
					{{item.dictValue}}
				</text>
			</view>
			<view class="detailCompany" v-if="BusinessList.sharp.companyName">
				<view v-if="BusinessList.sharp.companyId" hover-class="none">{{BusinessList.sharp.companyName}}</view>
				<text v-else>{{BusinessList.sharp.companyName}}</text>
			</view>
			<view class="detailMain" v-if="BusinessList.sharp.licenseNo">
				生产许可证号：{{BusinessList.sharp.licenseNo}}
			</view>
			<view class="detailMain" v-if="BusinessList.sharp.standardCode">
				产品标准代号：{{BusinessList.sharp.standardCode}}
			</view>
			<view class="detailMain" v-if="BusinessList.sharp.describe">
				<rich-text :nodes="BusinessList.sharp.describe"></rich-text>
			</view>
			<view class="detailImgList" v-if="BusinessList.productFile.length > 0">
				<image v-for="item in BusinessList.productFile" :key="item.id" :src="website + item.path" mode="widthFix"></image>
			</view>
			<view class="detailImgList" v-if="BusinessList.licenseFile.length > 0">
				<image v-for="item in BusinessList.licenseFile" :key="item.id" :src="website + item.path" mode="widthFix"></image>
			</view>
			<view class="linkImg">
				<image src="../../static/img/sl.png"></image>
			</view>
			<view class="detailEval">
				<view class="detailTitle">
					评价指标
				</view>
				<!--<view class="clickLook">
					点击查看指标
				</view>-->
				<view class="charts">
					<view class="charts-box">
						<qiun-data-charts type="xinruiDetailRadar" :chartData="chartData" background="none"/>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {getViewSharpSuperior} from "../../api/creditLive"
	export default {
		components:{
		},

		data() {
			return {
				allUrl:'',
				id:'',
				BusinessList:{},
				backNum:{},
				isShare:Boolean,
				userType:'',
				chartData:{}
			}
		},
		onLoad(options) {
			this.id = options.id;
			uni.showLoading({
			    title: '加载中'
			});
			this.userType = uni.getStorageSync('userType');
		},
		onShow(){
			this.businessById();
		},
		methods: {
			businessById(){
				uni.hideLoading();
        getViewSharpSuperior({
					id: this.id
				}).then(res=>{
					if(res.stateCode == '1'){
						this.BusinessList = res.data;
						this.chartData = {
							categories: [
								"质量信用丰富度",
								"质量信用合规度",
								"质量信用践约度",
								"质量信用诚信度",
								"质量信用建设度"
							],
							series: [
								{
									name: "",
									data: [
										this.BusinessList.tuPuData.dataIntegrity,
										this.BusinessList.tuPuData.licenseIntegruty,
										this.BusinessList.tuPuData.complaint,
										this.BusinessList.tuPuData.creditEvaluation,
										this.BusinessList.tuPuData.tag
									],
								}
							]
						}
						/*uni.$emit('shareEmit',{
							shareTitle:`新华信锐宝-信锐优品-${this.BusinessList.sharp.name}`
						})*/
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
	.blue{
		color: #416aa8;
	}
	.detail{
		padding:25rpx 22rpx 40rpx 22rpx;
		position: relative;
	}
	.detailTitle{
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
		line-height: 48rpx;
	}
	.detailBox{
		margin-top: 22rpx;
		display: flex;
		justify-content: space-between;
	}
	.detailBoxImg{
		width: 52rpx;
	}
	.detailBoxImg image{
		width: 52rpx;
		height: 52rpx;
		border-radius: 50%;
	}
	.detailBoxCon{
		width: 630rpx;
	}
	.detailBoxCon .h1{
		font-size: 25rpx;
		color: #333;
		font-weight: bold;
	}
	.detailBoxCon .h2{
		font-size: 23rpx;
		color: #999;
		font-weight: bold;
	}
	.detailMain{
		font-size: 25rpx;
		color: #333;
		line-height: 48rpx;
	}
	.detailImgList image{
		width: 100%;
		height: 400rpx;
		margin-top: 25rpx;
	}
	.linkInfo{
		display: inline-block;
		height: 40rpx;
		padding:0 12rpx;
		background: #59c8d1;
		line-height: 40rpx;
		font-size: 23rpx;
		color:#fff;
	}
	.complain{
		display: inline-block;
		margin-left:20rpx;
		line-height: 35rpx;
		font-size: 23rpx;
		color:#555;
	}
	.complain:before{
		margin-right: 5rpx;
		font-size: 27rpx;
	}
	.detailCompany{
		margin-top: 25rpx;
		font-size: 25rpx;
		font-weight: bold;
		color: #333;
		line-height: 48rpx;
	}
	.detailCompany view{
		color: #416aa8;
	}
	.linkImg image{
		position: absolute;
		top: 40rpx;
		right: 45rpx;
		width:130rpx;
		height:105rpx;
	}
	.detailEval{
		margin-top: 35rpx;
	}
	.clickLook{
		width: 168rpx;
		height:40rpx;
		background:#59c8d1;
		font-size: 23rpx;
		color: #fff;
		margin-top:20rpx;
		text-align: center;
		line-height: 40rpx;
	}
	.tagList{
		margin-top: 20rpx;
	}
	.tagList text{
		height:35rpx;
		line-height: 35rpx;
		padding:0 14rpx;
		background: #e5f2ff;
		border-radius: 3rpx;
		font-size: 22rpx;
		color:#2d8cf0;
		margin-right: 11rpx;
		display: inline-block;
	}
</style>
