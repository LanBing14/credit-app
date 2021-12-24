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
    <navigator class="liveBox"
               :url="selectTitle == 'douyin' ? './workDetail?uid=' + uid + '&detailId=' + item.id + '&selectTitle=douyin' : '../worksDetail/index?id=' + id + '&detailId=' + item.id"
               hover-class="none" v-for="item in worksList" :key="item.id">
      <view class="liveImg">
        <image class="imgShow" :src="item.coverUrl ? item.coverUrl : '../../static/img/zhibo.jpg'"
               mode="aspectFill"></image>
        <image class="imgHide" src="../../static/img/zhibo.jpg" mode="aspectFill"></image>
      </view>
      <view class="liveCon">
        <view class="h1" v-if="item.videoDesc">
          {{ item.videoDesc.length > 29 ? item.videoDesc.substring(0, 29) + '...' : item.videoDesc }}
        </view>
        <view class="h1" v-else>
          -
        </view>

        <view class="p">
          发布时间：{{ item.publishTime.substring(0, 10) }}
        </view>

        <view class="p">
          评论量：{{ item.commentNum | numberFormat }}
        </view>

        <view class="p">
          点赞数：{{ item.thumbNum | numberFormat }}
        </view>

        <view class="p">
          <text v-if="selectTitle == 'douyin'">分享数：{{ item.shareNum | numberFormat }}</text>
          <text v-else>播放数：{{ item.playNum | numberFormat }}</text>
        </view>
      </view>
    </navigator>
    <uni-load-more status="loading" v-if="loading"></uni-load-more>
    <uni-load-more status="noMore" v-if="noData"></uni-load-more>
    <view class="zanwu" style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="worksList.length == 0">
      暂无数据
    </view>
  </view>
</template>

<script>
import {
  getKsAccountById,
  getAwemeByAccountDataUid,
  getDyAccountByUId,
  getDyAwemeByAccountDataUid
} from "../../api/creditLive"

export default {
  data() {
    return {
      id: '',
      uid: '',
      accountData: {},
      worksList: [],
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
  onShow() {
    this.ksAccountById();
  },
  mounted() {
    this.awemeByAccountDataUid();
    if (this.isShare) {
      this.backNum = {
        num: 2,
        type: 'myHome'
      }
    }

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
              shareTitle: `新华信锐宝-${this.accountData.accountName}-作品列表`
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
              shareTitle: `新华信锐宝-${this.accountData.accountName}-作品列表`
            })
          }
        })
      }

    },
    awemeByAccountDataUid() {
      if (this.selectTitle == 'douyin') {
        getDyAwemeByAccountDataUid({
          uid: this.uid,
          pageNo: this.pageNo,
          pageSize: 10
        }).then(res => {
          if (res.stateCode == '1') {
            this.worksList = this.worksList.concat(res.data.content);
            this.totalPages = res.data.totalPages;
            this.loading = false;
            uni.hideLoading();
          }
        })
      } else {
        getAwemeByAccountDataUid({
          uid: this.uid,
          pageNo: this.pageNo,
          pageSize: 10
        }).then(res => {
          if (res.stateCode == '1') {
            this.worksList = this.worksList.concat(res.data.content);
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
    this.awemeByAccountDataUid();
  },
}
</script>

<style scoped>
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
  font-weight: bold;
  font-size: 25rpx;
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
  position: relative;
}
.liveImg image{
  width: 100%;
  height: 193rpx;
  border-radius: 5rpx;
}
.liveImg .imgShow{
  position: relative;
  z-index: 1;
}
.liveImg .imgHide{
  position: absolute;
  top: 0;
  left: 0;
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
