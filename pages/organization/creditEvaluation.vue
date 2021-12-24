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
    <view class="bottomBox" v-if="mcnInfo.companyId">
      <view class="level">
        <view>信用等级</view>
        <view class="levelVal">当前等级:{{ creditLevelInfo.creditLevel ? creditLevelInfo.creditLevel : '-' }}</view>
        <view class="levelVal" v-if="creditLevelInfo.creditLevel == 'A'">信用优秀</view>
        <view class="levelVal" v-if="creditLevelInfo.creditLevel == 'B'">信用良好</view>
        <view class="levelVal" v-if="creditLevelInfo.creditLevel == 'C'">信用一般</view>
        <view class="levelVal" v-if="creditLevelInfo.creditLevel == 'D'">信用较差</view>
        <view class="levelVal">请继续保持</view>
      </view>
      <view class="status">
        <view>风险状况</view>
        <view class="levelVal">当前风险:无风险</view>
        <view class="levelVal">法院执行:{{ portraitInfo.riskNum.fyzx }}条</view>
        <view class="levelVal">欠税欠缴:{{ portraitInfo.riskNum.qsqj }}条</view>
        <view class="levelVal">经营异常:{{ portraitInfo.riskNum.jylr }}条</view>
        <view class="levelVal">关联风险:{{ portraitInfo.riskNum.glfx }}条</view>
        <view class="levelVal">行政处罚:{{ portraitInfo.riskNum.xzcf }}条</view>
      </view>
      <view class="evaluate">
        <view>信用评价</view>
        <view class="levelVal">当前评分:{{ portraitInfo.companyScore }}</view>
        <view class="levelVal">较上次评分增加:{{ portraitInfo.differScore }}分</view>
        <view class="levelVal">领先了本行业{{ percent.industry }}的企业</view>
        <view class="levelVal">领先了本区域{{ percent.area }}的企业</view>
      </view>
      <view class="charts">
        <view class="charts-box">
          <qiun-data-charts type="evalRadar" :chartData="chartData" background="none"/>
        </view>
      </view>
    </view>
    <view style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="!mcnInfo.companyId">暂无信用评价</view>
  </view>
</template>

<script>
import {
  getMcnInfoByMcnId,
  getCalcScore,
  getEnterPortraitIndex,
  getPercent,
  getLeiDaDatas,
  getDyMcnInfoByMcnId
} from "../../api/creditLive"

export default {
  data() {
    return {
      chartData: {},
      companyId: '',
      mcnId: '',
      mcnInfo: {},
      creditLevelInfo: {},
      portraitInfo: {riskNum: {}},
      percent: {},
      selectTitle: '',
      backNum: {},
      isShare: Boolean
    }
  },
  onLoad(options) {
    this.companyId = options.companyId;
    this.mcnId = options.mcnId;
    uni.showLoading({
      title: '加载中...'
    });
    this.selectTitle = options.selectTitle;
    this.isShare = options.share;
  },
  mounted() {
    this.calcScore();
    this.enterPortraitIndex();
    this.percentFun();
    this.leiDaDatas();
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
              shareTitle: `新华信锐宝-${this.mcnInfo.mcnName}-信用评价`
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
              shareTitle: `新华信锐宝-${this.mcnInfo.mcnName}-信用评价`
            })
          }
        })
      }
    },
    // 信用等级
    calcScore() {
      getCalcScore({
        companyId: this.companyId
      }).then(res => {
        if (res.stateCode == '1') {
          this.creditLevelInfo = res.data;
          uni.hideLoading();
        }
      })
    },
    // 风险状况
    enterPortraitIndex() {
      getEnterPortraitIndex({
        companyId: this.companyId
      }).then(res => {
        if (res.stateCode == '60501') {
          this.portraitInfo = res.data;
        }
      })
    },
    // 信用评价
    percentFun() {
      getPercent({
        companyId: this.companyId
      }).then(res => {
        if (res.stateCode == '60501') {
          this.percent = res.data;
        }
      })
    },
    // 雷达图
    leiDaDatas() {
      getLeiDaDatas({
        companyId: this.companyId
      }).then(res => {
        if (res.stateCode == '60501') {
          let data = []
          res.data.forEach(item => {
            data.push(item.SCORE);
          });
          this.chartData = {
            "categories": [
              "企业特质",
              "社会评价",
              "履约历史",
              "经营行为",
              "关联关系"
            ],
            "series": [
              {
                "name": "成交量1",
                "data": data
              }
            ]
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.outView {
  padding: 0 22rpx;
}

.topTitleCon {
  background-color: #f9f9f9;
  margin: 0 -22rpx;
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

.bottomBox {
  padding-top: 31rpx;
}

.bottomBox .level view,
.bottomBox .status view,
.bottomBox .evaluate view {
  font-size: 26rpx;
  font-weight: bold;
  line-height: 72rpx;
  padding-left: 20rpx;
  color: #333333;
}

.bottomBox .level p,
.bottomBox .status p,
.bottomBox .evaluate p {
  font-size: 24rpx;
  line-height: 43rpx;
  padding-left: 20rpx;
  color: #333333;
}
.levelVal{
  color: rgba(0,0,0,0.4) !important;
}
</style>
