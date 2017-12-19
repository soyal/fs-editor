import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { uploadBase64 } from 'api/content-create/common'
import noty from '@fs/noty'
// import Modal from './modal'

import './image.css'

// const MIME = ['image/png', 'image/jpeg', 'image/gif']
const MIME = ['image/png', 'image/jpeg']
const LIMIT_SIZE = 1024 * 1024 * 10  // 10M
/**
 * 点击了图片上传然后弹窗
 */
class Image extends Component {
  static contextTypes = {
    onImageInsert: PropTypes.func,
    imageSizeLimit: PropTypes.number,
    imageMIME: PropTypes.array
  }

  constructor() {
    super()

    this.state = {
      // isShowModal: false
    }

  }

  /**
   * 点击了toolbar上的图片图标
   * @param {*} e 
   */
  buttonClickHandler(e) {
    // e.nativeEvent.stopImmediatePropagation()

    // this.toggleModal()
    // return false
    this.fileInput.click()
  }

  onFileChange(e) {
    const file = e.target.files[0]
    const mimeArr = this.context.imageMIME || MIME
    const limitSize = this.context.imageSizeLimit || LIMIT_SIZE

    let isAllowed = mimeArr.some((mime) => {
      return mime === file.type
    })

    if (!isAllowed) {
      noty.warning('不允许的文件类型！')
      return false
    }

    // 验证上传的图片是否在大小限制内
    if(file.size > limitSize) {
      noty.warning(`图片大小超过限制，请上传${parseInt(limitSize/(1024*1024))}M以内的图片`)
      return false
    }

    // 转为base64用于预览并上传
    let reader = new FileReader()
    reader.addEventListener('load', (e) => {
      let result = e.target.result  //base64
      this.context.onImageInsert(file, result, (url) => {
        this.props.insertMediaBlock('image', url)
      })
    })

    reader.readAsDataURL(file)
  }

  render() {
    const imageMIME = this.context.imageMIME || MIME

    return (
      <div className="fs-toolbar-image-container" >
        <input type="file" 
        style={{ display: 'none' }} 
        ref={(dom) => {this.fileInput = dom}}
        accept={imageMIME.join(',')}
        onChange={this.onFileChange.bind(this)} />
        <button className="fs-editor-toolbar-button" onClick={this.buttonClickHandler.bind(this)}>
          <svg viewBox="0 0 18 18">
            <rect className="fs-editor-stroke" height="10" width="12" x="3" y="4"></rect>
            <circle className="fs-editor-fill" cx="6" cy="7" r="1"></circle>
            <polyline className="fs-editor-even fs-editor-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
          </svg>
        </button>

        {/* 暂时不做模态框
        {this.state.isShowModal ? (
          <Modal onUrlLoad={(url) => {
            this.props.insertMediaBlock('image', url)
          }}></Modal>
        ) : null}
        */}
      </div >
    )
  }
}

export default Image