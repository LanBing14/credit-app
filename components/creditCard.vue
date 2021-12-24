<template>
  <view class="cardList">
    <view class="li">
      <view class="liTop">
        <image class="liTopBck" src="../static/img/jpg03.jpg"></image>
        <image v-if="cochainStatus == '0'" class="liTopLink" src="../static/img/png_04.png"></image>
        <view class="liTopMain">
          <view class="h1 clear">
            <view class="h1Title">
              {{ companyInfo.name ? companyInfo.name : '-' }}
            </view>
            <!--<view class="h1Vip">
                超级vip会员
            </view>-->
          </view>
          <view class="liTopList">
            <text>统一社会信用代码：{{ companyInfo.creditCode ? companyInfo.creditCode : '-' }}</text>
            <text>地址：{{ companyInfo.address ? companyInfo.address : '-' }}</text>
            <text>法定代表人：{{ companyInfo.operName ? companyInfo.operName : '-' }}</text>
            <text>新华信用码：{{ companyInfo.xhCode ? companyInfo.xhCode : '-' }}</text>
          </view>
        </view>
      </view>
      <view class="liBtm clear">
        <view hover-class="none" class="li" @click="toCertificate">入驻证书
        </view>
        <view hover-class="none" class="li" @click="toCommitment">入驻承诺书
        </view>
        <view hover-class="none" class="li" @click="toBaseInfo">基本详情
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import request from "../utils/request";
import {arrIsNull} from "../utils/utils";
import {isHasCertific} from "../api/common";

export default {
  props: {
    companyId: {
      type: String
    },
    companyName: {
      type: String
    },
    // 1:信用名片展示 2：品牌名片展示
    type: {
      type: String
    },
  },
  data() {
    return {
      companyInfo: {},
      cochainStatus: '',
    }
  },
  mounted() {
    this.getCompanyInfo();
    this.getEnterpriseCard();
  },
  methods: {
    has() {
      // 是否入驻
      let that = this;
      return new Promise((resolve, reject) => {
        if (that.type != '1') {
          isHasCertific(that.companyId).then(res => {
            if (res.data != '3') {
              uni.showModal({
                title: '',
                content: '企业尚未入驻！',
                showCancel:false
              });
              resolve(false);
            } else {
              resolve(true);
            }
          })
        } else {
          resolve(true);
        }
      })
    },
    async toCertificate() {
      if  (!await this.has()) {
        return;
      }
      uni.navigateTo({
        url: `/pages/creditCardCerti/index?companyId=` + this.companyId + `&companyName=` + this.companyName
      })
    },
    async toCommitment() {
      if  (!await this.has()) {
        return;
      }
      uni.navigateTo({
        url: `/pages/creditCardCommit/index?companyId=` + this.companyId + `&companyName=` + this.companyName
      })
    },
    toBaseInfo() {
      if (this.type == '1') {
        // 企业名片跳转详情
        uni.navigateTo({
          url: `/pages/creditCardInfo/index?companyId=` + this.companyId
        })
      } else {
        // 品牌推广跳转详情
        uni.navigateTo({
          url: "/pages/companyInfo/index?companyId=" + this.companyId + "&companyName=" + this.companyName
        })
      }
    },
    // 企业基本信息
    getCompanyInfo() {
      request('/enterprise/detail/xhsRest/baseMsg/getCompanyInfo', {
        method: 'post',
        data: {
          companyId: this.companyId
        }
      }, true).then(data => {
        if (data.stateCode == '60111') {
          if (!arrIsNull(data.data.returnData)) {

            request('/user/center/myMessage/getXhCodeByCompanyId', {
              method: 'get',
              data: {
                companyId: this.companyId
              }
            }).then(res => {
              this.companyInfo = data.data.returnData[0];
              this.companyInfo.xhCode = res.data.xhCode;
            })
          }
        }
      })
    },
    getEnterpriseCard() {
      request('/enterprise/detail/card/getEnterpriseCard', {
        method: 'get',
        data: {
          type: 1,
          companyId: this.companyId,
          queryType: 1
        }
      }).then(res => {
        if (res.data != '') {
          this.cochainStatus = res.data.cochainStatus;
        }
      })
    },
  }
}
</script>

<style>
.cardList{
  padding: 8rpx 30rpx 30rpx 30rpx;
}
.cardList > .li{
  margin-top: 20rpx;
}
.cardList .liTop{
  width: 690rpx;
  height: 348rpx;
  position: relative;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  overflow: hidden;
  padding:37rpx 0 0 30rpx
}
.cardList .liTop .liTopBck{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.cardList .liTop .liTopLink{
  width: 159rpx;
  height: 163rpx;
  position: absolute;
  top: 131rpx;
  right: 42rpx;
}
.cardList .liTop .liTopMain{
  position: relative;
}
.cardList .liTop .liTopMain .h1 .h1Title{
  float: left;
  font-size: 30rpx;
  color: #fff;
  font-weight: bold;
}
.cardList .liTop .liTopMain .h1 .h1Vip{
  float: left;
  width: 148rpx;
  height: 40rpx;
  position: relative;
  margin-left: 25rpx;
  top: 3rpx;
  border-radius: 40rpx;
  background: linear-gradient(90deg,#f7e7d1,#e1ab68);
  text-align: center;
  line-height: 40rpx;
  font-size: 22rpx;
  color: #733c16;
}
.cardList .liTop .liTopMain .liTopList{
  margin-top: 25rpx;
}
.cardList .liTop .liTopMain .liTopList text{
  display: block;
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
  font-weight: bold;
  margin-top: 13rpx;
}
.cardList .liBtm{
  height: 80rpx;
  background: #e0efff;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}
.cardList .liBtm .li{
  line-height: 80rpx;
  width: 33.33%;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  float: left;
}
</style>
