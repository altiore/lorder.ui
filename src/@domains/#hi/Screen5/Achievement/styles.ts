import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  item: {
    marginBottom: theme.spacing(2),
  },
  value: {
    ...theme.textGradient[0],
    color: theme.palette.secondary.dark,
    fontSize: theme.typography.pxToRem(86),
    textAlign: 'center',
  },
}));
