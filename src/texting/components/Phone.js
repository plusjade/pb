import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Entry from 'app/components/Entry/Entry'

class Phone extends Component {
  static propTypes = {
    chatsIndex: PropTypes.array.isRequired,
    chatsObjects: PropTypes.object.isRequired,
    chatsIncomingObjectId: PropTypes.number,
    chatsIncomingObjectStatus: PropTypes.string,
  }

  render() {
    return (
      <div>
        {this.props.chatsIndex.map((id, index) => {
          const object = this.props.chatsObjects[id]
          let status = "loaded"
          if (id === this.props.chatsIncomingObjectId) {
            status = this.props.chatsIncomingObjectStatus
          }

          return (
            <Entry
              minorValue={index === 0 && (
                <span style={{fontSize: 26}}>
                  {"🤖"}
                </span>
              )}
              isVisible={false}
              status={status}
              reverse={true}
            >
              <span>{object.value}</span>
            </Entry>
          )
        })}
      </div>
    )
  }
}

export default Radium(Phone)
