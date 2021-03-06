import colors from 'app/colors'

export default {
  input: {
    width: "100%",
    backgroundColor: "#FFF",
    borderStyle: "none",
    borderColor: "Transparent",
    fontSize: 16,
    fontFamily: "inherit",
    padding: "20px 90px 20px 10px",
    boxSizing: "border-box",
    margin: "0 0 -5px 0",
    resize: "none",
    outline: "none",
  },
  buttonsWrap: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "none",
  },
  buttonInner: {
    flex: 1,
    textAlign: "right",
  },
  button: {
    padding: "7px 21px",
    display: "inline-block",
    fontSize: 14,
    textAlign: "center",
    border: 0,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    color: "#9E9E9E",
    outline: "none",
  },
  buttonActive: {
    backgroundColor: "#8BC34A",
    color: "#FFF",
  },
  level1: {
    position: "relative",
  },
  day: {
    display: "inline-block",
    padding: "0 15px",
    backgroundColor: "#EEEEEE",
    textAlign: "center",
    border: 0,
    fontSize: 14,
    lineHeight: "34px",
    borderRadius: 10,
    outline: "none",
    color: "inherit",
  },
  yesterday: {
    // borderRadius: "10px 0 0 10px",
  },
  today: {
    // borderRadius: "0 10px 10px 0",
  },
  dayIsActive: {
    backgroundColor: "#8BC34A",
    color: "#FFF",
  },


  inputButton: {
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
  inputButtonActive: {
    backgroundColor: "#4CAF50",
    color: "#FFF",
  },
}
