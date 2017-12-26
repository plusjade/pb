import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import style from './Style'

class Layer extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    isActive: PropTypes.bool,
  }

  render() {
    return (
      <div
        style={[
          style.layer,
          this.props.style,
          this.props.isActive && style.isActive
        ]}
      >
        {React.Children.only(this.props.children)}
      </div>
    )
  }
}

export default Radium(Layer)
