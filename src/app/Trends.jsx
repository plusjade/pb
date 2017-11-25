import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Close              from 'app/components/Close'
import Days               from 'app/components/Days'
import Visualization      from 'app/components/Visualization'
import EntryAdd           from 'app/components/EntryAdd/EntryAdd'
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
    categoryOptions: [],
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
    if (!body.ordinal || body.ordinal.trim() === "") { return }

    this.props.persist(body).then(() => {
      this.refreshData()
      this.closeModals()
    })
  }

  remove = (id) => {
    this.props.remove(id).then(() => {
      this.refreshData()
      // this.closeModals()
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

  shouldShowClose() {
    return this.state.showAddEntry
  }

  shouldShowAdd() {
    return !this.shouldShowClose()
  }

  render() {
    return(
      <div id="CONTAINER" style={style.container}>
        {!this.state.shouldShowVizIndex && (
          <Days
            days={this.state.days}
            remove={this.remove}
            categoryOptions={this.state.categoryOptions}
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
          categoryOptions={this.state.categoryOptions}
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
        />

        {this.state.showAddEntry && (
          <EntryAdd
            persist={this.persist}
            ordinal={this.state.showAddEntry}
            categoryOptions={this.state.categoryOptions}
          />
        )}

        {this.shouldShowClose() ? (
          <Close onClick={this.closeModals} />
        ) : (
          <SlidePosition
            activeIndex={this.state.shouldShowVizIndex ? 1 : 0}
          />
        )}
      </div>
    )
  }
}

export default Radium(Trend)
