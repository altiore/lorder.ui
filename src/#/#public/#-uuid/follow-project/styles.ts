import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  buttonsWrap: {
    '& > *': {
      margin: theme.spacing(0, 1),
    },
    margin: '0 auto',
    maxWidth: 875,
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
      fontSize: 45,
    },
  },
  buttonsWrapVertical: {
    '& > *': {
      margin: theme.spacing(2, 0),
    },
    justifyContent: 'unset',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'wrap',
      justifyContent: 'center',
    },
  },
  emailInnerInput: {
    height: '50px',
  },
  emailInput: {
    width: 275,
  },
  emailInputVertical: {
    maxWidth: 360,
    width: `100%`,
  },
  followButtonVertical: {
    maxWidth: 360,
    width: '100%',
  },
  followWrap: {
    background: '#fff',
    paddingBottom: 120,
  },
  followWrapVertical: {
    display: 'flex',
    flexFlow: 'column',
    marginLeft: 84,
    maxWidth: 410,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  outlinedStyle: {
    transform: 'translate(14px, 18px) scale(1)',
  },
  requestSent: {
    color: theme.palette.error.main,
    marginTop: 48,
  },
  taglineHeader: {
    color: '#29292b',
    fontFamily: 'Roboto',
    fontSize: 48,
    fontWeight: 400,
    margin: '109px auto 45px auto',
    maxWidth: 650,
    minHeight: 93,
    textAlign: 'center',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: 34,
      margin: '60px 5px 25px 5px',
      textAlign: 'center',
    },
  },
  taglineHeaderVertical: {
    fontSize: 36,
    lineHeight: '46px',
    margin: '50px auto 30px auto',
    minHeight: 'auto',
    textAlign: 'left',
    textTransform: 'none',
  },
}));
