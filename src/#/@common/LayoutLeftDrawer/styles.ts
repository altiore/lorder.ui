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
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: '100vw',
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
  projectPublic: {
    border: '1px solid red',
    color: 'red',
    marginLeft: theme.spacing(0.5),
  },
  projectTitle: {
    overflow: 'hidden',
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
    left: theme.spacing(3),
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));
