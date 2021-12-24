<template>
  <view>
    <view class="index">
      <view class="banner">
        <swiper class="swiper"
                circular="true"
                easing-function="easeOutCubic"
                indicator-dots="true"
                autoplay="true"
                indicator-color="rgba(255,255,255,0.6)"
                indicator-active-color="#fff">
          <swiper-item v-for="(item,index) in bannerList" :key="index + 'zero'" v-if="index < 3" @tap="toDetail(item)">
            <image :src="item.picLinks"></image>
          </swiper-item>
        </swiper>
        <uni-load-more status="loading" v-if="bannerList.length == 0"></uni-load-more>
      </view>
      <view class="navigation-view">
        <view class="enter" @click="navigationTo('/pages/creditLive/monitor')">
			<image src="../../static/icon/xrjc.png" mode="" class="icon-img"></image>
			<view class="img-text">信锐监测</view>
		</view>
        <view class="enter" @click="navigationTo('/pages/creditLive/employ')">
			<image src="../../static/icon/xrsl.png" mode="" class="icon-img"></image>
			<view class="img-text">信锐收录</view>
		</view>
        <view class="enter" @click="navigationTo('/pages/creditLive/search')">
			<image src="../../static/icon/xrcx.png" mode="" class="icon-img"></image>
			<view class="img-text">信锐查询</view>
		</view>
      </view>
      <view class="creditLive">
        <view class="creditLiveTitle clear">
          <view class="titleFl fl">
            信锐主播
          </view>
          <view class="titleFr fr" @tap="search()">
            申请成为信锐主播>>
          </view>
        </view>
        <view class="creditLiveMain">
          <swiper class="swiper"
                  easing-function="easeOutCubic"
                  autoplay="true">
            <swiper-item v-for="(item,index) in accountList" :key="index + 'first'">
              <view class="swiperList">
                <navigator :url="'../anchor/index?uid=' + data.uid  + '&selectTitle=douyin'" hover-class="none"
                           class="swiperMain" v-for="data in item" :key="data.id + 'four'">
                  <image :src="data.avatar ? data.avatar : '../../static/img/zhubo.jpg'"></image>
                  <view class="listTitle">{{ data.accountName.substring(0, 5) }}</view>
                </navigator>
              </view>
            </swiper-item>
          </swiper>
          <uni-load-more status="loading" v-if="accountList.length == 0"></uni-load-more>
        </view>
      </view>
      <view class="creditMech">
        <view class="creditLiveTitle clear">
          <view class="titleFl fl">
            信锐机构
          </view>
          <view class="titleFr fr" @tap="creditMech()">
            申请成为信锐机构>>
          </view>
        </view>
        <view class="creditMechMain">
          <navigator class="creditMechBox" hover-class="none"
                     :url="'../organization/index?mcnId=' + item.mcnId + '&selectTitle=douyin'" v-for="item in MechList"
                     :key="item.id + 'third'">
            <view class="mechImg">
              <image :src="item.logo ? item.logo : '../../static/img/icon_default.png'"></image>
            </view>
            <view class="creditMechCon">
              <view class="mechTitle">{{ item.mcnName }}</view>
              <view class="mechCompany" v-if="item.companyName">
                {{ item.companyName.length > 8 ? item.companyName.substring(0, 8) + '...' : item.companyName }}
              </view>
              <view class="mechCompany">签约达人数 ：
                <text class="mechNum">{{ item.signKolNum }}人</text>
              </view>
            </view>
          </navigator>
        </view>
        <uni-load-more status="loading" v-if="MechList.length == 0"></uni-load-more>
      </view>
      <view class="consulting">
        <view class="creditLiveTitle clear">
          <view class="titleFl fl">
            信锐资讯
          </view>
          <view class="titleFr fr">
            <navigator url="/pages/consulting/index" hover-class="none">查看更多>></navigator>
          </view>
        </view>
        <view class="consultMain">
          <view v-for="(item,index) in consultList" v-if="index < 5" :key="item.id + 'second'" @tap="toDetail(item)">
            <view class="nameP">{{ item.title }}</view>
            <view class="timeP">
              <text class="time_text">发布时间：{{ item.pubTime | toTimeYear }}</text>
              <text class="time_line">|</text>
              <text>来源：{{ item.source }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getDyMcnInfoList,
  getDyAccountList,
} from "../../api/creditLive"
import {Api_getNewsList} from "../../api/common";

export default {
  data() {
    return {
      allUrl: '',
      barHeight: 0,
      MechList: [],
      accountList: [],
      bannerList: [],
      consultList: []
    }
  },
  onLoad() {
  },
  mounted() {
    this.barHeight = uni.getSystemInfoSync().statusBarHeight;
    this.banner();
    this.mcnInfoList();
    this.ksAccountList();
    this.consult();
    /*uni.$emit('shareEmit',{
      shareTitle:`新华信锐宝-直播短视频电商信用平台`
    })*/
  },
  onShow() {
    /*uni.$emit('shareEmit',{
      shareTitle:`新华信锐宝-直播短视频电商信用平台`
    })*/
  },
  methods: {
    navigationTo(url) {
      uni.navigateTo({
        url: url
      });
    },
    consult() {
      Api_getNewsList(
          '/xhxy_Json/xhxyztsc/zbdspdsxy/ssdt/index.json&copytype=true'
      ).then(res => {
        if (res.stateCode == '1') {
          this.consultList = res.data.list;
        }
      })
    },
    search() {
      uni.navigateTo({
        url: "../creditLive/search"
      })
    },
    creditMech() {
      uni.navigateTo({
        url: "../creditLive/search?anchorTitle=信锐机构"
      })
    },
    mcnInfoList() {
      getDyMcnInfoList({
        type: 1,
        pageNo: 0,
        pageSize: 4,
      }).then(res => {
        if (res.stateCode == '1') {
          this.MechList = res.data.content;
        }
      })
    },
    ksAccountList() {
      getDyAccountList({
        type: 1,
        pageNo: 0,
        pageSize: 12
      }).then(res => {
        if (res.stateCode == '1') {
          this.accountList = this.arrSplit(res.data.content, 4);
        }
      })
    },
    banner() {
      Api_getNewsList(
          "/xhxy_Json/xhxyztsc/zbdspdsxy/ttdt/index.json&copytype=true"
      ).then(res => {
        if (res.stateCode == '1') {
          this.bannerList = res.data.list;
        }
      })
    },
    toDetail(data) {
      uni.navigateTo({
        url: "../consultDetail/index?url=" + data.artUrl
      })
    },
    //数组拆分
    arrSplit(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
    }
  }
}
</script>

