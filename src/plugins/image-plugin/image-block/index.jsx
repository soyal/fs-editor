import React, { Component } from 'react'
import classnames from 'classnames'
import { EditorBlock } from 'draft-js'

export default class Image extends Component {
  render() {
    const { block, className, theme = {}, ...otherProps } = this.props
    // leveraging destructuring to omit certain properties from props
    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      blockStyleFn, // eslint-disable-line no-unused-vars
      ...elementProps
    } = otherProps
    const combinedClassName = classnames(theme.image, className)
    const { src } = contentState.getEntity(block.getEntityAt(0)).getData()
    console.log(this.props)
    return (
      <div>
        <img
          {...elementProps}
          src={src}
          role="presentation"
          className={combinedClassName}
        />
        <figcaption>
          <EditorBlock {...this.props} />
        </figcaption>
      </div>
    )
  }
}
