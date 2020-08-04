import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  popper: {
    maxHeight: 324,
    overflowY: 'auto',
    zIndex: 1303,
  },
  taskStatus: {
    marginRight: theme.spacing(3),
    position: 'relative',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    zIndex: 10,
  },
}));
