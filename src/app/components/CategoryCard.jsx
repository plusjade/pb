import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Chart              from 'app/components/Chart'

const style = {
  default: {
    minHeight: 100,
    padding: 5,
    boxSizing: "border-box",
    marginBottom: 10,

  },
  name: {
    fontSize: 20,
    lineHeight: "1.8em",
    textAlign: "center",
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
        <h2 style={style.name}>
          <span>{this.props.name}</span>
        </h2>
        <Chart
          data={this.props.data}
          color={this.props.color}
          maxHealth={this.props.maxHealth}
          index={this.props.index}
          name={this.props.name}
        />
      </div>
    )
  }
}


export default Radium(CategoryCard)
