import request from '@/utils/request.js';
// 信用调研api

// 分页查询 调研报告列表
export function Api_getResearchReportByPage(params) {
    return request("web/app/xhsRest/research/getResearchReportByPage", {
        method: "get",
        data: params
    });
}

// 查询 调研报告详情
export function Api_getResearchReportById(id) {
    return request("web/app/xhsRest/research/getResearchReportById", {
        method: "get",
        data: {id: id}
    });
}

// 调研报告申请
export function Api_saveResearchReportApply(params) {
    return request("web/app/xhsRest/research/saveResearchReportApply", {
        method: "post",
        data: params
    });
}

// 信用调研申请
export function Api_saveResearchApply(params) {
    return request("web/app/xhsRest/research/saveResearchApply", {
        method: "post",
        data: params
    });
}
