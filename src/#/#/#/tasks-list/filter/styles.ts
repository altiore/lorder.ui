import get from 'lodash/get';

import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    chip: {
      position: 'absolute',
      transition: theme.transitions.create(['bottom'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }),
      width: '100%',
    },
    chipHovered: get(theme, 'overrides.MuiChip.outlined.&:hover', {}),
    filter: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
      flexShrink: 0,
      justifyContent: 'flex-end',
      marginBottom: -8,
      position: 'relative',
      width: 144,
    },
    group: {
      '& > span': {
        borderRadius: '50%',
      },
      display: 'flex',
    },
    grow: {
      grow: 1,
    },
    input: {
      '& input': {
        paddingLeft: 35,
      },
      backgroundColor: '#fff',
      borderRadius: 6,
      flexGrow: 1,
      height: 36,
      margin: theme.spacing(0, 4),
    },
    root: {
      alignItems: 'flex-end',
      border: '1px solid transparent',
      display: 'flex',
      height: 70,
      justifyContent: 'space-between',
      maxWidth: 800,
      padding: '0 2px 8px 12px',
      width: '100%',
    },
    searchFilter: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      flexGrow: 1,
      padding: theme.spacing(0.75, 0),
    },
  });
