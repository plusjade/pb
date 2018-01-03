import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

const style = {
  default: {
    margin: "20px 0",
    zIndex: 2,
  },
  inner: {
    padding: "5px 5px 0 5px",
    lineHeight: "26px",
    fontSize: 15,
    textAlign: "left",
    color: "#616161",
    borderTop: "1px solid #EEE",
  }
}

class Banner extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div style={style.default}>
        <div style={style.inner}>
          {this.props.value}
        </div>
      </div>
    )
  }
}

export default Radium(Banner)
