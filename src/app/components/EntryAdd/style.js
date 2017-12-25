import colors from 'app/colors'

export default {
  dateSelector: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: 9999999,
    backgroundColor: colors.background,
    transition: "all 200ms ease",
    transform: "translateY(100%)",
  },
  dateSelectorIsActive: {
    // boxShadow: "rgb(0, 0, 0) 1px 1px 20px",
    transform: "translateY(0%)",
  },
  selectDropdown: {
    width: "80%",
    margin: "auto",
    padding: "20px 0",
    margin: "40px 0",
    textAlign: "center",
    fontSize: 20,
    textAlignLast:"center",
    border: `1px solid ${colors.borderColor}`,
  },
  input: {
    width: "100%",
    background: "#FFF",
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
    borderTop: "1px solid #E0E0E0",
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
  },
  buttonActive: {
    backgroundColor: "#4CAF50",
    color: "#FFF",
  },
  level1: {
    position: "relative",
  }
}
