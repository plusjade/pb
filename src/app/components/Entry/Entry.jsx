import React, {Component}   from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

class Entry extends Component {
  static propTypes = {
    actionData: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    minorValue: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.element,
    ]),
    onMinorTap: PropTypes.func,
    style: PropTypes.object,
    styleMajor: PropTypes.object,
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
          this.props.status === "loading" && style.loading,
          this.props.status === "loaded" && style.end,
      ]}>
        <div
          style={[
            style.inner,
            this.props.reverse && style.reverse
          ]}
        >
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
          <div style={style.spacer} />
          <div
            style={[
              style.major,
              this.props.reverse && style.majorReverse,
              this.props.styleMajor,
            ]}
          >
            {React.Children.map(this.props.children, (c) => (c))}
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Entry)
