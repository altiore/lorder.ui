import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  firstBlockContent: {
    paddingLeft: 180,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 16,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  imageWrap: {
    height: 228,
    width: 226,
    [theme.breakpoints.down('xs')]: {
      margin: '45px auto',
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
    fontFamily: 'Montserrat',
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
    fontFamily: 'Montserrat',
    fontSize: 30,
    fontWeight: 200,
    marginBottom: 38,
    marginTop: 0,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));
