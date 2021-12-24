<template>
    <view class="creditPark">
        <view class="creditParkDes" >
            <view class="companyIntro">
                <view class="fl imgWrap">
                   <image style="width:100%;height:100%" :src="park.cover ? website + park.cover : ''"></image>
                </view>
                <view class="fl fr-con">
                    <view class="location">{{park.name}}</view>
                    <view class="mark">信用园区</view>
                    <view class="color999" style="font-size:22rpx">已入驻时间：{{park.joinTimeDiff}}</view>
                </view>
            </view>
            <view class="comon-wrap address">{{park.address}}</view>
            <view class="comon-wrap intro">{{park.introduce}}</view>
            <view class="creditParkPic" v-if="park.introduceImages && park.introduceImages.length > 0">
                <swiper
                class="swiper"
                :indicator-dots="false"
                :autoplay="autoplay"
                :interval="interval"
                :duration="duration"
                display-multiple-items="3">
                  <template v-for="(item,index) in park.introduceImages">
                    <swiper-item :key="index" v-if="index<=4">
                        <view class="swiper-item">
                            <image :src="website + item.path" style="width:100%;height:100%"></image>
                        </view>
                    </swiper-item>
                  </template>
                </swiper>
            </view>
        </view>
        <view class="creditParkContent">
            <scroll-view scroll-x="true" show-scrollbar="false" class="navTab">
              <view class="li" :class="{active: curIndex === index}" @click="changeTab(index)" v-for="(tab,index) in tabs" :key="index">{{tab.labelText}}</view>
            </scroll-view>
            <!--项目动态-->
               <view class="publistMain">
                <view class="ProDynamic_wrap dynaMain" v-if="curIndex===0">
                  <template v-for="(item,ind) in dynamicsList">
                    <navigator :url="`/pages/creditPark/projectDynamicDetail?id=${item.id}`" class="li clear" hover-class="none">
                        <image class="fl" :src="item.cover ? website + item.cover.path : ''"></image>
                        <view class="liMain fl">
                            <view class="liTitle">{{item.title}}</view>
                            <text><uni-dateformat :date="item.createDate" format="yyyy-MM-dd"></uni-dateformat></text>
                        </view>
                    </navigator>
                    </template>
             </view>
             <view class="ProDynamic_wrap" v-else-if="curIndex===1">
                <uniSection title="信用示范街区建设与评选" type="line"/>
                <view class="creditParkBus">
                    <template v-for="(item,index) in creditParkList">
                        <navigator :url="item.url + '&parkId=' + id" hover-class="navigator-hover" :key="index" :style="{width:'25%',marginTop: index>3? '60rpx' : ''}">
                            <image style="width:42rpx;height:48rpx;" :src="item.icon"></image>
                            <view style="margin-top: 20rpx">{{item.labelText}}</view>
                        </navigator>
                    </template>
                </view>
            </view>
            <view class="ProDynamic_wrap" v-else>
                <uniSection title="成效内容" type="line"/>
				<view v-if="park.projectEffectiveness" v-html="park.projectEffectiveness"></view>
            </view>
          </view>
        </view>
    </view>
