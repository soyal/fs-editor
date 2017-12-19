import ImageUrl from './image-url'

function handleImageUrl(contentBlock, cb, contentState) {
  findImageUrl(contentBlock, cb)
}

function findImageUrl(contentBlock, cb) {
  const pattern = /https?:\/\//
  const text = contentBlock.getText()
  debugger
}

export default {
  strategy: handleImageUrl,
  component: ImageUrl
}