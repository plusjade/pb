import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

const style = {
  closeIcon: {
    position: "fixed",
    bottom: 10,
    right: 10,
    fontSize: 30,
    display: "block",
    textAlign: "center",
    zIndex: 3,
    border: 0,
    background: "transparent",
  },
}

class Close extends PureComponent {
  handleClick = () => {
    this.props.onClick()
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        style={style.closeIcon}
      >
        <span>{"❌"}</span>
      </button>
    )
  }
}

export default Radium(Close)
