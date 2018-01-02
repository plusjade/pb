export default {
  default: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: -10,
    opacity: 0,
    transition: "opacity 800ms  ",
  },
  isActive: {
    zIndex: 1,
    opacity: 1,
  },
}
