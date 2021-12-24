import request from '../utils/request.js';

// 信锐优品详情
export function getViewSharpSuperior(data) {
    return request("/enterprise/detail/SharpSuperior/viewSharpSuperior", {
        method: "get",
        data: data
    });
}

export function getSharpListForIndex(data) {
    return request("/enterprise/detail/SharpSuperior/getSharpListForIndex", {
        method: "post",
        data: data
    });
}

// 信锐资讯详情
export function getCmsDetailsById(data) {
    return request("/user/center/xhsRest/getCmsDetailsById", {
        method: "get",
        data: data
    });
}

// 信锐机构列表
export function getMcnInfoList(data) {
    return request("/credit/live/xhsRest/McnBasicInfo/getMcnInfoList", {
        method: "post",
        data: data
    });
}

// 信锐机构详情
export function getMcnInfoByMcnId(data) {
    return request("/credit/live/xhsRest/McnBasicInfo/getMcnInfoByMcnId", {
        method: "get",
        params: data
    });
}

// 信锐机构-关联主播列表
export function getMcnKolDataList(data) {
    return request("/credit/live/xhsRest/McnBasicInfo/getMcnKolDataList", {
        method: "post",
        params: data
    });
}

// 信锐直播列表
export function getSharpLetterLiveList(data) {
    return request("/credit/live/xhsRest/sharpLetterLive/getSharpLetterLiveList", {
        method: "post",
        data: data
    });
}

//信锐直播详情
export function getSharpLetterLiveById(data) {
    return request("/credit/live/xhsRest/sharpLetterLive/getSharpLetterLiveById", {
        method: "get",
        data: data
    });
}

// 绑定手机号
export function registerUCUser(data) {
    return request("/auth/registerUCUser", {
        method: "post",
        data: data
    });
}

// 获取短信验证码
export function getSmsCode(mobile, msg) {
    return request("/user/center/xhsRest/getSmsCode", {
        method: "get",
        data: {mobile: mobile, msg: msg}
    });
}

// 校验短信验证码是否正确
export function validateSmsCode(data) {
    return request("/user/center/xhsRest/validateSmsCode", {
        method: "get",
        data: data
    });
}

// 信锐优品发布
export function saveBusiness(data) {
    return request("/enterprise/detail/xhsRest/Business/saveBusiness", {
        method: "post",
        data: data
    });
}

// 信锐直播详情
export function getGoodsByRoomId(data) {
    return request('/credit/live/xhsRest/sharpLetterLive/getGoodsByRoomId', {
        method: "post",
        data: data
    });
}

// 信锐直播间列表
export function getKsAccountList(data) {
    return request("/credit/live/xhsRest/KsAccountData/getKsAccountList", {
        method: "post",
        data: data
    });
}

// 信锐直播间详情
export function getKsAccountById(data) {
    return request("/credit/live/xhsRest/KsAccountData/getKsAccountById", {
        method: "get",
        data: data
    });
}

// 信锐直播间-直播记录
export function getLivesByAccountData(data) {
    return request("/credit/live/xhsRest/KsAccountData/getLivesByAccountData", {
        method: "post",
        data: data
    });
}

// 信锐直播间-带货列表
export function getGoodsByAccountDataUid(data) {
    return request("/credit/live/xhsRest/KsAccountData/getGoodsByAccountDataUid", {
        method: "post",
        data: data
    });
}

// 关注列表
export function getAttentionList(data) {
    return request("/city/credit/xhsRest/liveWeb/getAttentionList", {
        method: "get",
        data: data
    });
}

// 城市二级联动--省
export function getProvinces() {
    return request("/user/center/xhsRest/common/getProvinces", {
        method: "get",
        data: data
    });
}

// 城市二级联动--市
export function getCitys(data) {
    return request("/user/center/xhsRest/common/getCitys", {
        method: "get",
        data: data
    });
}

// 城市二级联动--市
export function getEnterpriseInfo(data) {
    return request("/user/center/xhsRest/getEnterpriseInfo", {
        method: "post",
        data: data
    });
}

// 我的认证-列表
export function getLiveCertificationList(data) {
    return request("/city/credit/xhsRest/liveCertification/getLiveCertificationList", {
        method: "post",
        data: data
    });
}

// 信锐直播间-认证保存接口
export function saveLiveCertification(data) {
    return request("/city/credit/xhsRest/liveCertification/saveLiveCertification", {
        method: "post",
        data: data
    });
}

// 是否认证接口
export function isCertification(data) {
    return request("/city/credit/xhsRest/liveCertification/isCertification", {
        method: "get",
        data: data
    });
}

