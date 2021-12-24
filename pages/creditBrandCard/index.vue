<template>
  <view class="cardDetail">
    <credit-card :companyId="companyId" :companyName="companyName" type="2"></credit-card>
    <uni-section title="下属品牌" type="line"></uni-section>
    <view class="list-con">
      <!-- <uni-load-more :status="status"> -->
      <uni-row class="list-items" v-for="(item, index) in list" :key="index" @click.native="toDetail(item.CARDIMG)">
        <uni-col :span="6">
          <view class="imgCon">
            <image style="width: 100%;height:100%"
                   :src="item.BRANDIMG ? website + item.BRANDIMG : '../../static/img/default-logo.png'"></image>
          </view>
        </uni-col>
        <uni-col :span="17" :offset="1">
          <view class="list-actions-item">
            <view class="card-actions-item-text company-name">{{item.NAME}}</view>
            <view class="card-actions-item-text color666 list-actions-text-des">
              {{item.INTRODUCE}}
            </view>
          </view>
        </uni-col>
      </uni-row>
      <view class="color9b9b9b tips">登录新华信用网页端个人中心申请更多品牌</view>
      <!-- </uni-load-more> -->
    </view>
  </view>
</template>
<script>
import uniSection from "@/components/uni-section/uni-section";
import {getBrandPage} from "../../api/brandPromotion";
import creditCard from "../../components/creditCard";

export default {
  components: {
    uniSection,
    creditCard
  },
  data() {
    return {
      companyId: '',
      companyName: '',
      list: [],
      pageNo: 1,
      pageSize: 10,
      totalPages: ''
    }
  },
  onLoad(option) {
    this.companyName = option.companyName;
    this.companyId = option.companyId;
    this.getBrandPageData(true);
  },
  // 上拉加载
  onReachBottom() {
    if (this.pageNo < this.totalPages && this.totalPages != '') {
      this.pageNo++;
      this.getBrandPageData(false);
    }
  },
  methods: {
    /**
     * 获取企业的品牌
     * @param flag 是否从第一页开始
     */
    getBrandPageData(flag) {
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
      let that = this;
      if (flag) {
        this.pageNo = 1;
      }
      getBrandPage({companyId: this.companyId, pageNo: this.pageNo, pageSize: this.pageSize}).then(res => {
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
      })
    },
    toDetail(cardImg) {
      uni.navigateTo({
        url: `/pages/creditBrandCard/detail?cardImg=${cardImg}`
      });
    }
  }
}
</script>
<style>
 page{
   background-color: #f6f6f6;
}
</style>
<style scoped lang="scss">
.cardDetail{
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}
.list-con{
  // padding: 30rpx;
}
.list-items{
  padding: 20rpx;
  height: 220rpx;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20rpx;
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
      line-height: 40rpx;
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
.tips{
  position: relative;
  width: 600rpx;
  margin: 60rpx auto;
  font-size: 24rpx;
  text-align: center;
  &::before{
    content:"";
    position: absolute;
    width: 60rpx;
    height:100%;
    background: url("../../static/cardImages/l.png") no-repeat center center;
    left: 0;
    top:0;
  }
  &::after{
    content:"";
    position: absolute;
    width: 60rpx;
    height:100%;
    background: url("../../static/cardImages/r.png") no-repeat center center;
    right: 0;
    top:0;
  }
}

</style>
