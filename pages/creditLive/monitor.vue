<template>
  <view>
    <view class="monit">
      <view class="monitTitle">
        <view class="h1">
          平台当前收录情况
        </view>
        <view class="p">
          <view :class="platform == '抖音' ? 'active' : ''" @tap="platform = '抖音'">
            <text>抖音</text>
          </view>
          <view :class="platform == '快手' ? 'active' : ''" @tap="platform = '快手'">
            <text>快手</text>
          </view>
        </view>
      </view>
      <view class="monitData" v-if="platform == '抖音'">
        <view class="userPerforCon">
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-renshu">
              主播数
            </view>
            <view class="userPerforNum" v-if="dyData.sumAccount">
              {{ dyData.sumAccount | numberFormat }}
            </view>
          </view>
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-xindiantu">
              mcn机构数
            </view>
            <view class="userPerforNum" v-if="dyData.sumMcn">
              {{ dyData.sumMcn | numberFormat }}
            </view>
          </view>
        </view>
        <view class="userPerforCon">
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-danju-tianchong">
              作品数
            </view>
            <view class="userPerforNum" v-if="dyData.sumAweme">
              {{ dyData.sumAweme | numberFormat }}
            </view>
          </view>
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-zhibojianying">
              直播数
            </view>
            <view class="userPerforNum" v-if="dyData.sumLives">
              {{ dyData.sumLives | numberFormat }}
            </view>
          </view>
        </view>
        <view class="userPerforCon">
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-shangpin">
              带货商品数
            </view>
            <view class="userPerforNum" v-if="dyData.sumGoods">
              {{ dyData.sumGoods | numberFormat }}
            </view>
          </view>
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-caipinxiaoliang">
              预估总销<br>售额
            </view>
            <view class="userPerforNum" v-if="dyData.preMoney">
              {{ dyData.preMoney | numberFormat }}
            </view>
          </view>
        </view>
      </view>
      <view class="monitData" v-if="platform == '快手'">
        <view class="userPerforCon">
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-renshu">
              主播数
            </view>
            <view class="userPerforNum">
              {{ ksData.sumAccount | numberFormat }}
            </view>
          </view>
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-xindiantu">
              mcn机构数
            </view>
            <view class="userPerforNum">
              {{ ksData.sumMcn | numberFormat }}
            </view>
          </view>
        </view>
        <view class="userPerforCon">
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-danju-tianchong">
              作品数
            </view>
            <view class="userPerforNum">
              {{ ksData.sumAweme | numberFormat }}
            </view>
          </view>
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-zhibojianying">
              直播数
            </view>
            <view class="userPerforNum">
              {{ ksData.sumLives | numberFormat }}
            </view>
          </view>
        </view>
        <view class="userPerforCon">
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-shangpin">
              带货商品数
            </view>
            <view class="userPerforNum">
              {{ ksData.sumGoods | numberFormat }}
            </view>
          </view>
          <view class="userPerforMain">
            <view class="userPerforTitle iconfont icon-caipinxiaoliang">
              预估总销<br>售额
            </view>
            <view class="userPerforNum">
              {{ ksData.preMoney | numberFormat }}
            </view>
          </view>
        </view>
      </view>
      <view class="myMonit">
        <view class="monitTitle">
          <view class="h1">
            我的监测
          </view>
          <view class="p">
            <view :class="monitor == '监测列表' ? 'active' : ''" @tap="monitor = '监测列表'">
              <text>监测列表</text>
            </view>
            <view :class="monitor == '监测数据' ? 'active' : ''" @tap="monitor = '监测数据'">
              <text>监测数据</text>
            </view>
          </view>
        </view>
      </view>
      <view v-if="userType == 'person'">
        <view class="myMonitList" v-if="monitor == '监测列表'">
          <navigator class="anchorBox" hover-class="none" v-for="item in monitorList" :key="item.ID"
                     :url="item.PLATFORM_NAME == 'douyin' ? '../anchor/index?uid=' + item.LIVE_ID + '&selectTitle=' + item.PLATFORM_NAME : '../anchorHome/index?uid=' + item.LIVE_ID">
            <view class="anchorImg">
              <image :src="item.IMG_URL ? item.IMG_URL : '../../static/img/zhubo.jpg'"></image>
            </view>
            <view class="anchorCon">
              <view class="h1">
                <text>
                  {{ item.ACCOUNT_NAME.length > 15 ? item.ACCOUNT_NAME.substring(0, 15) + '...' : item.ACCOUNT_NAME }}
                </text>
                <text class="iconfont icon-v" v-if="item.CERTIFICATION_INFO">
                  {{ item.CERTIFICATION_INFO.length > 6 ? item.CERTIFICATION_INFO.substring(0, 6) + '...' : item.CERTIFICATION_INFO }}
                </text>
              </view>
              <view class="h2">
                主播账号id:{{ item.ACCOUNT_CODE }}
              </view>
              <view class="h3">
                平台名称：{{ item.PLATFORM_NAME }}
              </view>
            </view>
          </navigator>
          <uni-load-more status="loading" v-if="loading"></uni-load-more>
          <uni-load-more status="noMore" v-if="noData"></uni-load-more>
          <view class="zanwu" style="font-size: 25rpx; text-align: center; margin-top: 35rpx;"
                v-if="monitorList.length == 0">暂无数据
          </view>
        </view>
        <view class="myMonitMain" v-if="monitor == '监测数据'">
          <view class="anchorTotal">
            <view class="anchorTotalImg">
              <image src="../../static/img/icon06.png" mode=""></image>
            </view>
            <view class="anchorTotalTitle">
              监测主播总数
            </view>
            <view class="anchorTotalNum">
              {{ monitorMain.MonitorCount ? monitorMain.MonitorCount : '0' }}
            </view>
          </view>
          <view class="worksLiveGoodsSalesTotal clear">
            <view class="li works">
              <view class="liTitle">
                作品总数
              </view>
              <view class="liImg">
                <image src="../../static/img/icon07.png" mode=""></image>
              </view>
              <view class="liNum">
                {{ monitorMain.awemeNumCount ? monitorMain.awemeNumCount : '0' }}
              </view>
            </view>
            <view class="li live">
              <view class="liTitle">
                直播总数
              </view>
              <view class="liImg">
                <image src="../../static/img/icon08.png" mode=""></image>
              </view>
              <view class="liNum">
                {{ monitorMain.liveNumCount ? monitorMain.liveNumCount : '0' }}
              </view>
            </view>
            <view class="li goods">
              <view class="liTitle">
                带货商品总数
              </view>
              <view class="liImg">
                <image src="../../static/img/icon09.png" mode=""></image>
              </view>
              <view class="liNum">
                {{ monitorMain.goodsNumCount ? monitorMain.goodsNumCount : '0' }}
              </view>
            </view>
            <view class="li sales">
              <view class="liTitle">
                预售总销售额
              </view>
              <view class="liImg">
                <image src="../../static/img/icon10.png" mode=""></image>
              </view>
              <view class="liNum">
                {{ !monitorMain.saleMoneySumCount ? '0' : monitorMain.saleMoneySumCount | numberFormat }}
              </view>
            </view>
          </view>
          <view class="changeVal">
            <view class="changeValImg">
              <image src="../../static/img/icon11.png" mode=""></image>
            </view>
            <view class="changeValMain">
              <view class="changeLi">
                <view class="changeLiTitle">
                  新增直播数
                </view>
                <view class="changeLiNum">
                  {{ monitorMain.liveGoodSDiff ? monitorMain.liveGoodSDiff : '0' }}
                  <image src="../../static/img/icon12.png" mode=""></image>
                </view>
              </view>
              <view class="changeLi">
                <view class="changeLiTitle">
                  新增总销售额
                </view>
                <view class="changeLiNum">
                  {{ monitorMain.liveMoneyDiff ? monitorMain.liveMoneyDiff : '0' }}
                  <image src="../../static/img/icon12.png" mode=""></image>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="unLogin" v-else>
        <view>
          登录可查看更多数据
        </view>
        <view>
          <navigator url="../login/index">去登录</navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getDyMessage,
  getKsMessage,
  getLiveMonitorList,
  getMonitorStatisticsByUserId
} from "../../api/creditLive"

