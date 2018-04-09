/**
 * 数据转换示例
 */
import React, { Component } from 'react'
import FsEditor from '../src/index'

class DataConvert extends Component {
  state = {
    editorState: FsEditor.utils.convertFromHtml(
      `<p>&nbsp;</p>
      <p>囧》筹拍时，徐峥也找过张译，定的是黄渤那个角色。当时张译已经口头答应了另一个戏约，只好咬着牙推掉了《泰囧》。后来《泰囧》的票房卖了12.6亿元，而张译接的那部戏，到现在还因为各种原因没能播出。再提这事儿时，张译有些尴尬，“毕竟已经答应人家了”。</p>
      <p><img src="http://via.placeholder.com/350x150"/></p>
      <p>但经历过这些绊子，他依旧如故。老老实实做人，本本分分拍戏。</p>`
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
          onImageInsert={(file, base64, insertImage) => {
            insertImage(base64)
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
