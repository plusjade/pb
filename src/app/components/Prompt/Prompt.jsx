import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

class Prompt extends PureComponent {
  static propTypes = {
    prompt: PropTypes.string,
    choices: PropTypes.array,
    tag: PropTypes.string,
    onSelect: PropTypes.func,
  }

  state = {
    activeIndex: - 1,
    status: undefined,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({status: "loaded"})
    }, 10)
  }


  static defaultProps = {
    choices: [],
  }

  handleClick = ({value, index}) => {
    this.setState({activeIndex: index})
    this.props.onSelect({
      tag: this.props.tag,
      value: value
    })
  }

  handleClickSkip = (e) => {
    e.preventDefault()
    this.props.onSelect()
    this.props.onSelect({
      tag: this.props.tag,
      value: ""
    })
  }

  render() {
    return (
      <div
        style={[
          style.default,
          this.state.status === "loaded" && style.isLoaded
        ]}
      >
        <div style={style.name}>
          {this.props.prompt}
        </div>

        <div style={style.circles}>
          {this.props.choices.map((value, index) => (
            <div
              key={index}
              style={style.circleWrap}
            >
              <div
                style={[
                  style.circle,
                  this.state.activeIndex === index && style.isActive,
                  this.state.status === "loaded" && style.circleIsLoaded
                ]}
                onClick={(e) => {
                  this.handleClick({value, index})
                }}
              >
                {value}
              </div>
            </div>
          ))}

          {this.props.choices.length === 0 && (
            <div style={style.circleWrap}>
              <div
                style={[
                  style.circle,
                  this.state.status === "loaded" && style.circleIsLoaded
                ]}
                onClick={this.handleClickSkip}
              >
                {"NO"}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Radium(Prompt)
