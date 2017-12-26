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
    backgroundColor: colors.background,
    zIndex: 4,
    // borderBottom: "1px solid #BDBDBD",

  },
  placeholder: {
    transition: "all 900ms ease 1s",
    height: 102,
  },
  isActive: {
    height: 300,
  },
  expandable: {
    transition: "all 900ms ease 1s",
    maxHeight: 0,
    overflow: "hidden",
  },
  isExpanded: {
    maxHeight: 1000,
  },
  topHeading: {
    textAlign: "center",
    lineHeight: "32px",
    fontSize: 12,
  },
  glanceWrap: {
    width: "100%",
    overflow: "auto",
  },
  glance: {
    display: "flex",
    // width: 500,
    alignItems: "center",
    borderTop: "1px solid #CCC",
    borderBottom: "1px solid #CCC",
  },
  glanceUnit: {
    flex: 1,
    textAlign: "center",
    borderLeft: "1px solid #CCC",
    borderRight: 0,
    padding: "10px 0",
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
    display: "none",
    // marginBottom: 20,
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
      <div>
        <div style={style.placeholder} />
        <div
          style={[
            style.layer,
          ]}
        >

          <div
            style={[
              style.expandable,
              this.props.isActive && style.isExpanded
            ]}
          >


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



            <Hammer onTap={this.props.onSwipeRight}>
              <h2 style={style.topHeading}>
                {this.props.data.category
                    ? `${this.props.data.category.toUpperCase()} ❌`
                    : "All"
                }
              </h2>
            </Hammer>

              <div style={style.glanceWrap}>
                <div style={style.glance}>
                  <div style={style.glanceUnit}>
                    <h2>{this.props.data.occurrences || 0}</h2>
                    <h5>entries</h5>
                  </div>
                  <div style={style.glanceUnit}>
                    <h2>{this.props.data.days_since_last  || 0}</h2>
                    <h5>since last</h5>
                  </div>
                  <div style={style.glanceUnit}>
                    <h2>{this.props.data.maxHealth  || 0}</h2>
                    <h5>best health</h5>
                  </div>
                </div>
              </div>



          </div>
        </div>
      </div>
    )
  }
}

export default Radium(CategoryDetail)
