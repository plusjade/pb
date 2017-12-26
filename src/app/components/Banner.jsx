import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

const style = {
  default: {
    color: "#FFF",
    margin: "10px 0",
    padding: "0 15px",
    lineHeight: "26px",
    fontSize: 14,
    textAlign: "center",
    zIndex: 2,
    display: "inline-block",
    borderRadius: "0 10px 10px 0",
  }
}

class Banner extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div
        style={[
          style.default,
          {
            backgroundColor: this.props.color,
          }
        ]}
      >
        {this.props.value.substring(0,3).toUpperCase()}
      </div>
    )
  }
}

export default Radium(Banner)
