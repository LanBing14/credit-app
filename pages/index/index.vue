<template>
  <view>
    <view class="indexHead" :style="{background:`rgba(17,48,144,${colorVal})`}">
      <!-- 这里是状态栏 -->
      <view class="statusBar"></view>
      <view class="headTitle">
        <navigator url="/pages/search/index" class="headFl" hover-class="none">
          <image src="../../static/icon/01.png"></image>
        </navigator>
        <view class="headCtn">
          新华信用
        </view>
        <view class="headFr">
          <view class="headEn" @click="openEn()">EN</view>
        </view>
      </view>
    </view>
    <view class="indexSwiper">
      <swiper class="swiper" :circular="true" :indicator-dots="true" :indicator-color="'rgba(255,255,255,0.41)'"
              :indicator-active-color="'#ffffff'" :style="{height:swiperHight + 384 + 'rpx'}">
        <swiper-item v-for="(item,index) in advTwoList" :key="index">
          <view class="swiper-item" @click="openImgUrl(item.imgUrl)">
            <view class="statusBar" :style="{background: item.name}"></view>
            <view class="headerSwiper" :style="{background: item.name}"></view>
            <image :src="website + item.imgPath"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="indexMain">
      <view class="indexNav clear">
        <navigator class="li" hover-class="none" url="/pages/creditBrandPromotion/index">
          <image src="../../static/icon/02.png"></image>
          <text>品牌名片</text>
        </navigator>
        <navigator url="/pages/creditGoods/index" class="li" hover-class="none">
          <image src="../../static/icon/03.png"></image>
          <text>信锐优品</text>
        </navigator>
        <navigator class="li" hover-class="none" url="/pages/creditReport/index">
          <image src="../../static/icon/04.png"></image>
          <text>信用报告</text>
        </navigator>
        <navigator class="li" hover-class="none" url="/pages/creditInvestigation/index">
          <image src="../../static/icon/05.png"></image>
          <text>信用调研</text>
        </navigator>
        <navigator url="/pages/allService/index" class="li" hover-class="none">
          <image src="../../static/icon/06.png"></image>
          <text>全部</text>
        </navigator>
      </view>
      <view class="creditCard">
        <view class="cardTitle">
          <image src="../../static/icon/07.png"></image>
          信用名片
          <navigator url="/pages/creditCardList/index" hover-class="none">更多</navigator>
        </view>
        <view class="cardMain clear">
          <navigator v-for="item in cardsList" :key="item.id" :url="`/pages/creditCardDetail/index?companyId=${item.companyId}&companyName=${item.name}`" class="li" hover-class="none">
            <image src="../../static/img/png_01.png" class="liBack"></image>
            <view class="liTop clear">
              <view class="liTopImg">
                <image :src="website + item.path" mode="widthFix"></image>
              </view>
              <text v-if="item.name">
                {{item.name.length > 20 ? item.name.substring(0,20) : item.name}}
              </text>
            </view>
            <view class="liBtm">
              <text>统一社会信用代码</text>
              <text>
                {{item.creditCode}}
              </text>
            </view>
          </navigator>
        </view>
      </view>
      <view class="creditDyna">
        <view class="cardTitle">
          <image src="../../static/icon/07.png"></image>
          信用动态
          <navigator url="/pages/publish/index" hover-class="none" open-type="switchTab">更多</navigator>
        </view>
        <view class="dynaMain">
          <navigator v-for="(item, index) in newList" :key="index" :url="`/pages/newsDetail/index?url=${item.artUrl}`" class="li clear" hover-class="none">
            <image :src="item.picLinks ? item.picLinks : '../../static/img/png_11.png'"></image>
            <view class="liMain">
              <view class="liTitle">{{item.title.length > 27 ? item.title.substring(0,27) + '...' : item.title}}</view>
              <text v-if="item.publishDate">{{item.publishDate.substring(0,10)}}</text>
            </view>
          </navigator>
        </view>
      </view>
    </view>
    <view class="leftNav" v-if="isLeftNav">
      <navigator url="/pages/creditPark/index" class="li" hover-class="none">
        <image src="../../static/icon/14.png"></image>
        <text>信用园区</text>
      </navigator>
      <navigator url="/pages/creditRepair/index" class="li" hover-class="none">
        <image src="../../static/icon/15.png"></image>
        <text>信用修复</text>
      </navigator>
      <navigator url="/pages/creditLive/index" class="li" hover-class="none">
        <image src="../../static/icon/16.png"></image>
        <text>信锐直播</text>
      </navigator>
      <view class="leftNavHide" @click="isLeftNav = false">
        <image src="../../static/icon/17.png"></image>
      </view>
    </view>
    <view class="leftNavShow" v-if="!isLeftNav" @click="isLeftNav = true">
      <image src="../../static/icon/13.png"></image>
    </view>
  </view>
