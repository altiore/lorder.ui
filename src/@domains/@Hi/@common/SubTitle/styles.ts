import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  subTitle: {
    alignItems: 'flex-start',
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(12),
  },
}));
