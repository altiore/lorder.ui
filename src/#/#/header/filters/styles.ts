import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  close: {
    marginLeft: theme.spacing(1),
  },
  divider: {
    height: 28,
    margin: 4,
    width: 1,
  },
  filterBadge: {
    color: theme.palette.error.main,
    fontWeight: 'bold',
  },
  formControl: {
    '& .MuiSelect-select:focus': {
      background: '#fff',
    },
    background: 'transparent',
    marginRight: 20,
  },
  iconButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  membersStyle: {
    alignItems: 'space-between',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
  moreBtn: {
    marginRight: theme.spacing(2),
  },
  popper: {
    maxHeight: 324,
    overflowY: 'auto',
    zIndex: 1311,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    float: 'right',
    justifyContent: 'flex-end',
    margin: 0,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeIn,
    }),
    width: '48px',
  },
  rootOpen: {
    backgroundColor: theme.palette.default.main,
    float: 'none',
    height: 56,
    left: 76,
    position: 'absolute',
    top: 0,
    width: 'calc(100% - 104px)',
    zIndex: 1300,
  },
  search: {
    alignItems: 'center',
    display: 'flex',
    padding: 0,
    width: 400,
  },
}));