</template>

<script>
import {getIndexNewList} from '../../api/index';
import {arrIsNull} from "../../utils/utils";
import request from "../../utils/request";

export default {
  components: {},
  data() {
    return {
      swiperHight: 0,
      isLeftNav: false,
      colorVal: 0,
      newList: [],
      cardsList:[],
      advTwoList:[]
    }
  },
  onLoad() {
    let systemInfo = uni.getSystemInfoSync();
    this.swiperHight = systemInfo.statusBarHeight * (750 / systemInfo.windowWidth);
  },
  async onShow() {
    // 等待登录接口判断完在执行逻辑
    await this.$onLaunched;
    this.getIndexNewList();
    this.getCreditCardsByPage();
    this.getSpecialTopicManageListByPage();
  },
  methods: {
    open() {
      this.$refs.popup.open('top')
    },
    close() {
      this.$refs.popup.close()
    },
    openEn() {
      //#ifdef APP-PLUS
      plus.runtime.openURL('https://em.credit100.com/home');
      //#endif

      //#ifdef H5
      window.open('https://em.credit100.com/home');
      //#endif
    },

    getIndexNewList(){//信用动态
      getIndexNewList({
        "pageNo": 1,
        "pageSize": 6,
        "pubTimeSort": true,
        "flag": "cms"
      }).then(data => {
        console.log(data);
        if (data.stateCode === '50101') {
          if (!arrIsNull(data.data.returnData)) {
            this.newList = data.data.returnData;
          }
        }
      }).catch(e => {

      })
    },

    getCreditCardsByPage(){ //信用名片
      request('/user/center/xhsRest/cards/getCreditCardsByPage',{
        method: "get",
        data: {
          pageNo: 1,
          pageSize: 2,
          showType:1
        }
      }).then(data => {
        if(data.stateCode == '1'){
          if (!arrIsNull(data.data.list)) {
            this.cardsList = data.data.list;
          }
        }
      })
    },
    getSpecialTopicManageListByPage(){//顶部轮播图
      request('/user/center/xhsRest/release/getSpecialTopicManageListByPage',{
        method:'get',
        data:{
          pageNo: 1,
          pageSize: 10,
          type: '7'
        }
      }).then(res => {
        console.log(res);
        if (res.stateCode == '1'){
          this.advTwoList = res.data.list;
          // 替换图片跳转路径中的转义符
          if (this.advTwoList.length > 0) {
            this.advTwoList.forEach((item, i) => {
              if(item.imgUrl != null ){
                item['imgUrl'] = item.imgUrl.replace('&amp;', '&');
              }
            });
          }
        }
      })
    },
    openImgUrl(url){ //顶部轮播图打开方法
      if(url != null){
        if(url.indexOf('xhxy') >= 0){
          //#ifdef APP-PLUS
          plus.runtime.openURL(`https://m.credit100.com/#/articleText?url=${url}&type=1`);
          //#endif

          //#ifdef H5
          window.open(`https://m.credit100.com/#/articleText?url=${url}&type=1`);
          //#endif
        } else{
          //#ifdef APP-PLUS
          plus.runtime.openURL(`${url}?titile=${encodeURIComponent('新华信用-信用头条')}`);
          //#endif

          //#ifdef H5
          window.open(`${url}?titile=${encodeURIComponent('新华信用-信用头条')}`);
          //#endif
        }
      }
    }
  },
  onPageScroll(e) {
    //滑动滚动条添加自定义导航背景色
    this.colorVal = (e.scrollTop * (100 / 70) / 100)
  },
}
</script>

