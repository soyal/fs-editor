import React, {
  Component
} from 'react'
import './index.css'

import AddLink from './addLink'
import RemoveLink from './removeLink'

export default class LinkWarper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      linkTitle: '',
      linkUrl: ''
    }
  }
  addLink = () => {
    const {
      onChange
    } = this.props;
    const {
      linkTitle,
      linkUrl
    } = this.state;
    onChange('link', linkTitle, linkUrl);
  }
  updateValue = (e) => {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    });
  }
  componentWillMount() {
    const {
      currentState: {
        link,
        selectionText
      }
    } = this.props;
    const linkUrl = (link && link.target) || '';
    const linkTitle = (link && link.title) || selectionText;
    this.setState({
      linkUrl,
      linkTitle
    })
  }
  componentWillReceiveProps(props) {
    const {
      currentState: {
        link,
        selectionText
      }
    } = props;
    const linkUrl = (link && link.target) || '';
    const linkTitle = (link && link.title) || selectionText;
    this.setState({
      linkUrl,
      linkTitle
    })
  }
  render() {
    const {
      isShow,
      insertLink,
      removeLink,
      closeModal
    } = this.props;
    const {
      linkTitle,
      linkUrl
    } = this.state;
    return (
      <div className="link-warper">
        <AddLink onClick ={
          insertLink
        } />
        <RemoveLink onClick ={
          removeLink
        } />
        {
          isShow ?
          <div className="link-warper-container">
            <div className="link-warper-list">
              <label>标题</label>
              <input type="text"
                value ={linkTitle}
                onChange={this.updateValue}
                onBlur={this.updateValue}
                name ={'linkTitle'}
              />
            </div>
            <div className="link-warper-list">
              <label>链接</label>
              <input type="text"
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value ={linkUrl}
                name ={'linkUrl'}
              />
            </div>
            <div className="link-warper-btns">
              <button disabled={!linkUrl || !linkTitle} onClick={this.addLink}>添加</button>
              <button onClick = {closeModal}>取消</button>
            </div>
          </div> :
          null
        }
      </div>
    );
  }
}