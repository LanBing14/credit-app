import CryptoJS from '../static/js/crypto-js'

let key = CryptoJS.enc.Latin1.parse('x89j30k23k5s2lln');
let iv = CryptoJS.enc.Latin1.parse('x89j30k23k5s2lln');

// 解密
export function decrypt(param) {
    var decrypted = CryptoJS.AES.decrypt(param, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    decrypted = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted).toString());
    return decrypted;
}

// 加密
export function encryption(param) {
    param = CryptoJS.enc.Utf8.parse(param);
    var encrypted = CryptoJS.AES.encrypt(param, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    encrypted = encrypted.toString();
    return encrypted
}
