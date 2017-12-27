import colors from 'app/colors'

export default {
  default: {
    flex: 8,
    overflow: "auto",
    width: "100%",
    transition: "all 200ms ease",
    transform: "translateX(0)",
    boxShadow: "rgba(33, 33, 33, 0.2) 1px 1px 10px",
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
