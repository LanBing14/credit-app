<template>
  <view class="container">
    <view class="search-wrap">
      <uni-easyinput class="inputWrap" v-model="keyword" :inputBorder="false" prefixIcon="search"
                     placeholder="请输入您感兴趣的企业" @confirm="searchInfo"></uni-easyinput>
    </view>
    <view class="list-con">
      <uni-row class="list-items" v-for="(item, index) in list" :key="index" @click.native="toDetail(item.CREDIT_CODE, item.COMPANY_NAME, item.COMPANY_ID)">
        <uni-col :span="6">
          <view class="imgCon">
            <image style="width: 100%;height: 100%;"
                   :src="item.url ? website + item.url : '../../static/img/default-logo.png'"></image>
          </view>
        </uni-col>
        <uni-col :span="17" :offset="1">
          <view class="list-actions-item">
            <view class="card-actions-item-text company-name">{{item.COMPANY_NAME}}</view>
            <view class="card-actions-item-text color666">法定代表人：{{item.ledgeName}}</view>
            <view class="card-actions-item-text color9b9b9b">成立时间：{{item.startTime}}</view>
            <view class="card-actions-item-text color9b9b9b">入驻时间：{{item.settledTime}}</view>
          </view>
        </uni-col>
      </uni-row>
    </view>
  </view>
</template>
<script>
import {getCompanyPage} from "../../api/brandPromotion";

export default {
  data() {
    return {
      list: [],
      keyword: "",
      pageNo: 1,
      pageSize: 10,
      totalPages: ''
    }
  },
  onLoad() {
    this.getCompanyPageData(true);
  },
  // 上拉加载
  onReachBottom() {
    if (this.pageNo < this.totalPages && this.totalPages != '') {
      this.pageNo++;
      this.getCompanyPageData(false);
    }
  },
  methods: {
    /**
     * 获取有品牌的企业信息
     * @param flag 是否从第一页开始
     */
    getCompanyPageData(flag) {
      uni.showLoading({
        title:'加载中...',
        mask: true
      })
      let that = this;
      if (flag) {
        this.pageNo = 1;
      }
      getCompanyPage({companyName: that.keyword, pageNo: this.pageNo, pageSize: this.pageSize}).then(res => {
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
    searchInfo() {
      this.getCompanyPageData(true);
    },
    toDetail(creditCode, companyName, companyId) {
      uni.navigateTo({
        url: `/pages/creditBrandCard/index?creditCode=${creditCode}&companyName=${companyName}&companyId=` + companyId
      });
    }
  }
};
</script>
<style>
page{
  background-color: #f6f6f6;
}
</style>
<style scoped lang="scss">
.search-wrap{
  padding: 20rpx 30rpx;
  height: 104rpx;
  background: #fff;
}
.inputWrap{
  background: #f2f2f2;
  border-radius: 20px;
}
.list-con{
  padding: 30rpx;
}
.list-items{
  padding: 20rpx;
  height: 220rpx;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom:20rpx;
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
    &:not(.company-name){
      margin: 10rpx 0;
    }
  }
}
</style>

