import colors from 'app/colors'

const dimension = 50

export default {
  wrap: {
    position: "fixed",
    bottom: -55,
    right: "45%",
    zIndex: 3,
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
    // top: -55,
    bottom: 5,
  },
  isActive: {
    transform: "rotate(45deg)", // X
    backgroundColor: colors.secondaryBackground,
    color: "#212121",
    bottom: -55,
    opacity: 0,
  },
}
