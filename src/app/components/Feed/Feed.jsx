import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import Banner from 'app/components/Banner'
import Entry from 'app/components/Entry/Entry'

import style from './style'

class Feed extends Component {
  static propTypes = {
    feed: PropTypes.array,
    activeCategory: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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
      || this.props.activeCategory !== prevProps.activeCategory
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
    return (
      <div
        id="FEED"
        ref={this.getRefNode}
        style={[
          style.default,
        ]}
      >
        <Hammer
          onSwipe={this.props.onSwipeRight}
          direction={"DIRECTION_HORIZONTAL"}
        >
          <div>
            {this.props.feed.map((unit, index) => {
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
                  const isBatch = unit.emptyDaysBatchTotal > 3
                  const isFirst = unit.emptyDaysBatch === unit.emptyDaysBatchTotal
                  if (unit.hasEntries || (!isBatch && isFirst)) {
                    return (
                      <div
                        style={{
                          fontSize: 12,
                          padding: "3px 20px 3px",
                          textAlign: "right",
                          color: unit.hasEntries ? unit.color : "#9E9E9E",
                          opacity: unit.hasEntries ? 1 : 0,
                        }}
                      >
                        {unit.value}
                      </div>
                    )
                  } else if (isBatch && isFirst) {
                    return (
                      <div
                        style={{
                          paddingTop: (4 * unit.emptyDaysBatchTotal),
                          paddingBottom: (4 * unit.emptyDaysBatchTotal),
                          paddingRight: 20,
                          textAlign: "right",
                        }}
                      >
                        <h2
                          style={{
                            color: "#9E9E9E",
                            fontSize: 16,
                          }}
                        >
                          {`${unit.emptyDaysBatchTotal} days`}
                        </h2>
                      </div>
                    )
                  } else {
                    return (null)
                  }
                }
                case "entry": {
                  return (
                    <Entry
                      key={unit.id}
                      isVisible={
                        !this.props.activeCategory || this.props.activeCategory === unit.category
                      }
                      tag={`#${unit.category.substring(0, 3).toUpperCase()}`}
                      onTagTap={this.props.activateCategory}
                      actionData={unit.category}
                    >
                      <span>{unit.value}</span>
                    </Entry>
                  )
                }
                case "botEntry": {
                  const content = Array.isArray(unit.value) ? unit.value : [unit.value]
                  return (
                    <Entry
                      minorValue={unit.emoji && (
                        <span style={style.botEmoji}>
                          {unit.emoji}
                        </span>
                      )}
                      isVisible={unit.isVisible}
                      reverse={true}
                    >
                      {content.map((line) => (
                        <span>{`${line} `}</span>
                      ))}
                    </Entry>
                  )
                }
                default: {
                  return (null)
                }
              }
            })}

            {[].map((content, i) => (
              <Entry
                minorValue={i === 0 && (
                  <span style={{fontSize: 26}}>{"🤖"}</span>
                )}
                isVisible={true}
                reverse={true}
              >
                {content}
              </Entry>
            ))}

            {React.Children.map(this.props.children, (c) => (c))}
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(Feed)
