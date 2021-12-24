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
    <view class="bottomBox" v-if="companyInfo.companyId">
      <view class="row">
        <text>企业名称:</text>
        <text>{{ companyInfo.companyName ? companyInfo.companyName : '-' }}</text>
      </view>
      <view class="row">
        <text style="line-height: 30rpx">统一<br>社会信用代码:</text>
        <text><br>{{ companyInfo.creditCode ? companyInfo.creditCode : '-' }}</text>
      </view>
      <view class="row">
        <text>注册资本:</text>
        <text>{{ companyInfo.registCapi ? companyInfo.registCapi : '-' }}</text>
      </view>
      <view class="row">
        <text>法定代表人:</text>
        <text>{{ companyInfo.operName ? companyInfo.operName : '-' }}</text>
      </view>
      <view class="row">
        <text>成立时间:</text>
        <text>{{ !companyInfo.startDate ? '-' : companyInfo.startDate | toTimeYear }}</text>
      </view>
      <view class="row">
        <text>登记注册类型:</text>
        <text>{{ companyInfo.econKind ? companyInfo.econKind : '-' }}</text>
      </view>
      <view class="row">
        <text>经营期限:</text>
        <text>
          {{
            !companyInfo.termStart ? '-' : companyInfo.termStart | toTimeYear
          }}至{{ !companyInfo.termEnd ? '-' : companyInfo.termEnd | toTimeYear }}
        </text>
      </view>
      <view class="row">
        <text>注册地址:</text>
        <text style="line-height: 30rpx">{{ companyInfo.address ? companyInfo.address : '-' }}</text>
      </view>
      <view class="row">
        <text>状态:</text>
        <text>{{ companyInfo.status ? companyInfo.status : '-' }}</text>
      </view>
      <view class="row">
        <text>登记机关:</text>
        <text>{{ companyInfo.belongOrg ? companyInfo.belongOrg : '-' }}</text>
      </view>
      <view class="row">
        <text>经营范围:</text>
        <text style="line-height: 48rpx">{{ companyInfo.scope ? companyInfo.scope : '-' }}</text>
      </view>
    </view>
    <view style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="!companyInfo.companyId">暂无基本信息</view>
  </view>
</template>

<script>
import {
  getMcnCompanyByMcnId,
  getMcnInfoByMcnId,
  getDyMcnInfoByMcnId
} from "../../api/creditLive"

export default {
  data() {
    return {
      mcnId: '',
      companyInfo: {},
      mcnInfo: {},
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
  mounted() {
    this.mcnCompanyByMcnId();
    if (this.isShare) {
      this.backNum = {
        num: 2,
        type: 'myHome'
      }
    }
  },
  onShow() {
    this.mcnInfoByMcnId();
  },
  methods: {
    mcnInfoByMcnId() {
      if (this.selectTitle == 'douyin') {
        getDyMcnInfoByMcnId({
          mcnId: this.mcnId
        }).then(res => {
          if (res.stateCode == '1') {
            this.mcnInfo = res.data;
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-${this.mcnInfo.mcnName}-基本信息`
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
              shareTitle: `新华信锐宝-${this.mcnInfo.mcnName}-基本信息`
            })
          }
        })
      }
    },
    mcnCompanyByMcnId() {
      getMcnCompanyByMcnId({
        mcnId: this.mcnId,
        source: this.selectTitle == 'douyin' ? 'DY' : 'KS'
      }).then(res => {
        if (res.stateCode == '1') {
          this.companyInfo = res.data;
          uni.hideLoading();
        }
      })
    }
  }
}
</script>

<style scoped>
.blue{
  color: #416aa8;
}
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
  font-size: 31rpx;
  overflow: hidden;
}

.rightConBottomDes {
  font-size: 25rpx;
  overflow: hidden;
}

.bottomBox{
  padding-top: 31rpx;
}

.row{
  font-size: 24rpx;
  display: flex;
  margin-bottom: 40rpx;
  /*min-height: 72rpx;*/
}

.row :first-child{
  width:  154rpx;
  text-align: right;
  margin-right: 23rpx;
}
.row :last-child{
  width:  502rpx;
  text-align: left;
}
</style>
