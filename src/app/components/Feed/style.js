import colors from 'app/colors'

export default {
  default: {
    flex: 20,
    overflow: "auto",
    width: "100%",
    backgroundColor: colors.primaryBackground,
    WebkitOverflowScrolling: "touch",

    // scroll to bottom on initial page load
    display: "flex",
    flexDirection: "column-reverse",
    position: "relative",
  },
}
