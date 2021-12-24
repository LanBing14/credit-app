<template>
  <view class="creditMonitorWrap">
    <view class="list-item" v-for="(item,index) in items" :key="index">
      <image class="list-con list-img" :src="item.url"></image>
      <view class="list-con content">
        <view class="title">{{item.name}}</view>
        <view class="total">{{item.total}}</view>
      </view>
    </view>
  </view>
</template>
<script>
import {getCreditMonitor} from "../../api/park";

export default{
  data(){
    return{
      items: [
        {
          name: "企业数量",
          total: "0",
          url: require("@/static/cardImages/1@2x.png")
        },
        {
          name: "企业总资本(万元)",
          total: "0",
          url: require("@/static/cardImages/2@2x.png")
        },  {
          name: "企业专利数量",
          total: "0",
          url: require("@/static/cardImages/3@2x.png")
        },  {
          name: "商标数量",
          total: "0",
          url: require("@/static/cardImages/4@2x.png")
        },  {
          name: "被执行人信息数量",
          total: "0",
          url: require("@/static/cardImages/5@2x.png")
        },  {
          name: "行政处罚信息数量",
          total: "0",
          url: require("@/static/cardImages/6@2x.png")
        }
      ]
    }
  },
  onLoad(options){
    let that = this;
    console.info(options);
    getCreditMonitor({parkId: options.parkId}).then(res => {
      if (res.stateCode == '1') {
        that.items.forEach(item => {
          switch (item.name) {
            case '企业数量':
              item.total = res.data.companyCount;
              break;
            case '企业总资本(万元)':
              item.total = res.data.money;
              break;
            case '企业专利数量':
              item.total = res.data.patentCount;
              break;
            case '商标数量':
              item.total = res.data.brandCount;
              break;
            case '被执行人信息数量':
              item.total = res.data.executorCount;
              break;
            case '行政处罚信息数量':
              item.total = res.data.punishCount;
              break;
          }
        })
      }
    })
  },
  methods: {

  }
}
</script>
<style>
page{
  background: #f6f6f6;
}
</style>
<style scoped lang="scss">
.creditMonitorWrap{
  padding: 23rpx 30rpx;
  display: flex;
  flex-wrap: wrap;
  .list-item{
    width: 49%;
    height: 186rpx;
    border-radius: 6px;
    background-repeat:no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    overflow: hidden;
    color: #fff;
    margin-bottom: 20rpx;
    position: relative;
    .list-con{
      width:100%;
      height:100%;
      position: absolute;
      left: 0;
      top: 0;
      &.content{
        padding: 40rpx 30rpx;
      }
    }
    &:nth-child(2n+1){
      margin-right: 2%;
    }
    .title{
      font-size: 26rpx;
      opacity: 0.8;
      line-height: 40rpx;
      position: relative;
      &:after{
        content: "";
        width:26rpx;
        height:4rpx;
        border-radius: 4rpx;
        background: #fff;
        position: absolute;
        left: 0;
        bottom: -12rpx;
      }
    }
    .total{
      margin-top: 26rpx;
      font-size: 44rpx;
      font-weight: bold;
      line-height: 40rpx;
    }

  }
}
</style>
