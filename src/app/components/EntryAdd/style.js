import colors from 'app/colors'

export default {
  dateSelector: {
    position: "fixed",
    top: 80,
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
  textarea: {
    marginTop: 10,
    width: "90%",
    height: "50%",
    background: "#FFF",
    border: "1px solid",
  },
  button: {
    padding: 10,
    backgroundColor: "#FFF",
    display: "block",
    borderRadius: 10,
    width: "90%",
    margin: "auto",
    fontSize: 22,
    textAlign: "center",
    border: 0,
  },
}
