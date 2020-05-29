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
    fabStyle: {
      '& svg': {
        color: theme.palette.default.contrastText,
      },
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
      backgroundColor: '#f2d578',
      borderRadius: '50%',
      boxShadow: theme.shadow.secondary,
      minHeight: 0,
    },
    filter: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
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
      paddingLeft: theme.spacing(1),
      width: 600,
    },
    left: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex!important',
      },
    },
    pagination: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      height: 40,
      justifyContent: 'space-around',
      marginBottom: theme.spacing(1 / 2),
      width: 144,
    },
    projectSelect: {
      float: 'left',
    },
    right: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex!important',
      },
    },
    root: {
      alignItems: 'flex-end',
      display: 'flex',
      height: 70,
      justifyContent: 'space-between',
      padding: '0 2px 8px',
      width: '100%',
    },
    taskSelect: {
      paddingLeft: theme.spacing(1 / 2),
    },
  });
