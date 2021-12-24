<template>
  <view class="creditInvestigation">
    <swiper
      class="swiper"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      indicator-color="rgba(255,255,255,.41)"
      indicator-active-color="#fff"
    >
      <swiper-item v-for="(item,index) in swiperItemList" :key="index">
        <view class="swiper-item" @click="toNewsDetail(item.artUrl)">
            <image :src="item.picLinks" style="width:100%;height:100%"></image>
            <text>{{item.titile}}</text>
        </view>
      </swiper-item>
    </swiper>
    <view class="inveReportCon">
        <uni-section title="调研报告" type="line">
            <navigator url="/pages/creditInvestigation/report" style="color:#113090;font-size:28rpx;">更多></navigator>
        </uni-section>
        <view class="con">
            <uni-row>
            <uni-col :span="8" v-for="(item,index) in inveReportCoverList" :key="index" @click.native="toDetail(item.id)">
                <view class="imgPush">
                     <view class="imgCon">
                      <image style="width:100%;height:100%" :src="item.reportCover? website + item.reportCover.path : ''" ></image>
                     </view>
                </view>
            </uni-col>
        </uni-row>
        </view>
    </view>
    <view class="inveProjectCon" v-show="false">
        <uni-section title="调研专题" type="line">
            <uni-link href="https://uniapp.dcloud.io/" text="更多>" color="#113090" :showUnderLine="false"></uni-link>
        </uni-section>
        <view class="con">
            <view class="comon-con l-Con">
                <image style="width:90rpx ;height:90rpx"  src="@/static/cardImages/ci_cs_icon.png"></image>
                <view>城市政府类培训</view>
             </view>
            <view class="comon-con r-Con">
                <view class="flex-s-a-b comon-con comon-con_r r_t_con">
                    <text>企业类培训</text>
                    <image style="width:62rpx ;height:64rpx" src="@/static/cardImages/ci_qyph_icon.png"></image>
                </view>
                 <view class="flex-s-a-b comon-con comon-con_r r_b_con">
                      <text>协会类培训</text>
                      <image  style="width:60rpx ;height:67rpx" src="@/static/cardImages/ci_qyxh_icon.png"></image>
                </view>
            </view>
        </view>
    </view>
    <view class="inveReportsCon">
        <uni-section title="调研报道" type="line">
            <view style="color: #113090;font-size: 14px;" @click="toNewsMore()">更多></view>
        </uni-section>
        <view class="list-con">
            <uni-row class="list-items" v-for="(item, index) in newsList" :key="index" @click.native="toNewsDetail(item.artUrl)">
                <uni-col :span="6">
                    <view class="imgCon">
                        <image style="width: 100%;height:100%" :src="item.picLinks"></image>
                    </view>
                </uni-col>
                <uni-col :span="17" :offset="1">
                    <view class="list-actions-item">
                        <view class="card-actions-item-text company-name">{{item.title}}</view>
                        <view class="card-actions-item-text date flex-s-b  color9b9b9b mt50">
                            <view>{{item.source}}</view>
                            <view>{{item.pubTime | dateFormat('yyyy-MM-dd')}}</view>
                        </view>
                    </view>
                </uni-col>
            </uni-row>
        </view>
    </view>
    <commonFixedDownload title="申请获得专属调研服务" btnTitle="立即申请" @eventClick="applyFn"/>
  </view>
