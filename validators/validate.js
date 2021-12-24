// 手机号验证
export function mobile(value) {
    const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    const valid = reg.test(value);
    return valid;
}

//座机电话号码校验
export function telephone(value) {
    const reg = /^(0[0-9]{2})-\d{8}$|^(0[0-9]{3})-\d{7,8}$|(1[345789]\d{9})$/;
    const valid = reg.test(value);
    return valid;
}


//数字验证
export function number(value) {
    const reg = /^[0-9]*$/;
    const valid = reg.test(value);
    return valid;
}
