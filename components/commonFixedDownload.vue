<template>
    <view class="download_png">
        <text>{{title}}</text>
        <button style="color:#113090;float:right;margin-top:24rpx" type="default" size="mini" @click="download">{{btnTitle}}</button>
    </view>
</template>
<script>
export default{
   props: {
      title: {
          type: String,
          default: () =>"下载图片分享社交平台"
      },
      btnTitle: {
          type: String,
          default: () =>"图片下载"
      }
   },
   methods:{
       download() {
          this.$emit("eventClick")
       }
   }
}
</script>

<style scoped lang="scss">
    .download_png{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 108rpx;
        line-height: 108rpx;
        color: #fff;
        font-size: 26rpx;
        background-color: #4159a6;
        box-shadow: 5px 9px 12px 0px rgba(181, 181, 181, 0.1);
        padding: 0 40rpx 0 50rpx;
    }
</style>
