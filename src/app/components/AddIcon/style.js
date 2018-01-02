const dimension = 50
export default {
  wrap: {
    position: "absolute",
    top: 0,
    right: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: dimension,
    height: dimension,
    borderRadius: dimension,
    fontSize: 40,
    textAlign: "center",
    boxShadow: "rgba(33, 33, 33, 0.1) 1px 1px 10px",

    transition: "all 300ms ease",
    transform: "rotate(0)",
    backgroundColor: "#8BC34A",
    color: "#FFF",
    border: 0,
  },
  isVisible: {
    top: -60,
  },
  isActive: {
    transform: "rotate(45deg)", // X
    backgroundColor: "#FFF",
    color: "#F44336",
    border: "1px solid #F44336",
  },
}
