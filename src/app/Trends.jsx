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
    // boxShadow: "rgba(33, 33, 33, 0.2) 1px 1px 10px",
  },
  primary: {
    minWidth: 375,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  primaryWrapIsInactive: {
    borderLeft: "1px solid #E0E0E0",
  },
  secondaryWrap: {
    flex: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "flex 200ms ease",
  },
  secondaryIsActive: {
    flex: 8,
  },
  secondary: {
    minWidth: 375,
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
    activeCategory: false,
    maxHealth: 0,
    categories: [],
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

  persistReally = (body, callback) => {
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
      if (typeof callback === "function") {
        callback()
      }
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

  activateCategory = (categoryName) => {
    if (categoryName == "Home") {
      categoryName = false
    }
    this.setState({
      activeCategory: categoryName,
      shouldShowCategoryList: false,
    })
  }

  getCategoryDetail = () => (
    this.state.categories.find(d => (this.state.activeCategory === d.name))
  )

  shouldShowSlidePosition =() => (
    !this.state.activeCategory
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
              activeCategoryName={this.state.activeCategory}
              categories={[{name: "Home"}].concat(this.state.categories || [])}
              onTap={this.activateCategory}
              onSwipe={this.toggleCategoryList}
            />
          </div>
        </div>
        <div
          style={[
            style.primaryWrap,
            this.state.shouldShowCategoryList && style.primaryWrapIsInactive
          ]}
        >
          <div style={style.primary}>
          {!this.state.shouldShowVizIndex && (
            <Visualization
              data={this.state.categories}
              maxHealth={this.state.maxHealth}
              activateCategory={this.activateCategory}
              showVizIndex={this.showVizIndex}
              persist={this.persist}
            />
          )}

          <Heading
            value={this.getCategoryDetail() && this.getCategoryDetail().name}
            onTap={this.toggleCategoryList}
          />

          <Feed
            feed={this.state.feed}
            remove={this.remove}
            persist={this.persist}
            showAddEntry={this.state.showAddEntry}
            showVizIndex={this.showVizIndex}
            isSlid={false}
            activateCategory={this.activateCategory}
            closeAddEntry={this.closeAddEntry}
            activeCategory={this.state.activeCategory}
            onSwipeRight={this.toggleCategoryList}
            data={this.getCategoryDetail()}
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

          {false && this.shouldShowSlidePosition() && (
            <SlidePosition
              activeIndex={this.state.shouldShowVizIndex ? 1 : 0}
            />
          )}

          <EntryAdd
            persistReally={this.persistReally}
            entry={this.state.showAddEntry}
            isActive={!this.state.activeCategory}
          />
        </div>
        </div>
      </div>
    )
  }
}

export default Radium(Trend)
