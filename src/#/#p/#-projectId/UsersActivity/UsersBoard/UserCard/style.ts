import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  cardWrap: {
    borderBottom: '1px solid rgba(0, 0, 0, .1)',
    display: 'flex',
    marginBottom: 25,
    marginRight: 35,
    paddingBottom: 10,
    paddingRight: 5,
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexFlow: 'column',
    },
  },
  descriptionSpacing: {
    marginBottom: 8,
    marginTop: 10,
  },
  font: {
    color: '#29292b',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWeight: 300,
  },
  img: {
    borderRadius: '50%',
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  imgWrap: {
    border: '1px solid #ffb200',
    borderRadius: '50%',
    height: 63,
    marginBottom: 10,
    marginRight: 27,
    padding: 5,
    width: 63,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  infoWrap: {
    flexGrow: 1,
  },
  linkButton: {
    color: '#c5c5c5',
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeight: 400,
    marginLeft: -7,
  },
  textGroupWrap: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  userName: {
    color: '#29292b',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontWeight: 400,
    margin: 0,
  },
}));
