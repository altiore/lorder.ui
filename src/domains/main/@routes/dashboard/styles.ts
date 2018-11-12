import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    collapse: {
      paddingLeft: 88,
    },
    duration: {
      width: 100,
    },
    project: {
      width: 100,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
      cursor: 'pointer',
    },
    title: {
      width: 320,
    },
  });
