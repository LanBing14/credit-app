<template>
  <view class="outView">
    <view class="topTitleCon">
      <view class="topTitle">
        <view class="leftImg">
          <view class="leftImgCon">
            <image :src="accountData.avatar ? accountData.avatar : '../../static/img/zhubo.jpg'" mode=""></image>
          </view>
        </view>
        <view class="rightCon">
          <view class="rightConTopTitle">
            {{ accountData.accountName }}
          </view>
          <view class="rightConBottomDes">
            {{ selectTitle == 'douyin' ? '抖音' : '快手' }}号：{{ accountData.account }}
          </view>
        </view>
      </view>
    </view>
    <view class="listOutCon" v-for="item in goodList" :key="item.id">
      <view class="listImg">
        <image :src="item.imageUrl ? item.imageUrl : '../static/img/shangpin.jpg'" mode="aspectFill"></image>
      </view>
      <view class="listCon">
        <view class="listConTitle">
          <text>{{ selectTitle == 'douyin' ? item.title : item.goodsName }}</text>
        </view>
        <view class="listConPrice">
          <text>直播价格: {{ selectTitle == 'douyin' ? item.price : item.promotedPrice }}</text>
        </view>
        <view class="listConRatio">
          <text v-if="selectTitle=='douyin'">上架时间: {{ item.gmtCreate | toTimeYear }}</text>
          <text v-else>上架时间: {{ item.collectionTime | toTimeYear }}</text>
        </view>
        <view class="listConSales">
          <text v-if="selectTitle=='douyin'">预估销量: {{ item.predictSaleNum | numberFormat }}</text>
          <text v-else>预估销量: {{ item.volume | numberFormat }}</text>
        </view>
        <view class="listConSale">
          预估销售额: {{ item.predictSaleMoney | numberFormat }}
        </view>
      </view>
    </view>
    <uni-load-more status="loading" v-if="loading"></uni-load-more>
    <uni-load-more status="noMore" v-if="noData"></uni-load-more>
    <view class="zanwu" v-if="zanwu">暂无数据</view>
  </view>
</template>

<script>
import goodsList from "../../components/goodsList.vue"
import {
  getKsAccountById,
  getGoodsByAccountDataUid,
  getDyAccountByUId, getDyGoodsByUid,
} from "../../api/creditLive"

export default {
  components: {
    goodsList
  },
  data() {
    return {
      id: '',
      uid: '',
      accountData: {},
      goodList: [],
      zanwu: false,
      pageNo: 0,
      totalPages: 0,
      loading: false,
      noData: false,
      selectTitle: '',
      backNum: {},
      isShare: Boolean
    }
  },
  onLoad(options) {
    this.id = options.id;
    this.uid = options.uid;
    uni.showLoading({
      title: '加载中...'
    });
    this.selectTitle = options.selectTitle;
    this.isShare = options.share;
  },
  mounted() {
    this.goodsByAccountDataUid();
    if (this.isShare) {
      this.backNum = {
        num: 2,
        type: 'myHome'
      }
    }
  },
  onShow() {
    this.ksAccountById();
  },
  methods: {
    ksAccountById() {
      if (this.selectTitle == 'douyin') {
        getDyAccountByUId({
          uid: this.uid
        }).then(res => {
          if (res.stateCode == '1') {
            this.accountData = res.data.accountData;
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-${this.accountData.accountName}-带货列表`
            })
          }
        })
      } else {
        getKsAccountById({
          id: this.id
        }).then(res => {
          if (res.stateCode == '1') {
            this.accountData = res.data.accountData;
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-${this.accountData.accountName}-带货列表`
            })
          }
        })
      }
    },
    goodsByAccountDataUid() {
      if (this.selectTitle == 'douyin') {
        getDyGoodsByUid({
          uid: this.uid,
          pageNo: this.pageNo,
          pageSize: 10
        }).then(res => {
          this.goodList = this.goodList.concat(res.data.content);
          res.data.content.length > 0 ? this.zanwu = false : this.zanwu = true;
          this.totalPages = res.data.totalPages;
          this.loading = false;
          uni.hideLoading();
        })
      } else {
        getGoodsByAccountDataUid({
          uid: this.uid,
          pageNo: this.pageNo,
          pageSize: 10
        }).then(res => {
          if (res.stateCode == '1') {
            this.goodList = this.goodList.concat(res.data.content);
            res.data.content.length > 0 ? this.zanwu = false : this.zanwu = true;
            this.totalPages = res.data.totalPages;
            this.loading = false;
            uni.hideLoading();
          }
        })
      }

    }
  },
  onReachBottom() {
    if (this.pageNo + 1 == this.totalPages) return this.noData = true;
    this.loading = true;
    this.pageNo++;
    this.goodsByAccountDataUid();
  }
}
</script>

<style scoped>
.zanwu{
  font-size: 25rpx;
  text-align: center;
  margin-top: 35rpx;
}
.outView{
  padding: 0 22rpx;
}

.topTitleCon {
  background-color: #f9f9f9;
  margin:0 -22rpx;
  padding: 36rpx 22rpx 0 22rpx;
  /* width: 100%; */
  /* height: 90rpx; */
  height: 128rpx;
}

.topTitle {
  height: 100%;
  width: 100%;
  border-bottom: 2rpx solid #e5e5e5;
  display: flex;
}

.leftImg {
  height: 92rpx;
  width: 100rpx;
}

.leftImgCon {
  margin: 0 auto;
  width: 64rpx;
  height: 64rpx;
}

.leftImgCon image {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}

.rightCon {
  width: calc(100% - 100rpx);
  /* font-family: ; */
  /* font-size: 14rpx; */
}

.rightConTopTitle {
  font-size: 31rpx;
  overflow: hidden;
}

.rightConBottomDes {
  font-size: 25rpx;
  overflow: hidden;
}
.listOutCon {
  width: 100%;
  padding: 28rpx;
  height: 246rpx;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
}

.listImg {
  width: 150rpx;
  height: 100%;
}

.listImg image {
  width: 150rpx;
  height: 194rpx;
  border-radius: 9rpx;
}

.listCon {
  width: calc(100% - 150rpx);
  padding-left: 24rpx;
  overflow: hidden;
}

.listConTitle {
  font-size: 25rpx;
  font-weight: bold;
  line-height: 38rpx;
}

.listConPrice {
  font-size: 23rpx;
  line-height: 38rpx;
  color: #666666;
}

.listConRatio {
  font-size: 23rpx;
  line-height: 38rpx;
  color: #666666;
}

.listConSales {
  font-size: 23rpx;
  line-height: 38rpx;
  color: #666666;
}

.listConSale {
  font-size: 23rpx;
  line-height: 38rpx;
  color: #666666;
}
</style>
