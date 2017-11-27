import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Days               from 'app/components/Days'
import Visualization      from 'app/components/Visualization'
import SlidePosition      from 'app/components/SlidePosition/SlidePosition'
import CategoryDetail     from 'app/components/CategoryDetail'

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
    backgroundColor: "#121212",
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
    border: "1px solid #222",
  },
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
    // if (!body.ordinal || body.ordinal.trim() === "") { return }
    this.setState({showAddEntry: body})
  }

  handleSelect = (e) => {
    e.preventDefault()
    this.persistReally(
      Object.assign(
        {},
        this.state.showAddEntry,
        {ordinal: e.target.value, value: ""}
      )
    )
  }

  persistReally = (body) => {
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

  render() {
    return(
      <div id="CONTAINER" style={style.container}>
        {!this.state.shouldShowVizIndex && (
          <Days
            days={this.state.days}
            remove={this.remove}
            persist={this.persist}
            showAddEntry={this.showAddEntry}
            showVizIndex={this.showVizIndex}
            isActive={!this.state.shouldShowVizIndex}
          />
        )}

        <Visualization
          data={this.state.trends}
          categories={this.state.categories}
          maxHealth={this.state.maxHealth}
          showDetail={this.showDetail}
          showVizIndex={this.showVizIndex}
          isActive={this.state.shouldShowVizIndex || this.state.shouldShowDetail}
          day={this.state.days[0]}
          persist={this.persist}
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

        <div
          onChange={this.handleSelect}
          style={[
            style.dateSelector,
            this.state.showAddEntry && style.dateSelectorIsActive,
          ]}
        >
          <select
            key={Math.random()}
            style={style.selectDropdown}
          >
            <option value="">{"Add to…"}</option>
            {this.state.days.map(d => (
              <option value={d.ordinal} key={d.ordinal}>
                {d.occurred_at}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

export default Radium(Trend)
