import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

// TODO: Perhaps an allowed type list is needed
class TextFormat extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  render() {
    const props = {}
    let element = this.props.type || "span"
    if (element === "huge") {
      element = "strong"
      props.style = {fontSize: 40}
    }

    return (
      React.createElement(element, props, this.props.value)
    )
  }
}

export default Radium(TextFormat)
