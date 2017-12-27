export default {
  default: {
    width: "100%",
    transition: "all 200ms ease",
    transform: "translateX(0)",
    boxShadow: "rgba(33, 33, 33, 0.2) 1px 1px 10px",
    backgroundColor: "#F5F5F5",
    paddingBottom: 72, // EntryAdd height
  },
  isSlid: {
    transform: "translateX(80%)",
  },
  heading: {
    padding: "15px 0",
    textAlign: "center",
    position: "relative",
  },
  backButton: {
    border: 0,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px 10px 0 10px",
    color: "inherit",
    fontSize: 30,
    outline: "none",
  },
  addIcon: {
    border: 0,
    backgroundColor: "transparent",
    position: "fixed",
    top: 15,
    right: 5,
    padding: "2px 10px 0 10px",
    color: "#FFF",
    fontSize: 40,
    outline: "none",
    zIndex: 3,
  },
  timelineHeading: {
    padding: "10px 0 0 10px",
  },
}
