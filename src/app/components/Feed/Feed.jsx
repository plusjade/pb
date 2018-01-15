import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

class Feed extends PureComponent {
  static propTypes = {
    activeCategory: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onSwipeRight: PropTypes.func,
  }

  getRefNode = (node) => {
    if (!node) { return }
    this.refNode = node
  }

  scrollBottom() {
    if (!this.refNode) { return }
    setTimeout(() => {
       this.refNode.scrollTop = this.refNode.scrollHeight
    }, 100)
  }

  render() {
    return (
        <div
          id="FEED"
          ref={this.getRefNode}
          style={style.default}
        >
          <div>
            {React.Children.map(this.props.children, (c) => (c))}
          </div>
        </div>
    )
  }
}

export default Radium(Feed)
