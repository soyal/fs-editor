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
    entityKey: PropTypes.string,
    ImageComponent: PropTypes.any
  }

  static contextTypes = {
    onImagePaste: PropTypes.func,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = this.getInitialState(props)
    this.id = Math.random()
  }

  getInitialState(props) {
    const entityData = this.getData(props)
    const state = {
      status: 'uploading' // uploading || uploaded
    }

    if (!this.shouldUpload(entityData)) {
      state.status = 'uploaded'
    }

    return state
  }

  /**
   * 如果是base64或者白名单域名，不上传
   * @param {Object} data entityData
   */
  shouldUpload(data) {
    const { src } = data
    if (src.startsWith('data:') || isInDomain(src)) return false
    console.log('should upload: ', src)
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
   */
  getStatusTemplate() {
    const { status } = this.state
    const entityData = this.getData(this.props)
    if (status === 'uploading') {
      return (
        <p style={{ color: '#c7c8c9', fontStyle: 'italic', fontSize: '14px' }}>
          图片上传中...
        </p>
      )
    }

    return (
      <figure contentEditable="false">
        <img {...entityData} role="presentation" />
      </figure>
    )
  }

  updateEntity(data) {
    const nContentState = this.props.contentState.mergeEntityData(
      this.props.entityKey,
      data
    )
    const editorState = EditorState.createWithContent(nContentState)
    this.context.onChange(editorState)
    // 替换entity data
    // let nContentState = this.props.contentState.mergeEntityData(
    //   this.props.entityKey,
    //   data
    // )

    // // 设置selection
    // const blockKey = this.getBlockKey(this.props.offsetKey)
    // let nSelectionState = SelectionState.createEmpty(blockKey)
    // // nContentState = Modifier.splitBlock(nContentState, nSelectionState)

    // // 将entity apply到contentState上
    // let nEditorState = EditorState.createWithContent(nContentState)
    // nEditorState = EditorState.forceSelection(nEditorState, nSelectionState)
    // nEditorState = AtomicBlockUtils.insertAtomicBlock(
    //   nEditorState,
    //   this.props.entityKey,
    //   ' '
    // )

    // // const nEditorState = EditorState.createWithContent(nContentState)

    // this.props.setEditorState(nEditorState)
  }

  async componentDidMount() {
    if (this.state.status === 'uploading') {
      console.log('do upload!!!', this.id)
      const entityData = this.getData(this.props)
      const { src } = entityData
      const data = await this.context.onImagePaste(src) // 处理完成的url
      // 上传图片成功
      let _targetSrc
      if (data.success) {
        _targetSrc = data.result
      } else {
        _targetSrc = config.errorImage
      }
      this.updateEntity({ src: _targetSrc })
    }
  }

  render() {
    return this.getStatusTemplate()
  }
}

export default ImageHandler
