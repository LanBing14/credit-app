<template>
  <view class="login">
    <image class="loginBackTop" src="../../static/img/png_08.png"></image>
    <image class="loginBackBtm" src="../../static/img/png_09.png"></image>
    <!--状态栏位置和顶部自定义导航-->
    <view class="statusBar" :style="{background:`rgba(255,255,255,${colorVal})`}"></view>
    <view class="infoNav" :style="{background:`rgba(255,255,255,${colorVal})`}">
      <view class="infoNavFl" @click="back()">
        <image src="../../static/icon/83.png"></image>
      </view>
      <view class="infoNavBtm" v-if="colorVal > 0.6">我的</view>
    </view>
    <!--状态栏占位和顶部自定义菜单占位-->
    <view style="height: 70rpx"></view>
    <view style="height: var(--status-bar-height)"></view>
    <!--主体内容-->
    <view class="loginMain">
      <view class="loginLogo">
        <image src="../../static/img/png_10.png"></image>
      </view>
      <view class="loginNav">
        <view class="li" :class="{active:active == 1}" @click="active = 1">密码登录</view>
        <view class="li" :class="{active:active == 2}" @click="active = 2">短信登录</view>
      </view>
      <view class="loginBox" v-if="active == 1">
        <uni-forms ref="passWordForm" :rules="passWordRules" :modelValue="passWordFormData">
          <uni-forms-item name="userName">
            <uni-easyinput v-model="passWordFormData.userName" placeholder="请输入用户名"/>
            <image class="inputIcon" src="../../static/icon/84.png"></image>
          </uni-forms-item>
          <uni-forms-item name="passWord">
            <uni-easyinput type="password" v-model="passWordFormData.passWord" placeholder="请输入密码"/>
            <image class="inputIcon" src="../../static/icon/85.png"></image>
          </uni-forms-item>
          <uni-forms-item name="code">
            <uni-easyinput v-model="passWordFormData.captcha" placeholder="请输入验证码"/>
            <image class="inputIcon" src="../../static/icon/86.png"></image>
            <image class="codeImg" @click="createImgCode()"
                   :src="'data:image/jpg;base64,' + imgValidateCodeUrl.verifyImage"
                   mode="heightFix"></image>

          </uni-forms-item>
        </uni-forms>
      </view>
      <view class="loginBox" v-if="active == 2">
        短信登录
      </view>
      <view class="loginReg">
        <view class="loginRegMain clear">
          <view class="li">新用户注册</view>
          <view class="li">忘记密码</view>
          <view class="li">帮助中心</view>
        </view>
      </view>
      <view class="submit" @click="submit('passWordForm')">
        提交
      </view>
      <view class="third">
        <view class="thirdTitle">
          <view class="thirdText">
            <image class="thirdImgFl" src="../../static/icon/87.png"></image>
            <image class="thirdImgFr" src="../../static/icon/87.png"></image>
            第三方登录
          </view>
        </view>
        <view class="thirdMain">
          <image src="../../static/icon/88.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mobile, telephone} from "../../validators/validate";
import {postLogin} from "../../api/login";
import ApiUrl from "../../api/apiUrl";
import * as Utils from "../../utils/utils";
import {userInfo} from "../../entity/userInfo";
import request from "../../utils/request";

