import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    block: {
      // backgroundColor: '#FFF0B5',
      // backgroundColor: '#FAB203',
      // border: '1px solid #FFB200',
      borderRadius: 2,
      borderStyle: 'solid',
      borderWidth: 1,
      boxSizing: 'border-box',
      height: '100%',
      position: 'absolute',
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
      position: 'absolute',
      top: 0,
    },
    text: {
      fill: '#77909D',
    },
  });
