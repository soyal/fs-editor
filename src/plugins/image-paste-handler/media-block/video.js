import React from 'react'

const Video = (props) => {
  return <video controls src={props.src} className="fs-editor-block-video" />;
}

export default Video