import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    new: {
      color: theme.palette.error.main,
      fontWeight: 'bold',
      marginLeft: '100%',
      position: 'absolute',
      transform: 'rotate(-10deg)',
    },
    project: {
      opacity: 0.2,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '20%',
      position: 'absolute',
    },
    projectSelected: {
      opacity: 1,
    },
    root: {
      border: `1px solid transparent`,
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        padding: '0 0.3rem',
      },
    },
    rootSelected: {
      backgroundColor: `${theme.palette.background.default}!important`,
      borderColor: theme.palette.secondary.main,
    },
    runButton: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-end',
      marginLeft: '90%',
      position: 'absolute',
    },
    runButtonIcon: {
      color: '#4BC800',
    },
    task: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
      marginLeft: '20%',
      position: 'absolute',
      width: '70%',
    },
    taskIcon: {
      marginRight: theme.spacing(1 / 2),
    },
    taskText: {
      display: 'block',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'none',
      whiteSpace: 'nowrap',
    },
  });
