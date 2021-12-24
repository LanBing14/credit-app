<template>
  <view>
    <view class="CompInfo">
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
      <view class="info" v-for="item in complaint" :key="item.id">
        <view class="account">
          <view class="left">
            <image
                :src="item.personalUser.picture ? (allUrl + item.personalUser.picture.path) : '../../static/img/zhubo.jpg'"
                mode=""></image>
          </view>
          <view class="right">
            <view class="rightTitle">
              {{ item.personalUser.username ? item.personalUser.username : '-' }}
            </view>
            <view class="rightDes">
              {{ !item.CREATE_DATE ? '' : item.CREATE_DATE | toTimeYear }}
            </view>
          </view>
        </view>
        <view class="content">
          {{ item.BACK_CONTENT ? item.BACK_CONTENT : '-' }}
        </view>
        <view class="imgList" v-if="item.PATH">
          <image :src="allUrl + item.PATH" mode=""></image>
        </view>
      </view>
      <uni-load-more status="loading" v-if="loading"></uni-load-more>
      <uni-load-more status="noMore" v-if="noData"></uni-load-more>
      <view style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="complaint.length == 0">暂无数据</view>
    </view>
  </view>
</template>

<script>
import {
  getKsAccountById,
  getComplaintList,
  getDyAccountByUId
} from "../../api/creditLive"

export default {
  data() {
    return {
      allUrl: '',
      id: '',
      anchorNo: '',
      accountData: {},
      complaint: [],
      pageNo: 1,
      totalPages: 0,
      loading: false,
      noData: false,
      selectTitle: '',
      uid: '',
      backNum: {},
      isShare: Boolean
    }
  },
  onLoad(options) {
    this.id = options.id;
    this.anchorNo = options.anchorNo;
    this.allUrl = this.$url;
    uni.showLoading({
      title: '加载中...'
    });
    this.selectTitle = options.selectTitle;
    this.uid = options.uid;
    this.isShare = options.share;
  },
  mounted() {
    this.complaintList();
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
              shareTitle: `新华信锐宝-${this.accountData.accountName}-投诉信息`
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
              shareTitle: `新华信锐宝-${this.accountData.accountName}-投诉信息`
            })
          }
        })
      }

    },
    complaintList() {
      getComplaintList({
        pageNo: this.pageNo,
        pageSize: 10,
        anchorNo: this.anchorNo
      }).then(res => {
        if (res.stateCode == '1') {
          this.complaint = this.complaint.concat(res.data.list);
          this.totalPages = res.data.totalPages;
          this.loading = false;
          uni.hideLoading();
        }
      })
    }

  },
  onReachBottom() {
    if (this.pageNo == this.totalPages) return this.noData = true;
    this.loading = true;
    this.pageNo++;
    this.complaintList();
  }
}
</script>

<style>
.CompInfo {
  padding: 0 22rpx 40rpx 22rpx;
}

.topTitleCon {
  background-color: #f9f9f9;
  padding: 36rpx 0 0 0;
  width: 100%;
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
  font-weight: bold;
}

.rightConBottomDes {
  font-size: 22rpx;
  overflow: hidden;
}

.info{
  padding: 0 12rpx;
  border-bottom: 1px solid #E5E5E5;
}

.info .account {
  margin-top: 34rpx;
}

.info .account {
  display: flex;
}

.info .account .left {
  width: 65rpx;
  height: 65rpx;
  margin-right: 19rpx;
}

.info .account .left image {
  width: 65rpx;
  height: 65rpx;
  border-radius: 50%;
}

.info .account .right{
  width: calc(100% - 84rpx);
}

.info .account .rightTitle {
  font-size: 26rpx;
  color: #333333;
  margin-bottom: 18rpx ;
}

.info .account .rightDes {
  font-size: 20rpx;
  color: #999999;
}

.info .content {
  margin: 27rpx 0 25rpx;
  font-size: 22rpx;
  color: #333333;
  line-height: 34rpx;
  padding: 0 13rpx;
}

.info .imgList image{
  width: 144rpx;
  height: 94rpx;
  margin-right: 23rpx;
}
</style>
