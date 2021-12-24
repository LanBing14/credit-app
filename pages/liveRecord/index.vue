<template>
  <view>
    <view class="record">
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
      <view class="recordMain">
        <view class="recordTop">
          <view class="h1">
            <text>{{ liveData.LIVE_NAME ? liveData.LIVE_NAME : '-' }}</text>
          </view>
          <view class="p">
            {{ selectTitle == 'douyin' ? '开播时间：' : '直播开始时间：' }}
            {{ liveData.START_TIME | toTimeYear }}
          </view>
          <view class="p">
            {{ selectTitle == 'douyin' ? '预估总销售额：' : '预估销售额：' }}
            {{ liveData.TOTAL_SALES_MONEY | numberFormat }}元
          </view>
          <view class="p">
            {{ selectTitle == 'douyin' ? '开播时长：' : '直播时长：' }}
            <text v-if="selectTitle == 'douyin'">
              {{ Math.floor(liveData.DURATION / 60) + '小时' + Math.floor(liveData.DURATION % 60) + '分钟' }}
            </text>
            <text v-else>
              {{ liveData.DURATION | toDayHours }}
            </text>
          </view>
          <view class="p">
            <text>
              累计观看人数：{{ liveData.STATS_TOTAL_USER | numberFormat }}
            </text>
          </view>
          <image v-if="sharpLiveId" class="recordTopImg" src="../../static/img/png01.png"></image>
          <navigator v-if="sharpLiveId" class="nav" url="../xinruiAgree/index" hover-class="none">信锐直播间选品规范</navigator>
        </view>
        <view class="recordBtm" v-if="selectTitle == 'douyin'">
          <view class="recordList">
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.maxUserNum | numberFormat }}</text>
              <text class="recordText">在线人数峰值</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.avgUserNum | numberFormat }}</text>
              <text class="recordText">平均在线人数</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.statsTotalUser | numberFormat }}</text>
              <text class="recordText">累计观看人数</text>
            </view>
          </view>
          <view class="recordList">
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.thumbNum | numberFormat }}</text>
              <text class="recordText">总获赞数</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.promotionNum | numberFormat }}</text>
              <text class="recordText">上架商品数</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.maxSales | numberFormat }}</text>
              <text class="recordText">最高销量数</text>
            </view>
          </view>
          <view class="recordList">
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.maxSalesMoney | numberFormat }}</text>
              <text class="recordText">最高销售额</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.predictSaleNum | numberFormat }}</text>
              <text class="recordText">预估总销量</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.predictSaleMoney | numberFormat }}</text>
              <text class="recordText">预估总销售额</text>
            </view>
          </view>
          <view class="recordList">
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.userPrePrice | numberFormat }}</text>
              <text class="recordText">客单价</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.conversionRate }}</text>
              <text class="recordText">销售转化率</text>
            </view>
            <view class="recordBox" v-if="sharpLiveId">
              <text class="recordNum">{{ enterpBusList.length }}</text>
              <text class="recordText">信锐优品数</text>
            </view>
          </view>
        </view>
        <view class="recordBtm" v-else>
          <view class="recordList">
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.incomeFlow | numberFormat }}</text>
              <text class="recordText">单场流水</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.giftMoney | numberFormat }}</text>
              <text class="recordText">礼物收入</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.giveGiftNum | numberFormat }}</text>
              <text class="recordText">送礼人数</text>
            </view>
          </view>
          <view class="recordList">
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.maxWatchNum | numberFormat }}</text>
              <text class="recordText">在线人数（峰值）</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.thumbNum | numberFormat }}</text>
              <text class="recordText">获赞总数</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.predictSaleMoney | numberFormat }}</text>
              <text class="recordText">预估销售额</text>
            </view>
          </view>
          <view class="recordList">
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.predictSaleNum | numberFormat }}</text>
              <text class="recordText">预估销售量</text>
            </view>
            <view class="recordBox">
              <text class="recordNum">{{ SharpLetter.commodityNum | numberFormat }}</text>
              <text class="recordText">上架商品数</text>
            </view>
            <view class="recordBox" v-if="sharpLiveId">
              <text class="recordNum">{{ enterpBusList.length }}</text>
              <text class="recordText">信锐优品数</text>
            </view>
          </view>
        </view>

      </view>
      <view class="liveList" v-if="sharpLiveId">
        <view class="goodsTitle">
          信锐优品
        </view>
        <navigator class="liveBox" :url="'../xinruiDetail/index?id=' + item.ID" v-for="item in enterpBusList"
                   :key="item.ID" hover-class="none">
          <view class="liveImg">
            <image :src="item.productFile.length > 0 ? allUrl + item.productFile[0].path : '../../static/img/zhibo.jpg'"
                   mode="aspectFill"></image>
          </view>
          <view class="liveCon">
            <view class="h1" v-if="item.NAME">
              {{ item.NAME.length > 31 ? item.NAME.substring(0, 31) + '...' : item.NAME }}
              <text>信锐优品</text>
            </view>
            <view class="p" v-if="item.DESCRIBE">
              {{ item.DESCRIBE.length > 41 ? item.DESCRIBE.substring(0, 41) + '...' : item.DESCRIBE }}
            </view>
            <view class="p" v-if="item.LICENSE_NO">
              生产许可证号：{{ item.LICENSE_NO }}
            </view>
            <image src="../../static/img/sl.png"></image>
          </view>
        </navigator>
        <view style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="enterpBusList.length == 0">暂无数据
        </view>
      </view>
      <view class="goods">
        <view class="goodsTitle">
          带货商品
        </view>
        <goodsList :goodList="goodList" :selectTitle="selectTitle"></goodsList>
        <uni-load-more status="loading" v-if="loading"></uni-load-more>
        <uni-load-more status="noMore" v-if="noData"></uni-load-more>
        <view style="font-size: 25rpx; text-align: center; margin-top: 35rpx;" v-if="goodList.length == 0">暂无数据</view>
      </view>
    </view>
  </view>
