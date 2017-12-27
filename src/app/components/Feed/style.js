import colors from 'app/colors'

export default {
  default: {
    flex: 8,
    overflow: "auto",
    width: "100%",
    // transition: "all 200ms ease",
    // transform: "translateX(0)",
    backgroundColor: colors.primaryBackground,
    WebkitOverflowScrolling: "touch",

    // scroll to bottom on initial page load
    display: "flex",
    flexDirection: "column-reverse",
  },
  isSlid: {
    transform: "translateX(80%)",
  },
}
