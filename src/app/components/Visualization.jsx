// https://bl.ocks.org/mbostock/3883245
// https://bl.ocks.org/mbostock/3883195

import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Layer                from 'components/Layer/Layer'
import CategoryCard                from 'app/components/CategoryCard'

const style = {
  default: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#212121",
    overflow: "auto",
  },
  heading: {
    padding: "15px 0 15px 5px",
    color: "#424242",
  },
  visualization: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: "all 200ms ease",
    transform: "translateX(93%)",
    boxShadow: "1px 1px 30px #121212",
  },
  isActive: {
    position: "absolute",
    transform: "translateX(0)",
  },
}

class Visualization extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    maxHealth: PropTypes.number,
  }

  render() {
    return(
      <div
        style={[
          style.visualization,
          this.props.isActive && style.isActive,
        ]}
      >
        <Layer isActive={this.props.isActive}>
          <Hammer
            onSwipe={this.props.showVizIndex}
            direction={"DIRECTION_RIGHT"}
            onTap={(e) => {
              if (this.props.isActive) { return }
              e.preventDefault()
              this.props.showVizIndex()
            }}
          >
            <div style={style.default}>
              <h1 style={style.heading}>
                Last 14 days
              </h1>
              {this.props.data.map(d => (
                <CategoryCard
                  key={d.category}
                  name={d.category}
                  occurrences={d.occurrences}
                  color={this.props.categoryOptions[d.category] && this.props.categoryOptions[d.category].color}
                  data={d.data}
                  maxHealth={this.props.maxHealth}
                  showDetail={this.props.showDetail}
                />
              ))}
            </div>
          </Hammer>
        </Layer>
      </div>
    )
  }
}

export default Radium(Visualization)
