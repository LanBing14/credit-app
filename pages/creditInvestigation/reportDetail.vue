<template>
    <view>
          <view class="list-con">
            <uni-row class="list-items">
                <uni-col :span="6">
                <view class="imgCon">
                    <image style="width: 100%;height: 100%;" :src="report.reportCover? website + report.reportCover.path : ''"></image>
                </view>
                </uni-col>
                <uni-col :span="17" :offset="1">
                <view class="list-actions-item">
                    <view class="card-actions-item-text company-name">{{ report.name }}</view>
                    <view class="card-actions-item-text color666">调研时间：<uni-dateformat :date="report.reportDate" format="yyyy-MM-dd"></uni-dateformat></view>
                    <view class="card-actions-item-text color9b9b9b">调研类型：{{ report.researchTypeDesc }}</view>
                    <view v-if="report.openType == '0'" class="card-actions-item-text color9b9b9b">公开方式：公开</view>
                    <view v-if="report.openType == '1'" class="card-actions-item-text color9b9b9b">公开方式：非公开</view>
                    <view> <button style="background:#113090;color:#fff" type="default" size="mini" @click="apply"><image style="width:22px;height:24px;vertical-align:-6px;" src="@/static/cardImages/ci_a_icon.png"></image>申请完整报告</button></view>
                </view>
                </uni-col>
            </uni-row>
        </view> 
        <view class="preview">
          <uni-section title="报告预览" type="line"/>
           <view class="previewImage">
              <image style="width:100%;height:100%" :src="report.reportFile? website + report.reportFile.path : ''"></image>
           </view>
        </view>
    </view>
</template>
<script>
    import uniSection from "@/components/uni-section/uni-section"
    import {Api_getResearchReportById} from "../../api/creditResearch";

    export default{
   components:{
     uniSection
   },
    data(){
        return{
            id: '',
            report: {}
        }
    },
    onLoad: function (option) {
        this.id = option.id;

        // 获取内容
        this.getResearchReportById();
    },
    methods: {
        apply(){
           uni.navigateTo({
                url: "/pages/creditInvestigation/applyReport?researchReportId=" + this.id
            });
        },
        /**
         * 获取详情
         */
        getResearchReportById() {
            let that = this;
            Api_getResearchReportById(this.id).then(res => {
               if (res.stateCode == '1') {
                   that.report = res.data;
               }
            });
        }
    }
}
</script>
<style>
  page{
      background: #fff;
  }
</style>
<style scoped lang="scss">
.list-con{
  padding: 40rpx 30rpx;
  height: 360rpx;
  box-shadow: 0 10px 0 #f6f6f6;
}
.list-items{
  .imgCon{
    width: 100%;
    height: 280rpx;
    border-radius: 8px;
    border: solid 1px #e5e5e5;
    overflow: hidden;
  }
  .card-actions-item-text{
    font-size: 22rpx;
    line-height: 36rpx;
    &.company-name{
      font-size: 28rpx;
      line-height: 40rpx;
      margin-bottom: 17rpx;
      color: #222;
    }
    &:not(.company-name){
        margin: 10rpx 0;
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
.previewImage{
  width: 456rpx;
  height: 638rpx;
  margin: 40rpx auto;
  border-radius: 10px;
}
</style>
