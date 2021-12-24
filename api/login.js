import request from '@/utils/request.js';

/**
 * 判断用户是否登录
 */
export function getIsLogin() {
    return request("auth/jwt/isLogin", {
        method: "get"
    });
}

/**
 * 获取游客token
 */
export function getAuthTourist(params) {
    return request("auth/jwt/generateTouristToken", {
        method: "get",
        data: params
    });
}

/**
 * 登录接口
 */
export function postLogin(username, code, password, isMessage = 0, captcha,verifyKey,h5From) {
    if(h5From || isMessage == 1){
        h5From = true;
    }
    return request("/auth/unifiedAuth/jwt/token", {
        method: "post",
        data: {
            userName: username,
            userType: 'person',
            password: password,
            isMessage: isMessage,
            verifyCode: code,
            verifyKey:verifyKey,
            isFromH5: h5From,
        }
    });
}
