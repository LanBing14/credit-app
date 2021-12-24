import request from '@/utils/request.js'

/**
 * 公共接口
 */

/**
 * 判断企业是否入驻
 * @param companyId
 */
export function isHasCertific(companyId) {
    return request('/user/center/xhsRest/certifi/isHasCertific',{
        method:'get',
        data:{
            companyId: companyId
        }
    });
}

// 发送手机短信，加图形验证码校验
export function indexNewList(params) {
    return request('/enterprise/detail/xhsRest/search/getCrawlerDataList`,', {
        method: 'get',
        params: params
    })
}

// 上传图片
export function Api_UpImg(params) {
    return request('/fs/attachments/image/1', {
        method: 'post',
		// uni中不支持form格式
		header: {
			'Content-Type':'multipart/form-data'
		},
        params: params
    })
}


/**
 * 填写邀请码
 * @param {Object} params
 */
export function Api_SaveInvitationCode(params) {
    return request('/app/user/write-invitation-code', {
        method: 'get',
        params: params
    })
}

// 获取当前用户关注状态
export function Api_GetAttentionStatus(params) {
    return request('/cms/attention/'+ params.id, {
        method: 'get'
    })
}

/*
* 点赞
* @param {Object} params
*/
export function Api_LikeCount(params) {
    return request('/app/like/count', {
        method: 'get',
        params: params
    })
}

/**
 * 查询新闻cms数据列表
 * @param url 栏目
 * @constructor
 */
export function Api_getNewsList(url) {
    return request('/user/center/xhsRest/getNewsList?url=' + url, {
        method: 'get'
    })
}
