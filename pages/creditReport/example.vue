<template>
	 <view class="view-pdf">
		<scroll-view scroll-y="true" class="scroll-Y" >
			<view v-for="item in imgUrl" :key="item.id">
				<image :src="item.url" ></image>
			</view>
		</scroll-view>
    </view>
</template>
<script>
export default{
	data(){
		return{
			imgUrl:[
				{
					id:1,
					url:'../../static/img/step/01.jpg'
				},
				{
					id:2,
					url:'../../static/img/step/02.jpg'
				},
				{
					id:3,
					url:'../../static/img/step/03.jpg'
				},
				{
					id:4,
					url:'../../static/img/step/04.jpg'
				},
				{
					id:5,
					url:'../../static/img/step/05.jpg'
				},
				{
					id:6,
					url:'../../static/img/step/06.jpg'
				},
				{
					id:7,
					url:'../../static/img/step/07.jpg'
				},
				{
					id:8,
					url:'../../static/img/step/08.jpg'
				},
				{
					id:9,
					url:'../../static/img/step/09.jpg'
				},
				{
					id:10,
					url:'../../static/img/step/10.jpg'
				}
				
			]
		}
	},
    methods: {}
}
</script>
<style lang="scss" scoped>
 
	.view-pdf {
		/deep/.uni-scroll-view::-webkit-scrollbar {
				display: none
			}
		image {
			width: 750rpx;
			height: 1071rpx;
		}
	}
	
</style>
