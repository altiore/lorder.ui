import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

const WIDTH = 1012;

export const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
      zIndex: theme.zIndex.drawer + 1,
    },
    avatar: {
      margin: '10px 14px',
    },
    buttonTitle: {
      flexGrow: 1,
      textTransform: 'none',
      width: 540,
    },
    content: {
      flexGrow: 1,
      margin: '24px auto',
      padding: theme.spacing.unit * 2,
      width: WIDTH,
    },
    duration: {
      marginLeft: 20,
      width: 100,
    },
    end: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    grow: {
      flexGrow: 1,
    },
    listItem: {
      // backgroundColor: theme.palette.grey['100'],
      border: `1px solid ${theme.palette.grey['300']}`,
      borderRadius: theme.shape.borderRadius,
      flexGrow: 1,
      justifyContent: 'space-between',
      marginBottom: theme.spacing.unit,
    },
    root: {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexGrow: 1,
    },
  });
