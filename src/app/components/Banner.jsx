import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

const style = {
  default: {
    color: "#FFF",
    marginTop: 10,
    padding: "5px 5px 0 5px",
    lineHeight: "26px",
    fontSize: 12,
    textAlign: "center",
    zIndex: 2,
    display: "inline-block",
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
            color: "#616161",
            borderTop: `1px solid ${"#BDBDBD"}`,
          },
        ]}
      >
        {this.props.value}
      </div>
    )
  }
}

export default Radium(Banner)
