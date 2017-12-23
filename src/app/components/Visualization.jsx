// https://bl.ocks.org/mbostock/3883245
// https://bl.ocks.org/mbostock/3883195

import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Layer                from 'components/Layer/Layer'
import CategoryCard                from 'app/components/CategoryCard'

import colors from 'app/colors'

const style = {
  default: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.background,
    overflow: "auto",
  },
  heading: {
    textAlign: "center",
    textDecoration: "underline",
  },
  top: {
    display: "flex",
    marginBottom: 10,
  },
  topUnit: {
    flex: 1,
    padding: "15px 0 10px 0",
    margin: "0 10px",
    textAlign: "center",
  },
  topUnitActive: {
    borderBottom: "1px solid #616161",
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
        ]}
      >
        <Layer isActive={this.props.isActive} style={{zIndex: 5}}>
          <Hammer
            onSwipe={this.props.showVizIndex}
            direction={"DIRECTION_LEFT"}
            onTap={(e) => {
              if (this.props.isActive) { return }
              e.preventDefault()
              this.props.showVizIndex()
            }}
          >
            <div style={style.default}>
              <div style={style.top}>
                <h5 style={style.topUnit} />
                <h5 style={[style.topUnit, style.topUnitActive]}>
                  Last 14 days
                </h5>
                <h5 style={style.topUnit} />
              </div>
              {this.props.data.map(d => (
                <CategoryCard
                  key={d.category}
                  name={d.category}
                  occurrences={d.occurrences}
                  data={d.data}
                  maxHealth={this.props.maxHealth}
                  showDetail={this.props.showDetail}
                  persist={this.props.persist}
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
