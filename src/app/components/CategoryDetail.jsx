import React, { Component }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Chart                from 'app/components/Chart'
import Layer                from 'components/Layer/Layer'

import colors from 'app/colors'
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
    backgroundColor: colors.background,
    zIndex: 4,
  },
  isActive: {
    transform: "translateX(0)",
  },
  glance: {
    display: "flex",
    marginTop: 10,
    marginBottom: 25,
  },
  glanceUnit: {
    flex: 1,
    textAlign: "center",
  },
  top: {
    flex: 5,
  },
  topActive: {
    // boxShadow: "rgb(0, 0, 0) 1px 1px 20px",
  },
  bottom: {
    flex: 5,
    overflow: "auto",
    paddingTop: 10,
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
    display: "flex",
    width: "100%",
    overflow: "auto",
    padding: "20px 0",
    boxShadow: colors.boxShadow,
    marginTop: 40,
  },
  detailUnit: {
    flex: 1,
    padding: 15,
    textAlign: "center",
    borderRadius: 100,
    backgroundColor: colors.secondary,
    margin: "0 5px",
  },
  detailUnitOff: {
    color: "#757575",
    backgroundColor: "transparent",
  },

  addIcon: {
    border: 0,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    right: 0,
    padding: "2px 10px 0 10px",
    color: "inherit",
    fontSize: 38,
    outline: "none",
  },
  timelineHeading: {
    padding: "10px 0 0 10px",
  },
}

class CategoryDetail extends Component {
  static propTypes = {

  }

  static defaultProps = {
    data: {data: []}
  }

  handleAdd = () => {
    if (this.props.showAddEntry) {
      this.props.closeAddEntry()
    } else {
      this.props.persist({
        category: this.props.data.category,
      })
    }
  }

  render() {
    return (
      <div
        style={[
          style.layer,
          this.props.isActive && style.isActive,
        ]}
      >
        <div
          style={[
            style.top,
            this.props.isActive && style.topActive,
          ]}
        >
          <h1 style={style.heading}>
            <Hammer onTap={this.props.onSwipeRight}>
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
            <div style={style.glance}>
              <div style={style.glanceUnit}>
                <h2>{this.props.data.occurrences}</h2>
                <h5>entries</h5>
              </div>
              <div style={style.glanceUnit}>
                <h2>{this.props.data.days_since_last}</h2>
                <h5>since last</h5>
              </div>
              <div style={style.glanceUnit}>
                <h2>{this.props.data.maxHealth}</h2>
                <h5>best health</h5>
              </div>
            </div>
          </Hammer>

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
          <div style={style.detail}>
            {this.props.data.data.map((d, i) => (
              <div
                key={i}
                style={[
                  style.detailUnit,
                  !d.occurred_at && style.detailUnitOff
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