</template>

<script>
import goodsList from "../../components/goodsList.vue"
import {
  getSharpLetterLiveById,
  getGoodsByRoomId,
  getDySharpLetterLiveById, viewLiveRecord, getDyGoodsByRoomId, getSharpListByLiveId,
} from "../../api/creditLive"

export default {
  components: {
    goodsList
  },
  data() {
    return {
      id: '',
      roomId: '',
      SharpLetter: {},
      accountData: {},
      goodList: [],
      pageNo: 0,
      totalPages: 0,
      loading: false,
      noData: false,
      selectTitle: '',
      backNum: {},
      isShare: Boolean,
      enterpBusList: [],
      sharpLiveId: '',
      liveData: {},
      allUrl: ''
    }
  },
  onLoad(options) {
    this.id = options.id;
    this.roomId = options.roomId
    uni.showLoading({
      title: '加载中...'
    });
    this.selectTitle = options.selectTitle;
    this.isShare = options.share;
    this.sharpLiveId = options.sharpLiveId;
    this.allUrl = this.$url;
  },
  mounted() {
    this.goodsByRoomId();
    this.getSharpListByLiveId();
    if (this.isShare) {
      this.backNum = {
        num: 2,
        type: 'myHome'
      }
    }
  },
  onShow() {
    this.sharpLetterLiveById();
  },
  methods: {
    sharpLetterLiveById() {
      if (this.selectTitle == 'douyin') {
        getDySharpLetterLiveById({
          id: this.id
        }).then(res => {
          if (res.stateCode == '1') {
            this.SharpLetter = res.data.liveData;
            this.accountData = res.data.accountData;
            uni.hideLoading();
          }
        })
        viewLiveRecord({
          Id: this.id,
          source: 'DY'
        }).then(res => {
          if (res.stateCode == '1') {
            this.liveData = res.data.liveData;
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-${this.liveData.LIVE_NAME}`
            })
            uni.hideLoading();
          }
        })
      } else {
        getSharpLetterLiveById({
          id: this.id
        }).then(res => {
          if (res.stateCode == '1') {
            this.SharpLetter = res.data.liveData;
            this.accountData = res.data.accountData;
            uni.hideLoading();
          }
        })
        viewLiveRecord({
          Id: this.id,
          source: 'KS'
        }).then(res => {
          if (res.stateCode == '1') {
            this.liveData = res.data.liveData;
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-${this.liveData.LIVE_NAME}`
            })
            uni.hideLoading();
          }
        })
      }
    },
    goodsByRoomId() {
      if (this.selectTitle == 'douyin') {
        getDyGoodsByRoomId({
          roomId: this.roomId,
          pageNo: this.pageNo,
          pageSize: 10
        }).then(res => {
          if (res.stateCode == '1') {
            this.goodList = this.goodList.concat(res.data.content);
            this.totalPages = res.data.totalPages;
            this.loading = false;
          }
        })
      } else {
        getGoodsByRoomId({
          roomId: this.roomId,
          pageNo: this.pageNo,
          pageSize: 10
        }).then(res => {
          if (res.stateCode == '1') {
            this.goodList = this.goodList.concat(res.data.content);
            this.totalPages = res.data.totalPages;
            this.loading = false;
          }
        })
      }
    },
    //根据直播记录id查询优品列表
    getSharpListByLiveId() {
      getSharpListByLiveId({
        Id: this.id,
        source: this.selectTitle == 'douyin' ? 'DY' : 'KS'
      }).then(res => {
        if (res.stateCode == '1') {
          this.enterpBusList = this.enterpBusList.concat(res.data);
        }
      })
    },
    onReachBottom() {
      if (this.goodList.length == 0) return;
      if (this.pageNo + 1 == this.totalPages) return this.noData = true;
      this.loading = true;
      this.pageNo++;
      this.goodsByRoomId();
    }
  }
}
</script>

