import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

import { TIME_LINE_HEIGHT } from 'components/TimeLine';

export const styles = (theme: Theme) =>
  createStyles({
    collapse: {
      paddingLeft: 88,
    },
    content: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    duration: {
      width: 100,
    },
    listRoot: {
      '& > li:last-child': {
        marginBottom: 0,
      },
      paddingBottom: 0,
    },
    project: {
      width: 100,
    },
    root: {
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
      },
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
      cursor: 'pointer',
    },
    timeLine: {
      alignItems: 'flex-start',
      display: 'flex',
      height: TIME_LINE_HEIGHT,
      marginBottom: -TIME_LINE_HEIGHT + 8,
      marginTop: theme.spacing.unit * 2,
      padding: `0 ${theme.spacing.unit * 4}px`,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    title: {
      width: 320,
    },
  });
