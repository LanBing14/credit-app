<template>
  <view>
    <view class="topTitleCon" v-if="uid">
      <view class="topTitle">
        <view class="leftImg">
          <view class="leftImgCon">
            <image :src="accountData.avatar ? accountData.avatar : '../../static/img/zhubo.jpg'" mode=""></image>
          </view>
        </view>
        <view class="rightCon">
          <view class="rightConTopTitle">
            {{accountData.accountName ? accountData.accountName : '-'}}
          </view>
          <view class="rightConBottomDes">
            {{selectTitle == 'douyin' ? '抖音' : '快手'}}号：{{accountData.account ? accountData.account : '-'}}
          </view>
        </view>
      </view>
    </view>
    <view class="list">
      <navigator class="liveBox" :url="'./detail?id=' + item.ID" v-for="item in enterpBusList" :key="item.ID" hover-class="none">
        <view class="liveImg">
          <image :src="item.productFile.length > 0 ? website + item.productFile[0].path : '../../static/img/zhibo.jpg'" mode="aspectFill"></image>
        </view>
        <view class="liveCon">
          <view class="h1" v-if="item.NAME">
            {{item.NAME.length > 31 ? item.NAME.substring(0,31) + '...' : item.NAME}}<text>信锐优品</text>
          </view>
          <view class="p" v-if="item.DESCRIBE">
            {{item.DESCRIBE.length > 41 ? item.DESCRIBE.substring(0,41) + '...' : item.DESCRIBE}}
          </view>
          <view class="p" v-if="item.LICENSE_NO">
            生产许可证号：{{item.LICENSE_NO}}
          </view>
          <image src="../../static/img/sl.png"></image>
        </view>
      </navigator>
      <uni-load-more status="loading" v-if="loading"></uni-load-more>
      <uni-load-more status="noMore" v-if="noData"></uni-load-more>
      <view class="zanwu" style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="enterpBusList.length == 0">暂无数据</view>
    </view>
  </view>
</template>

<script>
import {getKsAccountByUId, getDyAccountByUId, getSharpListForIndex, getSharpListByUidData} from "../../api/creditLive";

export default {
  data() {
    return {
      allUrl: '',
      enterpBusList: [],
      pageNo: 1,
      totalPages: 0,
      loading: false,
      noData: false,
      backNum: {},
      isShare: Boolean,
      uid: '',
      accountData: {},
      selectTitle: '',
      shareTitle: ''
    }
  },
  onLoad(options) {
    /*uni.showLoading({
        title: '加载中'
    });*/
    this.isShare = options.share;
    this.uid = options.uid;
    this.selectTitle = options.selectTitle
  },
  mounted() {
    if (this.uid) {
      this.getSharpListByUid();
      this.ksAccountById();
    } else {
      this.findPageBusiness();
    }
    if (this.isShare) {
      this.backNum = {
        num: 2,
        type: 'myHome'
      }
    }
    uni.$emit('shareEmit', {
      shareTitle: `新华信锐宝-信锐优品`
    })
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
              shareTitle: `新华信锐宝-${this.accountData.accountName}-信锐优品`
            })
          }
        })
      } else {
        /*getKsAccountById({
          id:this.id
        }).then(res=>{
          if(res.stateCode == '1'){
            this.accountData = res.data.accountData
          }
        })*/
        getKsAccountByUId({
          uid: this.uid
        }).then(res => {
          if (res.stateCode == '1') {
            this.accountData = res.data.accountData;
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-${this.accountData.accountName}-信锐优品`
            })
          }
        })
      }

    },
    //全量查询信锐优品列表
    findPageBusiness() {
      getSharpListForIndex({
        pageNo: this.pageNo,
        pageSize: 10,
        name: '',
        companyName: ''
      }).then(res => {
        if (res.stateCode == '1') {
          this.totalPages = res.data.totalPages;
          this.enterpBusList = this.enterpBusList.concat(res.data.list);
          this.loading = false;
          uni.hideLoading();
        }
      })
    },

    // 根据uid查询信锐优品列表
    getSharpListByUid() {
      getSharpListByUidData({
        uid: this.uid,
        pageNo: this.pageNo,
        pageSize: 10
      }).then(res => {
        if (res.stateCode == '1') {
          this.totalPages = res.data.totalPages;
          this.enterpBusList = this.enterpBusList.concat(res.data.list);
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
    // this.findPageBusiness();
    if (this.uid) {
      this.getSharpListByUid();
    } else {
      this.findPageBusiness();
    }
  }
}
</script>

<style scoped>
.list{
  padding:0 30rpx 40rpx 30rpx;
}
.liveBox{
  padding:23rpx 0;
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
  position: relative;
}
.liveCon image{
  width: 130rpx;
  height:105rpx;
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}
.liveCon .h1{
  font-size: 25rpx;
  color: #333;
  font-weight: bold;
  line-height: 35rpx;
  position: relative;
  z-index: 1;
}
.liveCon .h1 text{
  display: inline-block;
  width: 100rpx;
  height: 33rpx;
  text-align: center;
  line-height: 33rpx;
  background: #59c8d1;
  font-size: 20rpx;
  color: #fff;
  margin-left: 12rpx;
  font-weight: 100;
}
.liveCon .p{
  font-size: 23rpx;
  color: #666;
  margin-top: 11rpx;
  line-height: 33rpx;
  position: relative;
  z-index: 1;
}
.publish{
  position: fixed;
  bottom: 309rpx;
  right: 97rpx;
}
.publish image{
  width: 115rpx;
  height: 115rpx;
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
</style>

