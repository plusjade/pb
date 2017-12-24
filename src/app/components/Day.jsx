import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'
import stickybits from 'stickybits'

const style = {
  default: {
  },
  heading: {
    fontSize: 22,
    position: "-webkit-sticky",
    position: "-moz-sticky",
    position: "-ms-sticky",
    position: "-o-sticky",
    position: "sticky",
    top: 4,
    left: 0,
    right: 0,
    color: "#FFF",
    margin: "5px 0",
  },
  addIcon: {
    border: 0,
    backgroundColor: "transparent",
    top: 10,
    right: 5,
    padding: "2px 10px 0 10px",
    color: "inherit",
    fontSize: 38,
    outline: "none",
    position: "absolute",
    top: 0,
    right: 0,
  },
  date: {
    display: "inline-block",
    width: 60,
    padding: "3px 10px 3px 5px",
    textAlign: "left",
    borderRadius: "0 15px 15px 0",
    fontSize: 14,
    color: "inherit",
  }
}

class Day extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    ordinal: PropTypes.string.isRequired,
    showDetail: PropTypes.func.isRequired,
  }

  componentDidMount() {
    setTimeout(() => {
      stickybits('.stickyDate')
    }, 300)
  }

  handleAdd = () => {
    if (this.props.showAddEntry) {
      this.props.closeAddEntry()
    } else {
      this.props.persist({
        ordinal: this.props.ordinal,
      })
    }
  }

  render() {
    return(
      <div style={style.default}>
        <h2
          className="stickyDate"
          style={style.heading}
        >
          <div
            style={[
              style.date,
              {color: this.props.color}
            ]}
          >
            <Hammer onTap={this.handleAdd}>
              <span>{`${this.props.value}`}</span>
            </Hammer>
          </div>
        </h2>
      </div>
    )
  }
}

export default Radium(Day)
