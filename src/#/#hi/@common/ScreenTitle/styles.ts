import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  line: {
    backgroundColor: theme.palette.secondary.dark,
    height: theme.spacing(0.25),
    marginRight: theme.spacing(2),
    width: 80,
  },
  title: {
    alignItems: 'center',
    color: '#676767',
    display: 'flex',
    height: theme.mixins.toolbar.height,
    marginBottom: theme.spacing(2),
  },
  titleBlack: {
    color: theme.palette.secondary.contrastText,
  },
}));
