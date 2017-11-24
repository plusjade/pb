import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Chart                from 'app/components/Chart'
import Layer                from 'components/Layer/Layer'

// import style from './style'

const style = {
  layer: {
    backgroundColor: "#212121",
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  default: {

  },
  heading: {
    padding: "15px 0",
    textAlign: "center",
  },
  chartWrap: {
    marginBottom: 40,
  },
  detail: {
    overflow: "auto",
    height: 300,
    color: "#424242",
  },
}

class CategoryDetail extends PureComponent {
  static propTypes = {

  }

  render() {
    return (
      <div style={style.layer}>
        <div style={style.default}>
          <h1 style={style.heading}>
            {this.props.data.category}
          </h1>
          <div style={style.chartWrap}>
            <Chart
              data={this.props.data.data}
              maxHealth={20}
              index={0}
              name={this.props.data.category}
              showAxis={true}
              showPoints={true}
            />
          </div>
          <div style={style.detail}>
            <h3>{`occurrences: ${this.props.data.occurrences}`}</h3>
            {this.props.data.data.reverse().map((d) => (
              <div>{d.ordinal}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(CategoryDetail)
