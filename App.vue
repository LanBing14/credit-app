<script>
import {getIsLogin, getAuthTourist} from './api/login.js';

export default {
  onLaunch: function () {
    //#ifdef APP-PLUS
    plus.screen.lockOrientation("portrait-primary");
    //#endif
    // 判断用户是否登录
    getIsLogin().then(data => {
      let flag = false;
      if (data.stateCode === '20111') {
        if (data.data.userType !== 'enterprise' && data.data.userType !== 'person') {
          // 游客登录
          flag = true;
        }
      } else {
        // 未登录 获取游客token
        uni.clearStorageSync();
        flag = true;
      }
      if (flag) {
        getAuthTourist().then(data => {
          if (data.stateCode === '20112') {
            // 游客登录
            uni.setStorageSync('userType', '2');
            this.$isResolve();
          } else {
            this.$isResolve();
          }
        })
      } else {
        this.$isResolve();
      }
    });
    uni.addInterceptor('switchTab', {
      // tabbar页面跳转前进行拦截
      invoke (e) {
        console.info(e.url);
        if ("/pages/message/index" == e.url || "/pages/my/index" == e.url) {
          if (uni.getStorageSync('userType') == "person" || uni.getStorageSync('userType') == 'enterprise') {
            return true;
          } else {
            // 未登录 跳转登录
            uni.navigateTo({
              url: '/pages/login/index'
            })
            return false;
          }
        } else {
          return true
        }
      },
      success (e) {
      }
    });
    uni.onTabBarMidButtonTap(() => {
        uni.navigateTo({
            url: '/pages/enterpSettle/index'
        })
    })
  },
  onShow: function () {
  },
  onHide: function () {
  }
}
</script>

<style>
@import "./static/fonts/iconfont.css";
@import './static/common.css';
:root{
  --main-color: #113090;
}

*{
  box-sizing: border-box;
}
.clear:after{
  content: '';
  display: block;
  clear: both;
}
view{
  box-sizing: border-box;
}
button::after{
  content: none;
}
</style>
