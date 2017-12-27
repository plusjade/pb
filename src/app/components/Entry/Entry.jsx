import React, {Component}   from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

class Entry extends Component {
  static propTypes = {
    actionData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    isVisible: PropTypes.bool,
    minorValue: PropTypes.string,
    onTagTap: PropTypes.func,
    onMinorTap: PropTypes.func,
    style: PropTypes.object,
    styleMajor: PropTypes.object,
    tag: PropTypes.string,
    value: PropTypes.string,
  }

  handleMinorTap = () => {
    if (typeof this.props.onMinorTap === "function") {
      this.props.onMinorTap(this.props.actionData)
    }
  }

  handleTagTap = () => {
    this.props.onTagTap(this.props.actionData)
  }

  render() {
    return(
      <div
        style={[
          style.wrap,
          this.props.isVisible && style.isVisible
      ]}>
        <div style={style.inner}>
          <Hammer onTap={this.handleMinorTap}>
            <div style={style.minor}>
              <div style={[
                style.date,
                this.props.style
              ]}>
                {this.props.minorValue}
              </div>
            </div>
          </Hammer>
          <div style={[style.major, this.props.styleMajor]}>
            {this.props.tag && (
              <Hammer onTap={this.handleTagTap}>
                <div style={style.tag}>
                  {this.props.tag}
                </div>
              </Hammer>
            )}
            <span>
              {this.props.value}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Entry)
