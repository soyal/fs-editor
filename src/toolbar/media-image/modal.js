import React, { Component } from 'react'

class ImageModal extends Component {
  constructor() {
    super()

    this.onImageChange = this.onImageChange.bind(this)
  }

  /**
   * 执行图片上传操作
   * @param {*} e 
   */
  onImageChange(e) {
    let file = e.target.files[0]
    let reader = new FileReader()

    reader.onload = (e) => {
      let result = e.target.result

      //todo 
      this.props.onUrlLoad.call(this, result)
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div>
        <input type="file"
          style={{ display: 'none' }}
          ref="imageInput"
          onChange={this.onImageChange}
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation()
          }} />
        <div className="fs-toolbar-image-modal"
          onClick={(e) => {
            // 为了实现点击页面其他区域隐藏该弹窗
            e.preventDefault()
            e.nativeEvent.stopImmediatePropagation()
            this.refs.imageInput.click()
          }}>图片弹窗</div>
      </div>
    )
  }
}

export default ImageModal