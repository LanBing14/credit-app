<template>
  <view class="creditCardDetail">
    <view class="main">
       <image style="width:100%;height:100%;" :src="cardImg"></image>
    </view>
    <commonFixedDownload @eventClick="download"/>
  </view>
</template>
<script>
import apiUrl from "../../api/apiUrl";
import commonFixedDownload from "@/components/commonFixedDownload"
import {strIsNull} from "../../utils/utils";

export default {
  components: {
    commonFixedDownload
  },
  data() {
    return {
      colorVal: 0,
      cardImg: ''
    }
  },
  onLoad(options) {
   this.cardImg = (!strIsNull(options.cardImg) ? apiUrl.fileHost + options.cardImg : "https://m.credit100.com/xinhuashe/waframework/upload/temp/1b6be650-9138-4cb7-91c5-a92823d80e63.png");
    console.info(this.cardImg);
  },
  onPageScroll(e) {
    //滑动滚动条添加自定义导航背景色
    this.colorVal = (e.scrollTop * (100 / 70) / 100)
  },
  methods: {
    download() {
      uni.showLoading({
        title: '下载中...',
        mask: true
      });
      uni.downloadFile({
        url: this.cardImg,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                uni.hideLoading();
                uni.showToast({
                  title: "保存成功",
                  icon: "none"
                });
              },
              fail: function () {
                uni.hideLoading();
                uni.showToast({
                  title: "保存失败，请稍后重试",
                  icon: "none"
                });
              }
            });
          }
        }
      })
    },
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    }
  }
}
</script>
<style>
 page{
   height:100%;
 }
</style>
<style scoped lang="scss">
.creditCardDetail{
  height: 100%;
  .topBack{
    width:100%;
    // height: 824rpx;
    position: absolute;
    left: 0;
    top:0;
    bottom: 50%;
    z-index: -1;
  }
  .statusBar{
    height: var(--status-bar-height);
    position: relative;
    z-index: 6;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .infoNav{
    position: fixed;
    top: var(--status-bar-height);
    left: 0;
    width: 100%;
    height: 70rpx;
    line-height: 70rpx;
    transition: 0s;
    z-index: 6;
    display: flex;
  }
  .infoNavBtm{
    position: absolute;
    left:0;
    top: 0;
    width: 100%;
    z-index: 1;
    font-size: 34rpx;
    color: #fff;
    // text-align: center;
    display: flex;
    align-items: center;
    .title{
      margin: 0 auto;
    }
  }
  .main{
    // height: 880rpx;
    height:100%;
    // margin: 30rpx auto;
    // padding:30rpx 25rpx;
    //background: url("../../static/cardImages/xbg.png") no-repeat center center;
    // background-size: 100% 100%;
    .main-top{
      height: 280rpx;
      padding-top: 40rpx;
      text-align: center;
      .title{
        margin-top: 10rpx;
        color: #222;
        font-size: 36rpx;
      }

    }
    .main-bottom{
      height: 600rpx;
      padding: 40rpx 200rpx;
      text-align: center;
      .date{
        text-align: right;
      }
      .des{
        font-size: 24rpx;
        line-height: 44rpx;
        margin-top: 40rpx;
      }
      .pic{
        width: 530rpx;
        height: 238rpx;
        border-radius: 16rpx;
        background-color: #113090;
      }
    }
  }
  .companyInfo{
    padding: 0 40rpx;
    margin: 20rpx 0 70rpx;
    display: flex;
    align-items: center;
  }
}


</style>
