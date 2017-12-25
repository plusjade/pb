import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import stickybits from 'stickybits'

const style = {
  default: {
    position: "-webkit-sticky",
    position: "-moz-sticky",
    position: "-ms-sticky",
    position: "-o-sticky",
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    color: "#FFF",
    padding: "0 10px",
    height: 60,
    lineHeight: "60px",
    fontSize: 26,
    textAlign: "center",
    zIndex: 2,
    backgroundColor: "#F5F5F5",
    margin: "20px 0",
  }
}

class Banner extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      stickybits('.sticky')
    }, 300)
  }
  render() {
    return (
      <div className="sticky" style={[
        style.default,
        {
          color: this.props.color,
        }
      ]}>
        {this.props.value}
      </div>
    )
  }
}

export default Radium(Banner)
