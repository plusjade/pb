import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Banner from 'app/components/Banner'
import Entry from 'app/components/Entry/Entry'
import Prompt from 'app/components/Prompt/Prompt'

const style = {
  botEmoji: {
    fontSize: 26,
  },
}

class FeedItemRenderer extends Component {
  static propTypes = {
    unit: PropTypes.object.isRequired,
  }

  render() {
    const unit = this.props.unit
    let status = "loaded"
    if (this.props.unit.id === this.props.chatsIncomingObjectId) {
      status = this.props.chatsIncomingObjectStatus
    }

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
      case "prompt": {
        return (
          <Prompt
            {...unit}
            promptKey={unit.key}
            onSelect={this.props.promptsAddResponse}
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
            actionData={unit.category}
            status={status}
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
            reverse={true}
            status={status}
          >
            {content.map((line, i) => (
              <span key={i}>{`${line} `}</span>
            ))}
          </Entry>
        )
      }
      default: {
        return (null)
      }
    }
  }
}

export default Radium(FeedItemRenderer)
