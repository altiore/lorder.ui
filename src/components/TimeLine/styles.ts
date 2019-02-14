import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    block: {
      backgroundColor: 'green',
      height: 50,
      width: 120,
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      cursor: 'pointer',
      height: '50px',
      position: 'relative',
    },
    svg: {
      left: 0,
      position: 'absolute',
      top: 0,
    },
    text: {
      fill: 'red',
    },
  });
