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
    boxShadow: "rgb(0, 0, 0) 1px 1px 20px",
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
    border: "1px solid",
    fontSize: 16,
    padding: "15px 60px 15px 10px",
  },
  button: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    padding: "0 15px",
    backgroundColor: "#FFF",
    display: "block",
    backgroundColor: "#4CAF50",
    color: "#FFF",
    fontSize: 30,
    textAlign: "center",
    border: 0,
  },
}
