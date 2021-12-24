// 生产环境
let apiHost = 'https://test.credit100.com/xhsCreditApi/v1';
let fileHost = 'https://test.credit100.com';

// 开发环境
/*let apiHost = 'http://192.168.20.171:8002/xhsCreditApi/v1';
let fileHost = 'http://192.168.20.171/';*/

// 测试 环境
// let apiHost = 'http://192.168.20.171:8002/xhsCreditApi/v1';
// let fileHost = 'http://192.168.20.171:8002/';

// 正式环境
// let apiHost = 'https://m.credit100.com/xhsCreditApi/v1';
// let fileHost = 'https://m.credit100.com';

export default {
    // 全局接口
    host: apiHost,
    fileHost: fileHost,
    // 获取登录图形验证码地址
    imgValidateUrl: `${apiHost}/auth/captcha.jpg`
};
