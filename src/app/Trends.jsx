import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Days               from 'app/components/Days'
import Visualization      from 'app/components/Visualization'
import SlidePosition      from 'app/components/SlidePosition/SlidePosition'
import CategoryDetail     from 'app/components/CategoryDetail'

import colors from 'app/colors'

const style = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
  },
  dateSelector: {
    position: "fixed",
    top: 80,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: 9999999,
    backgroundColor: colors.background,
    transition: "all 200ms ease",
    transform: "translateY(100%)",
  },
  dateSelectorIsActive: {
    boxShadow: "rgb(0, 0, 0) 1px 1px 20px",
    transform: "translateY(0%)",
  },
  selectDropdown: {
    width: "80%",
    margin: "auto",
    padding: "20px 0",
    margin: "40px 0",
    textAlign: "center",
    fontSize: 20,
    textAlignLast:"center",
    border: `1px solid ${colors.borderColor}`,
  },
  textarea: {
    marginTop: 10,
    width: "90%",
    height: "50%",
    background: "#FFF",
    border: "1px solid",
  },
  button: {
    padding: 10,
    backgroundColor: "#FFF",
    display: "block",
    borderRadius: 10,
    width: "90%",
    margin: "auto",
    fontSize: 22,
    textAlign: "center",
    border: 0,
  }
}

class Trend extends Component {
  static propTypes = {
    getPayload: PropTypes.func.isRequired,
    persist: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }

  state = {
    days: [],
    shouldShowVizIndex: true,
    shouldShowDetail: false,
    maxHealth: 0,
    trends: [],
  }

  componentWillMount() {
    this.refreshData()
  }

  refreshData() {
    this.props.getPayload().then((rsp) => { this.setState(rsp) })
  }

  persist = (body) => {
    this.setState({showAddEntry: body})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.persistReally(
      Object.assign(
        {},
        this.state.showAddEntry,
        {value: this.textAreaRef && this.textAreaRef.value}
      )
    )
  }

  persistReally = (body) => {
    if (
      !body.ordinal
      || body.ordinal.trim() === ""
      || !body.value
      || !body.value.trim() === ""
    ) { return }
    this.props.persist(body).then(() => {
      this.closeAddEntry()
      this.refreshData()
    })
  }

  closeAddEntry = () => {
    this.setState({showAddEntry: false})
  }

  remove = (id) => {
    this.props.remove(id).then(() => {
      this.refreshData()
    })
  }

  showVizIndex = () => {
    window.scroll(0,0)
    this.setState({
      shouldShowVizIndex: !this.state.shouldShowVizIndex,
    })
  }

  showAddEntry = (ordinal) => {
    this.setState({showAddEntry: ordinal})
  }

  closeModals = () => {
    window.scroll(0,0)
    this.setState({
      showAddEntry: false,
      shouldShowDetail: false,
    })
  }

  showDetail = (categoryName) => {
    window.scroll(0,0)
    this.setState({shouldShowDetail: categoryName})
  }

  getCategoryDetail = () => (
    this.state.trends.find(d => (this.state.shouldShowDetail === d.category))
  )

  shouldShowSlidePosition =() => (
    !this.state.shouldShowDetail
  )

  refTextarea = (node) => {
    if (node) { this.textAreaRef = node}
  }

  render() {
    return(
      <div id="CONTAINER" style={style.container}>
        {!this.state.shouldShowVizIndex && (
          <Visualization
            data={this.state.trends}
            categories={this.state.categories}
            maxHealth={this.state.maxHealth}
            showDetail={this.showDetail}
            showVizIndex={this.showVizIndex}
            day={this.state.days[0]}
            persist={this.persist}
          />
        )}

        <Days
          days={this.state.days}
          remove={this.remove}
          persist={this.persist}
          showAddEntry={this.state.showAddEntry}
          showVizIndex={this.showVizIndex}
          isActive={!this.state.shouldShowVizIndex}
          showDetail={this.showDetail}
          isActive={this.state.shouldShowVizIndex || this.state.shouldShowDetail}

          closeAddEntry={this.closeAddEntry}
        />

        <CategoryDetail
          data={this.getCategoryDetail()}
          onSwipeRight={this.closeModals}
          isActive={this.state.shouldShowDetail}
          persist={this.persist}
          showAddEntry={this.state.showAddEntry}
          closeAddEntry={this.closeAddEntry}
        />

        {this.shouldShowSlidePosition() && (
          <SlidePosition
            activeIndex={this.state.shouldShowVizIndex ? 1 : 0}
          />
        )}

        <form
          onSubmit={this.handleSubmit}
          style={[
            style.dateSelector,
            this.state.showAddEntry && style.dateSelectorIsActive,
          ]}
        >
          <textarea
            style={style.textarea}
            ref={this.refTextarea}
            defaultValue=""
          />

          <button
            style={style.button}
            type="submit"
          >
            Add entry
          </button>
        </form>
      </div>
    )
  }
}

export default Radium(Trend)
