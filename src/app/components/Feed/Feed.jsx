import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Banner from 'app/components/Banner'
import Day from 'app/components/Day'
import Entry from 'app/components/Entry'

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
    window.refNode = this.refNode = node
  }

  scrollBottom() {
    if (!this.refNode) { return }
    const height = this.refNode.scrollHeight
    setTimeout(() => {
      window.scroll(0, height)
    }, 1)
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
                  color={unit.color}
                  entries={unit.entries}
                  ordinal={unit.ordinal}

                  remove={this.props.remove}
                  entryEdit={this.props.entryEdit}
                  persist={this.props.persist}
                  showAddEntry={this.props.showAddEntry}
                  showDetail={this.props.showDetail}
                  closeAddEntry={this.props.closeAddEntry}
                />
              )
            }
            case "entry": {
              return (
                <Entry
                  {...unit}
                  key={unit.id}
                  showDetail={this.props.showDetail}
                />
              )
            }
            default: {
              return (null)
            }
          }
        })}
      </div>
    )
  }
}

export default Radium(Feed)
