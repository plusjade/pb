import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import colors from 'app/colors'

const style = {
  wrap: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    transition: "all 300ms ease",
    backgroundColor: colors.secondaryBackground,
    borderRadius: "15px 15px 0 0",
    transform: "translateY(100%)",
  },
  isActive: {
    transition: "all 300ms ease",
    transform: "translateY(0)",
  },
}

class BottomPanel extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    isActive: PropTypes.bool,
  }

  render() {
    return (
      <div
        style={[
          style.wrap,
          this.props.isActive && style.isActive,
        ]}
      >
        {React.Children.map(this.props.children, (c) => (c))}
      </div>
    )
  }
}

export default Radium(BottomPanel)
