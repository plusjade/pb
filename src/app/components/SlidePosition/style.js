export default {
  slide: {
    position: "fixed",
    zIndex: 99999,
    bottom: 25,
    left: 0,
    right: 0,
    pointerEvents: "none",
  },
  slideInner: {
    backgroundColor: "rgba(41,41,41,0.9)",
    width: 50,
    margin: "auto",
    borderRadius: 100,
    textAlign: "center",
    lineHeight: "7px",
  },
  slideCircle: {
    display: "inline-block",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 7,
    height: 7,
    width: 7,
    margin: "8px 3px",
  },
  slideCircleActive: {
    backgroundColor: "rgba(255,255,255,0.9)",
  },
}
