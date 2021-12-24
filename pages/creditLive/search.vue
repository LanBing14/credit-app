<template>
  <view>
    <view class="anchor">
      <view class="tab">
        <view class="tabList" @tap="tab('信锐主播')" :class="anchorTitle == '信锐主播' ? 'active' : ''">信锐主播</view>
        <view class="tabList" @tap="tab('信锐机构')" :class="anchorTitle == '信锐机构' ? 'active' : ''">信锐机构</view>
        <view class="tabList" @tap="tab('信锐直播间')" :class="anchorTitle == '信锐直播间' ? 'active' : ''">信锐直播间</view>
      </view>
      <view class="tabSearch">
        <view class="searchBox">
          <input type="text" v-model="keyWord" confirm-type="search" placeholder-class="searchPlace"
                 placeholder="请输入关键词" @confirm="search"/>
          <view class="searchBtn" @tap="search(keyWord)">搜索</view>
        </view>
      </view>
      <view v-if="anchorTitle == '信锐主播'">
        <view class="clear">
          <view class="anchorSort">
            <text class="sortTitle" :class="active == 1 ? 'active' : ''" @tap="type(1)">信锐指数</text>
            <text class="sortTitle" :class="active == 2 ? 'active' : ''" @tap="type(2)">作品数</text>
            <text class="sortTitle" :class="active == 3 ? 'active' : ''" @tap="type(3)">粉丝数</text>
          </view>
          <view class="anchorSelect">
            <picker class="iconfont icon-jiantou" @change="bindPickerChange" :range="select">
              <view class="uni-input">{{ selectTitle == 'douyin' ? '抖音' : '快手' }}</view>
            </picker>
          </view>
        </view>
        <view class="anchorList">
          <navigator class="anchorBox"
                     :url="selectTitle == 'douyin' ? '../anchor/index?uid=' + item.uid + '&selectTitle=douyin' : '../anchor/index?id=' + item.id"
                     hover-class="none" v-for="item in accountList" :key="item.id">
            <view class="anchorImg">
              <image :src="item.avatar ? item.avatar : '../../static/img/zhubo.jpg'"></image>
            </view>
            <view class="anchorCon">
              <view class="h1">
                <text v-if="item.accountName">
                  {{ item.accountName.length > 8 ? item.accountName.substring(0, 8) + '...' : item.accountName }}
                </text>
                <text class="iconfont icon-v" v-if="item.certification">
                  {{ item.certification.length > 6 ? item.certification.substring(0, 6) + '...' : item.certification }}
                </text>
              </view>
              <view class="h2">
                主播账号id:{{ item.account }}
              </view>
              <view class="h3">
                平台名称：{{ selectTitle == 'douyin' ? '抖音' : '快手' }}
                <text class="isCer">{{ item.isCer ? '信锐主播' : '我要认证' }}</text>
              </view>
            </view>
            <view class="anchorNum">
              <view class="h1">
                {{ selectTitle == 'kuaishou' ? item.rankIndex : item.rankIndex.toFixed(0) }}
              </view>
              <view class="h2">
                信锐指数
              </view>
            </view>
          </navigator>
          <uni-load-more status="loading" v-if="loading"></uni-load-more>
          <uni-load-more status="noMore" v-if="noData"></uni-load-more>
          <view class="zanwu" style="font-size: 25rpx; text-align: center; margin-top: 35rpx;"
                v-if="accountList.length == 0">暂未收录您搜索的信息，请点击
            <navigator style="color: #4785ce;display: inline-block;" url="./employForm?type=1">信锐收录
            </navigator>
            申请收录相关信息，我们会及时更新您关注的内容。
          </view>
        </view>
      </view>
      <view v-if="anchorTitle == '信锐机构'">
        <view class="clear">
          <view class="anchorSort">
            <text class="sortTitle" :class="active == 1 ? 'active' : ''" @tap="type(1)">签约达人数</text>
            <text class="sortTitle" :class="active == 2 ? 'active' : ''" @tap="type(2)">覆盖粉丝数</text>
          </view>
          <view class="anchorSelect">
            <picker class="iconfont icon-jiantou" @change="bindPickerChange" :range="select">
              <view class="uni-input">{{ selectTitle == 'douyin' ? '抖音' : '快手' }}</view>
            </picker>
          </view>
        </view>
        <view class="anchorList">
          <navigator class="anchorBox"
                     :url="selectTitle == 'douyin' ? '../organization/index?mcnId=' + item.mcnId + '&selectTitle=douyin' : '../organization/index?mcnId=' + item.mcnId"
                     hover-class="none" v-for="item in MechList" :key="item.id">
            <view class="anchorImg">
              <image v-if="selectTitle == 'douyin'"
                     :src="item.logo ? item.logo : '../../static/img/icon_default.png'"></image>
              <image v-else src="../../static/img/icon_default.png"></image>
            </view>
            <view class="mechan">
              <view class="h1">
                {{ item.mcnName }}
                <text class="isCer">{{ item.isCer ? '信锐机构' : '我要认证' }}</text>
              </view>
              <view class="h2" v-if="item.companyName">
                {{ item.companyName }}
              </view>
              <view class="h3">
                <text>
                  签约达人数：
                  <text class="num">{{ item.signKolNum | numberFormat }}人</text>
                </text>
                <text>
                  覆盖粉丝：
                  <text class="num">{{ item.coverFllower | numberFormat }}人</text>
                </text>
              </view>
            </view>
          </navigator>
          <uni-load-more status="loading" v-if="loading"></uni-load-more>
          <uni-load-more status="noMore" v-if="noData"></uni-load-more>
          <view class="zanwu" style="font-size: 25rpx; text-align: center; margin-top: 35rpx;"
                v-if="accountList.length == 0">暂未收录您搜索的信息，请点击
            <navigator style="color: #4785ce;display: inline-block;" url="./employForm?type=2">信锐收录
            </navigator>
            申请收录相关信息，我们会及时更新您关注的内容。
          </view>
        </view>
      </view>
      <view v-if="anchorTitle == '信锐直播间'">
        <view class="clear">
          <view class="anchorSort" v-if="selectTitle == 'kuaishou'">
            <text class="sortTitle" :class="active == 1 ? 'active' : ''" @tap="type(1)">直播开始时间</text>
            <text class="sortTitle" :class="active == 2 ? 'active' : ''" @tap="type(2)">直播时长</text>
            <text class="sortTitle" :class="active == 3 ? 'active' : ''" @tap="type(3)">累计观看人数</text>
          </view>
          <view class="anchorSort" v-if="selectTitle == 'douyin'">
            <text class="sortTitle" :class="active == 1 ? 'active' : ''" @tap="type(1)">开播时间</text>
            <text class="sortTitle" :class="active == 2 ? 'active' : ''" @tap="type(2)">开播时长</text>
            <text class="sortTitle" :class="active == 3 ? 'active' : ''" @tap="type(3)">累计观看数</text>
          </view>
          <view class="anchorSelect">
            <picker class="iconfont icon-jiantou" @change="bindPickerChange" :range="select">
              <view class="uni-input">{{ selectTitle == 'douyin' ? '抖音' : '快手' }}</view>
            </picker>
          </view>
        </view>
        <view class="liveList">
          <navigator class="liveBox" v-for="item in liveList"
                     :url="`../liveRecord/index?roomId=${item.LIVE_ID}&selectTitle=${selectTitle == 'douyin' ? 'douyin' : ''}&sharpLiveId=${item.SHARP_LIVE_ID ? item.SHARP_LIVE_ID : ''}&id=${item.ID}`"
                     :key="item.LIVE_ID" hover-class="none">
            <view class="liveImg">
              <image :src="item.COVER_URL ? item.COVER_URL : '../../static/img/zhibo.jpg'" mode="aspectFill"></image>
            </view>
            <view class="liveCon">
              <view class="h1">
                {{ item.LIVE_NAME }}
                <text class="isCer">{{ item.SHARP_LIVE_ID ? '信锐直播间' : '我要认证' }}</text>
              </view>

              <view class="p">
                {{ selectTitle == 'douyin' ? '开播时间：' : '直播开始时间：' }}
                {{ item.START_TIME | toTimeYear }}
              </view>

              <view class="p">
                {{ selectTitle == 'douyin' ? '预估总销售额：' : '预估销售额：' }}
                {{ item.TOTAL_SALES_MONEY | numberFormat }}元
              </view>

              <view class="p">
                {{ selectTitle == 'douyin' ? '开播时长：' : '直播时长：' }}
                <text v-if="selectTitle == 'douyin'">
                  {{ Math.floor(item.DURATION / 60) + '小时' + Math.floor(item.DURATION % 60) + '分钟' }}
                </text>
                <text v-else>
                  {{ item.DURATION | toDayHours }}
                </text>
              </view>
              <view class="p">
                累计观看人数：
                <text v-if="selectTitle == 'douyin'">
                  {{ item.STATS_TOTAL_USER | numberFormat }}
                </text>
                <text v-else>
                  <text v-if="item.STATS_TOTAL_USER == '100000'">
                    10.00w+
                  </text>
                  <text v-else>
                    {{ item.STATS_TOTAL_USER | numberFormat }}
                  </text>
                </text>
              </view>
            </view>
          </navigator>
          <uni-load-more status="loading" v-if="loading"></uni-load-more>
          <uni-load-more status="noMore" v-if="noData"></uni-load-more>
          <view class="zanwu" style="font-size: 25rpx; text-align: center; margin-top: 35rpx;"
                v-if="liveList.length == 0">暂无数据
          </view>
        </view>
      </view>
      <view v-if="anchorTitle == '信锐企业'" style="padding-top: 10rpx">
        <navigator v-for="item in enterpList" :key="item.id" :url="`../enterpInfo/index?companyId=${item.keyNo}`"
                   hover-class="none">
          <view class="enterpList clear">
            <view class="enterpListFl" :class="{'iconfont icon-qiye1':!item.tmImageUrl}">
              <image v-if="item.tmImageUrl" :src="allUrl + item.tmImageUrl"></image>
            </view>
            <view class="enterpListFr">
              <view class="enterpTitle">
                <rich-text :nodes="item.name"></rich-text>
                <text v-if="item.status">
                  {{ item.status }}
                </text>
              </view>
              <view class="enterpP">
                法定代表人：{{ item.operName ? item.operName : '-' }}
              </view>
              <view class="enterpP">
                注册资金：{{ item.registCapi ? item.registCapi : '-' }}
                <text>
                  成立日期：{{ item.startDate ? item.startDate.substring(0, 10) : '-' }}
                </text>
              </view>
            </view>
          </view>
        </navigator>
        <uni-load-more status="loading" v-if="loading"></uni-load-more>
        <uni-load-more status="noMore" v-if="noData"></uni-load-more>
        <view class="zanwu" style="font-size: 25rpx; text-align: center; margin-top: 35rpx;"
              v-if="enterpList.length == 0">暂无数据
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import liveList from "../../components/livelist.vue"
import {
  getMcnInfoList,
  getKsAccountList,
  getDyAccountList,
  getDyMcnInfoList, companySearchByPageData, getLiveRecordPage
} from '../../api/creditLive'

