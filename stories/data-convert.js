/**
 * 数据转换示例
 */
import React, { Component } from 'react'
import FsEditor from '../src/index'

class DataConvert extends Component {
  state = {
    editorState: FsEditor.utils.convertFromHtml(
      `<ul><li></li></ul>`
    ),
    text: ''
  }

  /**
   * 转换成纯文本
   */
  convertToText = () => {
    this.setState({
      text: FsEditor.utils.stateToText(this.state.editorState)
    })
  }

  /**
   * 转换成html
   */
  convertToHtml = () => {
    this.setState({
      text: FsEditor.utils.stateToHtml(this.state.editorState)
    })
  }

  render() {
    return (
      <div>
        <h2>数据转换</h2>
        <FsEditor
          value={this.state.editorState}
          imageMIME={['image/png', 'image/jpeg', 'image/gif']}
          onImageInsert={(file, base64) => {
            return { success: true, result: base64 }
            // return new Promise(resolve => {
            //   setTimeout(() => {
            //     resolve({ success: true, result: base64 })
            //   }, 2000)
            // })
          }}
          onImagePaste={url => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({
                  result: 'http://via.placeholder.com/350x150',
                  success: false
                })
              }, 2000)
            })
          }}
          onChange={value => {
            this.setState({
              editorState: value
            })
          }}
        />
        <button onClick={this.convertToHtml}>convertToHtml</button>
        <button onClick={this.convertToText}>convertToText</button>
        <h3>转换的文本</h3>
        <div>{this.state.text}</div>
      </div>
    )
  }
}

export default DataConvert
