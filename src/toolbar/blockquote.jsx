/**
 * 引用
 */
import React from 'react'

const Quote = ({ onClick }) => {
  return (
    <button className="fs-editor-toolbar-button">
      <img
        onClick={onClick}
        className="fs-editor_btn-quote"
        src={require('./images/quote.svg')}
        alt="quote"
      />
    </button>
  )
}

export default Quote
