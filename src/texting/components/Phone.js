import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Bubble               from './Bubble'
import Message              from './Message'
import Typing               from './Typing'

const phone = {
  default: {
    backgroundColor: "#FFF",
    flexGrow: 1,
    height: "100%",
    maxWidth: "375px",
    position: "relative",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    border: 0,
  },
}

const texting = {
  default: {
    position: "absolute",
    bottom: "5px",
    left: 0,
    right: 0,
  },
}

class Phone extends Component {
  static propTypes = {
    chatsIndex: PropTypes.array.isRequired,
    chatsObjects: PropTypes.object.isRequired,
    chatsIncomingObjectId: PropTypes.number,
    chatsIncomingObjectStatus: PropTypes.string,
  }

  render() {
    return (
      <div style={phone.default}>
        <div style={texting.default}>
        {this.props.chatsIndex.map((id) => {
          const object = this.props.chatsObjects[id]
          let status = "loaded"
          if (id === this.props.chatsIncomingObjectId) {
            status = this.props.chatsIncomingObjectStatus
          }

          return (
            <Message status={status} key={id}>
              <Bubble type={object.type}>
                <span>{object.value}</span>
              </Bubble>
            </Message>
          )
        })}
        </div>

        <Typing
          status={this.props.chatsIncomingObjectStatus}
        />
      </div>
    )
  }
}

export default Radium(Phone)
