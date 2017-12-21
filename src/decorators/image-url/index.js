import ImageUrl from './image-url'

function handleImageUrl(contentBlock, cb, contentState) {
  findImageUrl(contentBlock, cb, contentState)
}

/**
 * 查找插入的图片
 * @param {*} contentBlock 
 * @param {*} cb 
 * @param {*} contentState 
 */
function findImageUrl(contentBlock, cb, contentState) {
  contentBlock.findEntityRanges(
    (char) => {
      const entityKey = char.getEntity()
      if(entityKey) {
        const entityType = contentState.getEntity(entityKey).getType()
        
        return entityType === 'IMAGE'
      } else {
        return false
      }
    },
    cb
  )
}

export default {
  strategy: handleImageUrl,
  component: ImageUrl
}