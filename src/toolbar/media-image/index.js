import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import uploadImage from '../../utils/upload/upload-image'
import insertImages from 'lib/insert-images'
// import Modal from './modal'

import './image.css'

// const MIME = ['image/png', 'image/jpeg', 'image/gif']
const MIME = ['image/png', 'image/jpeg']
const LIMIT_SIZE = 1024 * 1024 * 10 // 10M
/**
 * 点击了图片上传然后弹窗
 */
class Image extends Component {
  static contextTypes = {
    onImageInsert: PropTypes.func,
    onChange: PropTypes.func,
    getEditorState: PropTypes.func,
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
    const files = e.target.files
    const mimeArr = this.context.imageMIME || MIME
    const limitSize = this.context.imageSizeLimit || LIMIT_SIZE

    const {
      onChange: setEditorState,
      getEditorState,
      onImageInsert
    } = this.context
    insertImages(files, {
      setEditorState,
      getEditorState,
      onImageInsert,
      option: {
        mimeArr,
        limitSize
      }
    })
  }

  render() {
    const imageMIME = this.context.imageMIME || MIME

    return (
      <div className="fs-toolbar-image-container">
        <input
          type="file"
          style={{ display: 'none' }}
          ref={dom => {
            this.fileInput = dom
          }}
          multiple
          accept={imageMIME.join(',')}
          key={Math.random()}
          onChange={this.onFileChange.bind(this)}
        />
        <button
          className="fs-editor-toolbar-button"
          onClick={this.buttonClickHandler.bind(this)}
        >
          <svg viewBox="0 0 18 18">
            <rect
              className="fs-editor-stroke"
              height="10"
              width="12"
              x="3"
              y="4"
            />
            <circle className="fs-editor-fill" cx="6" cy="7" r="1" />
            <polyline
              className="fs-editor-even fs-editor-fill"
              points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
            />
          </svg>
        </button>

        {/* 暂时不做模态框
        {this.state.isShowModal ? (
          <Modal onUrlLoad={(url) => {
            this.props.insertMediaBlock('image', url)
          }}></Modal>
        ) : null}
        */}
      </div>
    )
  }
}

export default Image