</template>
<script>
 import uniSection from "@/components/uni-section/uni-section"
 import commonFixedDownload from "@/components/commonFixedDownload"
 import {dateFormat} from "@/utils/utils.js";
 import {Api_getResearchReportByPage} from "../../api/creditResearch";
 import {Api_getNewsList} from "../../api/common";

 export default {
  name: "CreditInvestigation",
  filters: {dateFormat},
  components:{
      uniSection,
      commonFixedDownload
  },
  data() {
    return {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        swiperItemList:[],
        inveReportCoverList: [],
        newsList: []
    };
  },
  onLoad() {
      this.getSwiperNewsList();
      this.getResearchReportByPage();
      this.getResearchNewsList();
  },
  methods:{
      applyFn(){
            uni.navigateTo({
                url: "/pages/creditInvestigation/apply"
            });
      },
      /**
       * 获取轮播cms内容
       */
      getSwiperNewsList() {
          let that = this;
          let url = '/xhxy_Json/sfcs/xysfcs/index.json';
          Api_getNewsList(url).then(res => {
              if (res.stateCode == "1") {
                  // 请求成功
                  for (let i = 0; i < res.data.list.length; i++) {
                      if (res.data.list[i].title.length > 20) {
                          res.data.list[i].title = res.data.list[i].title.substring(0,18) + "...";
                      }
                  }
                  that.swiperItemList = res.data.list;
              }
          })
      },
	  /**
	   * 获取调研报告列表
	   */
	  getResearchReportByPage() {
	    let that = this;
	    Api_getResearchReportByPage({pageNo: 1, pageSize: 3}).then(res => {
	      if (res.stateCode == "1") {
	        // 请求成功
	        that.inveReportCoverList = res.data.list;
	      }
	    })
	  },
	  toDetail(id) {
      uni.navigateTo({
        url: `/pages/creditInvestigation/reportDetail?id=${id}`
      });
    },
      /**
       * 分页查询
       * @param flag
       */
      getResearchNewsList() {
          let that = this;
          let url = "/xhxy_Json/sfcs/xysfcs/index.json";
          Api_getNewsList(url).then(res => {
              if (res.stateCode == "1") {
                  // 请求成功
                  for (let i = 0; i < res.data.list.length; i++) {
                      if (res.data.list[i].title.length > 30) {
                          res.data.list[i].title = res.data.list[i].title.substring(0,28) + "...";
                      }
                  }
                  that.newsList = res.data.list;
              }
          })
      },
	  toNewsMore() {
        console.info(11111111111111111111111);
		  uni.navigateTo({
			url: `/pages/consultList/index?url=/xhxy_Json/sfcs/xysfcs/index.json&title=调研报道`
		  });
	  },
      toNewsDetail(url) {
		  uni.navigateTo({
			 url: `/pages/consultDetail/index?url=${url}`
		  });
      }
  }
};
</script>
<style scoped lang="scss">
.creditInvestigation{
    padding: 30rpx;
}
 .swiper{
     height: 346rpx;
    .swiper-item{
     position: relative;
     height: 346rpx;
     border-radius: 10px;
     overflow: hidden;
     text{
         position: absolute;
         left: 30rpx;
         bottom: 20rpx;
         font-size: 30rpx;
         color:#fff
     }
   }
 }
  .inveReportCon{
      .imgPush{
          padding: 0 10rpx;
      }
      .imgCon{
          height: 308rpx;
          border: solid 1px #e5e5e5;
          border-radius: 10px;
      }
  }
  .inveProjectCon{
      .con{
          display: flex;
          .comon-con {
       flex: 1;
       text-align: center;
       background-size: 100% 100% !important;
       height: 250rpx;
       color:#fff;
       	font-size: 28rpx;
        border-radius: 10px;
       }
      }
    .l-Con{
     height: 100%;
     margin-right: 20rpx;
     padding-top: 45rpx;
     background: url("../../static/cardImages/ci_cs_bg.png") no-repeat center center;
  }
  .r-Con{
      display: flex;
      flex-direction: column;
      .comon-con_r{
          height: 100%;
          padding: 0 30rpx;
      }
      .r_t_con{
         background: url("../../static/cardImages/ci_qypx_bg.png") no-repeat center center;
      }
      .r_b_con{
           margin-top: 20rpx;
           background: url("../../static/cardImages/ci_qyxh_bg.png") no-repeat center center;
      }
  }
  }
    .list-items{
        padding: 20rpx;
        height: 220rpx;
        border-bottom: 1px solid #e5e5e5;
        .imgCon{
            width: 100%;
            height: 180rpx;
            border-radius: 8px;
            border: solid 1px #e5e5e5;
            overflow: hidden;
        }
        .card-actions-item-text{
            font-size: 22rpx;
             &.company-name{
            font-size: 28rpx;
            color: #222;
         }
        }
    }
</style>
