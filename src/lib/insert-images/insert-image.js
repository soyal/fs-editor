import insertMedia from '../common/insert-media'
/**
 * 
 * @param {*} editorState 
 * @param {*} url 
 * @return {EditorState}
 */
export default function insertImage(editorState, url) {
  return insertMedia(editorState, 'image', url)
}