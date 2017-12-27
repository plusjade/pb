import colors from 'app/colors'

export default {
  wrap: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: 9999999,
    transition: "all 200ms ease",
    transform: "translateY(100%)",
    paddingBottom: 20,
    borderTop: `1px solid ${colors.secondaryBorder}`,
    backgroundColor: colors.secondaryBackground,
  },
  isActive: {
    // backgroundColor: "#FFF",
    transform: "translateY(0%)",
  },
  selectDropdown: {
    width: "80%",
    padding: "20px 0",
    margin: "40px 0",
    textAlign: "center",
    fontSize: 20,
    textAlignLast:"center",
    border: `1px solid ${colors.borderColor}`,
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
