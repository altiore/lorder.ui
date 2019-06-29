import {makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  loading: {
    alignItems: "center",
    backgroundColor: "#1E1E2A",
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    height: "100vh",
  },
}));
