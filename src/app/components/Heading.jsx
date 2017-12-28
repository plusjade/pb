import React, { Component }   from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'
import colors from 'app/colors'

const style = {
  topHeading: {
    flex: 1,
    zIndex: 2,
    backgroundColor: colors.secondaryBackground,
    textAlign: "center",
    lineHeight: "46px",
    fontSize: 20,
    borderBottom: `1px solid ${colors.secondaryBorder}`,
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
