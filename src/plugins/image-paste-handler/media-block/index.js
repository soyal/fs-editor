/**
 * 多媒体插入
 */

import React from 'react'
import Image from '../image-upload'

import './index.css'

const Media = props => {
  const key = props.block.getEntityAt(0)
  if (!key) {
    return null
  }
  const entity = props.contentState.getEntity(key)
  const type = entity.getType().toLowerCase()
  let media

  if (type === 'image') {
    media = <Image contentState={props.contentState} entityKey={key} />
  } else {
    media = null
  }
  return media
}

export default Media
