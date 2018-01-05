import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

const MAX_HEIGHT = 200

class EntryAdd extends PureComponent {
  static propTypes = {
    persist: PropTypes.func,
  }

  state = {
    value: ""
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive && !this.props.isActive) {
      // this.inputRef && this.inputRef.focus()
    }
  }

  handleSubmit = () => {
    if (!this.state.value) { return }
    this.props.persist(
      {value: this.state.value},
      this.reset
    )
  }

  reset = () => {
    this.setState({value: ""})
    this.handleResize()
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
    this.handleResize()
  }

  handleResize = () => {
    this.inputRef.style.height = "" // Reset the height
    this.inputRef.style.height = Math.min(this.inputRef.scrollHeight, MAX_HEIGHT) + "px"
  }

  refInput = (node) => {
    if (node) { this.inputRef = node}
  }

  render() {
    return (
      <div
        style={[
          style.wrap,
          this.props.isActive && style.isActive,
        ]}
      >
        {React.Children.map(this.props.children, (c) => (c))}
        <div>
          <div style={{padding: 10}}>
            <div style={{fontWeight: 600}}>
              {`Entry for #${this.props.activeCategory}:`}
            </div>
            <ul>
              <li>went to the gym</li>
              <li>hung out with friends</li>
              <li>had dinner with my family</li>
              <li>went to work</li>
              <li>read a book</li>
            </ul>
          </div>
          <div style={style.level1}>
            <textarea
              style={style.input}
              rows={1}
              value={this.state.value}
              placeholder={`Write about your activity...`}
              onChange={this.handleChange}
              ref={this.refInput}
            />
          </div>
          <div style={style.buttonsWrap}>
            <div style={{flex: 1, textAlign: "left"}}>
            <Hammer onTap={this.handleSubmit}>
                <button
                  style={[
                    style.day,
                    style.yesterday,
                    this.state.value && style.dayIsActive,
                  ]}
                >
                  {"Add to yesterday"}
                </button>
              </Hammer>
            </div>
            <div style={{flex: 1, textAlign: "right"}}>
              <Hammer onTap={this.handleSubmit}>
                <button
                  style={[
                    style.day,
                    style.today,
                    this.state.value && style.dayIsActive,
                  ]}
                >
                  {"Add to today"}
                </button>
              </Hammer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(EntryAdd)
