import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Banner from 'app/components/Banner'
import Day from 'app/components/Day'
import Entry from 'app/components/Entry'
import BuddyMessage from 'app/components/BuddyMessage'

import style from './style'

class Feed extends Component {
  componentDidMount() {
    this.scrollBottom()
  }

  componentDidUpdate(prevProps) {
    if (this.props.feed.length > prevProps.feed.length) {
      this.scrollBottom()
    }
  }

  getRefNode = (node) => {
    if (!node) { return }
    this.refNode = node
  }

  scrollBottom() {
    if (!this.refNode) { return }
    const height = this.refNode.scrollHeight
    setTimeout(() => {
      window.scroll(0, height)
    }, 1)
  }

  handleDayTap = (ordinal) => {
    this.props.persist({
      ordinal: ordinal,
    })
  }

  render() {
    return (
      <div
        id="FEED"
        ref={this.getRefNode}
        style={[
          style.default,
          this.props.isActive && style.isActive,
        ]}
      >
        {this.props.feed.map((unit) => {
          switch (unit.type) {
            case "banner": {
              return (
                <Banner
                  key={unit.value}
                  color={unit.color}
                  value={unit.value}
                />
              )
            }
            case "day": {
              return (
                <Day
                  key={unit.ordinal}
                  value={unit.value}
                  style={{color: unit.color}}
                  ordinal={unit.ordinal}
                  onTap={this.handleDayTap}
                />
              )
            }
            case "entry": {
              return (
                <Entry
                  key={unit.id}
                  value={unit.value}
                  category={unit.category}
                  showDetail={this.props.showDetail}
                />
              )
            }
            default: {
              return (null)
            }
          }
        })}
        <BuddyMessage
          value={"What did you do today?"}
        />
      </div>
    )
  }
}

export default Radium(Feed)
