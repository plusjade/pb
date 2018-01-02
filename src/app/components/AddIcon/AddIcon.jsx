import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

class AddIcon extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
    isActive: PropTypes.bool,
    isVisible: PropTypes.bool,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div style={[
          style.wrap,
          this.props.isVisible && style.isVisible,
          this.props.isActive && style.isActive,
        ]}>
          <div>
            {"+"}
          </div>
        </div>
      </Hammer>
    )
  }
}

export default Radium(AddIcon)
