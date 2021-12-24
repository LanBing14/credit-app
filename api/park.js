/**
 * 信用选取api
 */
import request from '@/utils/request.js';

// 获取信用园区列表
export function getParkPage(data) {
    return request("web/app/xhsRest/park/getParkPage", {
        method: "get",
        data: data
    });
}

// 获取信用园区信用监测
export function getCreditMonitor(data) {
    return request("web/app/xhsRest/park/getCreditMonitor", {
        method: "get",
        data: data
    });
}

// 获取企业
export function getCompanyPage(data) {
    return request("web/app/xhsRest/park/getCompanyPage", {
        method: "get",
        data: data
    });
}

// 查询 信用园区详情
export function Api_getParkDetail(id) {
    return request("web/app/xhsRest/park/getParkDetail", {
        method: "get",
        data: {id: id}
    });
}

// 分页查询 项目动态列表
export function Api_getProjectDynamicsByPage(params) {
    return request("web/app/xhsRest/park/getProjectDynamicsByPage", {
        method: "get",
        data: params
    });
}

// 查询 项目动态详情
export function Api_getProjectDynamicsDetail(id) {
    return request("web/app/xhsRest/park/getProjectDynamicsDetail", {
        method: "get",
        data: {id: id}
    });
}

// 信用园区申请
export function Api_saveParkApply(params) {
    return request("web/app/xhsRest/park/saveParkApply", {
        method: "post",
        data: params
    });
}
