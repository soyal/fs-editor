/**
 * 图片上传组件
 */
import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import { isInDomain } from 'utils/common'
import PropTypes from 'prop-types'
import config from 'config.js'
import classnames from 'classnames'

class ImageHandler extends Component {
  static propTypes = {
    contentState: PropTypes.object, // draft contentState
    entityKey: PropTypes.string
  }

  static contextTypes = {
    onImagePaste: PropTypes.func,
    onChange: PropTypes.func
  }

  shouldUpload() {
    const data = this.getData(this.props)
    const { src } = data
    if (
      data.success !== undefined ||
      src.startsWith('data:') ||
      isInDomain(src)
    )
      return false

    return true
  }

  getData(props) {
    const { contentState, entityKey } = props
    const entityData = contentState.getEntity(entityKey).getData()
    return entityData
  }

  /**
   * 通过图片上传状态拼接template
   * @param {String} status 图片状态 success || error || uploading
   * @param {String} className 图片类名
   */
  getStatusTemplate(className) {
    const cls = classnames(className, 'fs-editor-block-image')
    const { src, success, alt } = this.getData(this.props)
    let imgSrc
    if (success === undefined) {
      return (
        <p style={{ color: '#c7c8c9', fontStyle: 'italic', fontSize: '14px' }}>
          图片上传中...
        </p>
      )
    } else if (success === true) {
      imgSrc = src
    } else {
      imgSrc = config.errorImage
    }

    // const { ThemedImage } = this.props

    return (
      <figure contentEditable="false">
        {/* <ThemedImage src={imgSrc} className={cls} alt={alt} /> */}
        <img src={imgSrc} className={cls} alt={alt}/>
      </figure>
    )
  }

  updateEntity(data) {
    const nContentState = this.props
      .getEditorState()
      .getCurrentContent()
      .replaceEntityData(this.props.entityKey, data)

    const nEditorState = EditorState.createWithContent(nContentState)
    this.props.setEditorState(nEditorState)
  }

  async componentDidMount() {
    console.log(this.props.offsetKey)
    if (this.shouldUpload()) {
      const { src, alt } = this.getData(this.props)
      const data = await this.context.onImagePaste(src) // 处理完成的url

      let _targetSrc,
        success = false

      // 上传图片成功
      if (data.success) {
        _targetSrc = data.result
        success = true
      } else {
        _targetSrc = config.errorImage
      }

      this.updateEntity({ src: _targetSrc, success, alt: alt || '' })
    }
  }

  render() {
    return this.getStatusTemplate(null)
  }
}

export default ImageHandler
