<template>
  <view>
    <view class="homeBack">
      <image src="../../static/img/arcBack.png" mode=""></image>
    </view>
    <view class="anchorHome">
      <view class="homeTop">
        <view class="homeTopMain">
          <view class="homeTopBac">
            <image src="../../static/img/map.png" mode=""></image>
          </view>
          <view class="homeTopBox">
            <view class="homeTopImg">
              <image :src="accountData.avatar ? accountData.avatar : '../../static/img/icon_default.png'"
                     mode=""></image>
              <view class="iconfont icon-zu" v-if="accountData.city">{{ accountData.city }}</view>
            </view>
            <view class="homeTopCon">
              <view class="h1">
                <text v-if="accountData.accountName">
                  {{
                    accountData.accountName.length > 9 ? accountData.accountName.substring(0, 9) : accountData.accountName
                  }}
                </text>
                <text v-else>-</text>
              </view>
              <view class="h2">信锐指数：
                <text>
                  {{ accountData.rankIndex ? accountData.rankIndex.toFixed(0) : '-' }}
                </text>
                <text class="renzheng iconfont icon-v" v-if="isRenzheng">已认证</text>
              </view>
              <view class="h2">
                {{ selectTitle == 'douyin' ? '抖音' : '快手' }}号：{{ accountData.account ? accountData.account : '-' }}
              </view>
              <view class="isCer">{{ isCerStatus ? '信锐主播' : '我要认证' }}</view>
            </view>
            <view class="homeTopFollow">
              <view class="jiankong">
                <text class="followOran" @tap="addMonitor()" v-if="!isMonitor">添加监控</text>
                <text class="followOran" v-if="isMonitor">已监控</text>
              </view>
            </view>
          </view>
          <view class="homeTopText">
            <text v-if="accountData.description">
              {{
                accountData.description.length > 22 ? accountData.description.substring(0, 22) + '...' : accountData.description
              }}
            </text>
            <text v-if="ksMcnKolData">所属机构/公司：{{ ksMcnKolData.mcnName ? ksMcnKolData.mcnName : '-' }}</text>
          </view>
        </view>
        <view class="homeTopNum">
          <view class="homeTopNumMain">
            <text class="h1" v-if="accountData.followerNum">{{ accountData.followerNum | numberFormat }}</text>
            <text class="h1" v-else>-</text>
            <text class="h2">粉丝数</text>
          </view>
          <view class="homeTopNumMain">
            <text class="h1" v-if="accountData.awemeNum">{{ accountData.awemeNum | numberFormat }}</text>
            <text class="h1" v-else>-</text>
            <text class="h2">作品数</text>
          </view>
        </view>
      </view>
      <view class="homeCtn">
        <navigator
            :url="selectTitle == 'douyin' ? './accountInformation?id=' + accountData.id + '&selectTitle=douyin' + '&uid=' + accountData.uid : '../zhibojian/qushibiaoxian/index?id=' + accountData.id"
            hover-class="none">
          <view class="homeCtnMain iconfont icon-qushi">账号表现</view>
        </navigator>

        <navigator
            :url="selectTitle == 'douyin' ? './workList?id=' + accountData.id + '&uid=' + accountData.uid + '&selectTitle=douyin' : '../worksList/index?id=' + accountData.id + '&uid=' + accountData.uid"
            hover-class="none">
          <view class="homeCtnMain iconfont icon-liebiaozhanshi">作品列表</view>
        </navigator>

        <navigator
            :url="selectTitle == 'douyin' ? './record?id=' + accountData.id + '&uid=' + accountData.uid + '&selectTitle=douyin' : '../zhibojilu/index?id=' + accountData.id + '&uid=' + accountData.uid"
            hover-class="none">
          <view class="homeCtnMain iconfont icon-jilu">直播记录</view>
        </navigator>

        <navigator
            :url="selectTitle == 'douyin' ? './goods?id=' + accountData.id + '&uid=' + accountData.uid + '&selectTitle=douyin' : '../daihuoliebiao/index?id=' + accountData.id + '&uid=' + accountData.uid"
            hover-class="none">
          <view class="homeCtnMain iconfont icon-f-list-liebiao">带货列表</view>
        </navigator>

        <navigator
            :url="selectTitle == 'douyin' ? './complaintList?uid='+ accountData.uid +'&anchorNo=' + accountData.account + '&selectTitle=douyin' : '../complaintInfoList/index?id='+ accountData.id +'&anchorNo=' + accountData.account"
            hover-class="none">
          <view class="homeCtnMain iconfont icon-tousuxinxi">投诉信息</view>
        </navigator>

        <navigator @click="creditPromise()" hover-class="none">
          <view class="homeCtnMain iconfont icon-chengnuo">信用承诺</view>
        </navigator>

        <navigator
            :url="`/pages/creditGoods/index?uid=${accountData.uid}&selectTitle=${selectTitle == 'douyin' ? 'douyin' : ''}`"
            hover-class="none">
          <view class="homeCtnMain iconfont icon-shangpin">信锐优品</view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getKsAccountById,
  isCertification,
  getKsAccountByUId,
  getDyAccountByUId,
  saveLiveMonitor,
  isLiveMonitor
} from "../../api/creditLive"

