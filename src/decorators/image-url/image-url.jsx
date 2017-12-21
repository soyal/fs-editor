import React, {Component} from 'react'

class ImageHandler extends Component {
  constructor(props) {
    super(props)

    this.entityData = props.contentState.getEntity(props.entityKey).getData()
    debugger
  }

  render() {
    return (
      <div className="fs-editor_image-handler">
        图片上传中, 图片url: {this.entityData.src}
      </div>
    )
  }
}

export default ImageHandler