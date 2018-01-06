import React, { Component }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import style from './style'

class CategoryStats extends Component {
  static propTypes = {
    entries: PropTypes.number,
    days_since_last: PropTypes.number,
    maxHealth: PropTypes.number,
  }

  render() {
    return (
      <div style={style.wrap}>

        <div style={style.emoji}>
          {this.props.category.emoji}
        </div>

        {this.props.category.summaries && this.props.category.summaries.map((line, i)=> (
          <div
            key={i}
            style={style.box}
          >
            <span>{line}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default Radium(CategoryStats)
