import { MD5 } from '../assets/libs/md5.js'
// import encode from 'strict-uri-encode'

export function getFinalParams(values = {}) {
	const t = +new Date()
	const s = getRanChar(6)
	const imei = '868331011992179'
	const api_u_key = localStorage.getItem('api_u_key') || ''

	Object.assign(values, {t, s, imei})
	api_u_key && Object.assign(values, {api_u_key})

	// var api_u_key = localStorage["api_u_key"]
	// 针对api_u_key做特殊处理，让其不参与秘钥计算 start
	let api_u_key_temp
	if (values.api_u_key && values.api_u_key.length > 10) {
		api_u_key_temp = values.api_u_key
		delete values.api_u_key
	}
	const md5key = 'testapiprikey'
	// console.log(md5key + getSortString(values))
	// 针对api_u_key做特殊处理，让其不参与秘钥计算 end
	const hash = MD5(md5key + getSortString(values))
	values.check = hash
	// 针对api_u_key做特殊处理，让其不参与秘钥计算 start
	if (api_u_key_temp && api_u_key_temp.length > 10) {
		values.api_u_key = encodeURIComponent(api_u_key_temp)
	}
	// if (values.searchKey) values.searchKey = encode(values.searchKey)
	// if (values.searchKey) values.searchKey = values.searchKey
	if (values.redirectUrl) values.redirectUrl = encodeURIComponent(values.redirectUrl)
	// 针对api_u_key做特殊处理，让其不参与秘钥计算 end
	// return Object.keys(values).sort().map(k => `${k}=${values[k]}`).join('&')
	return values
}

function getRanChar(n) {
	const chars = [
		'0', '1', '2', '3', '4', '5', '6', '7', '8',
		'9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
		'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
		'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	]
	return [...new Array(n).keys()].reduce((acc, k) => {
		const id = Math.ceil(Math.random() * 35)
		return `${acc}${chars[id]}`
	}, '')
}
function getSortString(values) {
	return Object.keys(values).sort().reduce((acc, k) => {
		return `${acc}&${k}=${values[k]}`
	}, '')
}
