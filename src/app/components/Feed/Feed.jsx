import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import Banner from 'app/components/Banner'
import FeedItemRenderer from 'app/components/FeedItemRenderer'

import style from './style'

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.array,
    activeCategory: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onSwipeRight: PropTypes.func,
  }

  componentDidMount() {
    // this.scrollBottom()
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeCategory !== prevProps.activeCategory) {
      this.scrollBottom()
    }
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
      <Hammer
        onSwipe={this.props.onSwipeRight}
        direction={"DIRECTION_HORIZONTAL"}
      >
        <div
          id="FEED"
          ref={this.getRefNode}
          style={style.default}
        >
          <div>
            {React.Children.map(this.props.children, (c) => (c))}
          </div>
        </div>
      </Hammer>
    )
  }
}

export default Radium(Feed)
