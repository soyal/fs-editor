import React from 'react'
import PropTypes from 'prop-types'
import Editor from 'draft-js-plugins-editor'
import { EditorState, RichUtils } from 'draft-js'
import createPlugins from './plugins'
import * as utils from './utils'
import pasteHandler from './lib/paste-handler'
import insertImages from './lib/insert-images'
import config from 'config.js'

import Toolbar from './toolbar'

import './index.less'

// 隐藏warning:A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.
// const _errFunc = console.error
// console.error = function(msg) {
//   if (
//     msg.indexOf(
//       `A component is \`contentEditable\` and contains \`children\` managed by React`
//     ) > -1
//   ) {
//     return
//   }
//   _errFunc(msg)
// }

class FsEditor extends React.Component {
  static propTypes = {
    className: PropTypes.string, // 类名，会加到container上
    height: PropTypes.string, // 编辑器内容区域高度，默认300px
    onChange: PropTypes.func, // (editorState) => {} 回传editorState
    value: PropTypes.object, // EditorState
    autoFocus: PropTypes.bool, // 组件加载后自动定焦到editor
    onImageInsert: PropTypes.func, // 插入图片的回调，(file, base64) => Promise resolve({success:true, result:url})
    errorImage: PropTypes.string, // onImagePaste中返回succss:false后，显示的图片
    loadingImage: PropTypes.string, // onImagePaste处理中，loading的图片
    // 图文混合粘贴时候，对图片的处理(url:string): Promise, url为粘贴的图片的url
    // Promise resolve({result: 处理完成的url, success: 处理图片是否成功})
    // 注意：如果粘贴的是本域名下的(e.g:image-cdn.fishsaying.com)图片，则不触发此回调，直接完成粘贴
    onImagePaste: PropTypes.func,
    imageSizeLimit: PropTypes.number, // 图片大小限制，默认是10M，单位是Byte，如10M = 1024 * 1024 * 10
    imageMIME: PropTypes.array // 图片支持的类型，默认['image/png', 'image/jpeg']
  }

  static defaultProps = {
    autoFocus: false,
    errorImage: config.errorImage,
    loadingImage: config.loadingImage,
    onImageInsert: (file, base64) => {
      return base64
    },
    onImagePaste: url => {
      return {
        result: url,
        success: true
      }
    }
  }

  static childContextTypes = {
    onImageInsert: PropTypes.func,
    onImagePaste: PropTypes.func,
    onChange: PropTypes.func,
    getEditorState: PropTypes.func,
    imageSizeLimit: PropTypes.number,
    imageMIME: PropTypes.array
  }

  constructor(props) {
    super(props)

    const defaultState = props.defaultValue || props.value
    let editorState = null

    if (defaultState) {
      editorState = defaultState
    } else {
      editorState = EditorState.createEmpty()
    }

    this.state = {
      editorState
    }

    this.toggleInlineStyle = this._toggleInlineStyle.bind(this)
    this.toggleBlockType = this._toggleBlockType.bind(this)
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
    this.handlePastedText = this.handlePastedText.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  getChildContext() {
    return {
      onImageInsert: this.props.onImageInsert,
      onImagePaste: this.props.onImagePaste,
      onChange: this.onChange.bind(this),
      getEditorState: this.getEditorState,
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

  /**
   *
   * @param {EditorState} editorState?
   * @param {Function} cb
   */
  onChange(editorState, cb) {
    if (!editorState) {
      this.props.onChange(this.state.editorState)
      return
    }

    if (cb && typeof cb === 'function') {
      this.setState(
        {
          editorState
        },
        cb
      )
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
  _focus = () => {
    this.editor.focus()
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
    const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE')
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    this.setState(
      {
        editorState: newEditorState
      },
      () => {
        this._focus()
      }
    )
  }

  _toggleInlineStyle(type) {
    const newState = RichUtils.toggleInlineStyle(this.state.editorState, type)

    this.onChange(newState, this._focus.bind(this))
  }

  _toggleBlockType(type) {
    const newState = RichUtils.toggleBlockType(this.state.editorState, type)

    this.onChange(newState, this._focus.bind(this))
  }

  getEditorState = () => {
    return this.state.editorState
  }

  handlePastedText(text, html, editorState) {
    if (!html) return

    pasteHandler(text, html, {
      setEditorState: this.onChange,
      getEditorState: this.getEditorState,
      onImagePaste: this.props.onImagePaste,
      errorImage: this.props.errorImage,
      loadingImage: this.props.loadingImage
    })

    return 'handled'
  }

  onFilePasted = files => {
    insertImages(files, {
      setEditorState: this.onChange,
      getEditorState: this.getEditorState,
      onImageInsert: this.props.onImageInsert,
      option: {
        mimeArr: this.props.mimeArr,
        limitSize: this.props.limitSize
      }
    })

    return 'handled'
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this._focus()
    }
  }

  render() {
    return (
      <div className={'fs-editor-container ' + (this.props.className || '')}>
        <Toolbar
          toggleInlineStyle={this.toggleInlineStyle}
          toggleBlockType={this.toggleBlockType}
          insertCustomBlock={this._insertCustomBlock.bind(this)}
          editorState={this.state.editorState}
          onChange={this.onChange}
        />

        <div
          className="fs-editor-content"
          onClick={this._focus}
          style={{
            height: this.props.height || '300px'
          }}
        >
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            plugins={createPlugins()}
            onChange={this.onChange}
            handlePastedFiles={this.onFilePasted}
            handlePastedText={this.handlePastedText}
            ref={editor => {
              this.editor = editor
            }}
          />
        </div>
      </div>
    )
  }
}

FsEditor.utils = utils

export default FsEditor
