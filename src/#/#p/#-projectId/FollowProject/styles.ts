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
  emailInnerInput: {
    height: '50px',
  },
  emailInput: {
    maxWidth: 275,
    width: `100%`,
  },
  followButton: {
    bordeRadius: 5,
    color: '#fff',
    height: 50,
    width: 275,
  },
  followWrap: {
    background: '#fff',
    paddingBottom: 120,
  },
  innerSelect: {
    height: 50,
    lineHeight: '34px',
  },
  select: {
    height: 50,
    width: 275,
    [theme.breakpoints.down('sm')]: {
      margin: '20px 0',
    },
  },
  taglineHeader: {
    color: '#29292b',
    fontFamily: 'Roboto',
    fontSize: 48,
    fontWeight: 400,
    margin: '120px auto 55px auto',
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
}));
