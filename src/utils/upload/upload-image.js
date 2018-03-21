/**
 * 上传图片
 */
import noty from 'lib/noty'

/**
 * @param {File} file
 * @param {Function} uploadFn 上传图片的函数，(file, base64, insertFn): void
 * @param {Function} insertFn 图片的插入函数, (url: String): void
 * @param {Object} option  对图片大小和类型的限制{ imageMIME: Array<String>, imageSizeLimit: Number }
 * {
 *   imageMIME: 图片mime类型，i.e ['image/png', 'image/jpeg']
 *   imageSizeLimit: 大小限制，单位是byte  1024 byte = 1kb
 * }
 */
export default (file, uploadFn, insertFn, option = {}) => {
  const LIMIT_SIZE = 1024 * 1024 * 10 // 10M
  const MIME = ['image/png', 'image/jpeg']

  const mimeArr = option.imageMIME || MIME
  const limitSize = option.imageSizeLimit || LIMIT_SIZE

  let isAllowed = mimeArr.some(mime => {
    return mime === file.type
  })

  if (!isAllowed) {
    noty.warning('不允许的文件类型！')
    return false
  }

  // 验证上传的图片是否在大小限制内
  if (file.size > limitSize) {
    noty.warning(
      `图片大小超过限制，请上传${parseInt(
        limitSize / (1024 * 1024),
        10
      )}M以内的图片`
    )
    return false
  }

  // 转为base64用于预览并上传
  let reader = new FileReader()
  reader.addEventListener('load', e => {
    let result = e.target.result //base64
    uploadFn(file, result, insertFn)
  })

  reader.readAsDataURL(file)
}
