import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  contentWrap: {
    margin: '5px 5px 0 5px',
    maxWidth: 1280,
    padding: '16px 1px 1px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginLeft: 0,
    },
  },
  projectHeadWrap: {
    backgroundImage: 'linear-gradient(45deg, #29292b 0%, #29292b 40%, #424247 52%,  #29292b 70%, #29292b 100%)',
    minHeight: 224,
    paddingBottom: 30,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));
