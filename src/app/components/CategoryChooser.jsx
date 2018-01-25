import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import colors from 'app/colors'

const style = {
  wrap: {
    maxHeight: 500,
    overflow: "auto",
    padding: 10
  },
  heading: {
    fontSize: 26,
    textAlign: "center",
    padding: 5,
    color: colors.text,
  },
  name: {
    padding: "10px 20px",
    fontSize: 20,
    color: "#E0E0E0",
    margin: 5,
    backgroundColor: "#424242",
    borderRadius: 8,
    display: "inline-block",
  }
}

class CategoryChooser extends PureComponent {
  static propTypes = {
    categoriesIndex: PropTypes.array,
    getCategory: PropTypes.func,
    onTap: PropTypes.func,
  }

  render() {
    return (
      <div style={style.wrap}>
        <div style={style.heading}>
          Add to a category?
        </div>
        {this.props.categoriesIndex.map((name) => {
          const category = this.props.getCategory(name)
          return (
            <Hammer
              key={name}
              onTap={() => {
                this.props.onTap(category.name)
              }}
            >
              <div style={style.name}>
                {category.name}
              </div>
            </Hammer>
          )
        })}

            <Hammer
              onTap={() => {
                this.props.onTap("custom")
              }}
            >
              <div style={style.name}>
                {"✍️"}
              </div>
            </Hammer>

      </div>
    )
  }
}

export default Radium(CategoryChooser)
