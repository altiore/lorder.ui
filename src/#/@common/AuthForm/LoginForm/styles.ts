import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  form: {
    '& > div': {
      '&:last-of-type': {
        marginBottom: theme.spacing(2),
      },
      marginTop: theme.spacing(2),
    },
    paddingBottom: theme.spacing(2),
    width: '100%',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
}));
