import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Chart                from 'app/components/Chart'
// import style from './style'

const style = {
  default: {

  },
  heading: {
    padding: "0 10px",
  },

}

class CategoryDetail extends PureComponent {
  static propTypes = {

  }

  render() {
    return (
      <div style={style.default}>
        <h2 style={style.heading}>{this.props.data.category}</h2>
        <Chart
          data={this.props.data.data}
          maxHealth={20}
          index={0}
          name={this.props.data.category}
          showAxis={true}
        />
        <h3>{`occurrences: ${this.props.data.occurrences}`}</h3>
        {this.props.data.data.map((d) => (
          <div>{d.ordinal}</div>
        ))}
      </div>
    )
  }
}

export default Radium(CategoryDetail)
