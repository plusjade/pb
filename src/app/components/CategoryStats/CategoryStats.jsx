import React, { Component }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import style from './style'

class CategoryStats extends Component {
  static propTypes = {
    occurrences: PropTypes.number,
    days_since_last: PropTypes.number,
    maxHealth: PropTypes.number,
  }

  render() {
    return (
      <div style={style.wrap}>
        <div style={style.default}>
          <div style={style.panel}>
            <h2>{this.props.occurrences || 0}</h2>
            <h5>entries</h5>
          </div>
          <div style={style.panel}>
            <h2>{this.props.days_since_last || 0}</h2>
            <h5>since last</h5>
          </div>
          <div style={style.panel}>
            <h2>{this.props.maxHealth || 0}</h2>
            <h5>best health</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(CategoryStats)
