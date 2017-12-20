import ImageUrl from './image-url'

function handleImageUrl(contentBlock, cb, contentState) {
  findImageUrl(contentBlock, cb)
}

function findImageUrl(contentBlock, cb) {
  const pattern = /^https?:\/\/(?:\S*)$/
  // const text = contentBlock.getText()
}

export default {
  strategy: handleImageUrl,
  component: ImageUrl
}