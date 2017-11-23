// https://bl.ocks.org/mbostock/3883245
// https://bl.ocks.org/mbostock/3883195

import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import CategoryCard                from 'app/components/CategoryCard'

const style = {
  default: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#BDBDBD",
  },
  heading: {
    padding: "0 10px",
  },
}

class Visualization extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    maxHealth: PropTypes.number,
  }

  render() {
    return(
      <div style={style.default}>
        <h2 style={style.heading}>Last 14 days</h2>
        {this.props.data.map((d, index) => (
          <CategoryCard
            key={d.category}
            name={d.category}
            occurrences={d.occurrences}
            color={this.props.categoryOptions[d.category] && this.props.categoryOptions[d.category].color}
            data={d.data}
            maxHealth={this.props.maxHealth}
            index={index}
          />
        ))}
      </div>
    )
  }
}

export default Radium(Visualization)
