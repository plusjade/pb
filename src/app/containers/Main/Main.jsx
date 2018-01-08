import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import CategoryList from 'app/components/CategoryList/CategoryList'
import EntryAdd from 'app/components/EntryAdd/EntryAdd'
import Feed from 'app/components/Feed/Feed'
import Heading from 'app/components/Heading'
import FeedItemRenderer from 'app/components/FeedItemRenderer'
import AddIcon from 'app/components/AddIcon/AddIcon'
import OpacityMask from 'app/components/OpacityMask/OpacityMask'
import Typing from 'texting/components/Typing'

import style from './style'

class Main extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    getFeed: PropTypes.func.isRequired,
    persist: PropTypes.func.isRequired,
  }

  state = {
    activeCategoryName: false,
    categoriesIndex: [],
    categoriesObjects: {},
    chatsIndex: [],
    chatsObjects: {},
    chatsCommands: undefined,
    // status: null, loading, loaded
    chatsIncomingObjectId: undefined,
    chatsIncomingObjectStatus: undefined,
    shouldShowCategoryList: false,
    shouldShowEntryAdd: false,

    promptsIndex: [],
    promptsObjects: {},

    promptsActiveIndex: - 1,
    responsesObjects: {},
  }

  componentWillMount() {
    this.getCategories()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.activeCategoryName && this.state.categoriesIndex.length > 0 && prevState.categoriesIndex.length === 0) {
      // load first category on initial bootstrap
      if (this.state.categoriesIndex[0]) {
        this.activateCategory(this.state.categoriesIndex[0])
      }
    }

    if (!prevState.shouldShowCategoryList && this.state.shouldShowCategoryList) {
      this.getCategories()
    }

    if (!prevState.chatsCommands && this.state.chatsCommands) {
      this.chatsRunCommands(this.state.chatsCommands)
    }

    if (!prevState.promptsIsComplete && this.state.promptsIsComplete === true) {
      if (this.state.responsesObjects.when === "Yesterday") {
        this.promptsHandleYesterday()
      } else {
        this.promptsHandleToday()
      }
    }
  }

  onPromptAction = (data) => {
    console.log("onPromptAction data", data)
    const tag = data && data.tag
    const nextIndex = this.state.promptsIndex.indexOf(tag) + 1
    if (data) {
      const newData = {...this.state.responsesObjects, [data.tag]: data.value}
      this.setState({responsesObjects: newData})
    }

    // this.toggleEntryAdd()
    this.setState({shouldShowEntryAdd: true})

    if (nextIndex >= 0 && nextIndex > this.state.promptsActiveIndex) {
      if (nextIndex > (this.state.promptsIndex.length - 1)) {
        this.setState({promptsIsComplete: true})
      } else {
        const chatsIndex = this.state.chatsIndex.slice(0)
        const nextChatId = this.state.promptsIndex[nextIndex]
        if (nextChatId) {
          chatsIndex.push(nextChatId)
          this.setState({chatsIndex})
        }
        this.setState({promptsActiveIndex: nextIndex})
      }
    }
  }

  promptsGetActive = () => (
    this.state.chatsObjects[this.state.promptsIndex[this.state.promptsActiveIndex]]
  )

  promptsGetValues = () => {
    const keys = Object.keys(this.state.responsesObjects).filter((key) => (key !== "when"))
    return (
      keys.map((key) => (
        `${key}: ${this.state.responsesObjects[key]}`
      )).join("\n")
    )
  }

  promptsHandleToday = () => {
    if (!this.promptsIsValid()) { return }
    console.log("promptsHandleToday", this.state.responsesObjects)

    this.persist(
      {value: this.promptsGetValues()},
      this.promptsReset
    )
  }

  promptsHandleYesterday = () => {
    if (!this.promptsIsValid()) { return }

    this.persist(
      {value: this.promptsGetValues(), ordinal: "yesterday"},
      this.promptsReset
    )
  }

  promptsReset = () => {
    this.setState({
      responsesObjects: {},
      promptsActiveIndex: - 1,
      promptsIsComplete: false,
    })
  }

  promptsIsValid = () => (
    Object.keys(this.state.responsesObjects).length > 0
  )

  chatsRunCommands = (commands) => (
    commands.reduce((memo, command) => (
      memo.then(() => (this.chatsRunCommand(command)))
    ), Promise.resolve())
  )

  chatsRunCommand = ({id, duration=800, delay=300}) => (
    new Promise((resolve, reject) => {
      const chatsIndex = this.state.chatsIndex.slice(0)
      chatsIndex.push(id)
      this.setState({
        chatsIndex: chatsIndex,
        chatsIncomingObjectId: id,
        chatsIncomingObjectStatus: undefined,
      }, () => {
        setTimeout(() => {
          this.chatsSetIncomingObject(id, "loading", () => {
            setTimeout(() => {
              this.chatsSetIncomingObject(id, "loaded", () => {
                resolve("Success!")
              })
            }, duration)
          })
        }, delay)
      })
    })
  )

  chatsSetIncomingObject = (id, status, callback) => {
    this.setState((prevState) => ({
      chatsIncomingObjectId: id,
      chatsIncomingObjectStatus: status,
    }), callback)
  }

  getFeed = (categoryName) => {
    this.props.getFeed(categoryName).then((rsp) => {
      const chatsObjects = {...this.state.chatsObjects, ...rsp.chatsObjects}
      this.setState({...rsp, chatsObjects: chatsObjects})
    })
  }

  getCategories() {
    this.props.getCategories().then((rsp) => {
      if (!rsp.promptsObjects) {
        rsp.promptsObjects = {}
      }
      const chatsObjects = {...this.state.chatsObjects, ...rsp.promptsObjects}
      this.setState({...rsp, chatsObjects: chatsObjects})
    })
  }

  getCategory = (name) => (
    this.state.categoriesObjects[name]
  )

  persist = (body, callback) => {
    if (!body.value || !body.value.trim() === "") { return }
    if (!this.state.activeCategoryName) {
      throw new Error("no activeCategory")
    }

    const payload = {...body, category: this.state.activeCategoryName}

    this.props.persist(payload).then((rsp) => {
      this.activateCategory(rsp.category)
      if (typeof callback === "function") {
        callback()
      }
    })
  }

  toggleCategoryList = () => {
    this.setState({
      shouldShowCategoryList: !this.state.shouldShowCategoryList,
    })
  }

  activateCategory = (categoryName) => {
    // todo: this belongs in the componentDidUpdate
    this.getFeed(categoryName)
    this.setState({
      activeCategoryName: categoryName,
      shouldShowCategoryList: false,
      shouldShowEntryAdd: false,
    })
    this.promptsReset()
  }

  toggleEntryAdd = () => {
    this.setState({shouldShowEntryAdd: !this.state.shouldShowEntryAdd})
  }

  handleOpacityMaskTap = () => {
    if (this.state.shouldShowEntryAdd) {
      this.toggleEntryAdd()
    } else if (this.state.shouldShowCategoryList) {
      this.toggleCategoryList()
    }
  }

  render() {
    return(
      <div id="Container" style={style.container}>
        <div
          id="SecondaryWrap"
          style={[
            style.secondaryWrap,
            this.state.shouldShowCategoryList && style.secondaryIsActive
          ]}
        >
          <div style={style.secondary}>
            <Heading
              value={"CATEGORIES"}
            />

            <CategoryList
              activeCategoryName={this.state.activeCategoryName}
              categoriesIndex={this.state.categoriesIndex || []}
              getCategory={this.getCategory}
              onTap={this.activateCategory}
              onSwipe={this.toggleCategoryList}
            />
          </div>
        </div>

        <div
          id="PrimaryWrap"
          style={[
            style.primaryWrap,
            this.state.shouldShowCategoryList && style.primaryWrapIsInactive
          ]}
        >
          <OpacityMask
            isActive={this.state.shouldShowCategoryList}
            onTap={this.handleOpacityMaskTap}
          />

          <div style={style.primary}>
            <Heading
              value={this.state.activeCategoryName && this.state.activeCategoryName.toUpperCase()}
              onTap={this.toggleCategoryList}
            />

            <Feed
              activateCategory={this.activateCategory}
              activeCategoryName={this.state.activeCategoryName}
              onSwipeRight={this.toggleCategoryList}
            >
              {this.state.activeCategoryName && (
                this.state.chatsIndex.map((id) => (
                  <FeedItemRenderer
                    key={id}
                    unit={this.state.chatsObjects[id]}
                    chatsIncomingObjectId={this.state.chatsIncomingObjectId}
                    chatsIncomingObjectStatus={this.state.chatsIncomingObjectStatus}
                    onPromptAction={this.onPromptAction}
                  />
                ))
              )}

              <Typing
                status={this.state.chatsIncomingObjectStatus}
              />
            </Feed>

            <div style={{flex: 2, backgroundColor: "#FFF"}} />

            <EntryAdd
              promptsIndex={this.state.promptsIndex}
              promptsObjects={this.state.promptsObjects}
              onSubmit={(value) => {
                this.onPromptAction({
                  tag: this.promptsGetActive().tag,
                  value: value,
                })
              }}
              persist={this.persist}
              isActive={!this.state.shouldShowCategoryList && this.state.shouldShowEntryAdd}
              placeholder={
                this.state.shouldShowEntryAdd
                ? (this.promptsGetActive() || {}).customPrompt || "Write something..."
                : "Write something..."
              }
            />

            <AddIcon
              onTap={() => { this.onPromptAction() }}
              isActive={!!this.state.shouldShowEntryAdd}
              isVisible={!this.state.shouldShowCategoryList}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Main)