<style>

.consulting{
  margin-top: 40rpx;
}
.consultMain view .timeP{
  border-bottom: 1px solid #e5e5e5;
}
.consultMain > view:last-child .timeP{
  border-bottom: none;
}
.nameP {
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  font-family: "微软雅黑";
  margin-top: 20rpx;
}

.timeP {
  font-size: 25rpx;
  color: #999999;
  line-height: 40rpx;
  margin-top: 30rpx;
  padding-bottom: 25rpx;
  margin-right: 22rpx;
}

.time_line {
  margin-right: 30rpx;
}

.time_text {
  margin-right: 30rpx;
}
navigator{
  box-sizing: border-box;
}
.logo{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding:0 22rpx;
  z-index: 2;
}
.logo .backImg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 130rpx;
  z-index: 3;
  overflow: hidden;
}
.logo .backImg image{
  width: 750rpx;
  height: 771rpx;
}
.logo .logoImg{
  width: 192rpx;
  height: 53rpx;
  margin-top: 20rpx;
  position: relative;
  z-index: 3;
}
.indexBac{
  position: absolute;
  left: 0;
  width: 750rpx;
  z-index: 1;
  overflow: hidden;
}
.indexBac image{
  width: 100%;
  height: 771rpx;
}
.index{
  position: relative;
  z-index: 1;
  padding:20rpx 22rpx 0 22rpx;
}
.search{
  margin:0 10rpx;
  position: relative;
}
.search input{
  height: 67rpx;
  border-radius: 5rpx;
  background: rgba(255,255,255,0.35);
  margin-top: 31rpx;
  font-size: 25rpx;
  color: #fff;
  padding-left: 65rpx;
}
.searchPlace{
  color: #fff;
  font-size: 25rpx;
}
.search .icon-sousuo{
  position: absolute;
  top: 12rpx;
  left: 17rpx;
  font-size: 39rpx;
  color: #fff;
}
.banner{
  margin:0 10rpx;
  margin-top: 35rpx;
}
.banner .swiper{
  height: 386rpx;
}
.banner swiper-item{
  border-radius: 5rpx;
  overflow: hidden;
}
.banner swiper-item image{
  width: 100%;
  height: 386rpx;
}
.creditLive{
  margin-top: 35rpx;
}
.titleFl{
  font-size: 31rpx;
  color: #333;
}
.titleFl:after{
  content: '';
  display: block;
  width: 37rpx;
  height: 6rpx;
  background: #436eb0;
  border-radius: 6rpx;
  margin-top: 10rpx;
}
.titleFr{
  font-size: 23rpx;
  color: #666;
  line-height: 54rpx;
}
.creditLiveMain{
  margin-top: 27rpx;
}
.creditLiveMain swiper{
  height: 175rpx;
}
.creditLiveMain swiper-item{
  width: 100%;
  box-sizing: border-box;
}
.creditLiveMain swiper-item .swiperMain image{
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
.creditLiveMain swiper-item .swiperMain .listTitle{
  font-size: 27rpx;
  color: #000;
  margin-top: 23rpx;
  height: 42rpx;
  line-height: 42rpx;
}
.swiperList{
  /* display: flex; */
  justify-content: space-between;
}
.swiperMain{
  width: 25%;
  text-align: center;
  display: inline-block;
}
.creditMech{
  margin-top: 40rpx;
}
.creditMechMain{
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  margin-top: 5rpx;
}
.creditMechMain .creditMechBox{
  width: 325rpx;
  padding:24rpx 20rpx;
  display: flex;
  justify-content: space-between;
  border-radius: 5rpx;
  margin-top: 25rpx;
}
.creditMechMain .creditMechBox:nth-child(1){
  background: #e4eafd;
}
.creditMechMain .creditMechBox:nth-child(2){
  background: #ffeae2;
}
.creditMechMain .creditMechBox:nth-child(3){
  background: #fffbea;
}
.creditMechMain .creditMechBox:nth-child(4){
  background: #e4f5fd;
}
.creditMechBox image{
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}
.creditMechBox .creditMechCon{
  width: 207rpx;
}
.creditMechBox .creditMechCon .mechTitle{
  font-size: 25rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}
.creditMechBox .creditMechCon .mechCompany{
  font-size: 21rpx;
  color: #000;
  line-height: 37rpx;
}
.creditMechBox .creditMechCon .mechCompany .mechNum{
  font-weight: bold;
  color: #ff8f00;
}
.enterpBus{
  margin-top: 40rpx;
}
.liveBox{
  padding:23rpx 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
}
/*.liveBox:last-child{
	border-bottom: none;
}*/
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
.navigation-view {
  display: flex;
  padding-top: 55rpx;
}
.enter {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.icon-img{
	width: 52rpx;
	height: 50rpx;
}

.img-text{
	line-height: 82rpx;
	font-family: SourceHanSansCN-Medium;
	font-size: 24rpx;
	color: #555555;
}
</style>
