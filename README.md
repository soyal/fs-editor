## 基于draft-js编写的富文本编辑器

### 查看组件demo
```
npm install
npm run storybook
```
查看 http://localhost:6006/

### 使用方式
安装
```
npm install --save @fs/fs-editor --registry=http://npm.fishsaying.com
```
使用
```javascript
import React, {Component} from 'react'
import FsEditor from '@fs/fs-editor'

class Demo extends Component {
  render() {
    return (
      <div>
        <FsEditor onImageInsert={(file, base64, insertImage) => {
          // ...
        }}></FsEditor>
      </div>
    )
  }
}
// ...
```

### props
* className: 类名，会加到container
* height: 编辑区域高度，会直接放到style.height上面，default: 300px
* value: EditorState, 用于赋值
* autoFocus: Boolean, 是否自动定焦到editor, default: false
* onChange: Function, (editorState) => {},回传editorState
* imageSizeLimit: 图片大小限制，单位是Byte，如10M = 1024 * 1024 *10，默认为10M
* imageMIME: 图片支持的类型， default:['image/png', 'image/jpeg']
* onImagePaste: Function, 在图文混合粘贴时触发
* `*`onImageInsert: Function, 必传，图片插入时触发

### 图片处理
#### onImageInsert: (file:File, base64:string, insertImage: function): void
* file: file类型，被插入图片的file数据 
* base64: string, 被插入图片的base64编码
* insertImage: function, (url: string): void，插入图片的方法，参数为图片url

该回调会在`单图粘贴`或`点击工具栏`进行图片插入时触发  
```javascript
class Demo extends Component {
  render() {
    return (
      <div>
        <FsEditor onImageInsert={(file, base64, insertImage) => {
          const url = doUpload(file)
          // 通过file上传图片获取url
          insertImage(url)
        }}></FsEditor>
      </div>
    )
  }
}
```
#### onImagePaste: (url: string): Promise
* url: string, 被贴入的图片的url
* return: Promise, 需要将处理结果通过resolve(data)返回给editor，data格式为{success: boolean, result: 处理后的图片url}

该回调会在`图文混合粘贴`的时候触发，如果不传出此参数，则editor不会处理图文混合粘贴的情况
```javascript
class Demo extends Component {
  render() {
    return (
      <div>
        <FsEditor
          //...
          onImagePaste={url => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({
                  result: '//image-cdn.fishsaying.com/29b95c6cf1b04c9d9932093c6bd6544f.jpg@310w_240h',
                  success: true
                })
              }, 1000)
            })
          }}
        />
      </div>
    )
  }
}

```

### utils工具函数
所有的工具函数会以静态方法的方式挂载在FsEditor.utils命名空间上, 如`isEmpty`的调用
```javascript
import FsEditor from '@fs/fs-editor'
//调用方式
FsEditor.utils.isEmpty(editor)
```
* isEmpty: (editorState: EditorState): boolean, 判断editorState是否为空
* convertFromHtml: (html: string): EditorState, 将html转换为editorState
* stateToHtml: (editorState: EditorState): string, 将editorState转换为html字符串
* stateToText: (editorState: EditorState): string, 将editorState转换成纯文本

