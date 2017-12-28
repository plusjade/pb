import colors from 'app/colors'

export default {
  wrap: {
    flex: 0,
    overflow: "hidden",
    zIndex: 2,
    transition: "all 200ms ease",
    borderTop: `1px solid ${colors.secondaryBorder}`,
    backgroundColor: colors.secondaryBackground,
    textAlign: "center",
  },
  isActive: {
    transition: "all 200ms ease 600ms",
    flex: 3,
  },
  input: {
    width: "100%",
    backgroundColor: "inherit",
    border: 0,
    fontSize: 16,
    fontFamily: "inherit",
    padding: "20px 100px 20px 10px",
    boxSizing: "border-box",
    margin: 0,
    resize: "none",
    outline: "none",
  },
  button: {
    position: "absolute",
    bottom: 15,
    right: 10,
    padding: "10px 15px",
    display: "block",
    fontSize: 14,
    textAlign: "center",
    border: 0,
    borderRadius: 5,
    backgroundColor: "#F5F5F5",
    color: "#9E9E9E",
  },
  buttonActive: {
    backgroundColor: "#4CAF50",
    color: "#FFF",
  },
  level1: {
    position: "relative",
  }
}
