<template>
  <view class="outView">
    <view class="topTitleCon">
      <view class="topTitle">
        <view class="leftImg">
          <view class="leftImgCon">
            <image v-if="selectTitle == 'douyin'"
                   :src="mcnInfo.logo ? mcnInfo.logo : '../../static/img/icon_default.png'" mode=""></image>
            <image v-else src="../../static/img/icon_default.png" mode=""></image>
          </view>
        </view>
        <view class="rightCon">
          <view class="rightConTopTitle">
            {{ mcnInfo.mcnName ? mcnInfo.mcnName : '-' }}
          </view>
          <view class="rightConBottomDes" v-if="mcnInfo.companyName">
            {{ mcnInfo.companyName }}
          </view>
        </view>
      </view>
    </view>
    <view class="bottomBox">
      <navigator class="anchorListCon" v-for="item in kolDataList" :key="item.id" hover-class="none"
                 :url="selectTitle == 'douyin' ? '../anchor/index?uid=' + item.uid + '&selectTitle=douyin' : '../anchorHome/index?uid=' + item.uid">
        <view class="listBox">
          <view class="listBoxCon">
            <view class="listBoxLeftImg">
              <image :src="item.avatar ? item.avatar : '../../static/img/icon_default.png'" mode=""></image>
            </view>
            <view class="listBoxRightCon">
              <view class="title">
                {{ item.accountName }}
              </view>
              <view class="fans">
                粉丝数: <span class="colorO">{{ item.followerNum | numberFormat }}</span>
              </view>
              <view class="platform">
                所属平台: {{ selectTitle == 'douyin' ? '抖音' : '快手' }}
              </view>
            </view>
          </view>
        </view>
      </navigator>
    </view>
    <uni-load-more status="loading" v-if="loading"></uni-load-more>
    <uni-load-more status="noMore" v-if="noData"></uni-load-more>
  </view>
</template>

<script>
import {
  getMcnKolDataList,
  getMcnInfoByMcnId,
  getDyMcnInfoByMcnId,
  getDyMcnKolDataList
} from '../../api/creditLive'

export default {
  data() {
    return {
      mcnId: '',
      kolDataList: [],
      mcnInfo: {},
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
    this.mcnId = options.mcnId;
    uni.showLoading({
      title: '加载中...'
    });
    this.selectTitle = options.selectTitle;
    this.isShare = options.share;
  },
  onShow() {
    this.mcnInfoByMcnId();
  },
  mounted() {
    this.mcnKolDataList();
    if (this.isShare) {
      this.backNum = {
        num: 2,
        type: 'myHome'
      }
    }
  },
  methods: {
    mcnKolDataList() {
      if (this.selectTitle == 'douyin') {
        getDyMcnKolDataList({
          pageNo: this.pageNo,
          pageSize: 16,
          mcnId: this.mcnId
        }).then(res => {
          if (res.stateCode == '1') {
            this.kolDataList = this.kolDataList.concat(res.data.content);
            this.totalPages = res.data.totalPages;
            this.loading = false;
            uni.hideLoading();
          }
        })
      } else {
        getMcnKolDataList({
          pageNo: this.pageNo,
          pageSize: 16,
          mcnId: this.mcnId
        }).then(res => {
          if (res.stateCode == '1') {
            this.kolDataList = this.kolDataList.concat(res.data.content);
            this.totalPages = res.data.totalPages;
            this.loading = false;
            uni.hideLoading();
          }
        })
      }
    },
    mcnInfoByMcnId() {
      if (this.selectTitle == 'douyin') {
        getDyMcnInfoByMcnId({
          mcnId: this.mcnId
        }).then(res => {
          if (res.stateCode == '1') {
            this.mcnInfo = res.data;
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-${this.mcnInfo.mcnName}-关联主播`
            })
          }
        })
      } else {
        getMcnInfoByMcnId({
          mcnId: this.mcnId
        }).then(res => {
          if (res.stateCode == '1') {
            this.mcnInfo = res.data;
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-${this.mcnInfo.mcnName}-关联主播`
            })
          }
        })
      }
    }
  },
  onReachBottom() {
    if (this.pageNo + 1 == this.totalPages) return this.noData = true;
    this.loading = true;
    this.pageNo++;
    this.mcnKolDataList();
  }
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
  font-size: 34rpx;
  overflow: hidden;
}

.rightConBottomDes {
  font-size: 28rpx;
  overflow: hidden;
}

.bottomBox{
  padding-top: 31rpx;
  display: flex;
  flex-wrap: wrap;
}

.anchorListCon{
  width: 50%;
  height: 165rpx;
  margin-bottom: 25rpx;
}

.listBox{
  height: 100%;
  width: 332rpx;
  margin: 0 auto;
  /*padding: 23rpx 21rpx 30rpx 20rpx;*/
  padding: 23rpx 21rpx 0 20rpx;
  border: 1rpx #eeeeee solid;
  box-shadow: 0 10rpx 25rpx rgba(40,40,40,0.1);
}

.listBoxCon{
  width: 291rpx 98rpx;
  display: flex;
}

.listBoxLeftImg image{
  width: 61rpx;
  height: 61rpx;
  border-radius: 50%;
}
.listBoxRightCon{
  width: calc(100% - 61rpx);
  padding-left: 20rpx;
}

.listBoxRightCon .title{
  font-size: 25rpx;
  font-weight: bold;
  color: #333333;
  overflow: hidden;
  /* white-space: nowrap; */
}
.listBoxRightCon .fans{
  font-size: 21rpx;
  overflow: hidden;
}
.listBoxRightCon .platform{
  font-size: 21rpx;
  overflow: hidden;
}

.colorO{
  color: #ff8f00;
}
</style>
