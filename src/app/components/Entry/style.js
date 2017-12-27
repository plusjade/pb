export default {
  wrap: {
    overflow: "hidden",
    transition: "opacity 900ms ease, max-height 900ms ease",
    maxHeight: 0,
    opacity: 0,
  },
  isVisible: {
    maxHeight: 1000,
    opacity: 1,
  },
  inner: {
    display: "flex",
    alignItems: "end",
    margin: "10px 0",
  },
  major: {
    flex: 9,
    marginRight: 15,
    padding: "12px 55px 12px 20px",
    boxSizing: "border-box",
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    color: "#616161",
    position: "relative",
    fontSize: 15,
  },
  minor: {
    flex: 1,
    margin: "0 20px",
  },
  date: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: 4,
  },
  tag: {
    padding: "5px 10px",
    borderRadius: "0 10px 0",
    textAlign: "center",
    fontSize: 11,
    backgroundColor: "#EEE",
    position: "absolute",
    top: 0,
    right: 0,
  }
}
