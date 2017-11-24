import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Chart              from 'app/components/Chart'

const style = {
  default: {
    minHeight: 100,
    padding: 5,
    boxSizing: "border-box",

  },
  name: {
    fontSize: 16,
    lineHeight: "1.4em",
    fontWeight: 400,
    marginTop: 5,
    color: "#424242"
  }
}

class CategoryCard extends PureComponent {

  handleClick = () => {
    this.props.showDetail(this.props.name)
  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        style={[
          style.default,
          {color: this.props.color},
        ]}
      >
        <Chart
          data={this.props.data}
          color={this.props.color}
          maxHealth={this.props.maxHealth}
          index={this.props.index}
          name={this.props.name}
        />
        <div style={style.name}>
          <span>{this.props.name}</span>
        </div>
      </div>
    )
  }
}


export default Radium(CategoryCard)