export default {
  data() {
    return {
      barHeight: '',
      id: '',
      accountData: {},
      ksMcnKolData: {},
      isFollow: false,
      isRenzheng: false,
      uid: '',
      userType: '',
      isShowAttention: false,
      selectTitle: '',
      isMonitor: Boolean,
      isCerStatus: Boolean,
      isShare: Boolean
    };
  },
  onLoad(options) {
    this.selectTitle = options.selectTitle;
    this.id = options.id;
    this.uid = options.uid;
    this.userType = uni.getStorageSync('userType');
    this.isShare = options.share;
    console.info(options);
  },
  mounted() {
    this.barHeight = uni.getSystemInfoSync().statusBarHeight;
    uni.showLoading({
      title: '加载中...'
    });
  },
  onShow() {
    this.ksAccountById();
  },
  methods: {
    // 是否认证
    isCertif() {
      if (uni.getStorageSync('userType') == 'person') {
        isCertification({
          userId: uni.getStorageSync('userId'),
          uidOrMcnId: this.accountData.uid
        }).then(res => {
          if (res.stateCode == '1') {
            this.isRenzheng = res.data;
          }
        });
      } else {
        this.isRenzheng = false;
      }
      isCertification({
        uidOrMcnId: this.accountData.uid
      }).then(res => {
        if (res.stateCode == '1') {
          this.isCerStatus = res.data;
        }
      })
    },
    // 评论按钮跳转
    myComment() {
      if (uni.getStorageSync('userType') == 'person') {
        uni.navigateTo({
          url: '../myCommentForm/index?id=' + this.accountData.id
        })
      } else {
        uni.navigateTo({
          url: '../login/index'
        })
      }
    },
    // 判断是否认证跳转承诺书
    creditPromise() {
      if (uni.getStorageSync('userType') == 'person') {
        if (this.isRenzheng) {
          uni.navigateTo({
            url: '../organization/creditPromise?uidOrMcnId=' + this.accountData.uid
          })
        } else {
          uni.showModal({
            content: '该主播尚未认证',
            showCancel: false
          })
        }
      } else {
        uni.navigateTo({
          url: '../login/index'
        })
      }
    },
    xinruiLive() {
      if (uni.getStorageSync('userType') != 'person') {
        uni.navigateTo({
          url: '../login/index'
        })
      } else if (!this.isRenzheng) {
        uni.showModal({
          content: '该主播未认证',
          showCancel: false,
        })
      } else {
        uni.navigateTo({
          url: `../xinruiLiveForm/index?selectTitle=${this.selectTitle}&uid=${this.accountData.uid}`
        })
      }
    },
    addMonitor() {
      if (uni.getStorageSync('userType') == 'person') {
        saveLiveMonitor({
          userId: uni.getStorageSync('userId'),
          liveId: this.accountData.uid,
          accountName: this.accountData.accountName,
          accountCode: this.accountData.account,
          platformName: this.selectTitle ? this.selectTitle : '快手',
          certificationInfo: this.accountData.certification,
          imgUrl: this.accountData.avatar
        }).then(res => {
          if (res.stateCode == '1') {
            this.isMonitor = true;
          }
        })
      } else {
        uni.navigateTo({
          url: '../login/index'
        })
      }
    },
    getIsLiveMonitor() {
      let that = this;
      isLiveMonitor({
        userId: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo').userId : '',
        uIdOrMcnId: this.accountData.uid
      }).then(res => {
        if (res.stateCode == '1') {
          that.isMonitor = res.data;
        }
      })
    },
    back() {
      if (this.isShare) {
        uni.reLaunch({
          url: '/pages/index/index'
        })
      } else {
        uni.navigateBack({
          delta: '1'
        })
      }
    },
    ksAccountById() {
      let that = this;
      if (that.id) {
        getKsAccountById({
          id: this.id
        }).then(res => {
          if (res.stateCode == '1') {
            that.accountData = res.data.accountData;
            that.ksMcnKolData = res.data.ksMcnKolData;
            uni.hideLoading();
            that.isCertif();
            that.getIsLiveMonitor();
            uni.$emit('shareEmit', {
              shareTitle: `新华信锐宝-信锐主播-${this.accountData.accountName}`
            })
          }
        })
      } else if (this.uid) {
        if (this.selectTitle == 'douyin') {
          getDyAccountByUId({
            uid: this.uid
          }).then(res => {
            if (res.stateCode == '1') {
              if (!res.data.accountData) {
                uni.showModal({
                  content: '该主播账号信息正在收录，请持续关注我们',
                  showCancel: false,
                  success: res => {
                    if (res.confirm) {
                      uni.navigateBack({
                        delta: '1'
                      })
                    }
                  }
                })
              }
              that.accountData = res.data.accountData;
              that.ksMcnKolData = res.data.ksMcnKolData;
              uni.hideLoading();
              that.isCertif();
              console.info('222222222222222');
              that.getIsLiveMonitor();
              uni.$emit('shareEmit', {
                shareTitle: `新华信锐宝-信锐主播-${this.accountData.accountName}`
              })
            }
          })
        } else {
          getKsAccountByUId({
            uid: this.uid
          }).then(res => {
            if (res.stateCode == '1') {
              if (!res.data.accountData) {
                uni.showModal({
                  content: '该主播账号信息正在收录，请持续关注我们',
                  showCancel: false,
                  success: res => {
                    if (res.confirm) {
                      uni.navigateBack({
                        delta: '1'
                      })
                    }
                  }
                })
              }
              that.accountData = res.data.accountData;
              that.ksMcnKolData = res.data.ksMcnKolData;
              uni.hideLoading();
              that.isCertif();
              console.info('11111111111111');
              that.getIsLiveMonitor();
              uni.$emit('shareEmit', {
                shareTitle: `新华信锐宝-信锐主播-${this.accountData.accountName}`
              })
            }
          })
        }
      }
    },
    followBlue() {
      uni.showModal({
        content: '是否取消关注',
        success: (res) => {
          if (res.confirm) {
            cancelAttention({
              attentionId: this.accountData.uid
            }).then(res => {
              if (res.stateCode == '1') {
                this.isFollow = false;
              }
            })
          }
        }
      });
    },
  },
}
</script>