<style>
.indexHead{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;
}
.statusBar{
  height: var(--status-bar-height);
}
.headTitle{
  height: 68rpx;
  position: relative;
  line-height: 68rpx;
}
.headCtn{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
}
.headFl{
  position: absolute;
  left: 12rpx;
  top: 0;
  height: 68rpx;
  width: 68rpx;
  z-index: 2;
}
.headFl image{
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.headFr{
  position: absolute;
  right: 12rpx;
  top: 0;
  height: 68rpx;
  width: 68rpx;
  z-index: 2;
}
.headEn{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 33rpx;
  height: 33rpx;
  border:1rpx solid #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 33rpx;
  font-size: 18rpx;
  color: #fff;
}
.swiper-item image{
  width: 100%;
  height: 316rpx;
}
.headerSwiper{
  height: 68rpx;
  position: relative;
}
/deep/ .uni-swiper-dot {
  width: 10rpx !important;
  height: 10rpx !important;
  border-radius: 10rpx !important;
}
/deep/ .uni-swiper-dot-active{
  width: 20rpx !important;
}
.indexMain{
  padding:0 29rpx;
}
.indexNav{
  width: 100%;
  margin-top: 53rpx;
}
.indexNav .li{
  width: 20%;
  text-align: center;
  float: left;
}
.indexNav .li image{
  width: 60rpx;
  height: 60rpx;
}
.indexNav .li text{
  display: block;
  font-size: 24rpx;
  color: #555;
  margin-top: 15rpx;
}
.creditCard{
  margin-top: 43rpx;
}
.cardTitle{
  font-size: 28rpx;
  color: #333;
  line-height: 28rpx;
}
.cardTitle image{
  width: 26rpx;
  height: 26rpx;
  vertical-align: top;
  display: inline-block;
  margin-right: 15rpx;
}
.cardTitle navigator{
  float: right;
  font-size: 22rpx;
  color: #666;
}
.cardMain{
  margin-top: 30rpx;
}
.cardMain .li{
  width: 334rpx;
  height: 208rpx;
  position: relative;
  border-radius: 10rpx;
  overflow: hidden;
  float: left;
}
.cardMain .li:nth-child(even){
  float: right;
}
.cardMain .li .liBack{
  width: 334rpx;
  height: 208rpx;
  position: absolute;
  top: 0;
  left: 0;
}
.cardMain .li .liTop{
  height: 120rpx;
  position: relative;
  padding-top: 30rpx;
}
.cardMain .li .liTop .liTopImg{
  width: 61rpx;
  height: 61rpx;
  float: left;
  position: relative;
  margin-left: 9rpx;
}
.cardMain .li .liTop .liTopImg image{
  width: 61rpx;
  height: 61rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.cardMain .li .liTop text{
  width: calc(100% - 95rpx);
  float: right;
  font-size: 20.73rpx;
  line-height: 32.46rpx;
  margin-right: 15rpx;
  font-weight: bold;
  color: #383838;
}
.cardMain .li .liBtm{
  height: 88rpx;
  position: relative;
  font-size: 18.66rpx;
  line-height: 38rpx;
  color: rgba(255,255,255,0.65);
  padding:8rpx 24rpx 0 24rpx;
}
.cardMain .li .liBtm text{
  display: block;
  font-weight: bold;
}
.creditDyna{
  margin-top: 46rpx;
}
.dynaMain .li{
  padding:32rpx 0;
  border-bottom: 1px solid #e5e5e5;
}
.dynaMain .li:last-child{
  border: none;
}
.dynaMain .li image{
  width: 250rpx;
  height: 146rpx;
  float: left;
  border-radius: 5rpx;
}
.dynaMain .li .liMain{
  width: calc(100% - 276rpx);
  height: 146rpx;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dynaMain .li .liMain .liTitle{
  font-size: 28rpx;
  line-height: 40rpx;
  color: #222;
}
.dynaMain .li .liMain text{
  font-size: 22rpx;
  color: #9b9b9b;
}
.leftNavShow{
  width: 52rpx;
  height: 52rpx;
  background: linear-gradient(49deg,#113090,#4467d1);
  position: relative;
  border-radius: 50%;
  position: fixed;
  bottom: 35rpx;
  left: 28rpx;
}
.leftNavShow image{
  width: 32rpx;
  height: 22rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.leftNav{
  width: 140rpx;
  background: rgba(0,0,0,0.6);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 3;
  padding-top: var(--status-bar-height);
}
.leftNav .li{
  text-align: center;
  width: 140rpx;
  margin-top: 37rpx;
}
.leftNav .li image{
  width: 64rpx;
  height: 64rpx;
}
.leftNav .li text{
  display: block;
  font-size: 24rpx;
  color: #fff;
  font-weight: bold;
  margin-top: 18rpx;
}
.leftNav .li:first-child{
  margin-top: 106rpx;
}
.leftNavHide{
  position: absolute;
  left: 50%;
  bottom: 35rpx;
  margin-left: -27rpx;
}
.leftNavHide image{
  width: 60rpx;
  height: 60rpx;
}
</style>
