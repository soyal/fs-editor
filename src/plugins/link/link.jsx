import React, { Component } from 'react'
import classnames from 'classnames'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'

const linkify = linkifyIt()
linkify.tlds(tlds)

// The component we render when we encounter a hyperlink in the text
export default class Link extends Component {
  render() {
    const {
      decoratedText = '',
      theme = {},
      target = '_self',
      rel = 'noreferrer noopener',
      className,
      component,
      dir, // eslint-disable-line no-unused-vars
      entityKey, // eslint-disable-line no-unused-vars
      getEditorState, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      setEditorState, // eslint-disable-line no-unused-vars
      contentState, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props

    const combinedClassName = classnames(theme.link, className)
    const links = linkify.match(decoratedText)// eslint-disable-line no-unused-vars
    const href = contentState.getEntity(entityKey).getData().url
    const props = {
      ...otherProps,
      href,
      target,
      rel,
      className: combinedClassName
    }

    return component ? React.createElement(component, props) : <a {...props} />
  }
}
