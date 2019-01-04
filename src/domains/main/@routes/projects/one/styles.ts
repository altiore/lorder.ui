import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

const drawerWidth = 300;

export const styles = (theme: Theme) =>
  createStyles({
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
      width: `calc(100% - ${drawerWidth}px)`,
    },
    content: {
      alignItems: 'flex-begin',
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      marginLeft: -drawerWidth,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
    contentShift: {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    drawer: {
      flexShrink: 0,
      width: drawerWidth,
    },
    drawerHeader: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 62,
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: 1000,
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
      paddingLeft: theme.spacing.unit * 2,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    root: {
      display: 'flex',
      flexGrow: 1,
      height: '100%',
      position: 'relative',
    },
    toggleButton: {
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
      borderLeft: '3px solid black',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: 30,
    },
  });
