import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  editButtonWrap: {
    bottom: '50%',
    position: 'absolute',
    right: 35,
    transform: 'translate(0,50%)',
    [theme.breakpoints.down('md')]: {
      position: 'static',
      transform: 'none',
    },
  },
  headerTitle: {
    color: '#29292b',
    fontFamily: 'Roboto',
    fontSize: 48,
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  headerTitleWrap: (props: any) => ({
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: props.marginBottom || 0,
    marginTop: props.marginTop || 0,
    position: 'relative',
    width: '100%',
  }),
  sectionWrap: {
    background: '#f6f8fa',
    paddingBottom: 100,
    paddingTop: 50,
  },
}));
