import request from '@/utils/request.js';
// 品牌推广api
// 获取品牌企业列表
export function getCompanyPage(data) {
    return request("web/app/xhsRest/brandPromotion/getCompanyPage", {
        method: "get",
        data: data
    });
}

// 获取企业的品牌
export function getBrandPage(data) {
    return request("web/app/xhsRest/brandPromotion/getBrandPage", {
        method: "get",
        data: data
    });
}