</template>
<script>
   import uniSection from "@/components/uni-section/uni-section"
   import {Api_getParkDetail, Api_getProjectDynamicsByPage} from "../../api/park";
    export default{
        components: {
            uniSection
        },
        data(){
            return{
                curIndex: 0,
                tabs: [
                    {
                        id: 0,
                        labelText: "项目动态"
                    },
                    {
                        id: 1,
                        labelText: "服务内容"
                    },
                    {
                        id: 2,
                        labelText: "项目成效"
                    }
                ],
                autoplay: true,
                interval: 2000,
                duration: 500,
                swiperItemList:[
                    {
                        imgUrl: require("@/static/cardImages/xh_yq_p1.png")
                    },
                    {
                        imgUrl: require("@/static/cardImages/xh_yq_p2.png")
                    },
                    {
                        imgUrl: require("@/static/cardImages/xh_yq_p1.png")
                    },
                       {
                        imgUrl: require("@/static/cardImages/xh_yq_p1.png")
                    },
                       {
                        imgUrl: require("@/static/cardImages/xh_yq_p1.png")
                    },
                     {
                        imgUrl: require("@/static/cardImages/xh_yq_p2.png")
                    }
                ],
                      creditParkList: [
                    {
                        icon: require("@/static/cardImages/icon/xymp_icon.png"),
                        labelText: "信用名片",
                        url: "/pages/creditPark/companyList?type=0"
                    },
                    {
                        icon: require("@/static/cardImages/icon/pptg_icon.png"),
                        labelText: "品牌推广",
                         url: "/pages/creditPark/companyList?type=1"
                    },
                    {
                        icon: require("@/static/cardImages/icon/xyjc_icon.png"),
                        labelText: "信用监测",
                        url: "/pages/creditPark/creditMonitor?1=1"
                    },
                    {
                        icon: require("@/static/cardImages/icon/xycn_icon.png"),
                        labelText: "信用承诺",
                        url: "/pages/creditPark/companyList?type=2"
                    },
                     {
                        icon: require("@/static/cardImages/icon/xypj_icon.png"),
                        labelText: "信用评价",
                        url: "/pages/creditPark/companyList?type=3"
                    }
                ],
				id: "",
				park: {},
				pageNo: 1,
				pageSize: 10,
				totalPages: 1,
				dynamicsList: []
            }
        },
		onLoad: function (option) {
		    this.id = option.id;

		    // 获取内容
		    this.getParkDetail();
			this.getProjectDynamicsByPage(true);
		},
        methods: {
            changeTab(index){
                this.curIndex = index;
                console.log(this.curIndex)
            },
            linkDetail(id){
              console.info(111111111111111111);
               uni.navigateTo({
                url: `/pages/creditPark/projectDynamicDetail?id=${id}`
             });
            },
            getParkDetail() {
				let that = this;
				Api_getParkDetail(this.id).then(res => {
				   if (res.stateCode == '1') {
				       that.park = res.data;
				   }
				});
			},
			getProjectDynamicsByPage(flag) {
				let that = this;
				if (flag) {// 初始化
				    this.pageNo = 1;
				    this.totalPages = 0;
				    this.dynamicsList = [];
				}
				Api_getProjectDynamicsByPage({pageNo: this.pageNo, pageSize: this.pageSize, parkId: this.id}).then(res => {
				    if (res.stateCode == "1") {
				        // 请求成功
						that.totalPages = res.data.totalPages; // 总页数
				        if (flag) {
				            that.dynamicsList = res.data.list;
				        } else {
				            that.dynamicsList = that.dynamicsList.concat(res.data.list); // 添加数据
				        }
				    }
				})
			}
        },
		// 上拉加载
		onReachBottom() {
			if (this.curIndex === 0) {
				if (this.pageNo < this.totalPages) {
				    this.pageNo++;
				    this.getProjectDynamicsByPage(false);
				}
			}
		}
    }
</script>
<style scoped lang="scss">
@import '@/static/tabs.scss';
.swiper{
     height: 139rpx;
    .swiper-item{
     position: relative;
     height: 139rpx;
     border-radius: 8px;
     margin-right: 20rpx;
     overflow: hidden;
   }
 }
    uni-navigator{
        text-align: center;
        font-size: 24rpx;
        color: #444444;
    }
    .creditPark{
         .imgWrap{
                width: 280rpx;
                height: 173rpx;
                border-radius: 10px;
                overflow:hidden;
                margin-right: 20rpx;
            }
        .creditParkDes{
            padding:30rpx 30rpx 35rpx;
            box-shadow: 0 10px 0 #f6f6f6;
            .location{
                font-size: 30rpx;
            }
            .mark{
                width: 55px;
                height: 24rpx;
                line-height: 24rpx;
                text-align: center;
                border-radius: 4px;
                font-size: 18rpx;
                background-color:var(--main-color);
                color: #fff;
            }
            .companyIntro{
                 height: 173rpx;
            }
            .comon-wrap{
                font-size: 24rpx;
                line-height: 50rpx;
                padding-left: 30px;
                color: #999;
                margin:20rpx 0;
            }
            .fr-con>view{
                margin-bottom: 10rpx;
            }
            .address{
                background: url("../../static/cardImages/icon/icon_1.png") no-repeat left top;
            }
            .intro{
                 background: url("../../static/cardImages/icon/icon_2.png") no-repeat left top;
            }
        }
    }
     .creditParkBus{
        margin-top: 30rpx;
        display: flex;
        flex-wrap: wrap;
    }
    .publistMain{
        padding:30rpx;
    }
    .dynaMain .li{
        padding:32rpx 0;
        border-bottom: 1px solid #e5e5e5;
    }
    .dynaMain .li:last-child{
        border: none;
    }
    .dynaMain .li image{
        width: 250rpx;
        height: 146rpx;
       	border-radius: 6rpx;
        margin-right: 30rpx;
    }
    .dynaMain .li .liMain{
        width: calc(100% - 280rpx);
        text-align: left;
        height: 146rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .dynaMain .li .liMain .liTitle{
        font-size: 28rpx;
        line-height: 40rpx;
        color: #222;
    }
    .dynaMain .li .liMain text{
        font-size: 22rpx;
        color: #9b9b9b;
    }
</style>
