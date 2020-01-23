import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    header: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-end',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%',
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
      cursor: 'pointer',
    },
    wrapper: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(1),
    },
  });