export default {
  data() {
    return {
      platform: '抖音',
      monitor: '监测列表',
      dyData: {},
      ksData: {},
      monitorList: [],
      pageNo: 1,
      totalPages: 0,
      loading: false,
      noData: false,
      userType: '',
      monitorMain: {}
    }
  },
  onShow() {
    this.pageNo = 1;
    this.monitorList = [];
    this.totalPages = 0;
    this.loading = false;
    this.noData = false;
    this.userType = uni.getStorageSync('userType');
    this.liveMonitorList();
    uni.$emit('shareEmit', {
      shareTitle: `新华信锐宝-信锐监测`
    })
  },
  onLoad() {

  },
  mounted() {
    this.dyMessage();
    this.ksMessage();
    this.monitorStatisticsByUserId();
    uni.$emit('shareEmit', {
      shareTitle: `新华信锐宝-信锐监测`
    })
  },
  methods: {
    //抖音平台收录情况
    dyMessage() {
      getDyMessage().then(res => {
        this.dyData = res.data;
      })
    },
    //快手平台收录情况
    ksMessage() {
      getKsMessage().then(res => {
        this.ksData = res.data;
      })
    },
    //监测列表
    liveMonitorList() {
      getLiveMonitorList({
        userId: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo').userId : '',
        pageNo: this.pageNo,
        pageSize: 10
      }).then(res => {
        if (res.stateCode == '1') {
          this.monitorList = this.monitorList.concat(res.data.list);
          this.totalPages = res.data.totalPages;
          this.loading = false;
        }
      })
    },
    monitorStatisticsByUserId() {
      getMonitorStatisticsByUserId({
        userId: uni.getStorageSync('userInfo').userId
      }).then(res => {
        if (res.stateCode == '1') {
          this.monitorMain = res.data;
        }
      })
    }
  },
  onReachBottom() {
    if (this.pageNo == this.totalPages) return this.noData = true;
    this.loading = true;
    this.pageNo++;
    this.liveMonitorList();
  }
}
</script>

