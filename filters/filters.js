//时间戳-年月日
export function toTimeYear(value) {
	let date = new Date(parseInt(value));
	//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let y = date.getFullYear();
	let MM = date.getMonth() + 1;
	MM = MM < 10 ? ('0' + MM) : MM;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + MM + '-' + d;
}

//时间戳-年月日 时分秒
export function toTimeHours(value) {
	let date = new Date(parseInt(value));
	//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let y = date.getFullYear();
	let MM = date.getMonth() + 1;
	MM = MM < 10 ? ('0' + MM) : MM;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let m = date.getMinutes();
	m = m < 10 ? ('0' + m) : m;
	let s = date.getSeconds();
	s = s < 10 ? ('0' + s) : s;
	return y + '-' + MM + '-' + d + ' ' + h + ':' + m+ ':' + s;
}

//时间戳-几天几小时几分钟几秒
export function toDayHours(value) {
	var use_days = parseInt((value) / 1000 / 60 / 60 / 24); //转换为天
	var use_hours = parseInt((value) / 1000 / 60 / 60 % 24); //转换为小时
	var user_min = parseInt((value) / 1000 / 60 % 60);//转换为分钟
	var user_second = parseInt((value) / 1000 % 60);//转换为秒
	return use_hours + '小时' + user_min + '分钟' + user_second + '秒';
	// return use_days + '天' + use_hours + '小时' + user_min + '分钟' + user_second + '秒';
}

//时间戳-几分几秒
export function toMinuteSecond(value) {
	var use_days = parseInt((value) / 1000 / 60 / 60 / 24); //转换为天
	var use_hours = parseInt((value) / 1000 / 60 / 60 % 24); //转换为小时
	var user_min = parseInt((value) / 1000 / 60 % 60);//转换为分钟
	var user_second = parseInt((value) / 1000 % 60);//转换为秒
	return user_min + '分' + user_second + '秒';
	// return use_days + '天' + use_hours + '小时' + user_min + '分钟' + user_second + '秒';
}

//数字格式化
export function numberFormat(value){
    let unit = '';
    var k = 10000,
      sizes = ['', 'w', '亿', '万亿'],
      i;
    if (value < k) {
      value = value;
    } else {
      i = Math.floor(Math.log(value) / Math.log(k));
      value = ((value / Math.pow(k, i))).toFixed(2);
      unit = sizes[i];
    }
    return value + unit;
}