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
    fontSize: 16,
    textAlign: "left",
    color: "#616161",
    borderTop: "1px dashed #EEE",
  }
}

class Banner extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
  }

  render() {
    const children = React.Children.toArray(this.props.children)
    return (
      <div style={style.default}>
        <div style={style.inner}>
          <span>
            {children[0]}
          </span>
          <span style={{float: "right", fontSize: 12, marginRight: 4}}>
            {children[1]}
          </span>
        </div>
      </div>
    )
  }
}

export default Radium(Banner)
