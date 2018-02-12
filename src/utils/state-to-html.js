import { stateToHTML } from 'draft-js-export-html'
/**
 * 将draftjs editor state转换成 html字符串
 * @param {EditorState} editorState 
 */
export const stateToHtml = (editorState) => {
  if(!editorState) return ''

  let contentState = editorState.getCurrentContent()
  return stateToHTML(contentState)
}