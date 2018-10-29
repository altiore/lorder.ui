import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    input: {
      marginBottom: 20,
      marginRight: 20,
      width: '400px !important',
    },
    inputBlock: {
      alignItems: 'baseline',
      display: 'flex',
      flexFlow: 'row nowrap',
    },
    play: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
    },
    select: {
      width: 150,
    },
  });
