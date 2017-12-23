import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'
import stickybits from 'stickybits'

import Category                from 'app/components/Category'
import Entry                   from 'app/components/Entry'

import colors from 'app/colors'

const style = {
  default: {
    padding: "0 10px 20px 0",
  },
  isToday: {
    height: 300,
  },
  heading: {
    display: "inline-block",
    fontSize: 22,
    zIndex: 3,
    position: "-webkit-sticky",
    position: "-moz-sticky",
    position: "-ms-sticky",
    position: "-o-sticky",
    position: "sticky",
    top: 4,
    left: 0,
    right: 0,
    paddingTop: 20,
    color: "#FFF",
  },
  entriesWrap: {
    marginTop: 20,
    marginLeft: 50,
  },

  addIcon: {
    border: 0,
    backgroundColor: "transparent",
    top: 10,
    right: 5,
    padding: "2px 10px 0 10px",
    color: "#FFF",
    fontSize: 38,
    outline: "none",
    position: "absolute",
    top: 0,
    right: 0,
  },
  date: {
    display: "inline-block",
    width: 60,
    padding: "5px 10px 5px 0",
    textAlign: "center",
    borderRadius: "0 15px 15px 0",
    fontSize: 14,
  }
}

class Day extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
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
    const entries = this.props.entries.reduce((memo, e) => {
      memo[e.category] = e.id
      return memo
    }, {})
    const categories = Object.keys(entries)
    const [date, weekday] = this.props.name.split(" ")
    return(
      <div style={[
        style.default
      ]}>
        <h2
          className="stickyDate"
          data-ordinal={this.props.ordinal}
          style={[
            style.heading,
          ]}
        >
          <div style={
            [
              style.date,
              {backgroundColor: this.props.color}
            ]
          }>
            <Hammer onTap={this.handleAdd}>
              <span>{`${this.props.name} +`}</span>
            </Hammer>
          </div>
        </h2>
        <div style={style.entriesWrap}>
          <div style={{marginTop: 10}}>
            {this.props.entries.sort().map((entry) => (
              <Entry
                {...entry}
                key={entry.id}
                showDetail={this.props.showDetail}
                color={this.props.color}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Day)
