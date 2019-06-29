import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  item: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    boxShadow: `${theme.shadows[7]}, inset 0px 4px 5px -2px rgba(0,0,0,0.2), inset 0px 7px 10px 1px rgba(0,0,0,0.14), inset 0px 2px 16px 1px rgba(0,0,0,0.12)`,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));