<style>
page{
  background: #edeff3;
}
.isCer{
  height: 35rpx;
  padding:0 10rpx;
  background: rgba(65,106,168,0.66);
  color: #fff;
  font-size: 23rpx;
  line-height: 35rpx;
  display: inline-block;
  margin-top: 17rpx;
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding:0 22rpx;
  z-index: 2;
}
.header .backImg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 130rpx;
  z-index: 3;
  overflow: hidden;
  background: #416aa8;
}
.headerTitle{
  position: relative;
  z-index: 3;
  line-height: 40px;
}
.titleCen{
  text-align: center;
  font-size: 34rpx;
  color: #fff;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.titleFl{
  height: 40px;
  width: 40px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 30px;
  color: #fff;
}
.homeBack{
  position: absolute;
  left: 0;
  width: 100%;
}
.homeBack image{
  width: 100%;
}
.anchorHome{
  position: relative;
  /*z-index: 2;*/
  padding:37rpx 60rpx 35rpx 60rpx;
}
.homeTop{
  border-radius: 5rpx;
  background: #fff;
  box-shadow: 0 10rpx 25rpx rgba(40,40,40,0.1);
}
.homeTopMain{
  background: linear-gradient(#3468b9,#fff);
  position: relative;
  padding: 39rpx 33rpx 35rpx 33rpx;
  border-bottom: 1px solid #e5e5e5;
}
.homeTopBac{
  position: absolute;
  top: 7rpx;
  left: 50%;
  transform: translateX(-50%);
}
.homeTopBox{
  position: relative;
  /*z-index: 2;*/
  display: flex;
  justify-content: space-between;
}
.homeTopImg{
  width: 108rpx;
  text-align: center;
}
.homeTopImg > image{
  width: 108rpx;
  height: 108rpx;
  border-radius: 50%;
}
.homeTopImg .icon-zu{
  font-size: 25rpx;
  color: #fff;
  margin-top: 10rpx;
}
.homeTopImg .icon-zu::before{
  font-size: 21rpx;
  margin-right: 10rpx;
  position: relative;
  top: -2rpx;
}
.homeTopCon{
  width: 300rpx;
}
.homeTopCon .h1{
  font-size: 35rpx;
  color: #fff;
  font-weight: bold;
}
.homeTopCon .h2{
  font-size: 25rpx;
  color: #fff;
  margin-top: 17rpx;
  width: 422rpx;
}
.homeTopCon .h2 text{
  font-size: 27rpx;
  font-weight: bold;
  color: #ff8f00;
}
.homeTopCon .h2 .renzheng{
  font-size: 25rpx;
  margin-left: 33rpx;
  display: inline-block;
  color: #fff;
}
.homeTopCon .h2 .renzheng::before{
  color: #ff8f00;
  font-size: 36rpx;
  position: relative;
  top: 4rpx;
  margin-right: 7rpx;
}
.homeTopFollow{
  text-align: right;
}
.followOran{
  font-size: 23rpx;
  padding:0 15rpx;
  height: 36rpx;
  line-height: 36rpx;
  border-radius: 5rpx;
  color: #fff;
  box-sizing: border-box;
  background: rgba(65,106,168,0.66);
  display: inline-block;
}
.jiankong{
  margin-top: 20rpx;
}
.homeTopText{
  margin-top: 35rpx;
  font-size: 25rpx;
  color: #666;
  line-height: 40rpx;
}
.homeTopText text{
  display: block;
}
.homeTopNum{
  height: 167rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.homeTopNumMain .h1{
  display: block;
  font-size: 35rpx;
  color: #ff8f00;
  font-weight: bold;
  text-align: center;
}
.homeTopNumMain .h2{
  display: block;
  font-size: 26rpx;
  color: #333;
  text-align: center;
}
.homeCtn{
  margin-top: 35rpx;
  background-color: #fff;
  border-radius: 5rpx;
  padding-bottom: 40rpx;
}
.homeCtn navigator{
  width: 33.333%;
  text-align: center;
  font-size: 25rpx;
  color: #333;
  margin-top: 40rpx;
  display: inline-block;
  position: relative;
  z-index: 2;
}
.homeCtnMainUrl{
  width: 33.333%;
  text-align: center;
  font-size: 25rpx;
  color: #333;
  margin-top: 40rpx;
  display: inline-block;
}
.homeCtnMain::before{
  display: block;
  margin-bottom: 20rpx;
  font-size: 52rpx;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(90deg, #8c95b7, #b9c0dd);
}
.icon-qushi::before{
  background-image: linear-gradient(90deg, #33ac77, #73dfae);
}
.icon-jilu::before{
  background-image: linear-gradient(90deg, #f8a42c, #f0ba78);
}
.icon-f-list-liebiao::before{
  background-image: linear-gradient(90deg, #4a94fe, #9ec8fd);
}
.icon-pinglun::before{
  background-image: linear-gradient(90deg, #ed5839, #ff8960);
}
.icon-tousuxinxi::before{
  background-image: linear-gradient(90deg, #6069f1, #9da9fe);
}
.icon-chengnuo::before{
  background-image: linear-gradient(90deg, #c14cc5, #dbaeec);
}
.icon-shangpin::before{
  background-image: linear-gradient(90deg, #56c6d0, #90e6ee);
}
.icon-liebiaozhanshi::before{
  background-image: linear-gradient(90deg, #ed593a, #ff926d);
}
</style>
