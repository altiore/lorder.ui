import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  block: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: 1,
    width: theme.spacing(6),
  },
  button: {
    '&:after': {
      backgroundColor: 'transparent',
      borderRadius: 6,
      content: "''",
      height: theme.taskCard.innerHeight,
      left: '0',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      transition: theme.transitions.create(['background-color', 'height']),
      width: '100%',
    },
    '&:hover': {
      '& $buttonInner': {
        height: theme.taskCard.outerHeight,
      },
      backgroundColor: 'transparent',
      height: theme.taskCard.outerHeight,
    },
    '&:hover:after': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      height: theme.taskCard.outerHeight,
    },
    alignItems: 'center',
    borderRadius: 6,
    display: 'flex',
    height: theme.taskCard.outerHeight,
    justifyContent: 'center',
    padding: 0,
    position: 'relative',
    width: theme.spacing(11),
  },
  buttonInner: {
    alignItems: 'center',
    borderRadius: 6,
    display: 'flex',
    height: theme.taskCard.innerHeight,
    justifyContent: 'space-between',
    minWidth: theme.spacing(3),
    padding: theme.spacing(0, 2 - theme.taskCard.padding, 0, 1 - theme.taskCard.padding),
    // transition: theme.transitions.create(['background-color', 'height']),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1, 0, 0),
    },
  },
  divider: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: theme.spacing(1),
  },
  svg: {
    color: '#eecf6d',
  },
  timeStyle: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  unit: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: theme.spacing(2.5),
  },
  unitStyle: {
    color: theme.palette.pause.main,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 300,
  },
  valueStyle: {
    color: theme.palette.pause.dark,
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
  },
}));
