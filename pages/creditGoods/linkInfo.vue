<template>
	<view class="linkInfo">
		<view class="linkTitle clear">
			<view class="titleText">上链信息</view>
		</view>
		<view class="linkMain">
			<view class="linkCon" v-for="item in blockList" :key="item.ID">
				<view class="linkTime">
					上链事项：
				</view>
				<view class="linkText">
					{{BusinessList.sharp.name ? BusinessList.sharp.name : '-'}}
				</view>

				<view class="linkTime">
					存证时间：
				</view>
				<view class="linkText">
					{{!item.CREATE_DATE ? '-' : item.CREATE_DATE | toTimeYear}}
				</view>

				<view class="linkTime">
					区块高度：
				</view>
				<view class="linkText">
					{{item.BLOCK_HIGH ? item.BLOCK_HIGH : '-'}}
				</view>

				<view class="linkTime">
					交易Hash：
				</view>
				<view class="linkText">
					{{item.BLOCK_HASH ? item.BLOCK_HASH : '-'}}
				</view>

				<view class="linkTime">
					证据Hash：
				</view>
				<view class="linkText">
					{{item.SAVE_HASH ? item.SAVE_HASH : '-'}}
				</view>
			</view>
			<view style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="blockList.length == 0">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
		},

		data() {
			return {
				backNum:{},
				isShare:Boolean,
				id:'',
				blockList:[],
				BusinessList:{}
			}
		},
		onLoad(options) {
			this.isShare = options.share;
			this.id = options.id;
		},
		mounted(){
			this.getBlockList();
			this.viewSharpSuperior();
			if(this.isShare){
				this.backNum = {
					num:2,
					type:'myHome'
				}
			}

			uni.$emit('shareEmit',{
				shareTitle:`新华信锐宝-信锐优品`
			})
		},
		onShow(){
			uni.$emit('shareEmit',{
				shareTitle:`新华信锐宝-信锐优品`
			})
		},
		methods: {
			getBlockList(){
				this.$http.post(`/enterprise/detail/xhsRest/cardControl/getBlockList?companyId=${this.id}&pageSize=10&pageNo=1`).then(res => {
					if (res.stateCode == '1') {
						this.blockList = res.data.list;
					}
				})
			},

			viewSharpSuperior(){
				this.$http.get('/enterprise/detail/SharpSuperior/viewSharpSuperior',{
					id:this.id
				}).then(res=>{
					if(res.stateCode == '1'){
						this.BusinessList = res.data;
					}
				})
			}
		}
	}
</script>

<style>
	.clear:after{
		content: '';
		display: block;
		clear: both;
	}
	.linkInfo{
		padding:0 22rpx;
	}
	.linkTitle{
		height:70rpx;
		line-height: 70rpx;
		position: relative;
		border-bottom:1rpx solid #e5e5e5;
	}
	.linkTitle:before{
		content: '';
		display: inline-block;
		width: 4rpx;
		height:18rpx;
		background: #4d75ae;
		border-radius: 3rpx;
		margin-right: 12rpx;
	}
	.titleText{
		font-size: 27rpx;
		color:#333;
		font-weight: bold;
		display: inline-block;
	}
	.linkCon{
		margin-top: 28rpx;
	}
	.linkTime{
		font-size: 27rpx;
		font-weight: bold;
		color: #333;
		margin-top: 20rpx;
	}
	.linkText{
		font-size: 27rpx;
		color: #333;
		margin-top: 8rpx;
		word-break: break-all;
	}
	/*.linkTime{
		font-size: 27rpx;
		color:#333;
	}
	.linkText{
		padding:15rpx 20rpx;
		border:1px solid #dcdcdc;
		background: #fafafa;
		font-size: 27rpx;
		color:#333;
		margin-top:10rpx;
		border-radius: 3rpx;
	}*/
</style>
