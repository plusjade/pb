import React, { Component }   from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'
import colors from 'app/colors'

const style = {
  default: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    textAlign: "center",
    lineHeight: "46px",
    fontSize: 18,
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
        <h2 style={[style.default, this.props.style]}>
          {this.props.value}
        </h2>
      </Hammer>
    )
  }
}

export default Radium(Heading)
