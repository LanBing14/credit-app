<template>
  <view>
    <view class="promise">
      <image :src="allUrl + imgPath" mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
import {createCertificate} from "../../api/creditLive"

export default {
  data() {
    return {
      allUrl: '',
      uid: '',
      imgPath: '',
      backNum: {},
      isShare: Boolean
    }
  },
  onLoad(options) {
    this.uidOrMcnId = options.uidOrMcnId;
    this.allUrl = this.$url;
    uni.showLoading({
      title: '加载中...'
    });
    this.isShare = options.share;
  },
  mounted() {
    this.getCreateCertificate();
    if (this.isShare) {
      this.backNum = {
        num: 2,
        type: 'myHome'
      }
    }

    uni.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  methods: {
    getCreateCertificate() {
      createCertificate({
        userId: uni.getStorageSync('userId'),
        accountIdOrMcnID: this.uidOrMcnId
      }).then(res => {
        if (res.stateCode == '1') {
          this.imgPath = res.data;
          uni.hideLoading();
        }
      })
    }
  }
}
</script>

<style>
.promise{
  padding:40rpx
}
.promise image{
  width: 100%;
}
</style>
