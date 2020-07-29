import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  editButtonWrap: {
    bottom: '50%',
    position: 'absolute',
    right: 35,
    transform: 'translate(0,50%)',
    [theme.breakpoints.down('md')]: {
      position: 'static',
    },
  },
  headerTitle: {
    color: '#29292b',
    fontFamily: 'Montserrat',
    fontSize: 48,
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  headerTitleWrap: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 90,
    position: 'relative',
  },
  sectionWrap: {
    background: '#f6f8fa',
    paddingBottom: 100,
    paddingTop: 50,
  },
}));
