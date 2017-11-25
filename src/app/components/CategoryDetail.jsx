import React, { Component }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Chart                from 'app/components/Chart'
import Layer                from 'components/Layer/Layer'

// import style from './style'

const style = {
  layer: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // height: "100%",
    transition: "all 200ms ease",
    transform: "translateX(100%)",
    backgroundColor: "#212121",
  },
  isActive: {
    transform: "translateX(0)",
  },
  top: {
    flex: 4,
  },
  bottom: {
    flex: 6,
    overflow: "auto",
  },
  heading: {
    padding: "15px 0",
    textAlign: "center",
    position: "relative",
  },
  backButton: {
    border: 0,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px 10px 0 10px",
    color: "inherit",
    fontSize: 30,
    outline: "none",
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
  },
}

class CategoryDetail extends Component {
  static propTypes = {

  }

  static defaultProps = {
    data: {data: []}
  }

  render() {
    return (
      <div
        style={[
          style.layer,
          this.props.isActive && style.isActive,
        ]}
      >
        <div style={style.top}>
          <h1 style={style.heading}>
            <Hammer
              onTap={this.props.onSwipeRight}
            >
              <button style={style.backButton}>
                ←
              </button>
            </Hammer>
            {this.props.data.category}
          </h1>

          <Hammer
            onSwipe={this.props.onSwipeRight}
            direction={"DIRECTION_RIGHT"}
          >
            <div style={style.chartWrap}>
              <Chart
                key={this.props.data.category}
                ratio={2}
                data={this.props.data.data}
                maxHealth={20}
                index={0}
                name={this.props.data.category}
                showAxis={true}
                showPoints={true}
              />
            </div>
          </Hammer>
        </div>


        <div style={style.bottom}>
          <Hammer
            onSwipe={this.props.onSwipeRight}
            direction={"DIRECTION_RIGHT"}
          >
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
          </Hammer>
          <Hammer
            onSwipe={this.props.onSwipeRight}
            direction={"DIRECTION_RIGHT"}
          >
            <div style={style.detail}>
              {this.props.data.data.slice(0).reverse().map((d, i) => (
                <div
                  key={i}
                  style={[
                    !d.occurred_at && ({color: "#757575"})
                  ]}
                >
                  {d.occurred_at ? d.occurred_at : "-"}
                </div>
              ))}
            </div>
          </Hammer>
        </div>
      </div>
    )
  }
}

export default Radium(CategoryDetail)