export default {
  data() {
    return {
      colorVal: 0,
      active: 1,
      // 自定义表单校验规则
      passWordRules: {
        userName: {
          rules: [{
            required: true,
            errorMessage: '用户名不能为空'
          }]
        },
        passWord: {
          rules: [{
            required: true,
            errorMessage: '密码不能为空'
          }]
        },
        code: {
          rules: [{
            required: true,
            errorMessage: '密码不能为空'
          }]
        }
      },
      // 自定义表单数据
      passWordFormData: {},
      jsessionid: '',
      // 图形验证码地址
      imgValidateCodeUrl: '',
    }
  },
  onLoad() {
  },
  onShow() {
    this.createImgCode();
  },
  methods: {
    login(username, code, password, isMessage, captcha, verifyKey) {
      let that = this;
      postLogin(username, code, password, isMessage, captcha, verifyKey).then(data => {
        // 登录成功
        console.log(data);
        if (data.stateCode === '20101') {
          // 保存token
          uni.setStorageSync('userType', data.data.userType);
          uni.setStorageSync('authToken', data.data.token);
          let user = new userInfo();
          // 设置user属性
          user = Object.assign(user, data.data);
          console.info(user);
          uni.setStorageSync('userInfo', user);
          uni.setStorageSync('userId', user.userId);
          // 跳转首页
          uni.switchTab({
            url: '/pages/my/index'
          });
        } else if (data.stateCode === '20102') {
          that.createImgCode();
          uni.showToast({
            title: `用户名不能为空！`,
            icon: 'none'
          });
        } else if (data.stateCode === '20103') {
          that.createImgCode();
          uni.showToast({
            title: `密码不能为空！`,
            icon: 'none'
          });
        } else if (data.stateCode === '20106') {
          that.createImgCode();
          uni.showToast({
            title: `用户名或密码错误，请重新输入！`,
            icon: 'none'
          });
        } else if (data.stateCode === '20105') {
          that.createImgCode();
          uni.showToast({
            title: `该用户不存在，请检查用户名/邮箱/手机号码是否正确！`,
            icon: 'none'
          });
        } else if (data.stateCode === '20115') {
          that.createImgCode();
          uni.showToast({
            title: `图形验证码错误，请重新输入！`,
            icon: 'none'
          });
        } else if (data.stateCode === '20114') {
          that.createImgCode();
          uni.showToast({
            title: `您已输错5次，账号已被临时冻结10分钟！`,
            icon: 'none'
          });
        } else if (data.stateCode === '20113') {
          that.createImgCode();
          uni.showToast({
            title: `您的登录账号目前已被禁用，请联系客服咨询详细情况！`,
            icon: 'none'
          });
        } else if (data.stateCode === '20107') {
          uni.showToast({
            title: `短信验证码错误，请重新输入！`,
            icon: 'none'
          });
        } else if (data.stateCode === '20108') {
          uni.showToast({
            title: `token为空！`,
            icon: 'none'
          });
        } else if(data.stateCode === '00003'){
          uni.showToast({
            title: `短信验证码超时，请重新获取！`,
            icon: 'none'
          });
        } else {
          that.createImgCode();
          uni.showToast({
            title: `系统错误，请稍后再试！`,
            icon: 'none'
          });
        }
      });
    },
    /**
     * 创建图形验证码地址
     */
    createImgCode() {
      /*if (Utils.strIsNull(this.jsessionid)) {
        this.jsessionid = Utils.getUuid();
      }
      this.imgValidateCodeUrl = ApiUrl.imgValidateUrl + '?JessionID=' + this.jsessionid + '&' + Math.random()*/
      request('/auth/unifiedAuth/getCaptchaNumber',{
        method:'get'
      }).then(result => {
        console.log(result);
        if(result.stateCode == '1'){
          this.imgValidateCodeUrl = result.data;
        } else if(result.code == '40500'){
          this.createImgCode();
        }
      })
    },
    back() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    },
    submit(ref) {
      console.log(ref);
      let that = this;
      this.$refs[ref].validate().then(res => {
        console.log('success', res);
        that.login(res.userName, res.code, res.passWord, 0, res.captcha, this.imgValidateCodeUrl.verifyKey);
      }).catch(err => {
        console.log('err', err);
      })
    },
  },
  onPageScroll(e) {
    //滑动滚动条添加自定义导航背景色
    this.colorVal = (e.scrollTop * (100 / 70) / 100)
  },
}
</script>

