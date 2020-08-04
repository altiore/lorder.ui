import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
  },
  description: {},
  descriptionWrapper: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  hoveredItems: {
    marginTop: theme.spacing(2),
  },
  list: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
    },
  },
  loginBlock: {
    alignItems: 'center',
    backgroundColor: theme.palette.default.light,
    borderRadius: 8,
    boxShadow: theme.shadows[6],
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    padding: theme.spacing(5),
    width: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  loginTitle: {
    textAlign: 'center',
    width: 260,
  },
  loginWrap: {
    display: 'flex',
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
    },
  },
}));
