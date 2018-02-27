import React from 'react'

const Audio = (props) => {
  return <audio controls src={props.src} className="fs-editor-block-audio" />;
}

export default Audio