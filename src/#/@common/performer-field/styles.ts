import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  body: {
    width: theme.spacing(40),
  },
  popover: {
    zIndex: 10000,
  },
}));