// 认证信息详情
export function getLiveCertificationById(data) {
    return request("/city/credit/xhsRest/liveCertification/getLiveCertificationById", {
        method: "get",
        data: data
    });
}

//信锐机构关联公司信息
export function getMcnCompanyByMcnId(data) {
    return request("/credit/live/xhsRest/McnBasicInfo/getMcnCompanyByMcnId", {
        method: "get",
        data: data
    });
}

// 信锐机构-信锐评价-计算并查询指定企业的信用分
export function getCalcScore(data) {
    return request("/enterprise/detail/credit/score/calcScore", {
        method: "get",
        data: data
    });
}

// 信锐机构-信锐评价-获取企业风险状况
export function getEnterPortraitIndex(data) {
    return request("/enterprise/detail/xhsRest/enterPortrait/enterPortraitIndex", {
        method: "get",
        data: data
    });
}

// 信锐机构-信锐评价-获取当前企业在行业和区域中的百分比
export function getPercent(data) {
    return request("/enterprise/detail/xhsRest/enterPortrait/getPercent", {
        method: "get",
        data: data
    });
}

// 信锐机构-信锐评价-获取分数雷达图数据
export function getLeiDaDatas(data) {
    return request("/enterprise/detail/xhsRest/enterPortrait/getLeiDaDatas", {
        method: "get",
        data: data
    });
}

// 信锐直播间-我要评论
export function postComment(data) {
    return request("/user/center/xhsRest/live/comment", {
        method: "post",
        data: data
    });
}

// 信锐直播间-获取投诉类别
export function getDicts(data) {
    return request("/user/center/xhsRest/common/getDicts", {
        method: "get",
        data: data
    });
}

// 信锐直播间-我要投诉
export function saveAppletComplaint(data) {
    return request("/user/center/xhsRest/live/saveAppletComplaint", {
        method: "post",
        data: data
    });
}

// 信锐直播间-我的投诉列表
export function getComplaintListByUserId(data) {
    return request("/user/center/xhsRest/live/getComplaintListByUserId", {
        method: "get",
        data: data
    });
}

// 信锐直播间-投诉列表详情
export function getComplaintListById(data) {
    return request("/user/center/xhsRest/live/getComplaintListById", {
        method: "get",
        data: data
    });
}

// 信锐直播间-投诉信息列表
export function getComplaintList(data) {
    return request("/user/center/xhsRest/live/getComplaintList", {
        method: "get",
        data: data
    });
}

//信锐直播间-作品列表
export function getAwemeByAccountDataUid(data) {
    return request("/credit/live/xhsRest/KsAccountData/getAwemeByAccountDataUid", {
        method: "post",
        data: data
    });
}

//信锐直播间-作品列表详情
export function getKsAwemeById(data) {
    return request("/credit/live/xhsRest/KsAccountData/getKsAwemeById", {
        method: "get",
        data: data
    });
}

// 信锐直播间-通过uid查详情
export function getKsAccountByUId(data) {
    return request("/credit/live/xhsRest/KsAccountData/getKsAccountByUId", {
        method: "get",
        data: data
    });
}

// 获取个人信息
export function getPerUser(data) {
    return request("/user/center/xhsRest/getPerUser", {
        method: "get",
        data: data
    });
}

// 是否有认证主播 是否有认证机构
export function isCertificationByMember(data) {
    return request("/city/credit/xhsRest/liveCertification/isCertificationByMember", {
        method: "get",
        data: data
    });
}

// 信用承诺书
export function createCertificate(data) {
    return request("/web/app/xhsRest/build/createCertificate", {
        method: "get",
        data: data
    });
}

// 抖音-信锐直播间列表
export function getDyAccountList(data) {
    return request("/credit/live/xhsRest/DyAccountData/getDyAccountList", {
        method: "post",
        data: data
    });
}

// 抖音-根据uid获取信锐直播间详情
export function getDyAccountByUId(data) {
    return request("/credit/live/xhsRest/DyAccountData/getDyAccountByUId", {
        method: "get",
        data: data
    });
}

export function getSharpListByUidData(data) {
    return request("/enterprise/detail/SharpSuperior/getSharpListByUid", {
        method: "post",
        data: data
    });
}

export function getLiveRecordPageByUid(data) {
    return request("/enterprise/detail/sharpLive/getLiveRecordPageByUid", {
        method: "post",
        data: data
    });
}

export function getLiveRecordPage(data) {
    return request("/enterprise/detail/sharpLive/getLiveRecordPage", {
        method: "post",
        data: data
    });
}

