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
    <view class="liveBox">
      <view class="liveCon">
        <view class="h1">
          <text>{{ worksDetail.videoDesc ? worksDetail.videoDesc : '-' }}</text>
        </view>
        <view class="p">
          发布时间：{{ worksDetail.publishTime ? worksDetail.publishTime.substring(0, 10) : '-' }}
        </view>
        <view class="p">
          背景音乐：{{ worksDetail.bgm ? worksDetail.bgm : '-' }}
        </view>
      </view>
    </view>
    <view class="userPerfor">
      <view class="userPerforBox">
        <view class="userPerforCon">
          <view class="userPerforMain">
            <view class="userPerforTitle">
              评论量
            </view>
            <view class="userPerforNum">
              <text v-if="selectTitle == 'douyin'">{{ worksDetail.commentNum | numberFormat }}</text>
              <text v-else>{{ worksDetail.playNum | numberFormat }}</text>
            </view>
          </view>
          <view class="userPerforMain">
            <view class="userPerforTitle">
              点赞数
            </view>
            <view class="userPerforNum">
              {{ worksDetail.thumbNum | numberFormat }}
            </view>
          </view>
        </view>
        <view class="userPerforCon">
          <view class="userPerforMain">
            <view class="userPerforTitle">
              {{ selectTitle == 'douyin' ? '分享数' : '播放量' }}
            </view>
            <view class="userPerforNum">
              <text v-if="selectTitle == 'douyin'">{{ worksDetail.shareNum | numberFormat }}</text>
              <text v-else>{{ worksDetail.playNum | numberFormat }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getKsAccountById,
  getKsAwemeById,
  getDyAccountByUId,
  getDyAwemeById
} from "../../api/creditLive"

export default {
  data() {
    return {
      id: '',
      uid: '',
      accountData: {},
      worksDetail: {},
      selectTitle: '',
      backNum: {},
      isShare: Boolean
    }
  },
  onLoad(options) {
    this.id = options.id;
    this.detailId = options.detailId;
    this.uid = options.uid;
    this.selectTitle = options.selectTitle;
    this.isShare = options.share;
  },
  mounted() {
    this.ksAwemeById();
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
    ksAwemeById() {
      if (this.selectTitle == 'douyin') {
        getDyAwemeById({
          id: this.detailId
        }).then(res => {
          if (res.stateCode == '1') {
            this.worksDetail = res.data.awemeData
          }
        })
      } else {
        getKsAwemeById({
          id: this.detailId
        }).then(res => {
          if (res.stateCode == '1') {
            this.worksDetail = res.data.awemeData
          }
        })
      }
    }
  }
}
</script>

<style>
page{
  background: #f9f9f9;
}
.outView {
  padding: 0 22rpx;
}

.topTitleCon {
  background-color: #fff;
  margin:0 -22rpx;
  padding: 36rpx 22rpx 0 22rpx;
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
}

.rightConTopTitle {
  font-size: 28rpx;
  overflow: hidden;
}

.rightConBottomDes {
  font-size: 22rpx;
  overflow: hidden;
}
.userPerfor{
  padding:0 22rpx
}
.userPerforBox{
  margin-top: 30rpx;
  padding:0 26rpx;
  background-color: #fff;
}
.userPerforCon{
  display: flex;
}
.userPerforMain{
  width: 50%;
  display: flex;
  padding:26rpx 0;
}
.userPerforTitle{
  width: 50%;
  font-size: 23rpx;
  color: #333;
}
.userPerforNum{
  width: 50%;
  font-size: 26rpx;
  color: #444;
  font-weight: bold;
  padding-right: 15rpx;
}

.liveBox{
  padding:23rpx 30rpx;
  display: flex;
  justify-content: space-between;
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
