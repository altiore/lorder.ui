import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  taskStatus: {
    position: 'relative',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    zIndex: 10,
  },
}));