export default {
  components: {
    liveList
  },
  data() {
    return {
      anchorTitle: '',
      keyWord: '',
      active: 1,
      MechList: [],
      liveList: [],
      accountList: [],
      pageNo: 0,
      totalPages: 0,
      loading: false,
      noData: false,
      select: ['抖音', '快手'],
      selectTitle: 'douyin',
      backNum: {},
      params: {},
      enterpList: [],
      allUrl: '',
    }
  },
  onLoad(option) {
    if (option.anchorTitle) {
      this.anchorTitle = option.anchorTitle;
    } else {
      this.anchorTitle = '信锐主播';
    }
    this.backNum = {
      num: 2,
      type: 'myHome'
    }

    if (this.anchorTitle == '信锐直播间' || this.anchorTitle == '信锐企业') {
      this.pageNo = 1;
    }
    this.params = {
      "queryValue": '',
      "isFromSearch": "1",
      "Status": "",
      "regist_capi": "",
      "startYear": "",
      "Province": "",
      "Industry": "",
      "pageNo": this.pageNo,
      "pageSize": 10,
      "highLight": 1,
      "queryType": "0"
    }
  },
  mounted() {
    this.list();
    /*uni.$emit('shareEmit', {
      shareTitle: `新华信锐宝-信锐查询`
    })*/
  },
  onShow() {
    /*uni.$emit('shareEmit', {
      shareTitle: `新华信锐宝-信锐查询`
    })*/
  },
  methods: {
    companySearchByPage() {
      this.params.queryValue = this.keyWord;
      this.params.pageNo = this.pageNo;
      companySearchByPageData(this.params).then(res => {
        if (res.stateCode == '50001') {
          this.enterpList = this.enterpList.concat(res.data.returnData);
          this.totalPages = res.data.totalPages;
          this.loading = false;
          uni.hideLoading();
        } else if (res.stateCode == '50103') {
          uni.showModal({
            content: '请输入更详细的关键词',
            showCancel: false
          });
          uni.hideLoading();
          return;
        } else {
          uni.hideLoading();
        }
      })
    },
    tab(name) {
      this.anchorTitle = name;
      if (this.anchorTitle == '信锐直播间' || this.anchorTitle == '信锐企业') {
        this.pageNo = 1;
      } else {
        this.pageNo = 0;
      }
      this.arrNull();
      this.list();
      uni.showLoading({
        title: '加载中...'
      })
    },
    search(e) {
      if (this.anchorTitle == '信锐直播间' || this.anchorTitle == '信锐企业') {
        this.pageNo = 1;
      } else {
        this.pageNo = 0;
      }
      this.arrNull();
      this.list();
      uni.showLoading({
        title: '加载中...'
      })
    },
    type(data) {
      if (this.anchorTitle == '信锐直播间') {
        this.pageNo = 1;
      } else {
        this.pageNo = 0;
      }

      this.arrNull();
      this.active = data;
      this.list();
      uni.showLoading({
        title: '加载中...'
      })
    },
    mcnInfoList() {
      getMcnInfoList({
        type: this.active,
        pageNo: this.pageNo,
        pageSize: 10,
        mcnName: this.keyWord
      }).then(res => {
        if (res.stateCode == '1') {
          this.MechList = this.MechList.concat(res.data.content);
          this.totalPages = res.data.totalPages;
          this.loading = false;
        }
        uni.hideLoading();
      })
    },
    sharpLetterLiveList() {
      getLiveRecordPage({
        liveName: this.keyWord,
        type: this.active,
        pageNo: this.pageNo,
        pageSize: 10,
        source: 2
      }).then(res => {
        if (res.stateCode == '1') {
          this.liveList = this.liveList.concat(res.data.list);
          this.totalPages = res.data.totalPages;
          this.loading = false;
          if (this.pageNo + 1 == this.totalPages) {
            this.noData = true;
          }
          uni.hideLoading();
        }
      })
    },
    ksAccountList() {
      getKsAccountList({
        type: this.active,
        accountName: this.keyWord,
        pageNo: this.pageNo,
        pageSize: 10
      }).then(res => {
        if (res.stateCode == '1') {
          this.accountList = this.accountList.concat(res.data.content);
          this.totalPages = res.data.totalPages;
          this.loading = false;
          if (this.pageNo + 1 == this.totalPages) {
            this.noData = true;
          }
          uni.hideLoading();
        }
      })
    },
    list() {
      if (this.selectTitle == 'kuaishou') {
        switch (this.anchorTitle) {
          case '信锐主播':
            this.ksAccountList()
            break;
          case '信锐机构':
            this.mcnInfoList();
            break;
          case '信锐直播间':
            this.sharpLetterLiveList();
            break;
          case '信锐企业':
            this.companySearchByPage();
            break;
        }
      } else {
        switch (this.anchorTitle) {
          case '信锐主播':
            this.dyAccountList()
            break;
          case '信锐机构':
            this.dyMcnInfoList();
            break;
          case '信锐直播间':
            this.dySharpLetterLiveList();
            break;
          case '信锐企业':
            this.companySearchByPage();
            break;
        }
      }

    },
    arrNull() {
      this.MechList = [];
      this.liveList = [];
      this.accountList = [];
      this.enterpList = [];
    },
    bindPickerChange(e) {
      // this.selectTitle = this.select[e.detail.value];
      if (this.select[e.detail.value] == '抖音') {
        this.selectTitle = 'douyin'
      } else {
        this.selectTitle = 'kuaishou'
      }
      if (this.anchorTitle == '信锐直播间') {
        this.pageNo = 1;
      } else {
        this.pageNo = 0;
      }
      this.arrNull();
      this.list();
    },
    //抖音-信锐直播间列表
    dyAccountList() {
      getDyAccountList({
        type: this.active,
        accountName: this.keyWord,
        pageNo: this.pageNo,
        pageSize: 10
      }).then(res => {
        if (res.stateCode == '1') {
          this.accountList = this.accountList.concat(res.data.content);
          this.totalPages = res.data.totalPages;
          this.loading = false;
          if (this.pageNo + 1 == this.totalPages) {
            this.noData = true;
          }
          uni.hideLoading();
        }
      })
    },
    //抖音-信锐机构列表
    dyMcnInfoList() {
      getDyMcnInfoList({
        type: this.active,
        pageNo: this.pageNo,
        pageSize: 10,
        mcnName: this.keyWord
      }).then(res => {
        if (res.stateCode == '1') {
          this.MechList = this.MechList.concat(res.data.content);
          this.totalPages = res.data.totalPages;
          this.loading = false;
        }
        uni.hideLoading();
      })
    },
    //抖音-信锐直播列表
    dySharpLetterLiveList() {
      /*getDySharpLetterLiveList({
        roomName:this.keyWord,
        type:this.active,
        pageNo:this.pageNo,
        pageSize:10
      }).then(res => {
        if(res.stateCode == '1'){
          this.liveList = this.liveList.concat(res.data.content);
          this.totalPages = res.data.totalPages;
          this.loading = false;
          if(this.pageNo + 1 == this.totalPages){
            this.noData = true;
          }
          uni.hideLoading();
        }
      })*/
      getLiveRecordPage({
        liveName: this.keyWord,
        type: this.active,
        pageNo: this.pageNo,
        pageSize: 10,
        source: 1
      }).then(res => {
        if (res.stateCode == '1') {
          this.liveList = this.liveList.concat(res.data.list);
          this.totalPages = res.data.totalPages;
          this.loading = false;
          if (this.pageNo + 1 == this.totalPages) {
            this.noData = true;
          }
          uni.hideLoading();
        }
      })
    }
  },
  onReachBottom() {
    if (this.pageNo + 1 == this.totalPages) return this.noData = true;
    this.loading = true;
    this.pageNo++;
    this.list();
  }
}
</script>

