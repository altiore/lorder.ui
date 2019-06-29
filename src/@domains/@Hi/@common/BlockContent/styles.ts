import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  content: {
    alignItems: "center",
    color: "white",
    display: "flex",
  },
  contentBlack: {
    color: theme.palette.primary.dark,
  },
}));
