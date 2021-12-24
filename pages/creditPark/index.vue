<template>
  <view class="creditPark">
    <view class="creditParkDes" v-for="(item, index) in list" :key="index">
      <view class="imgWrap" @click="linkDetail(item.ID)">
        <image style="width:100%;height:100%" :src="website + item.PATH"></image>
      </view>
      <view class="location">{{item.NAME}}
        <view class="mark">信用园区</view>
      </view>
      <view class="comon-wrap address">{{item.ADDRESS}}</view>
      <view class="comon-wrap intro">{{item.INTRODUCE}}</view>
    </view>
    <commonFixedDownload title="园区入驻获取更多信用业务服务" btnTitle="立即申请" @eventClick="toApply"/>
  </view>
</template>
<script>
import commonFixedDownload from "@/components/commonFixedDownload"
import {getParkPage} from "../../api/park";

export default {
  components: {
    commonFixedDownload
  },
  data() {
    return {
      list: [],
      pageNo: 1,
      pageSize: 10,
      totalPages: ''
    }
  },
  onLoad() {
    this.getParkPageData(true);
  },
  // 上拉加载
  onReachBottom() {
    if (this.pageNo < this.totalPages && this.totalPages != '') {
      this.pageNo++;
      this.getParkPageData(false);
    }
  },
  methods: {
    /**
     * 获取信用园区列表
     * @param flag 是否从第一页开始
     */
    getParkPageData(flag) {
      uni.showLoading({
        title:'加载中...',
        mask: true
      })
      let that = this;
      if (flag) {
        this.pageNo = 1;
      }
      getParkPage({pageNo: this.pageNo, pageSize: this.pageSize}).then(res => {
        if (res.stateCode == "1") {
          // 请求成功
          if (flag) {
            that.list = res.data.list;
          } else {
            // 分页数据叠加
            that.list = that.list.concat(res.data.list);
          }
          that.pageNo = res.data.currentPage;
          that.pageSize = res.data.pageSize;
          that.totalPages = res.data.totalPages;
          uni.hideLoading();
        }
      });
    },
    linkDetail(id) {
      uni.navigateTo({
        url: `/pages/creditPark/detail?id=${id}`
      });
    },
    toApply() {
      uni.navigateTo({
        url: `/pages/creditPark/apply`
      });
    }
  }
}
</script>
<style scoped lang="scss">
uni-navigator{
  text-align: center;
  font-size: 24rpx;
  color: #444444;
}
.creditPark{
  .imgWrap{
    height: 376rpx;
    border-radius: 10px;
    overflow:hidden;
  }
  .creditParkDes{
    padding:30rpx 30rpx 35rpx;
    box-shadow: 0 10px 0 #f6f6f6;
    .location{
      font-size: 30rpx;
      display: flex;
      align-items: center;
      margin-top: 30rpx;
    }
    .mark{
      width: 55px;
      height: 24rpx;
      line-height: 24rpx;
      text-align: center;
      border-radius: 4px;
      font-size: 18rpx;
      background-color:var(--main-color);
      color: #fff;
      margin-left: 14rpx;
    }
    .comon-wrap{
      font-size: 24rpx;
      line-height: 50rpx;
      padding-left: 30px;
      color: #999;
      margin:20rpx 0;
    }
    .address{
      background: url("../../static/cardImages/icon/icon_1.png") no-repeat left top;
    }
    .intro{
      background: url("../../static/cardImages/icon/icon_2.png") no-repeat left top;
    }
    .creditParkBus{
      margin-top: 30rpx;
    }
  }
}
</style>
