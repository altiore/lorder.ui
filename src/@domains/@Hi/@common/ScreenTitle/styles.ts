import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  line: {
    backgroundColor: theme.palette.secondary.dark,
    height: theme.spacing(0.25),
    marginRight: theme.spacing(2),
    width: 80,
  },
  title: {
    alignItems: "center",
    color: "white",
    display: "flex",
    height: theme.mixins.toolbar.height,
  },
  titleBlack: {
    color: theme.palette.primary.dark,
  },
}));
