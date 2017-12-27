import React, { Component }   from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'
import colors from 'app/colors'

const style = {
  topHeading: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: colors.background,
    textAlign: "center",
    lineHeight: "50px",
    fontSize: 20,
    // boxShadow: "rgba(33, 33, 33, 0.2) 1px 1px 10px",
    borderBottom: "1px solid #E0E0E0",
  },
}

class Heading extends Component {
  static propTypes = {
    value: PropTypes.string,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <h2 style={style.topHeading}>
          {this.props.value
              ? this.props.value.toUpperCase()
              : "All"
          }
        </h2>
      </Hammer>
    )
  }
}

export default Radium(Heading)
