export default {
  default: {
    maxHeight: 0,
    transition: "max-height 300ms ease-in-out",
    opacity: 1,
  },
  isLoaded: {
    maxHeight: 1000,
    opacity: 1,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    fontWeight: 600,
    color: "#424242",
  },
  circles: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 40px",
  },
  circleWrap: {
    flex: 1,
    margin: 5,
  },
  circle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#BDBDBD",
    border: "2px solid #616161",
    margin: "auto",
    color: "#616161",
    fontSize: 14,
    transition: "all 300ms ease 100ms",
    transform: "scale(0)",
  },
  circleIsLoaded: {
    transform: "scale(1)",
  },
  isActive: {
    backgroundColor: "#424242",
    color: "#E0E0E0",
  }
}
