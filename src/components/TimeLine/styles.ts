import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    block: {
      boxSizing: 'border-box',
      height: '100%',
      position: 'absolute',
    },
    popover: {
      pointerEvents: 'none',
    },
    popoverPaper: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      padding: `0 ${theme.spacing.unit}px`,
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #FFB200',
      borderRadius: theme.shape.borderRadius,
      cursor: 'pointer',
      flexGrow: 1,
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
      // fill: '#77909D',
      fill: '#87A082',
      // fill: theme.palette.primary.main,
      // fill: '#24292E',
    },
  });
