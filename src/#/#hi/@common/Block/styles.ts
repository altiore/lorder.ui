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
    padding: theme.spacing(6, 2),
    zIndex: 1,
  },
}));
