/**
 * 多媒体插入
 */

import React from 'react'
import Image from 'components/image-upload'
import Audio from './audio'
import Video from './video'

import './index.css'

const Media = (props) => {
  const key = props.block.getEntityAt(0)
  if (!key) {
    return null
  }
  const entity = props.contentState.getEntity(key);
  const { src } = entity.getData();
  const type = entity.getType().toLowerCase();
  let media;

  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image contentState={props.contentState} entityKey={key} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  } 
  return media;
}

export default Media