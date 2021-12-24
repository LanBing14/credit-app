<template>
    <view class="projectDynamicDetail">
        <view class="title">
            {{dynamics.title}}
        </view>
        <view class="imgWrap">
			<image style="width:100%;height:100%;" :src="dynamics.cover ? website + dynamics.cover.path : ''"></image></view>
        <view class="content" v-if="dynamics.content" v-html="dynamics.content"></view>
    </view>
</template>
<script>
	import {Api_getProjectDynamicsDetail} from "../../api/park";
export default{
    data() {
      return{
		  id: '',
		  dynamics: {}
      }  
    },
	onLoad: function (option) {
	    this.id = option.id;
	
	    // 获取内容
	    this.getProjectDynamicsDetail();
	},
	methods: {
	    getProjectDynamicsDetail() {
			let that = this;
			Api_getProjectDynamicsDetail(this.id).then(res => {
			   if (res.stateCode == '1') {
			       that.dynamics = res.data;
			   }
			});
		}
	}
}
</script>
<style scoped lang="scss">
    .projectDynamicDetail{
        padding: 30rpx;
         .title{
            font-size: 32rpx;
            text-align: center;
        }
        .imgWrap{
            height: 210rpx;
            border-radius: 6rpx;
            margin: 40rpx 0;
        }
        .content{
            font-size: 28rpx;
            color: #666;
            text-indent: 2em;
        }
    }
</style>
