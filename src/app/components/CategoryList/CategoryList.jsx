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
      <div style={style.wrap}>
        {this.props.categories.map((name) => (
          <Hammer
            key={name}
            onTap={this.handleTap.bind(this, name)}
          >
            <div style={style.category} >
              {`${name}`}
            </div>
          </Hammer>
        ))}
      </div>
    )
  }
}

export default Radium(CategoryList)
