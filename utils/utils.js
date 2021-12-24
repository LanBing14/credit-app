import {getIsLogin} from "../api/login";

/**
 * 判断用户 是否登录
 * @returns {Promise<unknown>}
 */
export async function getIsLoginInfo () {
    return new Promise((resolve, reject) => {
        getIsLogin().then(data => {
            if (data.stateCode === '20111') {
                if (data.data.userType !== 'enterprise' && data.data.userType !== 'person') {
                    // 游客登录
                    resolve(0);
                } else {
                    resolve(1);
                }
            } else {
                // 未登录 获取游客token
                resolve(0);
            }
        })
    });
}

// 时间戳格式化
export function dateFormat(timeStamp, fmt = "yyyy-MM-dd hh:mm:ss") {
    // 转换日期是，对于空的或为null的直接返回空
    if (!timeStamp || timeStamp === "NULL" || timeStamp === "null") {
        return null;
    }
	// 如果时间戳是string类型，需要用parseInt转换一下
	if (parseInt(timeStamp).toString() != "NaN") { 
　　　　timeStamp = parseInt(timeStamp);
　　}
    const date = new Date(parseInt(timeStamp));
    const o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
}

/**
 * 判断字符串是否为空
 * @param str
 * @returns {boolean}
 */
export function strIsNull(str) {
    return null === str || undefined === str || '' === str || "undefined" === str;
}

/**
 * 过滤set-cookie，获取面的token
 * @param token
 * @returns {string}
 */
export function filterCookieToken(tokenStr) {
    let tokenInfo = {};
    if (strIsNull(tokenStr)) {
        return ''
    }
    let listValue = tokenStr.split('=');
    if (strIsNull(listValue)) {
        return ''
    }
    let len = listValue.length;
    for (let i = 0; i < len; i++) {
        // 获取登录用户token
        if (listValue[i].indexOf('auth-token') != -1) {
            let value = listValue[i + 1].split(';');
            // 设置token
            tokenInfo.authToken = value[0]
        }
        // 获取游客登录token
        if (listValue[i].indexOf('auth-tourist') != -1) {
            let value = listValue[i + 1].split(';');
            // 设置游客token
            tokenInfo.touristToken = value[0]
        }
    }
    return tokenInfo
}

/**
 * 判断数组是否为空
 * @param arr
 * @returns {boolean}
 */
export function arrIsNull(arr) {
    return null === arr || undefined === arr || [] === arr || arr.length === 0;
}

export function showScore(count) {
    if (strIsNull(count) || 0 == count) {
        return;
    }
    uni.showToast({
        title: '获得积分+' + count,
        duration: 2000,
        image: '/static/img/fa.png'
    });
}

export function getUuid() {
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('')
}

/**
 * 获取url地址中的参数
 * @param url
 * @param key
 * @returns {string | null}
 */
export function getUrlKey(url, key) {
    return (
        decodeURIComponent(
            (new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(
                url
            ) || [, ''])[1].replace(/\+/g, '%20')
        ) || null
    );
}

/**
 * html内容转换成text
 * 去掉html字符串中的所有标签元素
 * @param {Object} val
 */
export function html2Text(val) {
    if (strIsNull(val)) {
        return '';
    }
    return val.replace(/<[^>]+>/g, "");

}
