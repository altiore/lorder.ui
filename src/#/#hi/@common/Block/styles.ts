import { makeStyles, Theme } from '@material-ui/core/styles';

const MIN_HEIGHT = '100vh';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    minHeight: MIN_HEIGHT,
    padding: theme.spacing(10, 2),
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2),
    },
  },
  element: {
    zIndex: 1,
  },
}));
