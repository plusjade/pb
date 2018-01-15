import React, { Component }   from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'
import colors from 'app/colors'

const style = {
  default: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    borderBottom: `1px solid ${colors.secondaryBorder}`,
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
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  }
}


class Heading extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    toggleAccount: PropTypes.func,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div style={[style.default, this.props.style]}>
          <div style={style.cell} />
          <div style={[style.cell, {fontSize: 26}]}>
            <h2 style={style.textStyle}>
              {this.props.value}
            </h2>
          </div>

          <Hammer onTap={this.props.toggleAccount}>
            <div style={[style.cell, {fontSize: 26}]}>
              {this.props.userAvatarUrl
              ? (
                <img src={this.props.userAvatarUrl} style={style.avatar} />
              ) : (
                "🤠"
              )
             }
            </div>
          </Hammer>
        </div>
      </Hammer>
    )
  }
}

export default Radium(Heading)
