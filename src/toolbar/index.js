import React from 'react'

import Heading1 from './heading1'
// import Heading2 from './heading2'
import Bold from './bold'
// import DivideLine from './divide-line'
// import Underline from './underline'
// import Italic from './italic'

import UlList from './ul-list'
import OlList from './ol-list'

import Image from './media-image'
import Link from './link'
// import Video from './video'
// import Audio from './audio'

import './index.css'

let Toolbar = ({
  toggleInlineStyle, // 变更内联样式
  toggleBlockType, // 变更块级样式
  insertMediaBlock, // 插入自定义块
  editorState,
  onChange,
  insertCustomBlock
}) => {
  return (
    <div className="fs-editor-toolbar">
      <div className="fs-editor-toolbar-group">
        {/*设置标题*/}
        <Heading1 onClick={() => {
          toggleBlockType('header-one')
        }}></Heading1>

        {/*加粗*/}
        <Bold onClick={() => {
          toggleInlineStyle('BOLD')
        }}></Bold>

        {/*分割线*/}
        {/*
        <DivideLine onClick={() => {
          insertCustomBlock('header-one')
        }}></DivideLine>
        */}

      </div>

      <div className="fs-editor-toolbar-group">
        {/*有序列表*/}
        <OlList onClick={() => {
          toggleBlockType('ordered-list-item')
        }}></OlList>
        {/*无序列表*/}
        <UlList onClick={() => {
          toggleBlockType('unordered-list-item')
        }}></UlList>
      </div>

      <div className="fs-editor-toolbar-group">
        <Image insertMediaBlock={insertMediaBlock}></Image>
        {/*
        <Video insertMediaBlock={insertMediaBlock}></Video>
        <Audio insertMediaBlock={insertMediaBlock}></Audio>
        */}
      </div>

      <Link
        editorState ={editorState}
        onChange ={onChange}
      />
    </div>
  )
}

export default Toolbar