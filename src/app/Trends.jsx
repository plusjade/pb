import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Feed from 'app/components/Feed/Feed'
import Visualization from 'app/components/Visualization'
import SlidePosition from 'app/components/SlidePosition/SlidePosition'
import CategoryDetail from 'app/components/CategoryDetail'
import EntryAdd from 'app/components/EntryAdd/EntryAdd'
import Heading from 'app/components/Heading'
import CategoryList from 'app/components/CategoryList/CategoryList'

const style = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row", // allows for horizontal (swipe) panes
    WebkitOverflowScrolling: "touch",
    overflow: "hidden",
  },
  primaryWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "all 200ms ease",
    boxShadow: "rgba(33, 33, 33, 0.2) 1px 1px 10px",
  },
  primary: {
    width: 375,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  secondaryWrap: {
    flex: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "all 200ms ease",
  },
  secondaryIsActive: {
    flex: 8,
  },
  secondary: {
    width: 375,
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    if (!body.ordinal) {
      body.ordinal = this.state.today.ordinal
    }
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
    // window.scroll(0,0)
    console.log("showVizIndex")
    this.setState({
      shouldShowVizIndex: !this.state.shouldShowVizIndex,
    })
  }

  showAddEntry = (ordinal) => {
    this.setState({showAddEntry: ordinal})
  }

  toggleCategoryList = () => {
    this.setState({
      shouldShowCategoryList: !this.state.shouldShowCategoryList,
    })
  }

  showDetail = (categoryName) => {
    if (categoryName == "All") {
      categoryName = false
    }
    this.setState({
      shouldShowDetail: categoryName,
      shouldShowCategoryList: false,
    })
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
        <div
          style={[
            style.secondaryWrap,
            this.state.shouldShowCategoryList && style.secondaryIsActive
          ]}
        >
          <div style={style.secondary}>
            <CategoryList
              categories={["All"].concat(this.state.categories || [])}
              onTap={this.showDetail}
              onSwipe={this.toggleCategoryList}
            />
          </div>
        </div>
        <div style={style.primaryWrap}>
          <div style={style.primary}>
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

          <Heading
            value={this.getCategoryDetail() && this.getCategoryDetail().category}
            onTap={this.toggleCategoryList}
          />

          {false && (
            <CategoryDetail
              data={this.getCategoryDetail()}
              onSwipeRight={this.toggleCategoryList}
              persist={this.persist}
              showAddEntry={this.state.showAddEntry}
              closeAddEntry={this.closeAddEntry}
            />
          )}

          <Feed
            feed={this.state.feed}
            remove={this.remove}
            persist={this.persist}
            showAddEntry={this.state.showAddEntry}
            showVizIndex={this.showVizIndex}
            isSlid={false}
            showDetail={this.showDetail}
            closeAddEntry={this.closeAddEntry}
            shouldShowDetail={this.state.shouldShowDetail}
            onSwipeRight={this.toggleCategoryList}
          />

          {false && this.shouldShowSlidePosition() && (
            <SlidePosition
              activeIndex={this.state.shouldShowVizIndex ? 1 : 0}
            />
          )}

          <EntryAdd
            persistReally={this.persistReally}
            entry={this.state.showAddEntry}
          />
        </div>
        </div>
      </div>
    )
  }
}

export default Radium(Trend)
