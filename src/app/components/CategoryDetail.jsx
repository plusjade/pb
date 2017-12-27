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
    top: 32, // height of the Header
    left: 0,
    right: 0,
    paddingTop: 15,
    backgroundColor: colors.primaryBackground,
    zIndex: 4,
    transition: "all 200ms ease",
    transform: "translateY(-84%)",
    color: "rgba(33,33,33, 0.5)"
  },
  isExpanded: {
    transform: "translateY(0)",
    color: "inherit",
  },
  placeholder: {
    // transition: "all 900ms ease",
    height: 80,
  },
  expandable: {
    transition: "all 900ms ease 1s",
    maxHeight: 0,
    overflow: "hidden",
  },
  chartWrap: {

  },
}

class CategoryDetail extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  static defaultProps = {
    data: {data: []}
  }

  state = {
    isExpanded: false,
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

  handleTap = () => {
    this.setState({isExpanded: !this.state.isExpanded})
  }

  render() {
    return (
      <div>
        <div style={style.placeholder} />
        <Hammer
          onTap={this.handleTap}
          onSwipe={this.handleTap}
          direction={"DIRECTION_UP"}
        >
          <div style={[
            style.wrap,
            this.state.isExpanded && style.isExpanded
          ]}>
            <div>
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

              <CategoryStats
                occurrences={this.props.data.occurrences || 0}
                days_since_last={this.props.data.days_since_last || 0}
                maxHealth={this.props.data.maxHealth || 0}
              />
            </div>
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(CategoryDetail)
