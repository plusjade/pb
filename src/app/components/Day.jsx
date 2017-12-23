import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Category                from 'app/components/Category'
import Entry                   from 'app/components/Entry'

import colors from 'app/colors'

const style = {
  default: {
    padding: "20px 10px",
    position: "relative",
  },
  isToday: {
    height: 300,
  },
  heading: {
    fontSize: 22,
    marginLeft: 5,
  },
  entriesWrap: {
    marginTop: 20,
    marginLeft: 50,
  },

  addIcon: {
    border: 0,
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    right: 5,
    padding: "2px 10px 0 10px",
    color: "inherit",
    fontSize: 38,
    outline: "none",
  },

}

class Day extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    ordinal: PropTypes.string.isRequired,
    showDetail: PropTypes.func.isRequired,
  }

  handleToggle = (category) => {
    const categories = this.props.entries.map((e) => (e.category))
    if (categories.includes(category.name)) {
      this.props.remove(category.id)
    } else {
      this.props.persist({
        ordinal: this.props.ordinal,
        value: "",
        category: category.name,
      })
    }
  }

  toggleExpand = () => {
    this.props.showAddEntry(this.props.ordinal)
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
        <Hammer onTap={this.handleAdd}>
          <button style={style.addIcon}>
            {this.props.showAddEntry ? (
              "✕"
            ) : (
              "+"
            )}
          </button>
        </Hammer>

        <h2
          onClick={this.toggleExpand}
          style={[
            style.heading,
          ]}
        >
          <div>
            {`${date}`}
          </div>
          {weekday && (
            <div style={{fontSize: 14}}>
              {`${weekday}`}
            </div>
          )}
        </h2>
        <div style={style.entriesWrap}>
          <div style={{marginTop: 10}}>
            {this.props.entries.sort().map((entry) => (
              <Entry
                {...entry}
                key={entry.id}
                showDetail={this.props.showDetail}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Day)
