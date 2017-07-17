/**
 * create by Jocs 2017-03-06
 */

const FILE_SIZE = 20 // MB
const TYPE = '*'

const uploadFile = (url, opts = {}, Indicator) => {
	const removeInput = () => [...document.querySelectorAll('.file-uploader-lr')].forEach(::document.body.removeChild)

	removeInput()
	let error = null
	const size = opts.size || FILE_SIZE
	const types = opts.type || TYPE
	const input = document.createElement('input')
	input.setAttribute('type', 'file')
	input.setAttribute('class', 'file-uploader-lr')
	input.setAttribute('accept', 'image/*')
	opts.multiple && input.setAttribute('multiple', false)
	// accept="image/*" capture="camera"
	input.setAttribute('style', 'width: 0; height: 0; position: absolute; left: -1000px; top: -1000px;')

	document.body.appendChild(input)
	input.click()
	// input.touch()

	return new Promise((resolve, reject) => {
		input.addEventListener('change', event => {
			if (!input.files.length) return false
			Indicator && Indicator.open()
			const formData = new FormData();

			[...input.files].forEach(file => {
				if (file.size / 1000 / 1000 > size) {
					error = {
						code: 0,
						msg: `上传文件不能大于${size}MB`
					}
				} else if (
					types &&
					types !== TYPE &&
					types.split(',').indexOf(file.type.split('/')[1]) === -1
				) {
					error = {
						code: 1,
						msg: `上传的文件格式只能是${types}`
					}
				} else {
					// alert(file.name)
					formData.append('file', file, file.name)
				}
			})

			if (error) {
				Indicator && Indicator.close()
				reject(error)
				return false
			}

			const xhr = new XMLHttpRequest()

			xhr.open('POST', url, true)
			// xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

			xhr.send(formData)
			xhr.addEventListener('load', function() {
				Indicator && Indicator.close()
				if (this.status >= 400) {
					reject(this.response)
				} else {
					resolve(this.response)
				}
				removeInput()
			})
		}, false)
	})
}

export default uploadFile
