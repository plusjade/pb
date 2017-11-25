import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Chart                from 'app/components/Chart'
import Layer                from 'components/Layer/Layer'

// import style from './style'

const style = {
  layer: {
    backgroundColor: "#212121",
    zIndex: 2,
    position: "absolute",
    top: 0,
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

  },
  detail: {
    // color: "#424242",
    padding: 10,
  },
  glance: {
    display: "flex",
    marginTop: 20,
    marginBottom: 40,
  },
  glanceUnit: {
    flex: 1,
    textAlign: "center",

  }
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
              ratio={2}
              data={this.props.data.data}
              maxHealth={20}
              index={0}
              name={this.props.data.category}
              showAxis={true}
              showPoints={true}
            />
          </div>
          <div style={style.glance}>
            <div style={style.glanceUnit}>
              <h2>{this.props.data.occurrences}</h2>
              <h5>occurrences</h5>
            </div>
            <div style={style.glanceUnit}>
              <h2>3</h2>
              <h5>since last</h5>
            </div>
            <div style={style.glanceUnit}>
              <h2>{20}</h2>
              <h5>health</h5>
            </div>
          </div>
          <div style={style.detail}>
            {this.props.data.data.slice(0).reverse().map((d) => (
              <div
                style={[
                  !d.occurred_at && ({color: "#757575"})
                ]}
              >
                {d.occurred_at ? d.occurred_at : "-"}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(CategoryDetail)
