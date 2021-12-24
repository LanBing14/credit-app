<template>
    <view>
          <view class="list-con">
        <uni-row class="list-items" v-for="(item, index) in list" :key="index"  @click.native="toDetail(item.id)">
            <uni-col :span="6">
            <view class="imgCon">
                <image style="width: 100%;height: 100%;" :src="item.reportCover ? website + item.reportCover.path : ''"></image>
            </view>
            </uni-col>
            <uni-col :span="17" :offset="1">
            <view class="list-actions-item">
                <view class="card-actions-item-text company-name">{{ item.name }}</view>
                <view class="card-actions-item-text color666">调研时间：<uni-dateformat :date="item.reportDate" format="yyyy-MM-dd"></uni-dateformat></view>
                <view class="card-actions-item-text color9b9b9b">调研类型：{{ item.researchTypeDesc }}</view>
                <view v-if="item.openType == '0'" class="card-actions-item-text color9b9b9b">公开方式：公开</view>
                <view v-if="item.openType == '1'" class="card-actions-item-text color9b9b9b">公开方式：非公开</view>
                <view><button type="primary" ></button></view>
            </view>
            </uni-col>
        </uni-row>
        </view> 
    </view>
</template>
<script>
import {Api_getResearchReportByPage} from "../../api/creditResearch";
export default{
    data(){
        return{
            pageNo: 1,
            pageSize: 10,
            totalPages: 1,
            list: []
        }
    },
    onLoad() {
        this.getResearchReportByPage(true);
    },
    // 上拉加载
    onReachBottom() {
        if (this.pageNo < this.totalPages) {
            this.pageNo++;
            this.getResearchReportByPage(false);
        }
    },
    methods: {
        /**
         * 获取调研报告列表
         */
        getResearchReportByPage(flag) {
            let that = this;
            if (flag) {// 初始化
                this.pageNo = 1;
                this.totalPages = 0;
                this.list = [];
            }
            Api_getResearchReportByPage({pageNo: this.pageNo, pageSize: this.pageSize}).then(res => {
                if (res.stateCode == "1") {
                    // 请求成功
					that.totalPages = res.data.totalPages; // 总页数
                    if (flag) {
                        that.list = res.data.list;
                    } else {
                        that.list = that.list.concat(res.data.list); // 添加数据
                    }
                }
            })
        },
        toDetail(id){
          uni.navigateTo({
            url: `/pages/creditInvestigation/reportDetail?id=${id}`
          }); 
        }
    }
}
</script>
<style>
  page{
      background: #f6f6f6;
  }
</style>
<style scoped lang="scss">
.list-con{
  padding: 30rpx;
}
.list-items{
  padding: 20rpx;
  height: 292rpx;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  .imgCon{
    width: 100%;
    height: 252rpx;
    border-radius: 8px;
    border: solid 1px #e5e5e5;
    overflow: hidden;
  }
  .card-actions-item-text{
    font-size: 22rpx;
    line-height: 36rpx;
    margin: 10rpx 0;
    &.company-name{
      font-size: 28rpx;
      line-height: 40rpx;
      margin-bottom: 27rpx;
      color: #222;
    }
    &.list-actions-text-des{
      margin-top: 15rpx;
      max-height: 124rpx;
      line-height: 32rpx;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

</style>
