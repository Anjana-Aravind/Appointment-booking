import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
  createStyles({
    card: {
      width: 400,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
    inputsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: 10,
      margin: 20,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    flexRow: {
      flexDirection: "row",
    },
    inuts: {
      width: "100%",
      marginBottom: 10,
    },
    marginTopMedium: {
      marginTop: 16,
    },
    textAlignCenter: {
      textAlign: "center",
    },
    inlineFlex: {
      display: "inline-flex",
    },
    flex: {
      display: "flex",
      alignItems: "flex-end",
    },
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    marginRightMedium: {
      marginRight: 16,
    },
  })
);
