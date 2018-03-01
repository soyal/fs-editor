export default function handleImageUrl(contentBlock, cb, contentState) {
  findImageUrl(contentBlock, cb, contentState)
}

/**
 * 查找插入的图片
 * @param {*} contentBlock
 * @param {*} cb
 * @param {*} contentState
 */
function findImageUrl(contentBlock, cb, contentState) {
  const type = contentBlock.getType()
  // atomic交给blockRenderFn去处理
  if (type === 'atomic') return null
  contentBlock.findEntityRanges(char => {
    const entityKey = char.getEntity()
    if (entityKey) {
      const entityType = contentState.getEntity(entityKey).getType()

      return entityType === 'IMAGE'
    } else {
      return false
    }
  }, cb)
}
