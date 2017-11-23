import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Entry from 'app/components/Entry'
import Category                from 'app/components/Category'


const style = {
  default: {
    padding: "20px 10px",
    backgroundColor: "#424242",
    borderBottom: "2px solid #222",
    color: "#9E9E9E",
  },
  isToday: {
    backgroundColor: "#FFF",
    height: 300,
    color: "#333",
  },
  heading: {
    fontSize: 20,
    color: "inherit",
    fontWeight: 600,
  },
  entriesWrap: {
    marginTop: 20,
  },

  addIcon: {
    float: "right",
    textDecoration: "none",
    padding: 5,
  },
  hello: {
    overflow: "hidden",
    maxHeight: 0,
    transition: "all 200ms ease",
  },
  isExpanded: {
    maxHeight: 200,
  },
}

class Day extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    ordinal: PropTypes.string.isRequired,
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
    this.props.handleAddEntry(this.props.ordinal)
  }

  render() {
    const entries = this.props.entries.reduce((memo, e) => {
      memo[e.category] = e.id
      return memo
    }, {})
    const categories = Object.keys(entries)
    return(
      <div style={[
        style.default,
        this.props.isToday && style.isToday,
      ]}>
        <div
          onClick={this.toggleExpand}
          style={[style.heading]}
        >
          <span style={{color: this.props.color}}>
            {`${this.props.name}`}
          </span>
        </div>
        <div style={style.entriesWrap}>
          <div style={{marginTop: 10}}>
            {categories.sort().map((key) => (
              <Category
                key={key}
                name={key}
                color={this.props.categoryOptions[key] && this.props.categoryOptions[key].color}
                isActive={true}
                onClick={this.handleToggle}
                id={entries[key]}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Day)
