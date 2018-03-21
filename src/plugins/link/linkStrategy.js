import linkifyIt from 'linkify-it'
import tlds from 'tlds'

const linkify = linkifyIt()
linkify.tlds(tlds)

// Gets all the links in the text, and returns them via the callback
const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(char => {
    const entityKey = char.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

export default linkStrategy
