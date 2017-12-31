import colors from 'app/colors'
export default {
  wrap: {
    flex: 20,
    overflow: "auto",
    backgroundColor: colors.secondaryBackground,
    padding: "20px 0 20px",
  },
  nameWrap: {
    padding: "15px 20px",
    fontSize: 20,
    lineHeight: "20px",
  },
  isActive: {
    borderLeft: `3px solid ${colors.text}`,
  },
  name: {
    color: colors.text,
  },
  emoji: {
    float: "right",
    marginRight: 60,
  },
  summary: {
    fontSize: 12,
  },
}
