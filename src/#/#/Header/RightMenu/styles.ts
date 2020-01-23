import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    margin: '10px',
  },
  avatarButton: {
    borderRadius: '50%',
  },
  item: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  menu: {
    zIndex: 1301,
  },
  menuPaper: {},
  paper: {
    marginRight: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
}));
