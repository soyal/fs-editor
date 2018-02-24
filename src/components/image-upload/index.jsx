/**
 * 图片上传组件
 */
import React, { Component } from 'react'
import { isInDomain } from 'utils/common'
import PropTypes from 'prop-types'
import config from 'config.js'

class ImageHandler extends Component {
  static propTypes = {
    contentState: PropTypes.object, // draft contentState
    entityKey: PropTypes.string
  }

  static contextTypes = {
    onImagePaste: PropTypes.func,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = this.getInitialState(props)

    this.entityKey = props.entityKey
  }

  /**
   * @return {Object} {src: 图片src, status: success || error || uploading}
   */
  getInitialState(props) {
    const src = this.getSrc(props)
    let status = 'uploading'
    if (src.startsWith('data:') || isInDomain(src)) {
      // image为鱼说自己的域名下的图片或base64
      status = 'success'
    }

    return {
      src,
      status
    }
  }

  getSrc(props) {
    const { contentState, entityKey } = props
    const entityData = contentState.getEntity(entityKey).getData()
    return entityData.src
  }

  /**
   * 通过图片上传状态拼接template
   * @param {String} status 图片状态 success || error || uploading
   */
  getStatusTemplate(status) {
    if (status === 'success') {
      return (
        <img
          src={this.state.src}
          className="fs-editor-block-image"
          alt={this.state.src || ''}
        />
      )
    } else if (status === 'uploading') {
      return (
        <span
          style={{ color: '#c7c8c9', fontStyle: 'italic', fontSize: '14px' }}
        >
          图片上传中...
        </span>
      )
    } else {
      return (
        <span style={{ color: '#d0021b', fontStyle: 'italic', fontSize: '14px' }}>图片上传失败</span>
      )
    }
  }

  async componentDidMount() {
    if (this.state.status === 'success') return

    const src = this.state.src // 要上传的url
    const data = await this.context.onImagePaste(src) // 处理完成的url

    // 上传图片成功
    if(data.success) {
      // 修改根状态
      this.props.contentState.replaceEntityData(this.entityKey, {
        src: data.result
      })
  
      this.setState({
        src: data.result,
        status: 'success'
      })
    } else {
      this.props.contentState.replaceEntityData(this.entityKey, {
        src: config.defaultImage
      })

      this.setState({
        status: 'error'
      })
    }

    setTimeout(() => {
      this.context.onChange()
    }, 100)
  }

  render() {
    return (
      <div className="fs-editor_image-handler">
        {this.getStatusTemplate(this.state.status)}
      </div>
    )
  }
}

export default ImageHandler
