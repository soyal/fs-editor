/**
 * 图片上传组件
 */
import React, { Component } from 'react'
import { isInDomain } from 'utils/common'
import PropTypes from 'prop-types'
import config from 'config.js'
import { EditorState } from 'draft-js'

class ImageHandler extends Component {
  static propTypes = {
    contentState: PropTypes.object, // draft contentState
    entityKey: PropTypes.string
  }

  static contextTypes = {
    onImagePaste: PropTypes.func,
    onChange: PropTypes.func
  }

  state = {
    status: 'uploading',
    src: ''
  }

  /**
   * 如果是base64或者白名单域名，不上传
   * @param {String} src
   */
  shouldUpload(data) {
    const { src, success } = data
    if (success !== undefined || src.startsWith('data:') || isInDomain(src))
      return false

    return true
  }

  getData(props) {
    const { contentState, entityKey } = props
    const entityData = contentState.getEntity(entityKey).getData()
    return entityData
  }

  getBlockKey(offsetKey) {
    const pattern = /([^-]+)-(?:[^-]+)-\w+/

    return offsetKey.match(pattern)[1]
  }

  /**
   * 通过图片上传状态拼接template
   * @param {String} status 图片状态 success || error || uploading
   * @param {String} className 图片类名
   */
  getStatusTemplate(className) {
    const { status } =  this.state
    if (status === 'uploading') {
      return (
        <p style={{ color: '#c7c8c9', fontStyle: 'italic', fontSize: '14px' }}>
          图片上传中...
        </p>
      )
    }

    return (
      <figure contentEditable="false">
        <img src={} alt=""/>
      </figure>
    )
  }

  updateEntity(data) {
    console.log('~~~~~~~~~block update: ', this.props.offsetKey, data)
    // 替换entity data
    let nContentState = this.props.contentState.mergeEntityData(
      this.props.entityKey,
      data
    )

    // 设置selection
    const blockKey = this.getBlockKey(this.props.offsetKey)
    let nSelectionState = SelectionState.createEmpty(blockKey)
    // nContentState = Modifier.splitBlock(nContentState, nSelectionState)

    // 将entity apply到contentState上
    let nEditorState = EditorState.createWithContent(nContentState)
    nEditorState = EditorState.forceSelection(nEditorState, nSelectionState)
    nEditorState = AtomicBlockUtils.insertAtomicBlock(
      nEditorState,
      this.props.entityKey,
      ' '
    )

    // const nEditorState = EditorState.createWithContent(nContentState)

    this.props.setEditorState(nEditorState)
  }

  async componentDidMount() {
    const entityData = this.getData(this.props)
    let _targetSrc = entityData.src,
      alt = '',
      success = entityData.success
    if (this.shouldUpload(entityData)) {
      const { src, _alt } = entityData
      const data = await this.context.onImagePaste(src) // 处理完成的url

      alt = _alt || ''
      // 上传图片成功
      if (data.success) {
        _targetSrc = data.result
      } else {
        _targetSrc = config.errorImage
        success = false
      }
    }

    this.updateEntity({ src: _targetSrc, success, alt: alt || '' })
  }

  render() {
    return (
      <p style={{ color: '#c7c8c9', fontStyle: 'italic', fontSize: '14px' }}>
        图片上传中...
      </p>
    )
  }
}

export default ImageHandler
