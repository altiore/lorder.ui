import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  item: {
    backgroundColor: theme.palette.default.light,
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
  },
}));
