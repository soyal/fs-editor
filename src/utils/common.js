/**
 * 通用工具函数
 */
import config from '../config'

export const isImage = file => {
  const suffix = ['png', 'jpg', 'jpeg', 'gif']

  return suffix.some(_s => {
    const pattern = new RegExp(_s + '$')

    return pattern.test(file.name)
  })
}

/**
 * @param {String} url 要匹配的url
 * @param {Array} domain 域名 e.g: image-cdn.fishsaying.com
 */
export const isInDomain = (url, domain) => {
  domain = domain || config.imageDomain
  const pattern = /(?:^https?:)?\/\/([^/]+)/
  const matches = url.match(pattern)
  if (!matches) return false

  const urlDomain = matches[1]

  return domain.indexOf(urlDomain) > -1
}
