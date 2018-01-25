import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import CategoryList from 'app/components/CategoryList/CategoryList'
import EnterText from 'app/components/EnterText/EnterText'
import Feed from 'app/components/Feed/Feed'
import Heading from 'app/components/Heading'
import Footing from 'app/components/Footing'
import FeedItemRenderer from 'app/components/FeedItemRenderer'
import CategoryChooser from 'app/components/CategoryChooser'

import BottomPanel from 'app/components/BottomPanel'
import OpacityMask from 'app/components/OpacityMask/OpacityMask'
import Typing from 'texting/components/Typing'

import style from './style'

class Main extends Component {
  static propTypes = {
    user: PropTypes.object,
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
    promptsActiveIndex: - 1,
    promptsResponsesObjects: {},
  }

  componentDidMount() {
    if (this.props.user) {
      this.getCategories(this.props.user)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.getCategories(nextProps.user)
    } else if (!this.props.user && nextProps.newUser) {
      nextProps.newUser.getChats().then((rsp) => {
        this.setState(rsp)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.activeCategoryName && this.state.categoriesIndex.length > 0 && prevState.categoriesIndex.length === 0) {
      // load first category on initial bootstrap
      if (this.state.categoriesIndex[0]) {
        this.activateCategory("all")
      }
    }

    if (!prevState.shouldShowCategoryList && this.state.shouldShowCategoryList) {
      this.getCategories()
    }

    if (!prevState.chatsCommands && this.state.chatsCommands) {
      this.chatsRunCommands(this.state.chatsCommands)
    }

    if (!prevState.promptsIsComplete && this.state.promptsIsComplete === true) {
      if (this.state.promptsResponsesObjects.when === "Yesterday") {
        this.promptsHandleYesterday()
      } else {
        this.promptsHandleToday()
      }
    }
  }

  promptsAddResponse = (data) => {
    console.log("promptsAddResponse data", data)

    if (!data && this.state.promptsIndex.length === 0) {
      this.setState({shouldShowEntryAdd: "custom"})
    } else if (data && data.value === "|custom|") {
      this.setState({shouldShowEntryAdd: data.key})
    } else {
      const key = data && data.key
      const nextIndex = this.state.promptsIndex.indexOf(key) + 1
      if (data) {
        const newData = {...this.state.promptsResponsesObjects, [data.key]: data.value}
        this.setState({promptsResponsesObjects: newData})
      }

      this.setState({shouldShowEntryAdd: false})

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
  }

  promptsGetActive = () => (
    this.state.chatsObjects[this.state.shouldShowEntryAdd] || {key: "custom"}
  )

  promptsGetValues = () => {
    const keys = Object.keys(this.state.promptsResponsesObjects).filter((key) => (
                  key !== "when" && this.state.promptsResponsesObjects[key]
                ))
    return (
      keys.map((key) => {
        let value
        if (key === "custom") {
          value = this.state.promptsResponsesObjects[key]
        } else {
          value = `${key}: ${this.state.promptsResponsesObjects[key]}`
        }

        return value
      }).join("\n")
    )
  }

  promptsHandleToday = () => {
    if (!this.promptsIsValid()) { return }
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
      promptsResponsesObjects: {},
      promptsActiveIndex: - 1,
      promptsIsComplete: false,
    })
  }

  promptsIsValid = () => (
    Object.keys(this.state.promptsResponsesObjects).length > 0
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
    this.props.user.getFeed(categoryName).then((rsp) => {
      const chatsObjects = {...this.state.chatsObjects, ...rsp.chatsObjects}
      this.setState({...rsp, chatsObjects: chatsObjects})
    })
  }

  getCategories(user) {
    if (!user) {
      user = this.props.user
    }
    user.getCategories().then((rsp) => {
      this.setState(rsp)
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

    this.props.user.persist(payload).then((rsp) => {
      this.activateCategory(this.state.activeCategoryName)
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
    } else if (this.state.entryUpdateId) {
      this.toggleEntryUpdate()
    }
  }

  toggleShowRightPanel = () => {
    this.setState({shouldShowRightPanel: !this.state.shouldShowRightPanel})
  }

  addIconOnTap = () => {
    this.promptsAddResponse()
  }

  toggleEntryUpdate = (id) => {
    console.log("hai!", id)
    this.setState({entryUpdateId: id})
  }

  entryUpdate = (categoryName, callback) => {
    if (!categoryName || !this.state.entryUpdateId) {
      throw new Error("bad data")
    }

    this.props.user.update(this.state.entryUpdateId, {category: categoryName}).then((rsp) => {
      this.activateCategory(this.state.activeCategoryName)
      if (typeof callback === "function") {
        callback()
      }
    })
  }

  render() {
    let mainHeading = ""
    if (this.state.activeCategoryName && this.state.activeCategoryName !== "all") {
      mainHeading = this.state.activeCategoryName.toUpperCase()
    }

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
              toggleAccount={() => {console.log("meep")}}
              userAvatarUrl={this.props.userAvatarUrl}
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
            this.state.shouldShowCategoryList && style.primaryWrapIsInactive,
            this.state.shouldShowRightPanel && style.primaryWrapWhenRightPanel,
          ]}
        >
          <OpacityMask
            isActive={
              this.state.shouldShowEntryAdd
              || this.state.shouldShowCategoryList
              || this.state.entryUpdateId
            }
            onTap={this.handleOpacityMaskTap}
          />

          <div style={style.primary}>
            <Feed>
              {(this.state.chatsIndex.length > 0) ?
                (this.state.chatsIndex.map((id) => (
                  <FeedItemRenderer
                    key={id}
                    unit={this.state.chatsObjects[id]}
                    chatsIncomingObjectId={this.state.chatsIncomingObjectId}
                    chatsIncomingObjectStatus={this.state.chatsIncomingObjectStatus}
                    promptsAddResponse={this.promptsAddResponse}
                    initializeWithGoogleToken={this.props.initializeWithGoogleToken}
                    toggleEntryUpdate={this.toggleEntryUpdate}
                  />
                ))
              ) : (this.props.user && (
                  <div style={style.loading}>
                    {"Loading"}
                  </div>
                )
              )}

              <Typing
                status={this.state.chatsIncomingObjectStatus}
              />
            </Feed>

            <Footing
              toggleShowRightPanel={this.toggleShowRightPanel}
              addIconOnTap={this.addIconOnTap}
              addIconIsActive={this.state.promptsActiveIndex >= 0}
              addIconIsVisible={!this.state.shouldShowCategoryList && !this.state.shouldShowEntryAdd}
              toggleCategoryList={this.toggleCategoryList}
              isLoggedIn={!!this.props.user}
            />

            <BottomPanel
              isActive={
                !this.state.shouldShowCategoryList
                && (this.state.shouldShowEntryAdd || this.state.entryUpdateId)
              }
            >
              {this.state.entryUpdateId && !this.state.shouldShowEntryAdd ? (
                <CategoryChooser
                  categoriesIndex={this.state.categoriesIndex}
                  getCategory={this.getCategory}
                  onTap={(categoryName) => {
                    if (categoryName === "custom") {
                      this.toggleEntryAdd()
                    } else {
                      this.entryUpdate(categoryName, this.toggleEntryUpdate)
                    }
                  }}
                />
              ) : (
                <EnterText
                  onSubmit={(value) => {
                    if (this.state.entryUpdateId) {
                      this.entryUpdate(value, this.toggleEntryUpdate)
                    } else {
                      this.promptsAddResponse({
                        key: this.promptsGetActive().key,
                        value: value,
                      })
                    }
                  }}
                  placeholder={
                    this.state.entryUpdateId
                      ? "Add a new category"
                      : this.state.shouldShowEntryAdd
                          ? (this.promptsGetActive() || {}).customPrompt || "Write something..."
                          :  "Write something..."
                  }
                />
              )}

            </BottomPanel>
          </div>
        </div>

        <div
          id="RightPanelWrap"
          style={[
            style.rightPanelWrap,
            this.state.shouldShowRightPanel && style.rightPanelIsActive
          ]}
        >
          <div style={style.rightPanel}>
            <Heading
              value={
                <Hammer onTap={this.toggleShowRightPanel}>
                  <div>{"X"}</div>
                </Hammer>
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Main)
