import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(17),
    },
  },
  buttonTitle: {
    flexGrow: 1,
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
    },
  },
  buttonTitleLabel: {
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'none',
    whiteSpace: 'nowrap',
  },
  duration: {
    '& > button': {
      padding: theme.spacing(0.75, 0),
      width: '100%',
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    width: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      // display: 'inline-block',
    },
  },
  listItem: {
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    display: 'flex',
    flexGrow: 1,
    height: 64,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 2, 1, 1.5),
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  listItemRoot: {
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  projectButton: {
    '&:hover p, &:focus p': {
      opacity: 1,
    },
    minWidth: theme.spacing(5),
    textTransform: 'none',
    whiteSpace: 'nowrap',
  },
  projectText: {
    opacity: 0.2,
  },
  taskIcon: {
    left: 8,
    position: 'absolute',
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  userWorkTable: {
    zIndex: 1202,
  },
}));
