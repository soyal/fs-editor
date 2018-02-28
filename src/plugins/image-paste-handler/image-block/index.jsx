import React from 'react'
import classnames from 'classnames'

const ImageBlock = ({ block, className, theme = {}, ...otherProps }) => {
  const {
    blockProps, // eslint-disable-line no-unused-vars
    customStyleMap, // eslint-disable-line no-unused-vars
    customStyleFn, // eslint-disable-line no-unused-vars
    decorator, // eslint-disable-line no-unused-vars
    forceSelection, // eslint-disable-line no-unused-vars
    offsetKey, // eslint-disable-line no-unused-vars
    selection, // eslint-disable-line no-unused-vars
    tree, // eslint-disable-line no-unused-vars
    blockStyleFn, // eslint-disable-line no-unused-vars
    contentState,
    src,
    ...elementProps
  } = otherProps

  let _targetSrc
  if(src) {
    _targetSrc = src
  } else {
    const data = contentState.getEntity(block.getEntityAt(0)).getData()
    _targetSrc = data.src
  }
  
  const cls = classnames(className, theme.image)

  return <img src={_targetSrc} role="presentation" className={cls} {...elementProps} />
}

export default ImageBlock
