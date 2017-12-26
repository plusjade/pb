import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'
import colors from 'app/colors'

import style from './style'

class Entry extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    showDetail: PropTypes.func.isRequired,
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
          <div style={style.minor}>
            <div style={[
              style.date,
              this.props.style
            ]}>
              {this.props.minorValue}
            </div>
          </div>

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
