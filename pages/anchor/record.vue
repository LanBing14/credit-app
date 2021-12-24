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
            {{ accountData.accountName ? accountData.accountName : '-' }}
          </view>
          <view class="rightConBottomDes">
            {{ selectTitle == 'douyin' ? '抖音' : '快手' }}号：{{ accountData.account ? accountData.account : '-' }}
          </view>
        </view>
      </view>
    </view>
    <navigator class="liveBox" v-for="item in liveList"
               :url="`../liveRecord/index?roomId=${item.LIVE_ID}&selectTitle=${selectTitle == 'douyin' ? 'douyin' : ''}&sharpLiveId=${item.SHARP_LIVE_ID ? item.SHARP_LIVE_ID : ''}&id=${item.ID}`"
               :key="item.LIVE_ID" hover-class="none">
      <view class="liveImg">
        <image :src="item.COVER_URL ? item.COVER_URL : '../../static/img/zhibo.jpg'" mode="aspectFill"></image>
      </view>
      <view class="liveCon">
        <view class="h1">
          {{ item.LIVE_NAME ? item.LIVE_NAME : accountData.accountName + '的直播间' }}
          <text class="isCer">{{ item.SHARP_LIVE_ID ? '信锐直播间' : '我要认证' }}</text>
        </view>
        <view class="p">
          {{ selectTitle == 'douyin' ? '开播时间：' : '直播开始时间：' }}
          {{ item.START_TIME | toTimeYear }}
        </view>

        <view class="p">
          {{ selectTitle == 'douyin' ? '预估总销售额：' : '预估销售额：' }}
          {{ item.TOTAL_SALES_MONEY | numberFormat }}元
        </view>

        <view class="p">
          {{ selectTitle == 'douyin' ? '开播时长：' : '直播时长：' }}
          <text v-if="selectTitle == 'douyin'">
            {{ Math.floor(item.DURATION / 60) + '小时' + Math.floor(item.DURATION % 60) + '分钟' }}
          </text>
          <text v-else>
            {{ item.DURATION | toDayHours }}
          </text>
        </view>
        <view class="p">
          累计观看人数：
          <text v-if="selectTitle == 'douyin'">
            {{ item.STATS_TOTAL_USER | numberFormat }}
          </text>
          <text v-else>
            <text v-if="item.STATS_TOTAL_USER == '100000'">
              10.00w+
            </text>
            <text v-else>
              {{ item.STATS_TOTAL_USER | numberFormat }}
            </text>
          </text>
        </view>
      </view>
    </navigator>
    <uni-load-more status="loading" v-if="loading"></uni-load-more>
    <uni-load-more status="noMore" v-if="noData"></uni-load-more>
    <view class="zanwu" style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="liveList.length == 0">
      暂无数据
    </view>
  </view>
</template>

<script>
import liveList from "../../components/livelist.vue"
import {
  getKsAccountById,
  getDyAccountByUId, getLiveRecordPageByUid,
} from "../../api/creditLive"

export default {
  components: {
    liveList
  },
  data() {
    return {
      id: '',
      uid: '',
      accountData: {},
      liveList: [],
      pageNo: 1,
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
    this.livesByAccountData();
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
              shareTitle: `新华信锐宝-${this.accountData.accountName}-直播记录`
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
              shareTitle: `新华信锐宝-${this.accountData.accountName}-直播记录`
            })
          }
        })
      }

    },
    livesByAccountData() {
      getLiveRecordPageByUid({
        accountUid: this.uid,
        pageNo: this.pageNo,
        pageSize: 10
      }).then(res => {
        if (res.stateCode == '1') {
          this.liveList = this.liveList.concat(res.data.list);
          this.totalPages = res.data.totalPages;
          this.loading = false;
          uni.hideLoading();
        }
      })
    }
  },
  onReachBottom() {
    if (this.pageNo + 1 == this.totalPages) return this.noData = true;
    this.loading = true;
    this.pageNo++;
    this.livesByAccountData();
  }
}
</script>

<style scoped>
.isCer{
  height: 35rpx;
  padding:0 10rpx;
  background-color: #e2efff;
  color: #4785ce;
  font-size: 23rpx;
  line-height: 35rpx;
  display: inline-block;
  margin-left: 10rpx;
}
.outView{
  padding: 0 22rpx;
}

.topTitleCon {
  background-color: #f9f9f9;
  margin:0 -22rpx;
  padding: 36rpx 22rpx 0 22rpx;
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

.liveBox{
  padding:23rpx 30rpx;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
}
.liveBox:last-child{
  border-bottom: none;
}
.liveImg{
  width: 150rpx;
}
.liveImg image{
  width: 100%;
  height: 193rpx;
  border-radius: 5rpx;
}
.liveCon{
  width: calc(100% - 170rpx);
}
.liveCon .h1{
  font-size: 25rpx;
  color: #333;
  font-weight: bold;
}
.liveCon .p{
  font-size: 23rpx;
  color: #666;
  margin-top: 11rpx;
}
</style>
