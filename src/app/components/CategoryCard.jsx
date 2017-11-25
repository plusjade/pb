import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'
import Chart              from 'app/components/Chart'

const style = {
  default: {
    minHeight: 100,
    padding: 5,
    boxSizing: "border-box",
    marginBottom: 10,
    position: "relative",
  },
  addIcon: {
    position: "absolute",
    top: 5,
    left: 0,
    padding: 5,
  },
  name: {
    fontSize: 20,
    lineHeight: "1.8em",
    textAlign: "center",
  }
}

class CategoryCard extends PureComponent {

  handleSelect = () => {
    this.props.showDetail(this.props.name)
  }

  handleAdd = () => {
    this.props.persist({
      ordinal: this.props.day.ordinal,
      value: "",
      category: this.props.name,
    })
  }

  render() {
    return (
      <div
        style={[
          style.default,
          {color: this.props.color},
        ]}
      >
        <Hammer onTap={this.handleAdd}>
          <h2 style={style.addIcon}>+</h2>
        </Hammer>
        <Hammer onTap={this.handleSelect}>
          <h2 style={style.name}>
            <span>{this.props.name}</span>
          </h2>
        </Hammer>
        <Hammer onTap={this.handleSelect}>
          <div>
            <Chart
              data={this.props.data}
              color={this.props.color}
              maxHealth={this.props.maxHealth}
              index={this.props.index}
              name={this.props.name}
            />
          </div>
        </Hammer>
      </div>
    )
  }
}


export default Radium(CategoryCard)
