import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  login: {
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  },
}));
