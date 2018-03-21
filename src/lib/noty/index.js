/**
 * 基于Noty封装的消息提示组件
 * Noty github: https://github.com/needim/noty
 * 使用方法：
 * noty.info(text)  
 * noty.success(text)
 * noty.error(text)
 * noty.warning(text)
 */
import Noty from 'noty'
import 'noty/lib/noty.css'

const TIME_OUT = 3000

function baseNoty(text, type, option) {
  let defaultOption = {
    type: type,
    text: text,
    layout: 'topRight',
    timeout: TIME_OUT,
    progressBar: true
  }

  let newOption = Object.assign(defaultOption, option)

  new Noty(newOption).show()
}

const info = (text, timeout) => {
  baseNoty(text, 'info', {
    timeout: timeout || TIME_OUT
  })
}

const success = (text, timeout) => {
  baseNoty(text, 'success', {
    timeout: timeout || TIME_OUT
  })
}

const warning = (text, timeout) => {
  baseNoty(text, 'warning', {
    timeout: timeout || TIME_OUT
  })
}

const error = (text, timeout) => {
  baseNoty(text, 'error', {
    timeout: timeout || TIME_OUT
  })
}

export default {
  info,
  success,
  warning,
  error
}