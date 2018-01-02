import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

class CategoryList extends Component {
  static propTypes = {
    categories: PropTypes.array,
    onTap: PropTypes.func,
  }

  handleTap = (name) => {
    this.props.onTap(name)
  }

  render() {
    return(
        <Hammer
          onSwipe={this.props.onSwipe}
          direction={"DIRECTION_LEFT"}
        >

        <div style={style.wrap}>
          {this.props.categories.map((category) => (
            <Hammer
              key={category.name}
              onTap={this.handleTap.bind(this, category.name)}
            >
              <div
                style={[
                  style.nameWrap,
                  this.props.activeCategoryName === category.name
                    ? style.isActive
                    : !this.props.activeCategoryName && category.name === "Home" && style.isActive,
                ]}
              >
                <div
                  style={[
                    style.name,
                    category.daysAgo === 0 && ({
                      borderLeft: "3px solid #4CAF50",
                      paddingLeft: 8,
                      marginLeft: -13,
                    })
                  ]}
                >
                  <span>
                    {category.name.toUpperCase()}
                  </span>
                  {category.emoji && (
                    <span style={style.emoji}>
                      {category.emoji}
                    </span>
                  )}
                </div>
                {category.summary && (
                  <div style={style.summary}>
                    {category.summary}
                  </div>
                )}
              </div>
            </Hammer>
          ))}
        </div>
      </Hammer>
    )
  }
}

export default Radium(CategoryList)
