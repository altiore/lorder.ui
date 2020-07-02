import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  buttonsWrap: {
    margin: '0 auto',
    maxWidth: 875,
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
      fontSize: 45,
    },
  },
  buttonsWrapVertical: {
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
  followButton: {
    '&:hover': {
      backgroundColor: 'rgb(255, 185, 0)',
    },
    bordeRadius: 5,
    boxShadow: 'none',
    color: '#fff',
    fontSize: 18,
    height: 50,
    width: 275,
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
  innerSelect: {
    height: 50,
    lineHeight: '34px',
  },
  innerSelectColor: {
    color: '#c5c5c5',
  },
  select: {
    height: 50,
    width: 275,
    [theme.breakpoints.down('sm')]: {
      margin: '20px 0',
    },
  },
  selectVertical: {
    marginBottom: 30,
    marginTop: 10,
    maxWidth: 360,
    width: '100%',
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
