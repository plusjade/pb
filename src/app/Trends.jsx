import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

import Feed               from 'app/components/Feed/Feed'
import Visualization      from 'app/components/Visualization'
import SlidePosition      from 'app/components/SlidePosition/SlidePosition'
import CategoryDetail     from 'app/components/CategoryDetail'
import EntryAdd     from 'app/components/EntryAdd/EntryAdd'

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
}

class Trend extends Component {
  static propTypes = {
    getPayload: PropTypes.func.isRequired,
    persist: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }

  state = {
    feed: [],
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
            persist={this.persist}
          />
        )}

        <Feed
          feed={this.state.feed}
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

        <EntryAdd
          persistReally={this.persistReally}
          showAddEntry={this.state.showAddEntry}
        />
      </div>
    )
  }
}

export default Radium(Trend)
