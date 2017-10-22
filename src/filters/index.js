export function fixed(price) {
	const numPrice = +price
	if (typeof numPrice === 'number' && numPrice >= 0) {
		return numPrice.toFixed(2)
	} else {
		return price
	}
}
/**
 * 手机号中间四位设置为*
 */
export function mobile(number) {
	return String(number).substr(0, 3) + '****' + String(number).substr(7, 4)
}
