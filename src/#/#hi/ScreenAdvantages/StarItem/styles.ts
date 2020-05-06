import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: theme.spacing(9),
  },
  star: {
    color: theme.palette.secondary.dark,
  },
}));
