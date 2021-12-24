<template>
  <view class="container">
    <noData info="暂无信息" v-if="list !== '' && list.length === 0" style="margin-top: 200rpx"></noData>
    <view class="list-con">
      <uni-row class="list-items" v-for="(item, index) in list" :key="index"
               @click.native="toDetail(item.COMPANY_ID, item.COMPANY_NAME)">
        <uni-col :span="17" :offset="1">
          <view class="list-actions-item">
            <view class="card-actions-item-text company-name">{{ item.NAME }}</view>
            <view class="card-actions-item-text color666">统一社会信用代码：{{ item.CREDIT_CODE }}</view>
          </view>
        </uni-col>
      </uni-row>
    </view>
  </view>
</template>
<script>
import {getCompanyPage} from "../../api/park";
import {isHasCertific} from "../../api/common";
import noData from "../../components/noData.vue"

export default {
  components:{
    noData
  },
  data() {
    return {
      list: '',
      parkId: "",
      type: '',
      isSettled: true,
      pageNo: 1,
      pageSize: 10,
      totalPages: ''
    }
  },
  onLoad(options) {
    this.parkId = options.parkId;
    this.type = options.type;
    // 信用 评价不需要帅选
    this.isSettled = options.type != '3';
    let title = "";
    switch (this.type) {
      case '0':
        title = "信用名片";
        break;
      case '1':
        title = "品牌推广";
        break;
      case '2':
        title = "信用承诺";
        break;
      case '3':
        title = "信用评价";
        break;
    }
    uni.setNavigationBarTitle({title: title});
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
     * 获取园区企业
     * @param flag 是否从第一页开始
     */
    getCompanyPageData(flag) {
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
      let that = this;
      if (flag) {
        this.pageNo = 1;
      }
      getCompanyPage({
        parkId: that.parkId,
        isSettled: that.isSettled,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then(res => {
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
    toDetail(companyId, companyName) {
      let that = this;
      if (this.type != '3') {
        // 不是信用评价 需要判断 是否入驻
        isHasCertific(companyId).then(res => {
          if (res.data != '3') {
            uni.showModal({
              title: '',
              content: '企业尚未入驻！',
              showCancel: false
            });
          } else {
            // 跳转页面
            that.switchToDetail(companyId, companyName);
          }
        })
      } else {
        // 跳转页面
        that.switchToDetail(companyId, companyName);
      }
    },
    switchToDetail(companyId, companyName) {
      switch (this.type) {
        case '0':// 跳转信用名片详情
          uni.navigateTo({
            url: `/pages/creditCardDetail/index?companyId=${companyId}&companyName=${companyName}`
          });
          break;
        case '1': // 跳转品牌推广详情
          uni.navigateTo({
            url: `/pages/creditBrandCard/index?companyId=${companyId}&companyName=${companyName}`
          });
          break;
        case '2': // 跳转信用承诺详情
          uni.navigateTo({
            url: `/pages/creditCardCommit/index?companyId=${companyId}&companyName=${companyName}`
          });
          break;
        case '3': // 跳转信用评价详情
          uni.navigateTo({
            url: `/pages/creditCardEval/index?companyId=${companyId}&companyName=${companyName}`
          });
          break;
      }
    }
  }
};
</script>
<style scoped lang="scss">
page{
  background-color: #f6f6f6;
}
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
  height: 120rpx;
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

