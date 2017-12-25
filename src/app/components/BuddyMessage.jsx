import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'
import colors from 'app/colors'

const style = {
  default: {
    margin: "10px 60px 30px 10px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    color: "#616161",
    padding: "15px 20px",
    borderRadius: 10,
    position: "relative",
    backgroundColor: "#EEEEEE",
  },
}

class BuddyMessage extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }

  render() {
    return(
      <div
        style={[
          style.default
        ]}
      >
        <div style={{flex: 1}}>
          <span>{this.props.value}</span>
        </div>
      </div>
    )
  }
}

export default Radium(BuddyMessage)
