import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

const style = {
  default: {
    color: "#FFF",
    marginTop: 10,
    padding: "5px 5px 0 5px",
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
            color: this.props.color,
            borderTop: `1px solid ${this.props.color}`,
            // borderLeft: `1px solid ${this.props.color}`,
            borderRadius: 0,
          },
        ]}
      >
        {this.props.value}
      </div>
    )
  }
}

export default Radium(Banner)
