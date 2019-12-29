import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  actions: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  buttons: {
    alignItems: 'center',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    '& button': {
      margin: theme.spacing(0, 1),
    },
  },
  closeIcon: {},
  dialogContent: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    padding: theme.spacing(0, 4),
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
  textTitle: {
    color: '#000',
    maxWidth: 435,
  },
  textSure: {
    color: '#4A5B61',
    fontSize: '16px',
    marginTop: theme.spacing(1),
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
