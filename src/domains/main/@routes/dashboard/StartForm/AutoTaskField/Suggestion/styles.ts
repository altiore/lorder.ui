import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    project: {
      alignItems: 'center',
      display: 'flex',
      flexBasis: '16%',
      justifyContent: 'center',
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
    },
    runButton: {
      alignItems: 'center',
      display: 'flex',
      flexBasis: '20.5%',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-end',
      paddingRight: theme.spacing.unit * 3.5,
    },
    runButtonIcon: {
      color: '#4BC800',
    },
    task: {
      alignItems: 'center',
      display: 'flex',
      flexBasis: '63.5%',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
      maxWidth: 400,
    },
    taskIcon: {
      marginRight: theme.spacing.unit / 2,
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
