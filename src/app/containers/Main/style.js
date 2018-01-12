export default {
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
    position: "relative",
  },
  primary: {
    minWidth: 375,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
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


  rightPanelWrap: {
    flex: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "flex 200ms ease",
  },
  rightPanelIsActive: {
    flex: 8,
  },
  rightPanel: {
    minWidth: 375,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  primaryWrapWhenRightPanel: {
    flex: 0,
  },
}
