import { makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 300;

export const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
    width: `calc(100vw - ${drawerWidth}px)`,
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - ${theme.spacing(7)}px)`,
    marginLeft: 0,
    overflowX: 'auto',
    position: 'relative',
    width: '100vw',
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      overflowX: 'auto',
      padding: 0,
    },
  },
  contentShift: {
    marginLeft: drawerWidth,
    width: `calc(100vw - ${drawerWidth}px)`,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 62,
    padding: '0 8px',
    position: 'relative',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1201,
  },
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  projectTitle: {
    overflow: 'hidden',
    paddingLeft: theme.spacing(2),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  toggleButton: {
    '&:hover': {
      backgroundColor: theme.palette.grey[400],
    },
    borderLeft: '3px solid black',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: 30,
    zIndex: 1200,
  },
  userRole: {
    bottom: 0,
    color: theme.palette.divider,
    overflow: 'hidden',
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(48),
    position: 'absolute',
    right: 0,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));
