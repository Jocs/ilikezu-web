export function fixed(price) {
	return price.toFixed(2)
}
/**
 * 手机号中间四位设置为*
 */
export function mobile(number) {
	return String(number).substr(0, 3) + '****' + String(number).substr(7, 4)
}
