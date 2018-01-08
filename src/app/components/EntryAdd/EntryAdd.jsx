import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import Prompt from 'app/components/Prompt/Prompt'

import style from './style'

const MAX_HEIGHT = 200

class EntryAdd extends PureComponent {
  static propTypes = {
    persist: PropTypes.func,
  }

  static defaultProps = {
    promptsIndex: [],
    promptsObjects: {},
  }

  state = {
    activeIndex: 0,
    value: "",
    responsesObjects: {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive && !this.props.isActive) {
      // this.inputRef && this.inputRef.focus()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isComplete) {
      if (this.state.responsesObjects.when === "Yesterday") {
        this.handleYesterday()
      } else {
        this.handleToday()
      }
    }
  }

  getValues = () => (
    Object.keys(this.state.responsesObjects).map((key) => (
      `${key}: ${this.state.responsesObjects[key]}`
    )).join("\n")
  )

  handleToday = () => {
    if (!this.isValid()) { return }
    this.props.persist(
      {value: this.getValues()},
      this.reset
    )
  }

  handleYesterday = () => {
    if (!this.isValid()) { return }

    this.props.persist(
      {value: this.getValues(), ordinal: "yesterday"},
      this.reset
    )
  }

  reset = () => {
    this.setState({responsesObjects: {}, activeIndex: 0})
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

  onComplete = () => {
    this.setState({isComplete: true})
  }

  onSelect = (data) => {
    console.log(data)
    const index = this.state.activeIndex + 1
    if (data) {
      const newData = {...this.state.responsesObjects, [data.tag]: data.value}
      this.setState({responsesObjects: newData})
    }

    if (index > (this.props.promptsIndex.length - 1)) {
      this.setState({isComplete: true})
    } else {
      this.setState({activeIndex: index})
    }
  }

  handleSubmitCustom = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.value)
    this.setState({value: ""})
  }

  isValid = () => (
    Object.keys(this.state.responsesObjects).length > 0
  )

  getActivePrompt = () => (
    this.props.promptsObjects[this.props.promptsIndex[this.state.activeIndex]] || {}
  )

  render() {
    const activePrompt = this.getActivePrompt()
    return (
      <div
        style={[
          style.wrap,
          this.props.isActive && style.isActive,
        ]}
      >
        {React.Children.map(this.props.children, (c) => (c))}
        <div>
          {!this.state.isComplete && (
            <div style={style.level1}>
              <textarea
                style={style.input}
                rows={1}
                value={this.state.value}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                ref={this.refInput}
              />
              <button
                onClick={this.handleSubmitCustom}
                style={[
                  style.inputButton,
                  this.state.value && style.inputButtonActive,
                ]}
              >
                {"Add"}
              </button>
            </div>
          )}

          <div
            style={[
              style.buttonsWrap,
              this.state.isComplete && ({display: "flex"}),
            ]}
          >
            <div style={{flex: 1, textAlign: "left"}}>
            <Hammer onTap={this.handleYesterday}>
                <button
                  style={[
                    style.day,
                    style.yesterday,
                    this.isValid() && style.dayIsActive,
                  ]}
                >
                  {"Add to yesterday"}
                </button>
              </Hammer>
            </div>
            <div style={{flex: 1, textAlign: "right"}}>
              <Hammer onTap={this.handleToday}>
                <button
                  style={[
                    style.day,
                    style.today,
                    this.isValid() && style.dayIsActive,
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
