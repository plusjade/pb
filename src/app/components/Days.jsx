import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Layer                from 'components/Layer/Layer'
import Day                from 'app/components/Day'
import colors from 'app/colors'

const style = {
  default: {
    backgroundColor: "#F5F5F5",
  },
  visualization: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: "all 200ms ease",
    transform: "translateX(93%)",
    boxShadow: `1px 1px 30px ${colors.borderColor}`,
  },
  isActive: {
    position: "absolute",
    transform: "translateX(0)",
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
  banner: {
    color: "#FFF",
    padding: "30px 10px",
    fontSize: 28,
    textAlign: "center",
  }
}
class Days extends PureComponent {
  handleAdd = () => {
    if (this.props.showAddEntry) {
      this.props.closeAddEntry()
    } else {
      this.props.persist({
        category: "",
      })
    }
  }

  render() {
    return (
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
          >
            <div style={style.default}>
              {this.props.days.map(day => (
                day.type === "banner" ? (
                  <div style={[
                    style.banner,
                    {backgroundColor: day.color}
                  ]}>
                    {day.value}
                  </div>
                ) : (
                  <Day
                    key={day.ordinal}
                    name={day.occurred_at}
                    color={day.color}
                    entries={day.entries}
                    ordinal={day.ordinal}
                    isToday={day.isToday}

                    remove={this.props.remove}
                    entryEdit={this.props.entryEdit}
                    persist={this.props.persist}
                    showAddEntry={this.props.showAddEntry}
                    showDetail={this.props.showDetail}
                    closeAddEntry={this.props.closeAddEntry}
                  />
                )
              ))}
            </div>
          </Hammer>
        </Layer>
      </div>
    )
  }
}

export default Radium(Days)
