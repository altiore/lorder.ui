import { darken, makeStyles, Theme } from '@material-ui/core/styles';

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
    '& $buttonTitleLabel': {
      color: '#676767',
    },
    borderRadius: '6px',
    color: '#676767',
    flexGrow: 1,
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
    },
  },
  buttonTitleCurrent: {
    '& $buttonTitleLabel': {
      color: '#292929',
    },
    '&:hover': {
      backgroundColor: '#fcfaee',
    },
  },
  buttonTitleLabel: {
    display: 'block',
    fontSize: 16,
    fontWeight: 400,
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
      borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 2px 10px #d8d8d8',
    display: 'flex',
    flexGrow: 1,
    height: 60,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 2, 1, 1.5),
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  listItemCurrent: {
    '&:hover': {
      borderColor: darken('#eecf6d', 0.1),
    },
    backgroundColor: '#f8f1cc',
    border: '1px solid #eecf6d',
    boxShadow: '0 4px 10px rgba(242, 213, 120, 0.6)',
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
    borderRadius: '6px',
    color: '#9d9d9d',
    marginRight: theme.spacing(1),
    minWidth: theme.spacing(5),
    textTransform: 'none',
    whiteSpace: 'nowrap',
  },
  projectButtonCurrent: {
    '&:hover': {
      backgroundColor: '#fcfaee',
    },
    backgroundColor: '#f8f4ea',
    color: '#292929',
  },
  projectText: {
    // opacity: 0.2,
  },
  startBtnDivider: {
    borderLeft: '1px dashed #eecf6d',
    height: theme.spacing(4.5),
    margin: theme.spacing(0, 2, 0, 1),
    width: 0,
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
  verticalDivider: {
    borderLeft: '1px dashed #eecf6d',
    height: theme.spacing(4.5),
    margin: theme.spacing(0, 1),
    width: 0,
  },
}));