<style>
.loginBackTop{
  width: 750rpx;
  height: 311rpx;
  position: fixed;
  top: 0;
  left: 0;
}
.loginBackBtm{
  width: 750rpx;
  height: 133rpx;
  position: fixed;
  bottom: 0;
  left: 0;
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
}
.infoNavBtm{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  font-size: 34rpx;
  color: #000;
  text-align: center;
}
.infoNavFl{
  width: 70rpx;
  height: 70rpx;
  position: absolute;
  left: 15rpx;
  top: 0;
  z-index: 5;
}
.infoNavFl image{
  width: 18rpx;
  height: 33rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;
}
.loginMain{
  padding:0 70rpx;
  position: relative;
  z-index: 1;
}
.loginLogo{
  text-align: center;
  margin-top: 40rpx;
}
.loginLogo image{
  width: 130rpx;
  height: 130rpx;
  box-shadow: 0 0 13rpx rgba(17,48,144,0.35);
  border-radius: 20rpx;
}
.loginNav{
  margin-top: 50rpx;
  text-align: center;
}
.loginNav .li{
  display: inline-block;
  margin: 0 28rpx;
  position: relative;
  font-size: 28rpx;
  color: #606266;
}
.loginNav .li.active{
  font-size: 32rpx;
  color: #222;
}
.loginNav .li.active:after{
  content: '';
  display: block;
  width: 44rpx;
  height: 6rpx;
  border-radius: 6rpx;
  background: #113090;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -15rpx;
}
.loginBox{
  margin-top: 58rpx;
}
/deep/.loginBox .uni-easyinput{
  background: #f5f5f5;
  border-radius: 86rpx;
}
/deep/.loginBox .uni-easyinput__content{
  min-height: 86rpx;
}
/deep/.loginBox .uni-forms-item__content{
  position: relative;
}
/deep/.loginBox .is-input-border{
  border:none;
}
/deep/.loginBox .uni-easyinput__content-input{
  padding-left: 110rpx !important;
  font-size: 26rpx !important;
}
/deep/.loginBox .uni-easyinput__placeholder-class{
  font-size: 26rpx;
  color: #a9a9a9;
}
/deep/.loginBox .uni-forms-item__inner{
  padding-bottom: 32rpx;
}
.inputIcon{
  width: 36rpx;
  height: 36rpx;
  position: absolute;
  top: 50%;
  left: 34rpx;
  transform: translateY(-50%);
}
.codeImg{
  position: absolute;
  height: 56rpx;
  right: 25rpx;
  top: 50%;
  transform: translateY(-50%);
}
.loginReg{
  text-align: right;
}
.loginRegMain{
  display: inline-block;
}
.loginRegMain .li{
  float: left;
  height: 25rpx;
  line-height: 25rpx;
  border-right: 1rpx solid #88898c;
  font-size: 22rpx;
  color: #606266;
  padding: 0 18rpx;
}
.loginRegMain .li:last-child{
  border-right: none;
}
.submit{
  height: 88rpx;
  border-radius: 88rpx;
  background: #113090;
  color: #fff;
  text-align: center;
  line-height: 88rpx;
  font-size: 32rpx;
  margin-top: 33rpx;
}
.third{
  margin-top: 65rpx;
}
.thirdTitle{
  position: relative;
  text-align: center;
}
.thirdTitle:after{
  content: '';
  display: block;
  width: 100%;
  height: 1rpx;
  background: #aeaeae;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.third .thirdText{
  display: inline-block;
  padding:0 84rpx;
  background: #fff;
  position: relative;
  height: 26rpx;
  line-height: 26rpx;
  font-size: 26rpx;
  color: #606266;
  z-index: 1;
}
.thirdImgFl{
  width: 44rpx;
  height: 20rpx;
  position: absolute;
  left: 14rpx;
  top: 0;
}
.thirdImgFr{
  width: 44rpx;
  height: 20rpx;
  position: absolute;
  right: 14rpx;
  top: 0;
  transform: rotate(180deg);
}
.thirdMain{
  text-align: center;
  margin-top: 32rpx;
}
.thirdMain image{
  width: 60rpx;
  height: 60rpx;
}
</style>

