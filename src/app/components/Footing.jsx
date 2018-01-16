import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'
import colors from 'app/colors'

import AddIcon from 'app/components/AddIcon/AddIcon'

const style = {
  default: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    borderTop: `1px solid ${colors.secondaryBorder}`,
    height: "100%",
  },
  textStyle: {
    lineHeight: "46px",
    fontSize: 18,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cellInner: {
    flex: 1,
  }
}

class Footing extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
  }

  render() {
    return (
      <div style={style.default}>
        {false && this.props.isLoggedIn && (
          <Hammer onTap={this.props.toggleCategoryList}>
            <div style={[style.cell, {fontSize: 26}]}>
              {"#️️"}
            </div>
          </Hammer>
        )}
        {this.props.isLoggedIn && (
          <div style={style.cell}>
            <AddIcon
              onTap={this.props.addIconOnTap}
              isActive={this.props.addIconIsActive}
              isVisible={this.props.addIconIsVisible}
            />
          </div>
        )}
        {false && this.props.isLoggedIn && (
          <Hammer onTap={this.props.toggleShowRightPanel}>
            <div style={[style.cell, {fontSize: 26}]}>
              {"📈"}
            </div>
          </Hammer>
        )}
      </div>
    )
  }
}

export default Radium(Footing)
