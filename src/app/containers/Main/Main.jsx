import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import CategoryDetail from 'app/components/CategoryDetail'
import CategoryList from 'app/components/CategoryList/CategoryList'
import EntryAdd from 'app/components/EntryAdd/EntryAdd'
import Feed from 'app/components/Feed/Feed'
import Heading from 'app/components/Heading'

import style from './style'

class Main extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    getFeed: PropTypes.func.isRequired,
    persist: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }

  state = {
    categories: [],
    feed: [],
    shouldShowVizIndex: true,
    activeCategory: false,
    maxHealth: 0,
  }

  componentWillMount() {
    this.refreshData()
    this.getFeed("home")
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeCategory !== this.state.activeCategory) {
      this.getFeed(this.state.activeCategory || "home")
    }
  }

  getFeed = (categoryName) => {
    this.props.getFeed(categoryName).then((rsp) => { this.setState(rsp) })
  }

  refreshData() {
    this.props.getCategories().then((rsp) => { this.setState(rsp) })
  }

  persist = (body) => {
    this.setState({showAddEntry: body})
  }

  persistReally = (body, callback) => {
    if (!body.value || !body.value.trim() === "") { return }

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
  feed = () => (
    this.props.parseFeed(this.state.feed, this.state.activeCategory)
  )

  render() {
    const activeCategory = this.getCategoryDetail()
    return(
      <div id="Main" style={style.container}>
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
            <Heading
              value={
                this.getCategoryDetail() && this.getCategoryDetail().name
              }
              onTap={this.toggleCategoryList}
            />

            <Feed
              feed={this.feed()}
              persist={this.persist}
              activateCategory={this.activateCategory}
              activeCategory={this.state.activeCategory}
              onSwipeRight={this.toggleCategoryList}
            >
              {false && activeCategory && (
                <CategoryDetail
                  data={activeCategory}
                />
              )}
            </Feed>

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

export default Radium(Main)
