import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

class OpacityMask extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
    isActive: PropTypes.bool,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div
          style={[
            style.default,
            this.props.isActive && style.isActive,
          ]}
        />
      </Hammer>
    )
  }
}

export default Radium(OpacityMask)
