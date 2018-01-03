import colors from 'app/colors'

export default {
  wrap: {
    overflow: "auto",
    transition: "all 300ms ease-out",
    maxHeight: 0,
    opacity: 0,
    transform: "scaleY(0.5)"
  },
  isVisible: {
    maxHeight: 1000,
    opacity: 1,
    transform: "scaleY(1)"
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
    padding: "12px 55px 12px 20px",
    boxSizing: "border-box",
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    color: colors.text,
    position: "relative",
    fontSize: 15,
  },
  majorReverse: {
    backgroundColor: colors.botBackground,
    border: "1px solid #F5F5F5",
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