<style>
page{
  background-color: #f8fbff;
}
.monit{
  padding:35rpx 22rpx 30rpx 22rpx;
}
.monitTitle .h1{
  font-size: 26rpx;
  color: #333;
}
.monitTitle .p{
  margin-top: 20rpx;
}
.monitTitle .p view{
  padding:0 20rpx;
  height: 40rpx;
  border:1px solid #e5e5e5;
  background-color: #fff;
  display: inline-block;
  transform: skew(-10deg);
  font-size: 20rpx;
  color: #333;
  text-align: center;
  line-height: 40rpx;
}
.monitTitle .p view text{
  transform: skew(10deg);
  display: inline-block;
}
.monitTitle .p view.active{
  background-color: #59c9d4;
  color: #fff;
  border:1px solid #59c9d4;
}
.monitData{
  margin-top: 30rpx;
  background-color: #fff;
  padding:0 25rpx
}

.userPerforCon{
  display: flex;
}
.userPerforMain{
  width: 50%;
  display: flex;
  padding:26rpx 0;
  border-bottom: 1px solid #e9e9e9;
}
.userPerforTitle{
  width: 50%;
  font-size: 23rpx;
  color: #333;
  position: relative;
  padding-left: 40rpx;
}
.userPerforTitle::before{
  position: absolute;
  top: 0;
  left: 0;
}
.userPerforNum{
  width: 50%;
  font-size: 26rpx;
  color: #ff8f00;
  font-weight: bold;
  padding-right: 15rpx;
}
.userPerforCon:last-child .userPerforMain{
  border-bottom: none;
}
.myMonit{
  margin-top: 30rpx;
}


