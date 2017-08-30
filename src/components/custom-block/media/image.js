import React from 'react'

const Image = (props) => {
  return (
    <div>
      <img src={props.src} className="fs-editor-block-image" alt={props.alt || ''} />
    </div>
  );
}

export default Image