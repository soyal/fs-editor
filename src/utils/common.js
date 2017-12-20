/**
 * 通用工具函数
 */

export const isImage = (file) => {
  const suffix = ['png', 'jpg', 'jpeg', 'gif']

  return suffix.some((_s) => {
    const pattern = new RegExp(_s + '$')

    return pattern.test(file.name)
  })
}