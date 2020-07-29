import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  cardDescription: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 300,
    marginBottom: 60,
    marginTop: 0,
    maxWidth: 280,
  },
  cardIconWrap: {
    color: '#ffb200',
    fontSize: 60,
    marginTop: 42,
  },
  cardTitle: {
    color: '#29292b',
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  cardWrap: {
    alignItems: 'center',
    background: '#fff',
    borderRadius: 5,
    boxShadow: '-8px 6px 50px #f1f2f6;',
    display: 'flex',
    flexFlow: 'column',
    margin: '0 18px',
    maxWidth: 380,
    paddingLeft: 50,
    paddingRight: 50,
    [theme.breakpoints.down('md')]: {
      marginBottom: '30px',
    },
  },
}));
