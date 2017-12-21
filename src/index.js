import React from 'react'
import PropTypes from 'prop-types'
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
} from 'draft-js'
import * as utils from './utils'
import uploadImage from './utils/upload/upload-image'
import { isImage } from './utils/common'
import decorators from './decorators'

import Media from './components/custom-block/media'
import Toolbar from './toolbar'

import './index.css'
import { setTimeout } from 'timers';


class FsEditor extends React.Component {
  static propTypes = {
    className: PropTypes.string,  // 类名，会加到container上
    height: PropTypes.string,  // 编辑器内容区域高度，默认300px
    onChange: PropTypes.func, // (editorState) => {} 回传editorState
    value: PropTypes.object,  // EditorState
    /**
     * 当图片被插入的时候触发
     * @param {String} base64 被插入图片的base64编码
     * @param {Function} insertImage 插入图片的方法, 传参为要插入的图片的url
     */
    onImageInsert: PropTypes.func.isRequired,  // 插入图片的回调，(base64, insertImage(url))
    imageSizeLimit: PropTypes.number,  // 图片大小限制，默认是10M，单位是Byte，如10M = 1024 * 1024 * 10
    imageMIME: PropTypes.array  // 图片支持的类型，默认['image/png', 'image/jpeg']
  }

  static childContextTypes = {
    onImageInsert: PropTypes.func,
    imageSizeLimit: PropTypes.number,
    imageMIME: PropTypes.array
  }


  constructor(props) {
    super(props)

    const defaultState = props.defaultValue || props.value
    let editorState
    if (defaultState) {
      editorState = EditorState.createWithContent(defaultState.getCurrentContent(decorators))
    } else {
      editorState = EditorState.createEmpty(decorators)
    }

    this.state = {
      editorState
    }

    this.toggleInlineStyle = this._toggleInlineStyle.bind(this)
    this.toggleBlockType = this._toggleBlockType.bind(this)
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.insertMediaBlock = this._insertMediaBlock.bind(this)

    this.onChange = this.onChange.bind(this)

  }


  getChildContext() {
    return {
      onImageInsert: this.props.onImageInsert,
      imageSizeLimit: this.props.imageSizeLimit,
      imageMIME: this.props.imageMIME
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.value) {
      this.setState({
        editorState: nextProps.value
      })
    }
  }

  onChange(editorState, cb) {

    if (cb) {
      this.setState({
        editorState
      }, cb)
    } else {
      this.setState({
        editorState
      })
    }

    if (this.props.onChange) {
      this.props.onChange(editorState)
    }
  }

  /**
   * 将焦点设置到编辑器上
   */
  _focus() {
    this.refs.editor.focus()
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
      this.onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  /**
   * 插入块级标签
   * @param {*} type 
   */
  _insertCustomBlock(type) {
    const editorState = this.state.editorState
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      type,
      'IMMUTABLE'
    )
    const newEditorState = EditorState.set(
      editorState,
      {
        currentContent: contentStateWithEntity
      }
    )

    this.setState({
      editorState: newEditorState
    }, () => {
      this._focus()
    })
  }

  /**
   * 插入媒体区块
   * @param type String image, audio, video
   * @param url String
   */
  _insertMediaBlock(type, url) {
    const editorState = this.state.editorState
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      type,
      'IMMUTABLE',
      {
        src: url
      }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(
      editorState,
      {
        currentContent: contentStateWithEntity
      }
    )

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      )
    }, () => {
      this._focus()
    })
  }

  _mediaBlockRendererFn(block) {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false
      }
    }
  }

  _toggleInlineStyle(type) {
    const newState = RichUtils.toggleInlineStyle(this.state.editorState, type)

    this.onChange(newState, this._focus.bind(this))
  }

  _toggleBlockType(type) {
    const newState = RichUtils.toggleBlockType(this.state.editorState, type)

    this.onChange(newState, this._focus.bind(this))
  }

  onFilePasted = (files) => {
    files.forEach((file) => {
      if (isImage(file)) {
        uploadImage(file, this.props.onImageInsert, (url) => {
          this.insertMediaBlock('image', url)
        })
      }
    })

    return 'handled'
  }

  onTextPasted = () => {

  }

  render() {
    return (
      <div className={'fs-editor-container ' + (this.props.className || '')}>
        <Toolbar toggleInlineStyle={this.toggleInlineStyle}
          toggleBlockType={this.toggleBlockType}
          insertMediaBlock={this.insertMediaBlock}
          insertCustomBlock={this._insertCustomBlock.bind(this)}></Toolbar>

        <div className="fs-editor-content"
          style={{
            height: this.props.height || '300px'
          }}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            blockRendererFn={this._mediaBlockRendererFn}
            handlePastedFiles={this.onFilePasted}
            ref="editor" />
        </div>

      </div>
    );
  }
}

FsEditor.utils = utils

export default FsEditor