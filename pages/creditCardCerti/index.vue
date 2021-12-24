<template>
  <view>
    <!--背景图-->
    <image class="InfoBck" src="../../static/img/jpg05.jpg" mode="aspectFill"></image>
    <!--状态栏位置和顶部自定义导航-->
    <view class="statusBar" :style="{background:`rgba(17,48,144,${colorVal})`}"></view>
    <view class="infoNav" :style="{background:`rgba(17,48,144,${colorVal})`}">
      <view class="infoNavFl" @click="back()">
        <image src="../../static/icon/21.png"></image>
      </view>
      <view class="infoNavBtm">企业入驻证书</view>
    </view>
    <!--状态栏占位和顶部自定义菜单占位-->
    <view style="height: 70rpx"></view>
    <view style="height: var(--status-bar-height)"></view>
    <!--主体内容-->
    <!--烟花-->
    <view class="fireWoksBox">
      <image class="fireworks" src="../../static/img/png_05.png"></image>
    </view>
    <view class="settledTitle">
      <image v-if="cochainStatus == '0'" src="../../static/img/png_04.png"></image>
      <view class="h1">
        <text>热烈庆祝</text>
        <text>热烈庆祝</text>
      </view>
      <view class="h2">
        <view class="p">{{companyName}}</view>
        <view class="p">入驻新华信用<text>{{enterDays}}</text>天</view>
      </view>
    </view>
    <view class="settledMain">
      <image :src="website + createImageImg" mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
import request from "../../utils/request";

export default {
  components: {

  },
  data () {
    return {
      colorVal:0,
      companyId: '',
      companyName:'',
      cochainStatus:'', //是否上链
      enterDays:'1',
      createImageImg:''
    }
  },
  onLoad(options) {
    this.companyId = options.companyId;
    this.companyName = options.companyName;
    uni.showLoading({
      title:'加载中...'
    })
    this.getEnterpriseCard();
    this.getCompanyCertificationInfo();
    this.createImage();
  },
  onShow(){

  },
  methods: {
    back(){
      uni.navigateBack()
    },
    getEnterpriseCard(){//是否上链
      request('/enterprise/detail/card/getEnterpriseCard',{
        method:'get',
        data:{
          type:1,
          companyId:this.companyId,
          queryType:1
        }
      }).then(res => {
        if(res.data != ''){
          this.cochainStatus = res.data.cochainStatus;
        }
      })
    },
    getCompanyCertificationInfo(){//获取入驻天数
      request('/web/app/xhsRest/certifi/getCompanyCertificationInfo',{
        method:'get',
        data:{
          companyId: this.companyId
        }
      }).then(res => {
        if (res.data != null && res.data !== '') {
          if (res.data.enterDate != null && res.data.enterDate !== '') {
            this.enterDays = this.DateMinus(res.data.enterDate);
          }
        }
      })
    },
    createImage(){//获取入驻证书
      request('/web/app/xhsRest/build/createImage',{
        method:'get',
        data:{
          companyId: this.companyId,
          companyName: this.companyName
        }
      }).then(res => {
        if (res.data != null && res.data !== '') {
          this.createImageImg = res.data;
          uni.hideLoading();
        }
      })
    },
    DateMinus(date1) {// 天数计算
      const date = new Date(date1);
      const now = new Date();
      const nowData = new Date(now.toLocaleDateString());
      const enteData = new Date(date.toLocaleDateString());
      const days = nowData.getTime() - enteData.getTime();
      let day = parseInt((days / (1000 * 60 * 60 * 24)).toString());
      if (day < 0){
        day = 0;
      }
      return day + 1;
    }
  },
  onPageScroll(e){
    //滑动滚动条添加自定义导航背景色
    this.colorVal = (e.scrollTop * (100/70) / 100)
  },
}
</script>

<style>
.InfoBck{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.statusBar{
  height: var(--status-bar-height);
  position: relative;
  z-index: 6;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.infoNav{
  position: fixed;
  top: var(--status-bar-height);
  left: 0;
  width: 100%;
  height: 70rpx;
  line-height: 70rpx;
  transition: 0s;
  z-index: 6;
}
.infoNavBtm{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  font-size: 34rpx;
  color: #fff;
  text-align: center;
}
.infoNavFl{
  width: 70rpx;
  height: 70rpx;
  position: absolute;
  left: 15rpx;
  top: 0;
  z-index: 5;
}
.infoNavFl image{
  width: 18rpx;
  height: 33rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;
}
.fireWoksBox{
  position: fixed;
  top: var(--status-bar-height);
  left: 0;
}
.fireworks{
  width: 750rpx;
  height: 253rpx;
  position: absolute;
  top:70rpx;
  left: 0;
}
.settledTitle{
  position: relative;
  z-index: 1;
  padding: 75rpx 30rpx 0 30rpx;
  text-align: center;
}
.settledTitle image{
  width: 159rpx;
  height: 163rpx;
  position: absolute;
  top: 0;
  right: 33rpx;
}
.settledTitle .h1{
  position: relative;
}
.settledTitle .h1 text{
  display: block;
  position: relative;
}
.settledTitle .h1 text:nth-child(1){
  font-size: 82rpx;
  color: #052a80;
  font-weight: bold;
  top: 6rpx;
  left: 6rpx;
}
.settledTitle .h1 text:nth-child(2){
  font-size: 82rpx;
  font-weight: bold;
  background-image:-webkit-linear-gradient(bottom,#cc9f44,#eedb46,#f8f9b5);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.settledTitle .h2 .p{
  font-size: 30rpx;
  line-height: 30rpx;
  color: #fff;
  margin-top: 15rpx;
}
.settledTitle .h2 .p text{
  font-size: 48rpx;
  color: #e8d044;
  font-weight: bold;
  display: inline-block;
  margin: 0 10rpx;
}
.settledMain{
  margin-top: 80rpx;
  text-align: center;
}
.settledMain image{
  width: 560rpx;
  box-shadow: 0 0 35rpx rgba(0,51,115,0.75);
}
</style>