<style>
.isCer{
  height: 35rpx;
  padding:0 10rpx;
  background-color: #e2efff;
  color: #4785ce;
  font-size: 23rpx;
  line-height: 35rpx;
  display: inline-block;
  margin-left: 10rpx;
}
.tab{
  display: flex;
  justify-content: space-between;
  padding:0 10rpx;
  border-bottom: 2px solid #e5e5e5;
}
.tab .tabList{
  position: relative;
  height: 63rpx;
  line-height: 63rpx;
  font-size: 31rpx;
}
.tab .active{
  color: #416aa8;
}
.tab .active:after{
  content: '';
  display: block;
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #416aa8;
}
.tabSearch{
  margin: 27rpx 10rpx 0 10rpx;
  position: relative;
}
.tabSearch input{
  width: calc(100% - 100rpx);
  height: 67rpx;
  /* box-sizing: border-box;
  background-color: #ffffff;
  border:1px solid #eee;
  box-shadow: 10rpx 10rpx 25rpx rgba(40,40,40,0.1);
  border-radius: 5rpx;
  font-size: 25rpx;
  color: #000;
  padding-left: 22rpx; */
}
.searchBox{
  width: 100%;
  height: 67rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  border:1px solid #eee;
  box-shadow: 10rpx 10rpx 25rpx rgba(40,40,40,0.1);
  border-radius: 5rpx;
  font-size: 25rpx;
  color: #000;
  padding-left: 22rpx;
}
.searchPlace{
  font-size: 25rpx;
  color: #999;
}
.icon-sousuo{
  position: absolute;
  right: 30rpx;
  top: 10rpx;
  font-size: 40rpx;
  color: #9e9e9e;
}
.searchBtn{
  position: absolute;
  right: 10rpx;
  top: 10rpx;
  height: 47rpx;
  background: #416aa8;
  color: #fff;
  width: 82rpx;
  border-radius: 8rpx;
  text-align: center;
  line-height: 47rpx;
  font-size: 25rpx;
  z-index: 3;
}
.anchor{
  padding: 15px 22px 0 22px;
}
.anchorSort{
  float: left;
}
.anchorSort .sortTitle{
  display: inline-block;
  font-size: 25rpx;
  color: #666;
  height: 40rpx;
  line-height: 40rpx;
  padding:0 20rpx;
  border-radius: 40rpx;
  margin-left: 10rpx;
  margin-top: 22rpx;
}
.anchorSelect{
  float: right;
  margin-top: 22rpx;
  margin-right: 10rpx;
}
.anchorSelect picker{
  width: 110rpx;
  height: 40rpx;
  border: 1px solid #e3e3e3;
  position: relative;
  color: #666;
  box-sizing: border-box;
  padding-left: 20rpx;
  font-size: 25rpx;
  line-height: 40rpx;
}
.anchorSelect .icon-jiantou::before{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 35rpx;
  color: #666;
  z-index: -1;
}
.anchorSort .active{
  background: #ff8f00;
  color: #fff;
}
.anchorList{
  margin-top: 20rpx;
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
  width: 425rpx;
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

.mechan{
  width: 550rpx;
}
.mechan .h1{
  font-size: 25rpx;
  font-weight: bold;
  color: #333;
}
.mechan .h2{
  font-size: 23rpx;
  color: #333;
  margin-top: 10rpx;
}
.mechan .h3{
  font-size: 23rpx;
  color: #666;
  margin-top: 10rpx;
}
.mechan .h3 > text:nth-child(2){
  margin-left: 80rpx;
}
.mechan .h3 > text text{
  font-weight: bold;
  color: #ff8f00;
}

.liveBox{
  padding:23rpx 30rpx;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
}
.liveBox:last-child{
  border-bottom: none;
}
.liveImg{
  width: 150rpx;
}
.liveImg image{
  width: 100%;
  height: 193rpx;
  border-radius: 5rpx;
}
.liveCon{
  width: calc(100% - 170rpx);
}
.liveCon .h1{
  font-size: 25rpx;
  color: #333;
  font-weight: bold;
}
.liveCon .p{
  font-size: 23rpx;
  color: #666;
  margin-top: 11rpx;
}
.enterpList{
  padding:20rpx 0;
  border-bottom: 1px solid #dcdcdc;
}
.enterpListFl{
  width: 115rpx;
  height: 115rpx;
  float: left;
  color: #d4d4d4;
  font-size: 55rpx;
  margin-top: 10rpx;
  text-align: center;
  position: relative;
}
.enterpListFl image{
  width: 70rpx;
  height: 70rpx;
}
.enterpListFr{
  width: calc(100% - 115rpx);
  float: right;
}
.enterpTitle{
  font-size: 25rpx;
  color: #333;
  font-weight: bold;
}
.enterpTitle text{
  font-weight: 100;
  padding:0 8rpx;
  border:1px solid #bfbfbf;
  border-radius: 5rpx;
  color: #999;
  display: inline-block;
  margin-left: 15rpx;
}
.enterpP{
  font-size: 23rpx;
  color:#666;
  margin-top: 10rpx;
}
.enterpP text{
  float: right;
}
rich-text{
  display: inline-block;
}
</style>

