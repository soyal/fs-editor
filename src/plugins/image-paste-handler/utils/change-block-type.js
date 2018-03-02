import { Modifier, SelectionState } from 'draft-js'

/**
 *
 * @param {*} contentBlock
 * @param {*} contentState
 * @return {ContentState}
 */
export default function changeBlockType(contentBlock, contentState, type) {
  const blockKey = contentBlock.getKey()
  const nSelection = SelectionState.createEmpty(blockKey)
debugger
  return Modifier.setBlockType(contentState, nSelection, type)
}
