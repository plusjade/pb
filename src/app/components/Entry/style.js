export default {
  wrap: {
    overflow: "hidden",
    transition: "opacity 900ms ease 500ms, max-height 900ms ease 500ms",
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
    backgroundColor: "#FFF",
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
    borderRadius: 10,
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "#EEE",
    position: "absolute",
    top: 10,
    right: 5,
  }
}
