import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  contentWrap: {
    margin: '5px 5px 0 5px',
    marginLeft: -70,
    maxWidth: 760,
    padding: 1,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginLeft: 0,
    },
  },
  imageWrap: {
    height: 228,
    width: 226,
    [theme.breakpoints.down('xs')]: {
      margin: '45px 0',
    },
  },
  projectHeadWrap: {
    backgroundImage: 'linear-gradient(45deg, #29292b 0%, #424247 52%, #29292b 100%)',
    minHeight: 295,
    paddingBottom: 30,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  projectInfoWrap: {
    marginBottom: 25,
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  projectName: {
    color: 'rgb(239, 221, 147)',
    fontFamily: 'Roboto',
    fontSize: 65,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 38,
    [theme.breakpoints.down('xs')]: {
      fontSize: 45,
    },
  },
  projectTagline: {
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 200,
    marginBottom: 38,
    marginTop: 0,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));
