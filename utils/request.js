import Config from '@/api/apiUrl.js';
import Request from './luch-request/request.js';
import * as Utils from './utils.js';
import {decrypt, encryption} from "./encryDecry";

const http = new Request();
http.setConfig((config) => {
    config.baseUrl = Config.host + "/";
    return config
});

/**
 *
 * @param url
 * @param option
 * @param isSecret 是否接口加密
 * @returns {Promise<unknown>}
 */
const request = function (url, option, isSecret = false) {
    const newOptions = {
        timeout: 60000,
        url,
        ...option
    };
    const method = newOptions.method.toLowerCase();
    if (method === 'post' || method === 'get' || method === 'put' || method === 'patch' || method === 'delete') {
        newOptions.method = method;
    }

    let authToken = uni.getStorageSync("authToken");
    // 获取游客token
    let authTourist = uni.getStorageSync('authTourist');
    let cookieStr = 'auth-token=' + authToken + '; auth-tourist=' + authTourist;
    console.info(cookieStr);
    // 设置请求头
    newOptions.header = {
        ...newOptions.header,
        "Cookie": cookieStr
    };

    if (isSecret) {
        // 设置加密数据
        option.data = encryption(option.data);
    }
    return new Promise((resolve, reject) => {
        return http.request(newOptions).then(i => {
            let token = Utils.filterCookieToken(i.header['Set-Cookie']);
            if (!Utils.strIsNull(token.authToken)) {
                uni.setStorageSync('authToken', token.authToken)
            }
            // 更新后台传的游客token
            if (!Utils.strIsNull(token.touristToken)) {
                uni.setStorageSync('authTourist', token.touristToken)
            }

            let data;
            if (isSecret) {
                // 设置解密
                data = decrypt(i.data);
            } else {
                data = i.data;
            }
            if ((data.code === 40101 || data.code === 40102) && i.config.url != "/auth/jwt/isLogin") {
                uni.showModal({
                    title: '提示',
                    content: '请重新登录',
                    showCancel: false,
                    success: function () {
                        uni.navigateTo({
                            url: '/pages/login/index'
                        })
                    }
                })
                return
            } else if (data.code === 40301) {
                if (uni.getStorageSync('userType') === '2') {
                    // 游客访问次数超过 登录
                    uni.showModal({
                        title: '提示',
                        content: '您的查询次数达到上限，登录后可获得更过查询次数',
                        showCancel: false,
                        success: function () {
                            uni.navigateTo({
                                url: '/pages/login/index'
                            })
                        }
                    })
                    return
                } else {
                    this.isLoading = false
                    // 企业或者个人用户需要重新登录
                    uni.showModal({
                        title: '提示',
                        content: '请重新登录',
                        showCancel: false,
                        success: function () {
                            // 清空本地数据
                            uni.navigateTo({
                                url: '/pages/login/index'
                            })
                        }
                    })
                    return
                }
            } else if (data.code === 40302) {
                this.isLoading = false
                // 您今天的查询次数已达上限，若需更多查询可联系客服咨询，客服电话：010-88052705。
                uni.showModal({
                    title: '提示',
                    content: '您今天的查询次数已达上限，若需更多查询可联系客服咨询，客服电话：010-88052705。',
                    showCancel: false,
                    success: function () {
                        uni.switchTab({
                            url: '/pages/index/index'
                        })
                    }
                })
                return
            } else if (data.code === 40303) {
                this.isLoading = false
                if (uni.getStorageSync('userType') === '2') {
                    // 登录这是游客 提示 您的查询次数达到上限，登录后可获得更过查询次数
                    uni.showModal({
                        title: '提示',
                        content: '您的查询次数达到上限，登录后可获得更过查询次数',
                        showCancel: false,
                        success: function () {
                            uni.navigateTo({
                                url: '/pages/login/index'
                            })
                        }
                    })
                    return
                } else {
                    // 登录用户是个人或者企业用户 提示 您今天的查询次数已达上限，若需更多查询可联系客服咨询，客服电话：010-88052705。
                    uni.showModal({
                        title: '提示',
                        content: '您今天的查询次数已达上限，若需更多查询可联系客服咨询，客服电话：010-88052705',
                        showCancel: false,
                        success: function () {
                            uni.switchTab({
                                url: '/pages/index/index'
                            })
                        }
                    })
                    return
                }
            } else if (data.code === 40304) {
                // todo 该ip超出访问次数限制，请输入验证码再访问
                // 隐藏加载提示
                return
            } else if (data.code === 40305) {
                // todo 该ip超出访问次数限制，请输入验证码再访问
                // 隐藏加载提示
                return
            } else if (data.code === 40307) {
                uni.showModal({
                    title: '提示',
                    content: '您的访问受到限制，登录后方可操作',
                    showCancel: false,
                    success: function () {
                        uni.navigateTo({
                            url: '/pages/login/index'
                        })
                    }
                })
                return
            }
            resolve(data);
        }).catch(e => {
            reject(e)
        });
    });
};

export default request
