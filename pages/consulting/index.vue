<template>
  <view>
    <view class="index">
      <view class="scrollBox">
        <view class="banner">
          <swiper class="swiper" circular="true" easing-function="easeOutCubic" indicator-dots="false"
                  autoplay="false" indicator-color="#eaeaea" indicator-active-color="#60bed8">
            <swiper-item v-for="(item,index) in bannerList" :key="item.id" v-if="index < 3" @tap="toDetail(item)">
              <view class="bannerMain">
                <image :src="item.picLinks"></image>
                <view class="bannerTitle">
                  {{ item.title.length > 22 ? item.title.substring(0, 22) + '...' : item.title }}
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
      <view class="list">
        <view v-for="item in consultList" :key="item.id" @tap="toDetail(item)">
          <view class="nameP">{{ item.title }}</view>
          <view class="timeP"
                :style="'border-bottom:1px solid #e5e5e5'">
            <text class="time_text">发布时间：{{ item.pubTime | toTimeYear }}</text>
            <!-- item.pubTime -->
            <text class="time_line">|</text>
            <text>来源：{{ item.source }}</text>
          </view>
        </view>
        <uni-load-more status="loading" v-if="loading"></uni-load-more>
        <uni-load-more status="noMore" v-if="noData"></uni-load-more>
      </view>
    </view>
  </view>
</template>

<script>
import {Api_getNewsList} from "../../api/common"

export default {
  data() {
    return {
      bannerList: [],
      consultList: [],
      pageNo: 1,
      page: '',
      totalPages: 0,
      loading: false,
      noData: false,
      backNum: {}
    }
  },
  onLoad() {
    this.backNum = {
      num: 2,
      type: 'myHome'
    }
  },
  mounted() {
    this.banner();
    this.consult();
  },
  onShow() {
    uni.$emit('shareEmit', {
      shareTitle: `新华信锐宝-信锐资讯`
    })
  },
  methods: {
    banner() {
      Api_getNewsList(
          "/xhxy_Json/xhxyztsc/zbdspdsxy/ttdt/index.json&copytype=true"
      ).then(res => {
        if (res.stateCode == '1') {
          this.bannerList = res.data.list;
        }
      })
    },
    consult() {
      if (this.pageNo == 1) {
        this.page = 'index'
      } else {
        this.page = 'index_' + this.pageNo;
      }
      Api_getNewsList(
          '/xhxy_Json/xhxyztsc/zbdspdsxy/ssdt/' + this.page + '.json&copytype=true'
      ).then(res => {
        if (res.stateCode == '1') {
          this.consultList = this.consultList.concat(res.data.list);
          this.totalPages = parseInt((res.data.pageTotal - 1) / 10 + 1);
          this.loading = false;
        }
      })
    },
    toDetail(data) {
      uni.navigateTo({
        url: "../consultDetail/index?url=" + data.artUrl
      })
    }
  },
  onReachBottom() {
    if (this.pageNo == this.totalPages) return this.noData = true;
    this.loading = true;
    this.pageNo++;
    this.consult();
  }
}
</script>

<style>
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 750rpx;
  z-index: 1;
}

.index {
  width: 750rpx;
  padding: 0 22rpx;
}

.logo {
  padding-top: 20rpx;
}

.logo image {
  width: 192rpx;
  height: 53rpx;
}

.scrollBox {
  margin-top: 30rpx;
}

.banner .swiper {
  height: 440rpx;
}

.banner swiper-item {
  border-radius: 5rpx;
  overflow: hidden;
}
.bannerMain{
  height: 386rpx;
  position: relative;
  width: 100%;
}

.bannerMain image {
  width: 100%;
  height: 386rpx;
}
.bannerTitle{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50rpx;
  background-color: rgba(0,0,0,0.5);
  text-align: center;
  font-size: 28rpx;
  color: #fff;
  line-height: 50rpx;
}

.nameP {
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  font-family: "微软雅黑";
  margin-top: 20rpx;
}

.timeP {
  font-size: 25rpx;
  color: #999999;
  line-height: 40rpx;
  font-family: "微软雅黑";
  margin-top: 30rpx;
  padding-bottom: 25rpx;
  text-align: right;
  margin-right: 22rpx;
}

.time_line {
  margin-right: 30rpx;
}

.time_text {
  margin-right: 30rpx;
}
</style>
