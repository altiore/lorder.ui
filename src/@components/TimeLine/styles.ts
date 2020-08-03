import { makeStyles, Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      boxSizing: 'border-box',
      height: '100%',
      position: 'absolute',
    },
    filled: {
      border: '1px solid #FFB200',
      borderRadius: theme.shape.borderRadius,
      boxSizing: 'border-box',
      position: 'relative',
      width: '100%',
    },
    popover: {
      zIndex: 1300,
    },
    popoverPaper: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      padding: `0 ${theme.spacing(1)}px`,
      pointerEvents: 'auto',
    },
    root: {
      alignItems: 'flex-end',
      backgroundColor: theme.palette.background.paper,
      cursor: 'pointer',
      display: 'flex',
      flexFlow: 'column nowrap',
      flexGrow: 1,
      justifyContent: 'flex-end',
      overflow: 'hidden',
      position: 'relative',
      transition: theme.transitions.create(['height', 'z-index'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }),
      width: '100%',
    },
    rootWrap: {
      cursor: 'pointer',
      position: 'relative',
      width: '100%',
    },
    svg: {
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
    },
    text: {
      fill: '#757575',
      fontSize: 12,
    },
  })
);
