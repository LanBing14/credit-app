import request from '@/utils/request.js';

// 获取首页信用动态
export function getIndexNewList(data) {
    return request("/enterprise/detail/xhsRest/search/getCrawlerDataList", {
        method: "post",
        data: data
    });
}

// 获取首页信用动态
export function getMyMessage(data) {
    return request("user/center/myMessage/findPMessage", {
        method: "post",
        data: {"pageNo":1,"pageSize":10}
    });
}
