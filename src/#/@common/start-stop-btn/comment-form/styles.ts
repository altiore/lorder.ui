import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
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
  textBlock: {
    marginBottom: theme.spacing(2),
  },
  textTitle: {
    color: '#000',
    maxWidth: 435,
  },
}));
