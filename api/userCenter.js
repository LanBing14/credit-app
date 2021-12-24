import request from '@/utils/request.js'
import apiUrl from '@/api/apiUrl.js'

/**
 * 保存用户头像
 * @param headPath 头像地址
 * @returns {Promise<unknown>}
 * @constructor
 */
export function Api_EditHead(headPath) {
    return request(apiUrl.userCenter.userInfo.editHead, {
        method: "get",
        data: {'headPath': headPath}
    });
}

/**
 * 获取我的收藏分页列表
 * @param params
 * @constructor
 */
export function Api_GetMyCollectinsList(params) {
    return request('/cms/collection/page', {
        method: 'get',
        data: params
    })
}

/**
 * 查看推送状态
 * @param params
 * @constructor
 */
export function Api_GetPushStatus() {
    return request('/app/user/push', {
        method: 'get'
    })
}

/**
 * 推送开关
 * @param params
 * @constructor
 */
export function Api_SwitchPushStatus() {
    return request('/app/user/push', {
        method: 'post'
    })
}

/**
 * 加入/取消收藏
 * @param params
 * @constructor
 */
export function Api_AddCollection(id) {
    return request('/cms/collection/add?businessId=' + id, {
        method: 'post'
    })
}

/**
 * 获取我的关注
 * @param {Object} params
 */
export function Api_GetMyAttention(params) {
    return request('/cms/attention/page', {
        method: 'get',
        data: params
    })
}

// 保存第三方授权ID
export function Api_SaveOpenId(params) {
    return request("/app/user/save-openid", {
        method: "post",
        data: params
    });
}

// 关闭第三方授权ID
export function Api_CloseOpenId(params) {
    return request("/app/user/close-openid", {
        method: "post",
        data: params
    });
}

/**
 * 获取用户信息
 * @param {Object} params
 */
export function Api_GetInfo(params) {
    return request(apiUrl.userCenter.userInfo.getUserInfo, {
        method: "get",
        data: params
    });
}

/**
 * 更新用户名
 * @param username
 * @constructor
 */
export function Api_editUsername(username) {
    return request(apiUrl.userCenter.userInfo.editUsername, {
        method: "get",
        data: {username: username}
    });
}
