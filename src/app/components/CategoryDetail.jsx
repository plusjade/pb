import React, { Component }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Chart                from 'app/components/Chart'
import CategoryStats        from 'app/components/CategoryStats/CategoryStats'

import colors from 'app/colors'
// import style from './style'

const style = {
  wrap: {
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
  chartWrap: {
    display: "none",
  },
}

class CategoryDetail extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
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
            style.wrap,
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

            <CategoryStats
              occurrences={this.props.data.occurrences || 0}
              days_since_last={this.props.data.days_since_last || 0}
              maxHealth={this.props.data.maxHealth || 0}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(CategoryDetail)
