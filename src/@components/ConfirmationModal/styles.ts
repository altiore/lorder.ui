import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  actions: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
  },
  buttons: {
    '& button': {
      margin: theme.spacing(0, 1),
    },
    alignItems: 'center',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
  },
  closeIcon: {},
  dialogContent: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    padding: theme.spacing(0, 8, 2),
  },
  dialogTitle: {
    alignItems: 'flex-end',
    borderBottom: 'none',
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 'auto',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  errorButton: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
  image: {
    marginTop: 4,
    paddingRight: 6,
  },
  textBlock: {
    marginBottom: theme.spacing(2),
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.5,
  },
  textSure: {
    color: '#4A5B61',
    fontSize: '16px',
    marginTop: theme.spacing(1),
    maxWidth: 435,
  },
  textTitle: {
    color: '#000',
    maxWidth: 435,
  },
  warningText: {
    alignItems: 'center',
    color: '#a1b2bd',
    display: 'flex',
    fontStyle: 'italic',
    justifyContent: 'center',
  },
}));
