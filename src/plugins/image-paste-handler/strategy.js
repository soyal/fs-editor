import imageUrlHandler from './image-url-handler'

export default function createStrategy(config) {
  return function handleImageUrl(contentBlock, cb, contentState) {
    findImageUrl(contentBlock, cb, contentState, config)
  }
}

/**
 * 查找插入的图片
 * @param {*} contentBlock
 * @param {*} cb
 * @param {*} contentState
 */
function findImageUrl(contentBlock, cb, contentState, { onChange }) {
  const type = contentBlock.getType()
  // atomic交给blockRenderFn去处理
  if (type === 'atomic') return null

  // 只匹配图片以block形式粘贴的情况，行内的图片先不管
  const entityKey = contentBlock.getEntityAt(0)
  if (!entityKey) {
    return null
  }
  debugger
  const entity = contentState.getEntity(entityKey)
  if (!entity) return null

  const entityType = entity.getType().toLowerCase()
  if(entityType === 'image') {
    imageUrlHandler(0, 2, {
      entityKey,
      contentBlock,
      contentState,
      onChange,
      cb
    })
  }


  // contentBlock.findEntityRanges(char => {
  //   const entityKey = char.getEntity()
  //   if (entityKey) {
  //     const entityType = contentState.getEntity(entityKey).getType()

  //     return entityType === 'IMAGE'
  //   } else {
  //     return false
  //   }
  // }, cb)
}