// 抖音-根据uid查询信锐直播间-作品列表
export function getDyAwemeByAccountDataUid(data){
    return request("/credit/live/xhsRest/DyAccountData/getAwemeByAccountDataUid", {
        method: "post",
        data: data
    });
}

// 抖音-根据uid查询信锐直播间-作品列表详情
export function getDyAwemeById(data) {
    return request("/credit/live/xhsRest/DyAccountData/getDyAwemeById", {
        method: "get",
        data: data
    });
}

// 抖音-根据uid查询信锐直播间-直播记录列表
export function getDyLivesByAccountData(data) {
    return request("/credit/live/xhsRest/DyAccountData/getLivesByAccountData", {
        method: "post",
        data: data
    });
}

// 抖音-根据uid查询信锐直播间-直播记录详情  and  信锐直播详情
export function getDySharpLetterLiveById(data) {
    return request("/credit/live/xhsRest/sharpLetterLive/getDySharpLetterLiveById", {
        method: "get",
        data: data
    });
}

export function viewLiveRecord(data) {
    return request("/enterprise/detail/SharpSuperior/viewLiveRecord", {
        method: "get",
        data: data
    });
}

export function getDyGoodsByRoomId(data) {
    return request("/credit/live/xhsRest/sharpLetterLive/getDyGoodsByRoomId", {
        method: "post",
        data: data
    });
}

export function companySearchByPageData(data) {
    return request("/enterprise/detail/xhsRest/search/companySearchByPage", {
        method: "post",
        data: data
    }, true);
}

// 根据直播记录id查询优品列表
export function getSharpListByLiveId(data) {
    return request("/enterprise/detail/SharpSuperior/getSharpListByLiveId", {
        method: "post",
        data: data
    });
}

//抖音-根据uid查询信锐直播间-带货列表信息
export function getDyGoodsByAccountDataUid(data) {
    return request("/credit/live/xhsRest/DyAccountData/getGoodsByAccountDataUid", {
        method: "post",
        data: data
    });
}

// 抖音-根据uid查询信锐直播间-带货列表信息
export function getDyGoodsByUid(data) {
    return request("/credit/live/xhsRest/sharpLetterLive/getDyGoodsByUid", {
        method: "post",
        data: data
    });
}

//抖音-信锐机构列表
export function getDyMcnInfoList(data) {
    return request("/credit/live/xhsRest/DyMcnBasicInfo/getDyMcnInfoList", {
        method: "post",
        data: data
    });
}

// 抖音-根据mcnId获取mcn机构详情
export function getDyMcnInfoByMcnId(data) {
    return request("/credit/live/xhsRest/DyMcnBasicInfo/getMcnInfoByMcnId", {
        method: "get",
        data: data
    });
}

// 抖音-mcn机构关联主播列表
export function getDyMcnKolDataList(data) {
    return request("/credit/live/xhsRest/DyMcnBasicInfo/getMcnKolDataList", {
        method: "post",
        data: data
    });
}

// 抖音-信锐直播列表
export function getDySharpLetterLiveList(data) {
    return request("/credit/live/xhsRest/sharpLetterLive/getDySharpLetterLiveList", {
        method: "post",
        data: data
    });
}

// 直播收录-保存接口
export function saveLiveRecord(data) {
    return request("/city/credit/xhsRest/liveRecord/saveLiveRecord", {
        method: "post",
        data: data
    });
}

// 直播监测-添加监测
export function saveLiveMonitor(data) {
    return request("/city/credit/xhsRest/liveMonitor/saveLiveMonitor", {
        method: "post",
        data: data
    });
}

// 直播监测-添加监测
export function isLiveMonitor(data) {
    return request("/city/credit/xhsRest/liveMonitor/isLiveMonitor", {
        method: "get",
        data: data
    });
}

// 直播监测-监测列表
export function getLiveMonitorList(data) {
    return request("/city/credit/xhsRest/liveMonitor/getLiveMonitorList", {
        method: "post",
        data: data
    });
}

// 抖音平台收录情况
export function getDyMessage() {
    return request("/credit/live/xhsRest/sharpLetterLive/getDyMessage", {
        method: "post"
    });
}

// 快手平台收录情况
export function getKsMessage(data) {
    return request("/credit/live/xhsRest/sharpLetterLive/getKsMessage", {
        method: "post"
    });
}

// 手机直播—监测统计数据
export function getMonitorStatisticsByUserId(data) {
    return request("/credit/live/xhsRest/liveMonitor/getMonitorStatisticsByUserId", {
        method: "get",
        data: data
    });
}

