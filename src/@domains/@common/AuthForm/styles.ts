import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  empty: {
    height: 240,
  },
  form: {
    alignItems: 'center',
    backgroundColor: 'inherit',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    padding: theme.spacing(2),
    width: 'fit-content',
  },
  toggleButton: {
    width: 300,
  },
}));
