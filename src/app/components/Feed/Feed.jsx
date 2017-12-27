import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import Banner from 'app/components/Banner'
import Entry from 'app/components/Entry/Entry'
import BuddyMessage from 'app/components/BuddyMessage'

import style from './style'

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.array,
    shouldShowDetail: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    persist: PropTypes.func,
    isActive: PropTypes.bool,
    onSwipeRight: PropTypes.func,
  }

  componentDidMount() {
    // this.scrollBottom()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.feed.length > prevProps.feed.length
      || this.props.shouldShowDetail !== prevProps.shouldShowDetail
    ) {
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

  onMinorTap = (ordinal) => {
    this.props.persist({
      ordinal: ordinal,
    })
  }

  render() {
    let emptyDaysBatch = 0
    let emptyDaysBatchTotal = 0
    const feed = this.props
    .feed
    .slice(0)
    .reverse()
    .map((unit, index) => {
      if (unit.type === "day") {
        let foundIndex = - 1
        if (this.props.shouldShowDetail) {
          this.props.feed.find((day, i) => {
            if (day.type === "day" && day.categories.hasOwnProperty(this.props.shouldShowDetail)) {
              foundIndex = i
              return true
            } else {
              return false
            }
          })
        }
        unit.hasEntries = this.props.shouldShowDetail
                ? unit.categories.hasOwnProperty(this.props.shouldShowDetail)
                : Object.keys(unit.categories).length > 0
        unit.isVisible = this.props.shouldShowDetail
                ? index >= foundIndex
                : true

        if (unit.hasEntries) {
          emptyDaysBatch = 0
        } else {
          emptyDaysBatch += 1
        }

        unit.emptyDaysBatch = emptyDaysBatch
      }

      return unit
    })
    .reverse()
    .map((unit) => {
      if (unit.type === "day") {
        if (unit.emptyDaysBatch > 0) {
          if (emptyDaysBatchTotal < unit.emptyDaysBatch) {
            emptyDaysBatchTotal = unit.emptyDaysBatch
          }
          unit.emptyDaysBatchTotal = emptyDaysBatchTotal
        } else {
          emptyDaysBatchTotal = 0
        }

        if (emptyDaysBatchTotal > 3) {
          unit.isVisible = false
        }
      }

      return unit
    })

    return (
      <div
        id="FEED"
        ref={this.getRefNode}
        style={[
          style.default,
          this.props.isSlid && style.isSlid,
        ]}
      >
        <Hammer
          onSwipe={this.props.onSwipeRight}
          direction={"DIRECTION_HORIZONTAL"}
        >
          <div>
            {feed.map((unit, index) => {
              switch (unit.type) {
                case "banner": {
                  return (
                    <Banner
                      key={unit.value}
                      color={unit.color}
                      value={unit.value}
                      isVisible={true}
                    />
                  )
                }
                case "day": {
                  return ([
                      unit.emptyDaysBatchTotal > 3 && unit.emptyDaysBatch === unit.emptyDaysBatchTotal && (
                        <div style={{paddingTop: (5 * unit.emptyDaysBatchTotal), paddingBottom: (5 * unit.emptyDaysBatchTotal), paddingLeft: 20}}>
                          <h2 style={{color: "#9E9E9E", fontSize: 16, width: 36, textAlign: "center"}}>
                            {`${unit.emptyDaysBatchTotal} days`}
                          </h2>
                        </div>
                      ),
                      <Entry
                        key={unit.ordinal}
                        minorValue={unit.value}
                        style={{color: "#9E9E9E"}}
                        styleMajor={{backgroundColor: "transparent"}}
                        isVisible={unit.isVisible && !unit.hasEntries}
                        onMinorTap={this.onMinorTap}
                        actionData={unit.ordinal}
                      />
                  ])
                }
                case "entry": {
                  return (
                    <Entry
                      key={unit.id}
                      value={unit.value}
                      minorValue={unit.day}
                      style={{color: unit.color}}
                      isVisible={
                        !this.props.shouldShowDetail || this.props.shouldShowDetail === unit.category
                      }
                      tag={`#${unit.category.substring(0, 3).toUpperCase()}`}
                      onTagTap={this.props.showDetail}
                      actionData={unit.category}
                    />
                  )
                }
                default: {
                  return (null)
                }
              }
            })}
            {false && (
              <BuddyMessage
                value={"What did you do today?"}
                isVisible={true}
              />
            )}
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(Feed)