<style>
.record{
  padding: 0 22rpx 40rpx 22rpx;
  background: #f9f9f9;
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
}

.rightConBottomDes {
  font-size: 22rpx;
  overflow: hidden;
}
.recordMain{
  padding:44rpx 0;
}
.recordTop{
  padding: 0 0 30rpx 30rpx;
  position: relative;
}
.recordTop .h1{
  font-size: 25rpx;
  color: #333;
  font-weight: bold;
  position: relative;
  z-index: 1;
}
.recordTop .p{
  font-size: 23rpx;
  color: #666;
  margin-top: 10rpx;
  position: relative;
  z-index: 1;
}
.recordTopImg{
  width: 512rpx;
  height:260rpx;
  position: absolute;
  bottom: 0;
  right: 0;
}
.recordTop .nav{
  height:35rpx;
  font-size: 21rpx;
  color:#fff;
  padding:0 10rpx;
  background: #59c8d1;
  position: absolute;
  top:30rpx;
  right:0;
  z-index: 2;
  line-height: 35rpx;
}
.recordBtm{
  background: #fff;
  padding: 0 26rpx;
}
.recordList{
  padding: 45rpx 0 33rpx 0;
  border-bottom: 1px solid #eee;
  display: flex;
  /* justify-content: space-around; */
}
.recordList:last-child{
  border-bottom:0;
}
.recordBox{
  width: 33.333%;
}
.recordNum{
  display: block;
  font-size: 32rpx;
  color: #ff8f00;
  text-align: center;
}
.recordText{
  font-size: 25rpx;
  color: #333;
  display: block;
  text-align: center;
  margin-top: 15rpx;
}
.goods{
  margin-top: 30rpx;
}
.goodsTitle{
  font-size: 27rpx;
  color: #333;
  font-weight: bold;
}
.liveList{
  margin-top: 30rpx;
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
</style>
