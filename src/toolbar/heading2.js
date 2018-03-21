/**
 * 设置标题
 */
import React from 'react'

let Heading2 = ({ onClick }) => {
  return (
    <button className="fs-editor-toolbar-button" onClick={onClick}>
      <svg viewBox="0 0 1024 1024">
        <path
          className="fs-editor-fill"
          d="M7.936 881.408 7.936 141.312l155.904 0 0 292.096 280.064 0L443.904 141.312 604.16 141.312l0 740.096L448 881.408 448 557.312 164.096 557.312l0 324.096L7.936 881.408zM918.016 644.352l-104.96 96c-26.112 22.016-39.936 49.92-41.984 83.968l242.944 0 0 57.088L705.024 881.408c2.048-54.016 9.984-94.976 24.064-122.88 5.888-15.872 20.992-36.096 45.056-59.904l111.104-104.96c41.984-34.048 61.952-77.056 59.904-129.024-2.048-66.048-30.976-100.096-87.04-101.888-59.904 0-88.064 46.08-83.968 137.984l-62.976 0 0-33.024c-2.048-48.128 9.984-87.04 36.096-116.992 27.904-29.952 66.048-45.056 113.92-45.056 96 4.096 145.92 58.112 150.016 162.048C1012.992 531.456 982.016 590.336 918.016 644.352z"
        />
      </svg>
    </button>
  )
}

export default Heading2