.anchorBox{
  display: flex;
  justify-content: space-between;
  padding:25rpx 0;
  border-bottom: 1px solid #dcdcdc;
}
.anchorBox:last-child{
  border-bottom: none;
}
.anchorImg{
  width: 64rpx;
  margin-left: 30rpx;
}
.anchorImg image{
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}
.anchorCon{
  width: calc(100% - 127rpx);
}
.anchorCon .h1{
  font-size: 25rpx;
  font-weight: bold;
  color: #333;
}
.anchorCon .icon-v{
  font-size: 23rpx;
  color: #666;
  display: inline-block;
  margin-left: 20rpx;
  font-weight: normal;
}
.anchorCon .icon-v::before{
  font-size: 27rpx;
  color: #ff8f00;
  margin-left: 10rpx;
}
.anchorCon .h2{
  font-size: 23rpx;
  color: #333;
  margin-top: 10rpx;
}
.anchorCon .h3{
  font-size: 23rpx;
  color: #666;
  margin-top: 10rpx;
}
.anchorNum{
  height: 112rpx;
  width: 110rpx;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.anchorNum .h1{
  font-size: 31rpx;
  font-weight: bold;
  color: #ff8f00;
}
.anchorNum .h2{
  font-size: 23rpx;
  color: #666;
}
.icon-renshu::before{
  font-size: 30rpx;
  color: #1ea4ff;
}
.icon-xindiantu::before{
  font-size: 30rpx;
  color: #fa4633;
}
.icon-danju-tianchong::before{
  font-size: 30rpx;
  color: #32ab58;
}
.icon-zhibojianying::before{
  font-size: 30rpx;
  color: #ff8f00;
}
.icon-shangpin::before{
  font-size: 30rpx;
  margin-right: 5rpx;
  color: #7265e2;
}
.icon-caipinxiaoliang::before{
  font-size: 30rpx;
  color: #00cfdd;
}

.unLogin{
  text-align: center;
  font-size: 24rpx;
  color: #666;
  margin-top: 100rpx;
}
.unLogin navigator{
  width: 440rpx;
  height: 75rpx;
  border-radius: 5rpx;
  background-color: #59c9d4;
  font-size: 26rpx;
  color: #fff;
  line-height: 75rpx;
  margin: 0 auto;
  margin-top: 40rpx;
}
.myMonitMain{
  padding-left: 12rpx;
}
.anchorTotal{
  margin-top: 30rpx;
  height: 147rpx;
  border-radius: 5rpx;
  background: linear-gradient(111deg,#faede0,#fed4b9);
  position: relative;
  padding:30rpx 0 0 25rpx;
}
.anchorTotalImg{
  position: absolute;
  right: 11rpx;
  bottom: 0;
}
.anchorTotalImg image{
  width: 355rpx;
  height: 140rpx;
  vertical-align: bottom;
}
.anchorTotalTitle{
  font-size: 30rpx;
  color: #d07a2e;
  font-weight: bold;
  padding-bottom: 10rpx;
  border-bottom: 1px solid #d07a2e;
  display: inline-block;
}
.anchorTotalNum{
  font-size: 34rpx;
  color: #d07a2e;
  margin-top: 15rpx;
}
.worksLiveGoodsSalesTotal .li{
  width: calc(50% - 5rpx);
  height: 147rpx;
  border-radius: 5rpx;
  margin-top: 30rpx;
  float: left;
  position: relative;
  overflow: hidden;
}
.worksLiveGoodsSalesTotal .li:nth-child(2n){
  float: right;
}
.liTitle{
  height: 46rpx;
  padding:0 24rpx 0 12rpx;
  border-bottom-right-radius:24rpx;
  border-top-right-radius: 24rpx;
  font-size: 23rpx;
  color: #fff;
  line-height: 46rpx;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
.liImg image{
  width: 121rpx;
  height: 121rpx;
  vertical-align: bottom;
}
.liImg{
  position: absolute;
  top: 18rpx;
  right: 12rpx;
}
.liNum{
  font-size: 30rpx;
  font-weight: bold;
  position: absolute;
  left: 24rpx;
  bottom: 33rpx;
}
.works{
  background: linear-gradient(111deg,#ffe2e4,#fccac8);
}
.works .liTitle{
  background-color: #fe8884;
}
.works .liNum{
  color: #d96067;
}

.live{
  background: linear-gradient(111deg,#faede0,#fed4b9);
}
.live .liTitle{
  background-color: #f19461;
}
.live .liNum{
  color: #db6a25;
}

.goods{
  background: linear-gradient(158deg,#f8f6e2,#ffe293);
}
.goods .liTitle{
  background-color: #face65;
}
.goods .liNum{
  color: #d49c1d;
}

.sales{
  background: linear-gradient(158deg,#e7dcfd,#d2befe);
}
.sales .liTitle{
  background-color: #b29cfa;
}
.sales .liNum{
  color: #977af8;
}
.changeVal{
  margin-top: 30rpx;
  height: 147rpx;
  border-radius: 5rpx;
  background: linear-gradient(177deg,#ccf5e6,#7decca);
  padding:35rpx 0 0 23rpx;
  position: relative;
}
.changeValImg{
  position: absolute;
  top: 17rpx;
  right: 27rpx;
}
.changeValImg image{
  width: 159rpx;
  height: 114rpx;
  vertical-align: bottom;
}
.changeLi{
  display: inline-block;
}
.changeLi:nth-child(2){
  margin-left: 110rpx;
}
.changeLiTitle{
  font-size: 23rpx;
  font-weight: bold;
  color: #1fbe88;
}
.changeLiNum{
  font-size: 30rpx;
  color: #1fbe88;
  margin-top: 30rpx;
}
.changeLiNum image{
  width: 20rpx;
  height: 25rpx;
  margin-left: 10rpx;
}
</style>
