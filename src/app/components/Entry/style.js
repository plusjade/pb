import colors from 'app/colors'

export default {
  wrap: {
    overflow: "auto",
    transition: "all 300ms ease-out",
    maxHeight: 0,
    opacity: 0,
    transform: "scaleY(0.5)"
  },

  default: {
    overflow: "auto",
    position: "relative",
    transition: "all 300ms ease-out",
    maxHeight: 300,
  },
  enter: { // message has to exist for a time in order to animate properly
    maxHeight: 0,
    opacity: 0,
    transform: "scaleY(0.9)"
  },
  loading: { // invisible but animates the space for the bouncing dots
    maxHeight: 50,
    opacity: 0,
    transform: "scaleY(0.9)"
  },
  end: { // becomes visible with appropriate height
    maxHeight: 300,
    opacity: 1,
    transform: "scaleY(1)"
  },

  inner: {
    display: "flex",
    alignItems: "end",
    margin: "5px 15px",
  },
  reverse: {
    flexDirection: "row-reverse",
  },
  major: {
    flex: 12,
    padding: "8px 14px",
    boxSizing: "border-box",
    borderRadius: 20,
    backgroundColor: colors.myBackground,
    color: colors.myText,
    position: "relative",
    fontSize: 15,
    lineHeight: "22px",
    whiteSpace: "pre-line",
  },
  majorReverse: {
    backgroundColor: colors.botBackground,
    color: colors.botText,
  },
  spacer: {
    flex: 1,
  },
  minor: {
    flex: 2,
    // margin: "0 20px",
  },
  date: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: 4,
  },
}
