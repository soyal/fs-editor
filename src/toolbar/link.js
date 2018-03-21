import React, {
  Component
} from 'react'
import {
  RichUtils,
  EditorState,
  Modifier
} from 'draft-js'
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils'
import linkifyIt from 'linkify-it'

import LinkWarper from '../components/link'

const linkify = linkifyIt();

export default class Link extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      editorState: undefined
    }
  }
  componentWillMount() {
    const {
      editorState
    } = this.props;
    if (editorState) {
      this.setState({
        currentEntity: getSelectionEntity(editorState),
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const newState = {};
    if (nextProps.editorState &&
      this.props.editorState !== nextProps.editorState) {
      newState.currentEntity = getSelectionEntity(nextProps.editorState);
    }
    this.setState(newState);
  }
  insertLink = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }
  removeLink = (e) => {
    e.preventDefault();
    const {
      editorState,
      onChange
    } = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  }
  closeModal = () => {
    this.setState({
      isShow: false
    })
  }
  onChange = (action, title, target, targetOption) => {
    if (action === 'link') {
      const links = linkify.match(target);
      const linkifiedTarget = links && links[0] ? links[0].url : '';
      this.addLink(title, linkifiedTarget, targetOption);
    } else {
      this.removeLink();
    }
  }

  addLink = (linkTitle, linkTarget) => {
    const {
      editorState,
      onChange
    } = this.props;
    const {
      currentEntity
    } = this.state;
    let selection = editorState.getSelection();

    const entityKey = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', {
        url: linkTarget
      })
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');


    selection = newEditorState.getSelection().merge({
      anchorOffset: selection.get('anchorOffset') + linkTitle.length,
      focusOffset: selection.get('anchorOffset') + linkTitle.length,
    });
    newEditorState = EditorState.acceptSelection(newEditorState, selection);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selection,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined,
    );
    onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
    this.closeModal();
  };

  getCurrentValues = () => {
    const {
      editorState
    } = this.props;
    const {
      currentEntity
    } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentValues = {};
    if (currentEntity && (contentState.getEntity(currentEntity).get('type') === 'LINK')) {
      currentValues.link = {};
      const entityRange = currentEntity && getEntityRange(editorState, currentEntity);
      currentValues.link.target = currentEntity && contentState.getEntity(currentEntity).get('data').url;
      currentValues.link.targetOption = currentEntity && contentState.getEntity(currentEntity).get('data').targetOption;
      currentValues.link.title = (entityRange && entityRange.text);
    }
    currentValues.selectionText = getSelectionText(editorState);
    return currentValues;
  }
  render() {
    // console.log(222);
    const {
      removeLink,
      insertLink
    } = this.props;
    const {
      isShow
    } = this.state;
    const {
      link,
      selectionText
    } = this.getCurrentValues();
    return <LinkWarper
      insertLink = {this.insertLink}
      removeLink ={this.removeLink}
      closeModal = {this.closeModal}
      currentState = {{
        link,
        selectionText,
      }}
      onChange = {this.onChange}
      isShow = {isShow}
    />
  }
}