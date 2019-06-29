import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    backgroundColor: "transparent",
    "& svg": {
      color: theme.palette.secondary.dark,
    },
  },
  item: {
    backgroundColor: theme.palette.primary.contrastText,
    boxShadow: 'none',
    color: theme.palette.primary.light,
    cursor: "pointer",
    height: "100%",
    padding: theme.spacing(),
    minHeight: "30vh",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      boxShadow: theme.shadows[4],
      color: theme.palette.primary.contrastText,
    },
  },
}));
