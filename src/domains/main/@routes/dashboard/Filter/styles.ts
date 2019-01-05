import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    chip: {
      width: '100%',
    },
    filter: {
      width: 144,
    },
    group: {},
    grow: {
      grow: 1,
    },
    left: {
      [theme.breakpoints.down('sm')]: {
        display: 'block!important',
      },
    },
    pagination: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      height: 40,
      justifyContent: 'space-around',
      width: 144,
    },
    right: {
      [theme.breakpoints.down('sm')]: {
        display: 'block!important',
      },
    },
    root: {
      alignItems: 'flex-end',
      display: 'flex',
      height: 70,
      justifyContent: 'space-between',
      padding: '0 2px 8px',
    },
  });
