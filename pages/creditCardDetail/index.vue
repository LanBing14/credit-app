<template>
  <view class="cardDetail">
    <creditCard :companyId="companyId" :companyName="companyName" type="1"></creditCard>
    <view class="honor">
      <swiper class="swiper">
        <swiper-item>
          <view class="swiper-item">
            <view class="honorMain">
              <view class="li">
                <image src="../../static/img/1.png"></image>
              </view>
              <view class="li">
                <image src="../../static/img/1.png"></image>
              </view>
              <view class="li">
                <image src="../../static/img/1.png"></image>
              </view>
            </view>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">
            <view class="honorMain">
              <view class="li">
                <image src="../../static/img/1.png"></image>
              </view>
              <view class="li">
                <image src="../../static/img/1.png"></image>
              </view>
              <view class="li">
                <image src="../../static/img/1.png"></image>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!--<view class="charaServe">
        <view class="charaServeTitle">
            特色服务
        </view>
        <view class="charaServeMain clear">
            <view class="li">
                <image src="../../static/icon/48.png"></image>
                <text>信用智库</text>
            </view>
            <view class="li">
                <image src="../../static/icon/49.png"></image>
                <text>信用监督员</text>
            </view>
            <view class="li">
                <image src="../../static/icon/50.png"></image>
                <text>信用管理员</text>
            </view>
            <view class="li">
                <image src="../../static/icon/51.png"></image>
                <text>行业大咖面对面</text>
            </view>
            <view class="li">
                <image src="../../static/icon/52.png"></image>
                <text>信用调研</text>
            </view>
            <view class="li">
                <image src="../../static/icon/53.png"></image>
                <text>信用示范企业</text>
            </view>
        </view>
    </view>-->
    <view class="charaServe companyServe">
      <view class="charaServeTitle">
        企业服务
      </view>
      <view class="charaServeMain clear">
        <navigator :url="`/pages/creditCardEval/index?companyName=${companyName}`" hover-class="none" class="li">
          <image src="../../static/icon/54.png"></image>
          <text>企业信用评价</text>
        </navigator>
        <navigator url="/pages/creditCardReport/index" hover-class="none" class="li">
          <image src="../../static/icon/55.png"></image>
          <text>入驻专题报道</text>
        </navigator>
        <navigator :url="`/pages/creditCardNews/index?companyName=${companyName}`" hover-class="none" class="li">
          <image src="../../static/icon/56.png"></image>
          <text>新华企业资讯</text>
        </navigator>
        <navigator :url="`/pages/creditCardVision/index?companyId=${companyId}`" hover-class="none" class="li">
          <image src="../../static/icon/57.png"></image>
          <text>企业视界</text>
        </navigator>
        <navigator :url="`/pages/creditCardHonor/index?companyId=${companyId}`" hover-class="none" class="li">
          <image src="../../static/icon/58.png"></image>
          <text>荣誉与资质</text>
        </navigator>
        <navigator :url="`/pages/creditCardHistory/index?companyId=${companyId}`" hover-class="none" class="li">
          <image src="../../static/icon/59.png"></image>
          <text>发展历程</text>
        </navigator>
        <view class="li">
          <image src="../../static/icon/60.png"></image>
          <text>职业人名片</text>
        </view>
      </view>
    </view>
    <view class="tips">
      <text>登录新华信用网页端个人中心申请更多品牌</text>
    </view>
  </view>
</template>

<script>
import creditCard from "../../components/creditCard";
export default {
  components: {
    creditCard
  },
  data() {
    return {
      companyId: '',
      companyName: '',
      photoList: []
    }
  },
  onLoad(options) {
    this.companyId = options.companyId;
    this.companyName = options.companyName;
  },
  onShow() {
  },
  methods: {
    arrGroup(array, subGroupLength) {//数组分割
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
    },
    previewImage() {//预览图片
      uni.previewImage({
        current: 0,
        urls: this.photoList
      });
    }
  }
}
</script>

<style>
page{
  background: #f6f6f6;
}
.cardDetail{
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}
.honor{
  padding:0 30rpx 28rpx 30rpx;
}
.honorMain{
  display: flex;
  justify-content: space-between;
}
.honorMain .li{
  width: 194rpx;
  height: 136rpx;
  border-radius: 8rpx;
  overflow: hidden;
}
.honorMain .li image{
  width: 100%;
  height: 100%;
}
/deep/.honor .swiper{
  height: 136rpx;
}

.charaServe{
  padding: 27rpx 30rpx;
  background: #fff;
}
.charaServeTitle{
  font-size: 30rpx;
  color: #373737;
  position: relative;
  padding-left: 20rpx;
}
.charaServeTitle:after{
  content: '';
  display: block;
  width: 6rpx;
  height: 20rpx;
  background: #113090;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.charaServeMain .li{
  width: 25%;
  text-align: center;
  margin-top: 25rpx;
  float: left;
}
.charaServeMain .li image{
  width: 60rpx;
  height: 60rpx;
}
.charaServeMain .li text{
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #444;
}
.companyServe{
  margin-top: 20rpx;
}
.tips{
  text-align: center;
  padding: 55rpx 0;
}
.tips text{
  font-size: 24rpx;
  color: #9b9b9b;
  display: inline-block;
  padding: 0 75rpx;
  position: relative;
}
.tips text:before{
  content: '';
  display: block;
  width: 55rpx;
  height: 2rpx;
  background: linear-gradient(90deg,#f6f6f6,#9b9b9b);
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.tips text:after{
  content: '';
  display: block;
  width: 55rpx;
  height: 2rpx;
  background: linear-gradient(90deg,#9b9b9b,#f6f6f6);
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
