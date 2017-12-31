import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

const style = {
  default: {
    marginTop: 10,
    zIndex: 2,
  },
  inner: {
    padding: "5px 5px 0 5px",
    lineHeight: "26px",
    fontSize: 12,
    display: "inline-block",
    textAlign: "center",
    color: "#616161",
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
        <div
          style={[
            style.inner,
            {borderTop: `1px solid ${"#BDBDBD"}`},
          ]}
        >
          {this.props.value}
        </div>
      </div>
    )
  }
}

export default Radium(Banner)
