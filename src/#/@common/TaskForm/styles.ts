import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 2,
    boxSizing: 'border-box',
    color: theme.palette.text.primary,
    display: 'inline-block',

    padding: '10px 25px 15px 8px',
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    zIndex: 25,
    [theme.breakpoints.up('lg')]: {
      minWidth: 1040,
    },
  },
  cardFirst: {
    boxSizing: 'border-box',
    flexBasis: '75%',
    flexGrow: 2,
    paddingRight: theme.spacing(1),
  },
  cardFirstNotPage: {
    maxWidth: 750,
  },
  cardForm: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  cardSecond: {
    boxSizing: 'border-box',
    flexBasis: '25%',
    flexGrow: 1,
    marginTop: 6,
    maxWidth: 250,
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  grow: {
    flexGrow: 1,
  },
}));
